export default function Header({ district, state }: any) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold">
        Explore {district}
      </h1>
      <p className="text-gray-500 mt-1">
        Discover the best tourist places in {state}
      </p>
    </div>
  );
}