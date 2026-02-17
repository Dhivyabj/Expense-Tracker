const SearchBar = ({ query, setQuery }) => (
  <input
    type="text"
    placeholder="Search transactions..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full p-3 mb-6 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
  />
);

export default SearchBar;