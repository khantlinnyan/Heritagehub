export async function fetchDetailPlace(userId: string, id: string) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${base_url}/place/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    next: { tags: ["place", id] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch place");
  }

  const data = await response.json();
  return data.data || [];
}
