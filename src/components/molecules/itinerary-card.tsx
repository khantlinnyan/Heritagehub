import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ItineraryCardProps {
  itinerary: {
    id: string;
    title: string;
    duration: number;
    createdAt: string;
    items: Array<{ name: string }>;
  };
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const randomItems = itinerary.items
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <h3 className="font-semibold text-lg">{itinerary.title}</h3>
        <p className="text-sm text-gray-500">
          {itinerary.duration} day{itinerary.duration > 1 ? "s" : ""} •{" "}
          {randomItems.map((item) => item.name).join(", ")}...
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Created: {new Date(itinerary.createdAt).toLocaleDateString()}
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
  );
}
