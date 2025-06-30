
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import CastList from '../components/CastList';
import TrailerPlayer from '../components/TrailerPlayer';
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../api/tmdb';
import { MovieDetails as MovieDetailsType, Cast, Video } from '../types/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadMovieData(id);
    }
  }, [id]);

  const loadMovieData = async (movieId: string) => {
    try {
      setLoading(true);
      const [movieData, creditsData, videosData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieVideos(movieId)
      ]);
      
      setMovie(movieData);
      setCast(creditsData.cast.slice(0, 10)); // Show top 10 cast members
      setVideos(videosData.filter(video => video.type === 'Trailer' && video.site === 'YouTube'));
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar onSearch={() => {}} />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar onSearch={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">
            <p className="text-xl">{error || 'Movie not found'}</p>
            <Link 
              to="/"
              className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar onSearch={() => {}} />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 h-96 md:h-[500px]">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>
        )}
        
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder.svg'
                }
                alt={movie.title}
                className="w-64 md:w-80 rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 mt-8 md:mt-0">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-lg text-gray-300 italic mb-4">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="bg-yellow-600 text-black px-2 py-1 rounded font-bold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
                {movie.runtime && (
                  <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                )}
                <span className="text-gray-300">{movie.status}</span>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movie.budget > 0 && (
                  <div>
                    <span className="text-gray-400">Budget:</span>
                    <span className="text-white ml-2">{formatCurrency(movie.budget)}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-white ml-2">{formatCurrency(movie.revenue)}</span>
                  </div>
                )}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Production:</span>
                    <span className="text-white ml-2">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Trailer */}
        {videos.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
            <TrailerPlayer video={videos[0]} />
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <CastList cast={cast} />
          </section>
        )}

        {/* Production Info */}
        {movie.production_countries && movie.production_countries.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Production Information</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Countries</h4>
                  <p className="text-white">
                    {movie.production_countries.map(country => country.name).join(', ')}
                  </p>
                </div>
                {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Languages</h4>
                    <p className="text-white">
                      {movie.spoken_languages.map(lang => lang.english_name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
