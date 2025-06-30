
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="md:hidden mb-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 pr-20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="text-gray-400 hover:text-white p-1"
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
