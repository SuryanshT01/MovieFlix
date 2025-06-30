
import React from 'react';
import { Video } from '../types/movie';

interface TrailerPlayerProps {
  video: Video;
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({ video }) => {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        title={video.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default TrailerPlayer;
