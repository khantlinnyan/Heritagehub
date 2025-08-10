// src/components/maps/maplibre-map.tsx
"use client";

import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DynamicMap = ({
  coordinates,
  name,
}: {
  coordinates: number[];
  name: string;
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // The coordinates are in [longitude, latitude] format
    const [longitude, latitude] = coordinates;

    // Use a free, open-source style from a provider like Stadia Maps or Maptiler
    // This style is a good, clean option that doesn't require an API key.
    const mapStyle = {
      version: 8,
      sources: {
        "osm-tiles": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      },
      layers: [
        {
          id: "osm-layer",
          type: "raster",
          source: "osm-tiles",
        },
      ],
    };

    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [longitude, latitude],
      zoom: 13,
      minZoom: 0,
      maxZoom: 20,
    });

    // Add a marker to the map
    marker.current = new maplibregl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Add a simple popup to the marker
    const popup = new maplibregl.Popup({ offset: 25 }).setText(name);
    marker.current.setPopup(popup);

    // Cleanup function to prevent memory leaks
    return () => {
      map.current.remove();
      map.current = null;
    };
  }, [coordinates, name]);

  return <div ref={mapContainer} className="h-full w-full"></div>;
};

export default DynamicMap;
