import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon, ArrowRight, Loader2 } from "lucide-react";
import Layout from "@/components/layout";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchGroup from "@/components/molecules/search-group";
import Suggestion from "@/components/molecules/suggestion";
import EmptyState from "@/components/molecules/empty-state";
import ItineraryCard from "@/components/molecules/itinerary-card";
import { fetchItineraries, fetchSuggestedPlaces } from "@/lib/data/itineraries";
import ThingsTodo from "@/components/molecules/things-todo";

export default async function ItineraryDashboard() {
  const { userId } = await auth();
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

      <Suspense fallback={<ItineraryListSkeleton />}>
        <ItinerarySection userId={userId} />
      </Suspense>

      <Suspense fallback={<SuggestionSection />}>
        <ThingsTodo />
      </Suspense>
    </Layout>
  );
}

async function SuggestionSection({ userId }: { userId: string }) {
  const suggestedPlaces = await fetchSuggestedPlaces(userId);
  return <Suggestion places={suggestedPlaces} />;
}

async function ItinerarySection({ userId }: { userId: string }) {
  const itineraries = await fetchItineraries(userId);

  if (itineraries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itineraries.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/preferences/create">
          <Button className="gap-2">
            <PlusCircleIcon size={18} />
            Create New Plan
          </Button>
        </Link>
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
