"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStates } from "@/services/api";

export default function Home() {
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getStates();
        setStates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading states:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Explore India 🇮🇳
        </h1>

        {/* ❤️ FAVORITES BUTTON */}
        <Link href="/favorites">
          <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
            ❤️ Favorites
          </button>
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading states...</p>
      )}

      {/* EMPTY */}
      {!loading && states.length === 0 && (
        <p className="text-gray-500">
          No states found. Please try again.
        </p>
      )}

      {/* STATES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {states.map((state) => (
          <Link key={state} href={`/states/${state}`}>
            <div className="p-5 bg-blue-100 rounded-xl hover:bg-blue-200 hover:shadow-md transition cursor-pointer text-center font-medium">
              {state}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}