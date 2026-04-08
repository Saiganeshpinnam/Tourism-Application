"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchGooglePlaces } from "@/services/api";

export default function DistrictPage({ params }: any) {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const resolvedParams = await params;

        const districtName = resolvedParams?.district;
        const stateName = resolvedParams?.state;

        if (!districtName || !stateName) {
          console.error("Invalid params");
          return;
        }

        setDistrict(districtName);
        setState(stateName);

        let data = await searchGooglePlaces(
          `${districtName} ${stateName} tourist attractions India`
        );

        if (!data?.results?.length) {
          data = await searchGooglePlaces(
            `${stateName} famous tourist places`
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
  }, [params]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8080";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {district}, {state}
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && places.length === 0 && (
        <p className="text-gray-500">No places found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place: any, index: number) => {
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