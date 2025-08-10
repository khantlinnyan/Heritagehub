import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { Calendar, List } from "lucide-react";

interface ItineraryHeaderProps {
  title: string;
  duration: number;
  isEditing: boolean;
  onCustomize: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ItineraryHeader({
  title,
  duration,
  isEditing,
  onCustomize,
  onSave,
  onCancel,
}: ItineraryHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h1 className="text-3xl font-bold text-typography-950 mb-2">
            {title}
          </h1>
        </div>
        <UserButton />
      </div>
      <div className="flex justify-between items-center mb-4">
        <Badge variant="secondary" className="gap-2">
          <Calendar size={16} />
          {duration} Day
          {duration > 1 ? "s" : ""}
        </Badge>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save Itinerary</Button>
          </div>
        ) : (
          <Button onClick={onCustomize}>
            <List className="mr-2 h-4 w-4" />
            Customize
          </Button>
        )}
      </div>
      <Separator className="my-4" />
    </>
  );
}
