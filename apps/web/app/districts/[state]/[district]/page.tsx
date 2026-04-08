"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { searchGooglePlaces } from "@/services/api";

export default function DistrictPage({ params }: any) {
  // ✅ FIX: unwrap params
  const resolvedParams = use(params);

  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    async function load() {
      try {
        const districtName = resolvedParams?.district;
        const stateName = resolvedParams?.state;

        if (!districtName || !stateName) {
          console.error("Invalid params");
          return;
        }

        const decodedDistrict = decodeURIComponent(districtName);
        const decodedState = decodeURIComponent(stateName);

        setDistrict(decodedDistrict);
        setState(decodedState);

        let data = await searchGooglePlaces(
          `${decodedDistrict} ${decodedState} tourist attractions India`
        );

        if (!data?.results?.length) {
          data = await searchGooglePlaces(
            `${decodedState} famous tourist places`
          );
        }

        setPlaces(data?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [resolvedParams]);

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {district}, {state}
      </h1>

      <input
        type="text"
        placeholder="🔍 Search places..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p>Loading...</p>}

      {!loading && filteredPlaces.length === 0 && (
        <p className="text-gray-500">No places found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place: any, index: number) => {
          const photoRef = place.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? `${BASE_URL}/google/photo?ref=${photoRef}`
            : "https://picsum.photos/400/300";

          return (
            <Link
              key={place.place_id || index}
              href={`/places/${place.place_id}`}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
                <img
                  src={imageUrl}
                  alt={place.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg">
                    {place.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    ⭐ {place.rating || "N/A"}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {place.formatted_address}
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