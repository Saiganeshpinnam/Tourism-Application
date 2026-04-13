import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function PlaceCard({
  place,
  imageUrl,
  isFav,
  toggleFavorite,
}: any) {
  return (
    <Link href={`/places/${place.place_id}`}>
      <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer">

        <div className="relative">
          <img
            src={imageUrl}
            alt={place.name}
            className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
          />

          <FavoriteButton
            isFav={isFav}
            toggle={() => toggleFavorite(place.place_id)}
          />

          <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            ⭐ {place.rating || "N/A"}
          </span>
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-lg line-clamp-1">
            {place.name}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {place.formatted_address}
          </p>
        </div>
      </div>
    </Link>
  );
}