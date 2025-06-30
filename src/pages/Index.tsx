
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularMovies, getTrendingMovies, searchMovies, getGenres } from '../api/tmdb';
import { Movie, Genre } from '../types/movie';

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'trending' | 'popular' | 'search'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'release_date' | 'vote_average'>('popularity');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadMovies();
    }
  }, [currentView, selectedGenre, selectedYear, sortBy]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [moviesData, genresData] = await Promise.all([
        getTrendingMovies(),
        getGenres()
      ]);
      setMovies(moviesData);
      setGenres(genresData);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      let moviesData;
      
      if (currentView === 'trending') {
        moviesData = await getTrendingMovies();
      } else {
        moviesData = await getPopularMovies();
      }
      
      setMovies(applyFiltersAndSort(moviesData));
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      setCurrentView('trending');
      loadMovies();
      return;
    }

    try {
      setLoading(true);
      setSearchQuery(query);
      setCurrentView('search');
      const searchResults = await searchMovies(query);
      setMovies(applyFiltersAndSort(searchResults));
    } catch (err) {
      setError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = (movieList: Movie[]) => {
    let filtered = [...movieList];

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter(movie => 
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // Apply year filter
    if (selectedYear) {
      filtered = filtered.filter(movie => 
        movie.release_date && movie.release_date.startsWith(selectedYear)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'release_date':
          return new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime();
        case 'vote_average':
          return b.vote_average - a.vote_average;
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  };

  const handleFilterChange = (filters: {
    genre: string;
    year: string;
    sortBy: 'popularity' | 'release_date' | 'vote_average';
  }) => {
    setSelectedGenre(filters.genre);
    setSelectedYear(filters.year);
    setSortBy(filters.sortBy);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">
            <p className="text-xl">{error}</p>
            <button 
              onClick={loadInitialData}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            MovieFlix
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the latest movies, explore trending content, and find your next favorite film
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={handleSearch} />
          <FilterBar 
            genres={genres}
            onFilterChange={handleFilterChange}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            sortBy={sortBy}
          />
        </div>

        {/* View Toggle */}
        {!searchQuery && (
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 flex space-x-1">
              <button
                onClick={() => setCurrentView('trending')}
                className={`px-6 py-2 rounded-md transition-all ${
                  currentView === 'trending'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setCurrentView('popular')}
                className={`px-6 py-2 rounded-md transition-all ${
                  currentView === 'popular'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Popular
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             currentView === 'trending' ? 'Trending Movies' : 'Popular Movies'}
          </h2>
          <p className="text-gray-400 mt-1">{movies.length} movies found</p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">
              {searchQuery ? 'Try searching with different keywords' : 'No movies match your current filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
