
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              🎬 MovieFlix
            </div>
          </Link>
          
          <form onSubmit={handleSubmit} className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search movies..."
                className="bg-gray-800/50 border border-gray-700 text-white px-4 py-2 pr-12 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 w-80"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
