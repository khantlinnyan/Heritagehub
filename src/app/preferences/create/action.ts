"use server";

import axios from "axios";
import { Preferences } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const base_url = process.env.BASE_URL;
export async function generateItinerary(preferences: Preferences) {
  try {
    const { userId } = await auth();
    const response = await axios.post(
      `http://localhost:8080/api/v1/plan/recommend`,
      {
        preferences,
        userId,
      }
    );
    console.log(preferences);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return { success: false, error: "Failed to generate itinerary" };
  }
}
