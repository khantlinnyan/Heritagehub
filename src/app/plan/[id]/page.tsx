"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Clock,
  ChevronRight,
  Sun,
  Calendar,
  ArrowLeft,
  Plus,
  Trash2,
  List,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { SearchPlaceDialog } from "@/components/molecules/search-place-dialog";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import CldImg from "@/components/atoms/cld-img";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { fetchItinerary } from "./action";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// Updated API call to send the entire itinerary object
async function updateItinerary(id: string, itinerary: any) {
  const response = await fetch(`${base_url}/plan/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itinerary),
  });
  if (!response.ok) throw new Error("Failed to update itinerary");
  return response.json();
}

export default function CruiseStyleItinerary() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const itineraryId = params.id as string;
  const [isPublic, setIsPublic] = useState(false);
  const [isEditing, setIsEditing] = useState(
    searchParams.get("edit") === "true"
  );
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [dayToAddTo, setDayToAddTo] = useState<number | null>(null);
  const [localItinerary, setLocalItinerary] = useState(null);
  const [localTitle, setLocalTitle] = useState("");
  const [localDuration, setLocalDuration] = useState(0);

  const {
    data: itineraryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itinerary", itineraryId],
    queryFn: () => fetchItinerary(itineraryId),
    enabled: !!itineraryId,
  });

  useEffect(() => {
    if (itineraryData && itineraryData.data) {
      setLocalItinerary(itineraryData.data);
      setLocalTitle(itineraryData.data.title);
      setLocalDuration(itineraryData.data.duration);
      setIsPublic(itineraryData.data.isPublic);
      console.log("--- Checking for places without an ID ---");
      itineraryData.data.days.forEach((day, dayIndex) => {
        day.items.forEach((item, itemIndex) => {
          if (!item.id) {
            console.warn(
              `[Day ${day.day}] Place at index ${itemIndex} has no 'id'. Name: "${item.name}"`
            );
          }
        });
      });
      console.log("--- Finished ID check ---");
    }
  }, [itineraryData]);

  const mutation = useMutation({
    mutationFn: (newItinerary: any) =>
      updateItinerary(itineraryId, newItinerary),
    onSuccess: () => {
      queryClient.invalidateQueries(["itinerary", itineraryId]);
      toast.success("Plan updated successfully!");
      setIsEditing(false);
    },
    onError: (err: any) => {
      toast.error("Failed to save changes. Please try again.");
      console.error(err);
      if (itineraryData && itineraryData.data) {
        setLocalItinerary(itineraryData.data);
        setLocalTitle(itineraryData.data.title);
        setLocalDuration(itineraryData.data.duration);
      }
    },
  });

  const handleCopyLink = async () => {
    try {
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied!");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination || !localItinerary) return;
    const { source, destination } = result;

    const startDayIndex = parseInt(source.droppableId.replace("day-", ""));
    const finishDayIndex = parseInt(
      destination.droppableId.replace("day-", "")
    );
    const newItineraryDays = JSON.parse(JSON.stringify(localItinerary.days));

    if (startDayIndex === finishDayIndex) {
      const day = newItineraryDays[startDayIndex];
      const [removed] = day.items.splice(source.index, 1);
      day.items.splice(destination.index, 0, removed);
    } else {
      const startDay = newItineraryDays[startDayIndex];
      const finishDay = newItineraryDays[finishDayIndex];
      const [removed] = startDay.items.splice(source.index, 1);
      finishDay.items.splice(destination.index, 0, removed);
    }

    setLocalItinerary({ ...localItinerary, days: newItineraryDays });
  };

  const handleDeleteItem = (dayIndex: number, itemIndex: number) => {
    const newItineraryDays = JSON.parse(JSON.stringify(localItinerary.days));
    newItineraryDays[dayIndex].items.splice(itemIndex, 1);
    setLocalItinerary({ ...localItinerary, days: newItineraryDays });
  };

  const handleAddDay = () => {
    const newItineraryDays = [
      ...localItinerary.days,
      { day: localItinerary.days.length + 1, items: [] },
    ];
    setLocalItinerary({ ...localItinerary, days: newItineraryDays });
    setLocalDuration(localDuration + 1);
  };

  const handlePlaceSelect = (place: any) => {
    const newItineraryDays = JSON.parse(JSON.stringify(localItinerary.days));
    if (dayToAddTo !== null) {
      const newItem = {
        ...place,
        id: place.id,
        time: "",
        notes: "",
      };
      newItineraryDays[dayToAddTo].items.push(newItem);
      setLocalItinerary({ ...localItinerary, days: newItineraryDays });
    }
  };

  const handleSave = () => {
    const newItinerary = {
      ...localItinerary,
      title: localTitle,
      duration: localDuration,
      isPublic: isPublic,
    };
    mutation.mutate(newItinerary);
  };

  const handleCancel = () => {
    if (itineraryData && itineraryData.data) {
      setLocalItinerary(itineraryData.data);
      setLocalTitle(itineraryData.data.title);
      setLocalDuration(itineraryData.data.duration);
    }
    setIsEditing(false);
  };

  if (isLoading || !localItinerary) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} router={router} />;

  return (
    <Layout>
      <div className="my-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <Input
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="text-3xl lg:text-3xl font-bold text-typography-950 mb-2 h-10"
              />
            ) : (
              <h1 className="text-3xl font-bold text-typography-950 mb-2">
                {localTitle}
              </h1>
            )}
          </div>
          <div className="flex items-center flex-col gap-4 ">
            <UserButton />
            <div className="flex gap-4 items-end justify-between">
              <div className="flex items-center flex-col space-x-2">
                <Label htmlFor="is-public" className="text-sm">
                  Public
                </Label>

                <Switch
                  disabled={!isEditing}
                  id="is-public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
              {localItinerary.isPublic && !isEditing && (
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <LinkIcon size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <Badge variant="secondary" className="gap-2">
            <Calendar size={16} />
            {localDuration} Day{localDuration > 1 ? "s" : ""}
          </Badge>
        </div>

        <Separator className="my-4" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {isEditing ? (
          <div key="edit-buttons" className="flex gap-2">
            <Button
              key={"cancel-button"}
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              key={"save-button"}
              onClick={handleSave}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Itinerary"}
            </Button>
          </div>
        ) : (
          <Button key="customise-button" onClick={() => setIsEditing(true)}>
            <List className="mr-2 h-4 w-4" />
            Customize
          </Button>
        )}
      </div>

      {isEditing ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-6">
            {localItinerary.days.map((day, dayIndex) => (
              <Droppable
                droppableId={`day-${dayIndex}`}
                key={`day-${day.day}-${dayIndex}`}
              >
                {(provided) => (
                  <Card
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="border-none shadow-none"
                  >
                    <CardHeader className="pb-2 px-0">
                      <div className="flex w-full min-w-full justify-between items-center">
                        <h2 className="text-lg text-start font-semibold uppercase tracking-wider text-gray-500">
                          DAY {day.day}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Sun className="text-yellow-400" size={16} />
                          <span>Sunny, 24°C</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {day?.items?.map((item, itemIndex) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={itemIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex gap-4 py-4 hover:bg-gray-50 cursor-pointer"
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="flex items-center"
                              >
                                <List
                                  size={20}
                                  className="text-gray-400 cursor-grab"
                                />
                              </div>
                              <CldImg
                                src={item.photoUrl}
                                alt={item.name}
                                width={64}
                                height={64}
                                quality={80}
                                className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-bold text-lg">
                                      {item.name}
                                    </h3>
                                    <p className="text-gray-600">
                                      {item.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleDeleteItem(dayIndex, itemIndex)
                                    }
                                  >
                                    <Trash2 className="text-red-500 h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => {
                          setDayToAddTo(dayIndex);
                          setIsSearchDialogOpen(true);
                        }}
                      >
                        <Plus size={16} /> Add Place to Day {day.day}
                      </Button>
                    </CardFooter>
                    <Separator className="mt-4" />
                  </Card>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="space-y-6">
          {localItinerary.days.map((day, dayIndex) => (
            <Card key={day.day} className="border-none shadow-none">
              <CardHeader className="pb-2 px-0">
                <div className="flex w-full min-w-full justify-between items-center">
                  <h2 className="text-lg text-start font-semibold uppercase tracking-wider text-gray-500">
                    DAY {day.day}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Sun className="text-yellow-400" size={16} />
                    <span>Sunny, 24°C</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {day?.items?.map((item, itemIndex) => {
                  let normalizedCoordinates = null;
                  if (item.coordinates.coordinates) {
                    if (Array.isArray(item.coordinates.coordinates)) {
                      // Handle the array format: [longitude, latitude]
                      normalizedCoordinates = {
                        longitude: item.coordinates.coordinates[0],
                        latitude: item.coordinates.coordinates[1],
                      };
                    } else {
                      // Handle the object format: { latitude, longitude }
                      normalizedCoordinates = item.coordinates;
                    }
                  }

                  return (
                    <div
                      key={`${item.id}-${itemIndex}`}
                      className="flex gap-4 py-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/place/${item.id}`)}
                    >
                      <CldImg
                        src={item.photoUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                          <ChevronRight className="text-gray-400" />
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Suggested </span>
                            <span>{item.suggestedTime ?? item.time}</span>
                          </div>
                          {item.coordinates?.latitude ? (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates.latitude},${item.coordinates.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.coordinates.latitude.toFixed(2)}°N,{" "}
                                {item.coordinates.longitude.toFixed(2)}°E
                              </a>
                            </div>
                          ) : item.coordinates ? (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${normalizedCoordinates?.latitude},${normalizedCoordinates?.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {normalizedCoordinates?.latitude.toFixed(2)}
                                °N,{" "}
                                {normalizedCoordinates?.longitude.toFixed(2)}
                                °E
                              </a>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>Coordinates not available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
              <Separator className="mt-4" />
            </Card>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={handleAddDay}>
            <Plus className="mr-2 h-4 w-4" />
            Add Another Day
          </Button>
        </div>
      )}

      <SearchPlaceDialog
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
        onPlaceSelect={handlePlaceSelect}
      />
    </Layout>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Skeleton className="h-8 w-64 mb-4" />
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Separator className="my-4" />

      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex gap-4 mb-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ErrorDisplay({ error, router }) {
  return (
    <div className="container mx-auto py-8 text-center">
      <div className="bg-error-50 p-6 rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold text-error-600 mb-2">
          Error Loading Itinerary
        </h2>
        <p className="text-error-500 mb-4">{error.message}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/preferences/create")}
        >
          Back to Preferences
        </Button>
      </div>
    </div>
  );
}
