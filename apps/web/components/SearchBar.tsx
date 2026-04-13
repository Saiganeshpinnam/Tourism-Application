export default function SearchBar({ search, setSearch }: any) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search tourist places..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 pl-12 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-4 top-4 text-gray-400">
        🔍
      </span>
    </div>
  );
}