"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Activity {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
}

const ThingsTodo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const activities: Activity[] = [
    {
      id: "1",
      title: "Walking Tour in Downtown",
      location: "Yangon",
      rating: 5.0,
      reviewCount: 21,
      price: "from $35 per adult",
      imageUrl: "https://i.imgur.com/91dP3bX.jpeg",
    },
    {
      id: "2",
      title: "Yangon Full Day City Tour",
      location: "Yangon",
      rating: 4.9,
      reviewCount: 14,
      price: "from $100 per adult",
      imageUrl: "https://i.imgur.com/91dP3bX.jpeg",
    },
    {
      id: "3",
      title: "Private Bago Full-Day Tour",
      location: "Yangon",
      rating: 5.0,
      reviewCount: 4,
      price: "from $90 per adult",
      imageUrl: "https://i.imgur.com/91dP3bX.jpeg",
    },
    {
      id: "4",
      title: "Yangon morning food tour with train ride",
      location: "Yangon",
      rating: 4.3,
      reviewCount: 11,
      price: "from $45 per adult",
      imageUrl: "https://i.imgur.com/91dP3bX.jpeg",
    },
  ];

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isDragging]);

  return (
    <section className="space-y-2">
      <div className="px-4">
        <h2 className="text-xl font-semibold">
          Explore experiences near Yangon (Rangoon)
        </h2>
        <p className="text-sm text-gray-500">Can't-miss picks near you</p>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto overflow-y-hidden h-[400px] pb-4 px-4 gap-4 select-none scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex-shrink-0 w-[280px] rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-[180px]">
                <Image
                  src={activity.imageUrl}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <svg width="24" height="24" fill="green" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-medium text-lg line-clamp-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600">{activity.location}</p>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {activity.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ● {activity.reviewCount}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-900">
                  {activity.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThingsTodo;
