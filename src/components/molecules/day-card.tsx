import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Droppable } from "@hello-pangea/dnd";
import ItineraryItem from "./itinerary-item";
import React from "react";

interface DayCardProps {
  day: any;
  dayIndex: number;
  isEditing: boolean;
  onDeleteItem: (dayIndex: number, itemIndex: number) => void;
  onOpenSearch: (dayIndex: number) => void;
}

export default function DayCard({
  day,
  dayIndex,
  isEditing,
  onDeleteItem,
  onOpenSearch,
}: DayCardProps) {
  const CardContentWrapper = isEditing ? Droppable : React.Fragment;
  const contentProps = isEditing ? { droppableId: `day-${dayIndex}` } : {};

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-2 px-0">
        <div className="flex w-full min-w-full justify-between items-center">
          <h2 className="text-lg text-start font-semibold uppercase tracking-wider text-gray-500">
            DAY {day.day}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sun className="text-yellow-400" size={16} />
            <span>Sunny, 24°C</span>
          </div>
        </div>
      </CardHeader>
      <CardContentWrapper {...contentProps}>
        {(provided) => (
          <CardContent
            className="p-0"
            ref={isEditing ? provided.innerRef : undefined}
          >
            {day.items.map((item: any, itemIndex: number) => (
              <ItineraryItem
                key={item.id}
                item={item}
                itemIndex={itemIndex}
                isEditing={isEditing}
                onDelete={() => onDeleteItem(dayIndex, itemIndex)}
              />
            ))}
            {isEditing && (
              <div ref={provided.innerRef}>{provided.placeholder}</div>
            )}
          </CardContent>
        )}
      </CardContentWrapper>

      {isEditing && (
        <CardFooter className="pt-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onOpenSearch(dayIndex)}
          >
            <Plus size={16} /> Add Place to Day {day.day}
          </Button>
        </CardFooter>
      )}
      <Separator className="mt-4" />
    </Card>
  );
}
