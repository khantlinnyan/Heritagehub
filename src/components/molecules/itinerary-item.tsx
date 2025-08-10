import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, List, Trash2, ChevronRight } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

interface ItineraryItemProps {
  item: any;
  itemIndex: number;
  isEditing: boolean;
  onDelete: () => void;
}

export default function ItineraryItem({
  item,
  itemIndex,
  isEditing,
  onDelete,
}: ItineraryItemProps) {
  const router = useRouter();

  const commonContent = (
    <>
      <Image
        src={item.photoUrl}
        alt={item.name}
        width={64}
        height={64}
        quality={80}
        className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
          {isEditing ? (
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="text-red-500 h-4 w-4" />
            </Button>
          ) : (
            <ChevronRight className="text-gray-400" />
          )}
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{item.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates?.latitude},${item.coordinates?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.coordinates?.latitude.toFixed(2)}°N,{" "}
              {item.coordinates?.longitude.toFixed(2)}°E
            </a>
          </div>
        </div>
      </div>
    </>
  );

  if (isEditing) {
    return (
      <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="flex gap-4 py-4 hover:bg-gray-50 cursor-pointer"
          >
            <div {...provided.dragHandleProps} className="flex items-center">
              <List size={20} className="text-gray-400 cursor-grab" />
            </div>
            {commonContent}
          </div>
        )}
      </Draggable>
    );
  }

  return (
    <div
      key={item.id}
      className="flex gap-4 py-4 hover:bg-gray-50 cursor-pointer"
      onClick={() => router.push(`/place/${item.id}`)}
    >
      {commonContent}
    </div>
  );
}
