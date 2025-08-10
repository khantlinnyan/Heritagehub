interface Itinerary {
  id: string;
  title: string;
  duration: number;
  location: string;
  createdAt: string;
  items: Array<{ name: string }>;
}

export async function fetchItineraries(userId: string): Promise<Itinerary[]> {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
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
  return data.data || [];
}

export async function fetchPublicItineraries(
  userId: string
): Promise<Itinerary[]> {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${base_url}/plan/public`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    next: { tags: ["public-itineraries"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch public itineraries");
  }

  const data = await response.json();
  return data.data || [];
}

export async function deleteItinerary(id: string, userId: string) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${base_url}/plan/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    next: { tags: ["itineraries"] },
  });

  if (!response.ok) {
    throw new Error("Failed to delete itinerary");
  }

  const data = await response.json();
  return data.data || [];
}

export async function fetchSuggestedPlaces(userId: string) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${base_url}/plan/places`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    next: { tags: ["places"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = await response.json();
  return data.data || [];
}
