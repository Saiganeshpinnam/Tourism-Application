"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StatePage({ params }: any) {
  const [places, setPlaces] = useState<any[]>([]);
  const [stateName, setStateName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { state } = await params;
      setStateName(state);

      try {
        const res = await fetch(
          `http://127.0.0.1:8080/places/state/${state}`
        );

        const data = await res.json();

        setPlaces(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setPlaces([]);
      }
    }

    fetchData();
  }, [params]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {stateName} Tourist Places
      </h1>

      {places.length === 0 && (
        <p className="text-gray-500">No places found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(places) &&
          places.map((place) => (
            <Link key={place.id} href={`/places/${place.id}`}>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl cursor-pointer">
                <h2 className="text-lg font-semibold">{place.name}</h2>
                <p className="text-gray-600 text-sm">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}