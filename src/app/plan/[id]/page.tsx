"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  ChevronRight,
  Sun,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
// import { ProgressBar } from "@/components/atoms/progressbar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout";
// import Header from "@/components/ui/header";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";

async function fetchItinerary(id: string) {
  const response = await fetch(`http://localhost:8080/api/v1/plan/${id}`);
  if (!response.ok) throw new Error("Failed to fetch itinerary");
  return response.json();
}

export default function CruiseStyleItinerary() {
  const router = useRouter();
  const params = useParams();

  const {
    data: itinerary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itinerary", params.id],
    queryFn: () => fetchItinerary(params.id),
    enabled: !!params.id,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} router={router} />;
  if (!itinerary) {
    router.push("/preferences/create");
    return null;
  }

  // const handleEditPlan = () => router.push(`/plan/${itinerary.id}`);
  // const handleItemClick = (placeId: string) =>
  //   router.push(`/plan/${itinerary.id}/item/${placeId}`);

  return (
    <Layout>
      {/* Header Section */}
      <div className="my-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <h1 className="text-3xl font-bold text-typography-950 mb-2">
              {itinerary.data.title}
            </h1>
          </div>
          <UserButton />
        </div>
        <div className="flex gap-4 mb-4">
          <Badge variant="secondary" className="gap-2">
            <Calendar size={16} />
            {itinerary.data.duration} Day
            {itinerary.data.duration > 1 ? "s" : ""}
          </Badge>
          {/* <Badge variant="secondary" className="gap-2">
            <Users size={16} />
            {itinerary.data.days.length} Stops
          </Badge> */}
        </div>

        <Separator className="my-4" />
      </div>
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Itinerary Days */}
      <div className="space-y-6">
        {itinerary.data.days.map((day) => (
          <Card key={day.day} className="border-none shadow-none">
            <CardHeader className="pb-2 px-0">
              <div className="flex w-full min-w-full justify-between items-center">
                <h2 className="text-lg text-start font-semibold uppercase tracking-wider text-gray-500">
                  DAY {day.day}
                </h2>
                {/* Weather placeholder - you would integrate real weather data */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Sun className="text-yellow-400" size={16} />
                  <span>Sunny, 24°C</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {day.items.map((item) => (
                <div
                  key={item.placeId}
                  className="flex gap-4 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => console.log("click")}
                >
                  <Image
                    src={item.photoUrl}
                    alt={item.name}
                    width={64}
                    height={64}
                    priority={true}
                    quality={80}
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
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <a
                          href={`https://www.google.com/maps?q=${item.coordinates?.latitude},${item.coordinates?.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.coordinates?.latitude.toFixed(2)}°N,{" "}
                          {item.coordinates?.longitude.toFixed(2)}°E
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <Separator className="" />
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
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
