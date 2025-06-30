
import React from 'react';
import { Cast } from '../types/movie';

interface CastListProps {
  cast: Cast[];
}

const CastList: React.FC<CastListProps> = ({ cast }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cast.map((actor) => (
        <div key={actor.id} className="text-center group">
          <div className="relative overflow-hidden rounded-lg bg-gray-800 mb-3">
            <div className="aspect-[3/4]">
              <img
                src={actor.profile_path 
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : '/placeholder.svg'
                }
                alt={actor.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {actor.name}
          </h4>
          <p className="text-gray-400 text-xs line-clamp-2">
            {actor.character}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
