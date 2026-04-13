"use client";

import { useEffect, useState } from "react";
import { searchGooglePlaces } from "@/services/api";
import PlaceCard from "./PlaceCard";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  // 🔥 Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const data = await searchGooglePlaces(
          `${query} tourist places India`
        );

        setResults(data?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="mb-10">

      {/* 🔍 INPUT */}
      <input
        type="text"
        placeholder="🔍 Search places across India..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-2xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 mt-3">Searching...</p>
      )}

      {/* RESULTS */}
      {query && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {results.map((place: any, index: number) => {
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
      )}

      {/* EMPTY */}
      {query && !loading && results.length === 0 && (
        <p className="text-gray-500 mt-3">No places found</p>
      )}
    </div>
  );
}