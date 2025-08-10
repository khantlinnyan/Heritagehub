import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import Layout from "@/components/layout";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import SearchGroup from "@/components/molecules/search-group";
import Suggestion from "@/components/molecules/suggestion";
import ItineraryCard from "@/components/molecules/itinerary-card";
import {
  fetchItineraries,
  fetchSuggestedPlaces,
  fetchPublicItineraries,
} from "@/lib/data/itineraries";
import { Itinerary } from "@/lib/types";

export default async function ItineraryDashboard() {
  const { userId } = await auth();
  const publicItineraries = await fetchPublicItineraries(userId);
  const itineraries = await fetchItineraries(userId);

  if (!userId) redirect("/auth");

  return (
    <Layout className="flex flex-col gap-6">
      <Header
        titleClassName="text-4xl"
        title="Where to?"
        subtitle="Plan your Myanmar adventure"
      />

      <SearchGroup />

      <Suspense fallback={<SuggestionSkeleton />}>
        <SuggestionSection userId={userId} />
      </Suspense>
      <h3 className="text-2xl mt-6 font-bold">Your Plans</h3>
      <Suspense fallback={<ItineraryListSkeleton />}>
        <ItinerarySection userId={userId} itineraries={itineraries} />
      </Suspense>
      <Suspense fallback={<ItineraryListSkeleton />}>
        {publicItineraries.length > 0 && (
          <>
            <h3 className="text-2xl mt-12 font-bold">Public Plans</h3>
            <PublicItinerarySection itineraries={publicItineraries} />
          </>
        )}
      </Suspense>
      <div className="flex justify-center my-12">
        <Link href="/preferences/create">
          <Button className="gap-2">
            <PlusCircleIcon size={18} />
            Create New Plan
          </Button>
        </Link>
      </div>

      {/* <Suspense fallback={<SuggestionSection />}>
        <ThingsTodo />
      </Suspense> */}
    </Layout>
  );
}

async function SuggestionSection({ userId }: { userId: string }) {
  const suggestedPlaces = await fetchSuggestedPlaces(userId);
  return <Suggestion places={suggestedPlaces} />;
}

function PublicItinerarySection({ itineraries }: { itineraries: Itinerary[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-8">
        {itineraries?.map((itinerary) => {
          const allPhotos = itinerary.days
            .flatMap((d) => d.items)
            .map((i) => i.photoUrl)
            .filter(Boolean);
          const firstPhoto =
            allPhotos.length > 0
              ? allPhotos[Math.floor(Math.random() * allPhotos.length)]
              : "https://res.cloudinary.com/dlcqjthel/image/upload/v1752946789/Shwezigon_jz1khc.jpg";
          return (
            <ItineraryCard
              isPublic
              key={itinerary.id}
              itinerary={itinerary}
              photoUrl={firstPhoto}
            />
          );
        })}
      </div>
    </div>
  );
}

async function ItinerarySection({
  userId,
  itineraries,
}: {
  userId: string;
  itineraries: Itinerary[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-8">
        {itineraries?.map((itinerary) => {
          const allPhotos = itinerary.days
            .flatMap((d) => d.items)
            .map((i) => i.photoUrl)
            .filter(Boolean);
          const firstPhoto =
            allPhotos.length > 0
              ? allPhotos[Math.floor(Math.random() * allPhotos.length)]
              : "https://res.cloudinary.com/dlcqjthel/image/upload/v1752946789/Shwezigon_jz1khc.jpg";

          return (
            <ItineraryCard
              userId={userId}
              key={itinerary.id}
              itinerary={itinerary}
              photoUrl={firstPhoto}
            />
          );
        })}
      </div>
    </div>
  );
}

function SuggestionSkeleton() {
  return <div className="h-[200px] animate-pulse rounded-lg bg-gray-100" />;
}

function ItineraryListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-[200px] animate-pulse rounded-lg bg-gray-100"
        />
      ))}
    </div>
  );
}
