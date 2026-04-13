export default function FavoriteButton({ isFav, toggle }: any) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      className="absolute top-2 left-2 bg-white p-2 rounded-full shadow"
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}