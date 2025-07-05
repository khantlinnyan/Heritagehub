import TripCard from "../atoms/trip-card";

export default function TripList() {
  return (
    <div>
      <div className="overflow-x-scroll w-3xl">
        <div className="flex w-full gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <TripCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
