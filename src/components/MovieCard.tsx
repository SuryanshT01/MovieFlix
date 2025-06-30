
import React from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <div className="aspect-[2/3] relative">
          <img
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder.svg'
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
          
          {/* Hover Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </p>
            <p className="text-gray-400 text-xs line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile-friendly title below card */}
      <div className="md:hidden mt-2 px-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
