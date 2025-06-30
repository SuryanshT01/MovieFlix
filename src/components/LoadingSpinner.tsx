
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Loading movies...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
