"use client";

import { useEffect, useState } from "react";
import PlaceCard from "@/components/PlaceCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  // ✅ Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFavorites(parsed);
    }
  }, []);

  // ✅ Fetch place details
  useEffect(() => {
    async function loadFavorites() {
      try {
        if (favorites.length === 0) {
          setPlaces([]);
          setLoading(false);
          return;
        }

        const results = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(
              `${BASE_URL}/google/details?placeId=${id}`
            );
            const data = await res.json();
            return data.result;
          })
        );

        setPlaces(results.filter(Boolean));
      } catch (err) {
        console.error("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  // ❌ Remove favorite (FIXED)
  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav !== id);

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    // 🔥 IMPORTANT: also update UI instantly
    setPlaces((prev) =>
      prev.filter((place) => place.place_id !== id)
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        ❤️ Your Favorites
      </h1>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ✅ FIXED EMPTY CONDITION */}
      {!loading && places.length === 0 && (
        <p className="text-gray-500">
          No favorite places yet. Start exploring!
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place: any, index: number) => {
          const photoRef = place.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? `${BASE_URL}/google/photo?ref=${photoRef}`
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

          return (
            <div key={place.place_id || index} className="relative">

              <PlaceCard
                place={place}
                imageUrl={imageUrl}
                isFav={true}
                toggleFavorite={removeFavorite}
              />

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFavorite(place.place_id)}
                className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}