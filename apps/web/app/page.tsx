"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStates, searchGooglePlaces } from "@/services/api";
import GlobalSearch from "@/components/GlobalSearch";
import NearbyPlaces from "@/components/NearbyPlaces";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  const [states, setStates] = useState<string[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  // ✅ Load states
  useEffect(() => {
    async function load() {
      const data = await getStates();
      setStates(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  // 🔥 Load trending places
  useEffect(() => {
    async function loadTrending() {
      const data = await searchGooglePlaces(
        "top tourist attractions in India"
      );
      setTrending(data?.results?.slice(0, 6) || []);
    }
    loadTrending();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* 🎥 HERO */}
      <HeroVideo />

      <NearbyPlaces />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Explore India 🇮🇳
        </h1>

        <Link href="/favorites">
          <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
            ❤️ Favorites
          </button>
        </Link>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-10">
        <GlobalSearch />
      </div>

     
      {/* 🌍 STATES SECTION */}
      <h2 className="text-2xl font-semibold mb-4">
        🌍 Explore by State
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {states.map((state) => (
          <Link key={state} href={`/states/${state}`}>
            <div className="p-5 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl hover:shadow-lg hover:scale-105 transition cursor-pointer text-center font-medium">
              {state}
            </div>
          </Link>
        ))}
      </div>

       {/* 🔥 TRENDING SECTION */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">
        🔥 Trending Places
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {trending.map((place: any, index: number) => {
          const photoRef = place.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? `${BASE_URL}/google/photo?ref=${photoRef}`
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

          return (
            <Link
              key={place.place_id || index}
              href={`/places/${place.place_id}`}
            >
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">

                <img
                  src={imageUrl}
                  className="h-48 w-full object-cover group-hover:scale-105 transition"
                />

                <div className="p-4 bg-white">
                  <h3 className="font-semibold">
                    {place.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ⭐ {place.rating || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}