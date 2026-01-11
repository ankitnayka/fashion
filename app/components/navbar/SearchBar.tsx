export default function SearchBar() {
  return (
    <div className="hidden md:flex flex-1 justify-center px-6">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full max-w-md rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
