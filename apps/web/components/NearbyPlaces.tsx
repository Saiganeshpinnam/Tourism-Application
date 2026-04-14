"use client";

import { useEffect, useState } from "react";
import { getNearbyPlaces } from "@/services/api";
import PlaceCard from "./PlaceCard";

export default function NearbyPlaces() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const data = await getNearbyPlaces(lat, lng);
          setPlaces(data?.results || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="mb-12">

      <h2 className="text-2xl font-semibold mb-4">
        📍 Nearby Places
      </h2>

      {loading && <p>Getting your location...</p>}

      {!loading && places.length === 0 && (
        <p className="text-gray-500">No nearby places found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place: any, index: number) => {
          const photoRef = place.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? `${BASE_URL}/google/photo?ref=${photoRef}`
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

          return (
            <PlaceCard
              key={place.place_id || index}
              place={place}
              imageUrl={imageUrl}
              isFav={false}
              toggleFavorite={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}