"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { ProgressBar } from "@/components/atoms/progressbar";
import { Itinerary, ItineraryItem } from "@/lib/types";

async function fetchItinerary(id: string): Promise<Itinerary> {
  const response = await fetch(`http://localhost:8080/api/v1/plan/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch itinerary");
  }
  return response.json();
}

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  // const searchParams = useSearchParams();
  // const itineraryId = searchParams.get("itineraryId");

  // Fetch itinerary using TanStack Query
  const {
    data: itinerary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itinerary", params.id],
    queryFn: () => fetchItinerary(params.id),
    enabled: !!params.id,
    // onSuccess: (data) => {
    //   // Cache itinerary in localStorage for offline access
    //   localStorage.setItem('cachedItinerary', JSON.stringify(data));
    // },
  });

  // Load cached itinerary if offline
  // useEffect(() => {
  //   if (!itinerary && !isLoading && !error && typeof window !== 'undefined') {
  //     const cached = localStorage.getItem('cachedItinerary');
  //     if (cached) {
  //       // No need to set state since we're using TanStack Query
  //       console.log('Loaded cached itinerary');
  //     }
  //   }
  // }, [itinerary, isLoading, error]);

  // if (!params.id) {
  //   router.push("/preferences");
  //   return null;
  // }

  if (isLoading) {
    return <div className="text-typography-950">Loading...</div>;
  }

  if (error) {
    return <div className="text-error-500">Error: {error.message}</div>;
  }

  if (!itinerary) {
    router.push("/preferences/create");
    return null;
  }

  const handleEditPlan = () => {
    router.push(`/plan/${itinerary.id}`);
  };

  const handleItemClick = (placeId: string) => {
    router.push(`/plan/${itinerary.id}/item/${placeId}`);
  };
  console.log(itinerary);

  return (
    <div className="flex flex-col min-h-screen bg-background-50 p-4">
      <h1 className="text-2xl text-typography-950 mb-4">{itinerary.title}</h1>
      <ProgressBar progress={100} />
      <Card className="bg-secondary-200 mb-6">
        <CardHeader>
          <CardTitle className="text-typography-950">
            Itinerary Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-typography-950 mb-2">
            Duration: {itinerary.duration} Day
            {itinerary.duration > 1 ? "s" : ""}
          </p>
          <p className="text-typography-950 mb-4">
            Explore Bagan’s ancient wonders!
          </p>
          <div className="">
            {itinerary?.data.items.map((item: ItineraryItem) => (
              <Card
                key={item.placeId}
                className="bg-background-50 border-outline-500 cursor-pointer hover:bg-secondary-100"
                onClick={() => handleItemClick(item.placeId)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <ImageIcon className="text-primary-500 w-12 h-12" />
                    <div>
                      <h3 className="text-lg text-typography-950 font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-typography-700 text-sm">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="text-info-500 w-4 h-4" />
                        <span className="text-typography-950 text-sm">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="text-info-500 w-4 h-4" />
                        <span className="text-typography-950 text-sm">
                          {item.coordinates.latitude.toFixed(4)}°N,{" "}
                          {item.coordinates.longitude.toFixed(4)}°E
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 h-64 bg-secondary-200 rounded-md flex items-center justify-center">
            <p className="text-typography-950">
              Map Preview (Integrate Leaflet or similar API)
            </p>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={handleEditPlan}
        className="bg-primary-500 text-typography-white hover:bg-primary-600"
      >
        Edit Plan
      </Button>
    </div>
  );
}
