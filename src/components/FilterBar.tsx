
import React from 'react';
import { Genre } from '../types/movie';

interface FilterBarProps {
  genres: Genre[];
  onFilterChange: (filters: {
    genre: string;
    year: string;
    sortBy: 'popularity' | 'release_date' | 'vote_average';
  }) => void;
  selectedGenre: string;
  selectedYear: string;
  sortBy: 'popularity' | 'release_date' | 'vote_average';
}

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  onFilterChange,
  selectedGenre,
  selectedYear,
  sortBy
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      genre: selectedGenre,
      year: selectedYear,
      sortBy,
      [key]: value
    };
    onFilterChange(newFilters as any);
  };

  const clearFilters = () => {
    onFilterChange({
      genre: '',
      year: '',
      sortBy: 'popularity'
    });
  };

  const hasActiveFilters = selectedGenre || selectedYear || sortBy !== 'popularity';

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Genre Filter */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-red-500 text-sm"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-red-500 text-sm"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-red-500 text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="release_date">Release Date</option>
              <option value="vote_average">Rating</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
