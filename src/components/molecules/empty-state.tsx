import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
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
      </div>
    </div>
  );
}
