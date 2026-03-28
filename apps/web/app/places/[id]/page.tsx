"use client";

import { useEffect, useState } from "react";

export default function PlacePage({ params }: any) {
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const { id } = await params;

      try {
        const res = await fetch(`http://127.0.0.1:8080/places/${id}`);

        if (!res.ok) {
          throw new Error("API error");
        }

        const data = await res.json();
        setPlace(data);

      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, [params]);

  if (!place) return <div>Loading...</div>;

  const navigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url);
  };

 return (
  <div className="p-6 max-w-2xl mx-auto">

    <img
      src="https://source.unsplash.com/600x400/?tourism"
      className="rounded-xl mb-4"
    />

    <h1 className="text-3xl font-bold mb-2">
      {place.name}
    </h1>

    <p className="text-gray-600 mb-4">
      {place.description}
    </p>

    <button
      onClick={navigate}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Start Navigation
    </button>

  </div>
);
}