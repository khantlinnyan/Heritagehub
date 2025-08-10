import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import DayCard from "@/components/molecules/day-card";

interface DayPlannerProps {
  itinerary: any;
  isEditing: boolean;
  setLocalItinerary: (itinerary: any) => void;
  onOpenSearch: (dayIndex: number) => void;
}

export default function DayPlanner({
  itinerary,
  isEditing,
  setLocalItinerary,
  onOpenSearch,
}: DayPlannerProps) {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const startDayIndex = parseInt(source.droppableId.replace("day-", ""));
    const finishDayIndex = parseInt(
      destination.droppableId.replace("day-", "")
    );

    const newItineraryDays = JSON.parse(JSON.stringify(itinerary.days));

    if (startDayIndex === finishDayIndex) {
      const day = newItineraryDays[startDayIndex];
      const [removed] = day.items.splice(source.index, 1);
      day.items.splice(destination.index, 0, removed);
    } else {
      const startDay = newItineraryDays[startDayIndex];
      const finishDay = newItineraryDays[finishDayIndex];
      const [removed] = startDay.items.splice(source.index, 1);
      finishDay.items.splice(destination.index, 0, removed);
    }
    setLocalItinerary({ ...itinerary, days: newItineraryDays });
  };

  const handleDeleteItem = (dayIndex: number, itemIndex: number) => {
    const newItineraryDays = JSON.parse(JSON.stringify(itinerary.days));
    newItineraryDays[dayIndex].items.splice(itemIndex, 1);
    setLocalItinerary({ ...itinerary, days: newItineraryDays });
  };

  //   if (isEditing) {
  //     return (
  //       <DragDropContext onDragEnd={onDragEnd}>
  //         <div className="space-y-6">
  //           {itinerary.days.map((day, dayIndex) => (
  //             <DayCard
  //               key={day.day}
  //               day={day}
  //               dayIndex={dayIndex}
  //               isEditing={isEditing}
  //               onDeleteItem={handleDeleteItem}
  //               onOpenSearch={onOpenSearch}
  //             />
  //           ))}
  //         </div>
  //       </DragDropContext>
  //     );
  //   }

  // View Mode
  return (
    <div className="space-y-6">
      {itinerary.days.map((day: any, dayIndex: number) => (
        <DayCard
          key={day.day}
          day={day}
          dayIndex={dayIndex}
          isEditing={isEditing}
          onDeleteItem={handleDeleteItem}
          onOpenSearch={onOpenSearch}
        />
      ))}
    </div>
  );
}
