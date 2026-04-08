"use client";

import { useEffect, useState } from "react";

export default function PlaceDetails({ params }: any) {
  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // ✅ FIX: unwrap params (Next.js 16)
        const resolvedParams = await params;
        const placeId = resolvedParams?.id;

        if (!placeId) {
          console.error("❌ Place ID is undefined");
          setLoading(false);
          return;
        }

        const BASE_URL =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "http://localhost:8080";

        const res = await fetch(
          `${BASE_URL}/google/details?placeId=${placeId}`
        );

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("❌ Invalid JSON:", text);
          setLoading(false);
          return;
        }

        setPlace(data?.result || null);
      } catch (err) {
        console.error("❌ Error loading place:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params]);

  // 🔄 LOADING UI
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading place details...
      </div>
    );
  }

  // ❌ NO DATA
  if (!place) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load place details
      </div>
    );
  }

  // 🖼️ IMAGE
  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8080";

  const photoRef = place.photos?.[0]?.photo_reference;

  const imageUrl = photoRef
    ? `${BASE_URL}/google/photo?ref=${photoRef}`
    : "https://picsum.photos/800/400";

  // 🗺️ MAP NAVIGATION
  const lat = place.geometry?.location?.lat;
  const lng = place.geometry?.location?.lng;

  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : "#";

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={place.name}
        className="w-full h-80 object-cover rounded-xl mb-6 shadow-md"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold">{place.name}</h1>

      {/* RATING */}
      <p className="text-lg mt-2">
        ⭐ {place.rating || "N/A"}{" "}
        <span className="text-gray-500">
          ({place.user_ratings_total || 0} reviews)
        </span>
      </p>

      {/* ADDRESS */}
      <p className="text-gray-600 mt-2">
        📍 {place.formatted_address}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-700">
        {place.editorial_summary?.overview ||
          "No description available for this place."}
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          🚀 Navigate
        </a>

        <button
          onClick={() => alert("Saved to favorites (next feature 🚀)")}
          className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          ❤️ Save
        </button>
      </div>

      {/* EXTRA IMAGES (OPTIONAL) */}
      {place.photos?.length > 1 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {place.photos.slice(1, 5).map((photo: any, index: number) => (
            <img
              key={index}
              src={`${BASE_URL}/google/photo?ref=${photo.photo_reference}`}
              alt="place"
              className="rounded-lg h-32 w-full object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}