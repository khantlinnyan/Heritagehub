"use server";

import axios from "axios";
import { ItineraryItem } from "@/lib/types";

export async function fetchItinerary(id: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/plan/${id}`);
    if (!response.ok) throw new Error("Failed to fetch itinerary");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function saveItinerary(id: string, items: ItineraryItem[]) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v1/plan/${id}`,
      { items }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error saving itinerary:", error);
    return { success: false, error: "Failed to save itinerary" };
  }
}
