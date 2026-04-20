"use client";

import { use, useEffect, useState } from "react";

// 🏨 DUMMY HOTELS (SAME LIKE MOBILE)
const dummyHotels = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    image:
      "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776665716/177666553255048815_z7calr.jpg",
    rating: 4.5,
    price: "₹2500/night",
    phone: "919876543210",
  },
  {
    id: "2",
    name: "City View Residency",
    image:
      "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776665905/17766658360112816d_spc880.jpg",
    rating: 4.2,
    price: "₹1800/night",
    phone: "919876543211",
  },
  {
    id: "3",
    name: "Royal Stay Inn",
    image:
      "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776666073/17766660201311293c_cujae9.jpg",
    rating: 4.6,
    price: "₹3200/night",
    phone: "919876543212",
  },
  {
    id: "4",
    name: "Budget Comfort Hotel",
    image:
      "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776666187/1776666166610318db_csdcat.jpg",
    rating: 4.0,
    price: "₹1200/night",
    phone: "919876543213",
  },
];

export default function PlaceDetails({ params }: any) {
  const resolvedParams = use(params);

  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8080";

  useEffect(() => {
    async function load() {
      try {
        const placeId = resolvedParams?.id;

        const res = await fetch(
          `${BASE_URL}/google/details?placeId=${placeId}`
        );

        const data = await res.json();

        setPlace(data?.result || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [resolvedParams]);

  // 🚀 NAVIGATION
  const handleNavigate = () => {
    const lat = place.geometry?.location?.lat;
    const lng = place.geometry?.location?.lng;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${lat},${lng}`;
        window.open(mapsUrl, "_blank");
      },
      () => {
        const fallback = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(fallback, "_blank");
      }
    );
  };

  // ❤️ SAVE
  const handleSave = () => {
    const saved = localStorage.getItem("favorites");
    let fav = saved ? JSON.parse(saved) : [];

    if (!fav.includes(place.place_id)) {
      fav.push(place.place_id);
      localStorage.setItem("favorites", JSON.stringify(fav));
      alert("Saved ❤️");
    }
  };

  // 📞 CALL
  const callHotel = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // 💬 WHATSAPP
  const openWhatsApp = (phone: string, name: string) => {
    const msg = `Hi, I found ${name} on Tourism App. I want to book a room.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  if (loading)
    return <div className="p-6 text-center">Loading...</div>;

  if (!place)
    return <div className="p-6 text-center">Error loading</div>;

  const photoRef = place.photos?.[0]?.photo_reference;

  const imageUrl = photoRef
    ? `${BASE_URL}/google/photo?ref=${photoRef}`
    : "https://picsum.photos/800/400";

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* IMAGE */}
      <img
        src={imageUrl}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold">{place.name}</h1>

      <p className="mt-2">
        ⭐ {place.rating || "N/A"}
      </p>

      <p className="text-gray-600 mt-2">
        📍 {place.formatted_address}
      </p>

      <p className="mt-4">
        {place.editorial_summary?.overview ||
          "No description available"}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleNavigate}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          🚀 Navigate
        </button>

        <button
          onClick={handleSave}
          className="bg-gray-200 px-6 py-3 rounded-lg"
        >
          ❤️ Save
        </button>
      </div>

      {/* 🏨 HOTELS SECTION */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        🏨 Nearby Hotels
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {dummyHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={hotel.image}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{hotel.name}</h3>

              <p className="text-sm text-gray-500">
                ⭐ {hotel.rating}
              </p>

              <p className="text-blue-600 font-medium mt-1">
                {hotel.price}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3">
                
                {/* WHATSAPP */}
                <button
                  onClick={() =>
                    openWhatsApp(hotel.phone, hotel.name)
                  }
                  className="flex-1 bg-green-500 text-white py-2 rounded"
                >
                  WhatsApp
                </button>

                {/* CALL */}
                <button
                  onClick={() => callHotel(hotel.phone)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded"
                >
                  Call
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}