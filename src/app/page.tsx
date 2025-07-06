import Layout from "@/components/layout";
import TripList from "@/components/molecules/trip-list";
import Header from "@/components/ui/header";
import { PlusCircleIcon, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

interface Itinerary {
  id: string;
  title: string;
  duration: number;
  location: string;
  createdAt: string;
}

export default async function ItineraryDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }

  let itineraries: Itinerary[] = [];
  let isLoading = false;
  let error = null;

  try {
    const response = await fetch(`${base_url}/plan/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      next: { tags: ["itineraries"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch itineraries");
    }

    const data = await response.json();
    console.log(data);

    itineraries = data.data || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load itineraries";
  }

  return (
    <Layout className="flex flex-col gap-6">
      <Header
        title="My Travel Plans"
        subtitle="Manage your upcoming adventures and create new ones"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : itineraries.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itineraries.map((itinerary) => (
              <Card
                key={itinerary.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <h3 className="font-semibold text-lg">{itinerary.title}</h3>
                  <p className="text-sm text-gray-500">
                    {itinerary.duration} day{itinerary.duration > 1 ? "s" : ""}{" "}
                    •{" "}
                    {
                      itinerary.items[
                        Math.floor(Math.random() * itinerary.items.length)
                      ].name
                    }
                    ,
                    {
                      itinerary.items[
                        Math.floor(Math.random() * itinerary.items.length)
                      ].name
                    }
                    ,...
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Created:{" "}
                    {new Date(itinerary.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/plan/${itinerary.id}`} className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      View Details <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
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
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col h-full w-full items-center justify-center py-12 text-center">
            <Link
              href="/preferences/create"
              className="mb-6 p-6 bg-gray-50 rounded-full"
            >
              <PlusCircleIcon size={80} className="text-gray-400" />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Plans Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Start planning your next adventure by creating a new itinerary
            </p>
            {/* <Link href="/preferences/create">
            <Button className="gap-2">
              <PlusCircleIcon size={18} />
              Create Your First Plan
            </Button>
          </Link> */}
          </div>
        </div>
      )}
    </Layout>
  );
}
