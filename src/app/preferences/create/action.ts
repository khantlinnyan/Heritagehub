"use server";

import axios from "axios";
import { Preferences } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export async function generateItinerary(preferences: Preferences) {
  try {
    const { userId } = await auth();
    const response = await axios.post(`${base_url}/plan/recommend`, {
      preferences,
      userId,
    });
    console.log(preferences);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return { success: false, error: "Failed to generate itinerary" };
  }
}
