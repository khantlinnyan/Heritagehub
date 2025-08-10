import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import CldImg from "../atoms/cld-img";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// Assuming you have an API endpoint to fetch all places
async function fetchAllPlaces() {
  const response = await fetch(`${base_url}/place`);
  if (!response.ok) throw new Error("Failed to fetch places");
  return response.json();
}

export function SearchPlaceDialog({ open, onOpenChange, onPlaceSelect }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allPlaces, isLoading } = useQuery({
    queryKey: ["all-places"],
    queryFn: fetchAllPlaces,
  });

  const filteredPlaces = allPlaces?.data.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (place: any) => {
    const newItem = {
      ...place,
      time: "", // Default time
      notes: "",
    };
    onPlaceSelect(newItem);
    setSearchTerm("");
    onOpenChange(false);
  };
  console.log("filteredPlaces", filteredPlaces);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Add a Place</DialogTitle>
          <DialogDescription>
            Search for a place and add it to your itinerary.
          </DialogDescription>
        </DialogHeader>
        <div className="flex border py-2 px-4 rounded-full border-gray-200 focus:border-gray-400 relative items-center space-x-2">
          <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search for a place..."
            value={searchTerm}
            className="border-none ring-0 focus:ring-0 focus:border-none focus:outline-none ml-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div>Loading places...</div>
          ) : (
            <div className="flex flex-col gap-y-10">
              {filteredPlaces?.map((place) => (
                <Button
                  variant="ghost"
                  key={place.id}
                  className="flex items-center w-full justify-start"
                  onClick={() => handleSelect(place)}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden mr-1 bg-gray-200">
                    <CldImg
                      width={60}
                      height={60}
                      src={place.photoUrl}
                      alt={place.name}
                      crop="fill"
                      gravity="auto"
                      quality={40}
                    />
                  </div>
                  {place.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
