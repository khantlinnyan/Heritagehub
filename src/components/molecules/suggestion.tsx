"use client";

import Image from "next/image";
import { Card, CardFooter } from "../ui/card";
import { useRef, useState, useEffect } from "react";

interface Place {
  id: string;
  name: string;
  photoUrl: string;
  region?: string;
}

const Suggestion = ({ places }: { places: Place[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    <section className="space-y-4">
      <h2 className="text-xl font-semibold px-4">You should visit</h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto  pb-4 px-4 gap-4 scrollbar-hide select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {places.map((place) => (
            <Card
              key={place.id}
              className="flex-shrink-0 w-[280px] border-hidden h-[280px] relative rounded-lg overflow-hidden group"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={place.photoUrl}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <CardFooter className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="w-full">
                  <h3 className="font-medium text-lg line-clamp-1">
                    {place.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {place.region || "Myanmar"}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suggestion;
