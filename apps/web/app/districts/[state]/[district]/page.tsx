"use client";

import { use, useEffect, useState } from "react";
import { searchGooglePlaces } from "@/services/api";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PlaceCard from "@/components/PlaceCard";

export default function DistrictPage({ params }: any) {
  const resolvedParams = use(params);

  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  // ✅ Load data
  useEffect(() => {
    async function load() {
      try {
        const districtName = resolvedParams?.district;
        const stateName = resolvedParams?.state;

        if (!districtName || !stateName) return;

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

  // ❤️ Load favorites
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // ❤️ Toggle favorite
  const toggleFavorite = (id: string) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 🔍 Filter
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <Header district={district} state={state} />

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* EMPTY */}
      {!loading && filteredPlaces.length === 0 && (
        <p className="text-gray-500">No places found</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place: any, index: number) => {
          const photoRef = place.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? `${BASE_URL}/google/photo?ref=${photoRef}`
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

          return (
            <PlaceCard
              key={place.place_id || index}
              place={place}
              imageUrl={imageUrl}
              isFav={favorites.includes(place.place_id)}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    </div>
  );
}