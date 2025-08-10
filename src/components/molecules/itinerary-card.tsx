"use client";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Star,
  MapPin,
  LockIcon,
  Calendar,
  User,
  TrashIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CldImg from "../atoms/cld-img";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteItinerary } from "@/lib/data/itineraries";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ItineraryCardProps {
  itinerary: {
    id: string;
    title: string;
    duration: number;
    createdAt: string;
    isPublic: boolean;
    user: {
      email: string;
    };
    days: Array<{
      day: number;
      items: Array<{
        name: string;
        photoUrl: string;
      }>;
    }>;
    averageRating?: number;
    ratingCount?: number;
    photoUrl?: string;
    isPublic?: boolean;
    userId?: string;
  };
}

export default function ItineraryCard({
  itinerary,
  photoUrl,
  isPublic = false,
  userId,
}: ItineraryCardProps) {
  const uniquePlaceNames = Array.from(
    new Set(itinerary?.days?.flatMap((d) => d.items.map((i) => i.name)))
  );
  const router = useRouter();

  const getDates = (duration: number) => {
    const today = new Date();
    const endDate = new Date(
      today.getTime() + (duration - 1) * 24 * 60 * 60 * 1000
    );
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return `${today.toLocaleDateString(
      "en-MM",
      options
    )} - ${endDate.toLocaleDateString("en-MM", options)}`;
  };

  const deleteItineraryHandler = async (id: string) => {
    await deleteItinerary(id, userId);
    toast.success("Plan deleted successfully");
    router.refresh();
  };

  return (
    <Card className="grid grid-cols-1 border border-gray-200 shadow-xs grid-rows-2 lg:grid-cols-5 lg:grid-rows-1 h-48 overflow-hidden hover:shadow-sm transition-shadow duration-300">
      <div className="col-span-3 flex flex-col p-4 w-full relative">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-xl leading-tight text-ellipsis overflow-hidden">
            {itinerary.title}
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <Calendar size={12} className="text-gray-400" />
          {getDates(itinerary.duration)}
        </p>
        {itinerary.user && (
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <User size={12} className="text-gray-400" />
            {itinerary.user?.email}
          </p>
        )}
        <p className="text-xs text-gray-500 mb-2">
          Created on {new Date(itinerary.createdAt).toLocaleDateString("en-MM")}
        </p>
        <p className="flex items-center text-xs text-gray-600 mb-4 line-clamp-2">
          <MapPin size={12} className="mr-1 text-gray-400 flex-shrink-0" />
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {uniquePlaceNames.slice(0, 2).join(", ")}

            {uniquePlaceNames.length > 2 &&
              ` and ${uniquePlaceNames.length - 2} more`}
          </span>
        </p>
        <div className="flex items-center gap-2 mt-auto">
          {itinerary.isPublic ? (
            <Badge variant="outline" className="text-xs text-green-500 gap-1">
              <Globe size={12} /> Public
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-red-500 gap-1">
              <LockIcon size={12} /> Private
            </Badge>
          )}
          {!isPublic && (
            <Dialog>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-lg lg:text-2xl">
                    Are you sure you want to delete this plan
                  </DialogTitle>
                </DialogHeader>
                <Image
                  src={"/trash-folder.png"}
                  alt="Trash Folder"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
                <DialogFooter>
                  <DialogClose>Cancel</DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => deleteItineraryHandler(itinerary.id)}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogTrigger className="h-8 duration-300 rounded bg-primary-foreground hover:bg-red-400/50 px-2 text-primary-500 hover:text-primary-600">
                <TrashIcon className="text-zinc-500" size={18} />
              </DialogTrigger>
            </Dialog>
          )}

          <Link
            href={`plan/${itinerary.id}`}
            className="ml-auto block lg:hidden"
            aria-label="View itinerary"
          >
            <Button
              variant="ghost"
              className="h-8 px-2 text-primary-500 hover:text-primary-600"
            >
              <ArrowRight size={24} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="row-span-2 hidden lg:block relative lg:col-span-2">
        {photoUrl && (
          <Link href={`plan/${itinerary.id}`}>
            <CldImg
              src={photoUrl}
              quality={70}
              alt={`Image for ${itinerary.title}`}
              width={450}
              height={450}
              crop="fill"
              gravity="auto"
              className="transition-transform absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 duration-300 hover:scale-105"
            />
          </Link>
        )}
        <Badge
          variant="secondary"
          className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm shadow-sm font-semibold"
        >
          In {itinerary.duration} day{itinerary.duration > 1 ? "s" : ""}
        </Badge>
      </div>
    </Card>
  );
}
