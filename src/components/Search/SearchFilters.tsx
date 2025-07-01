import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { useContentStore } from '../../store/contentStore';

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const genres = [
  'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'History'
];

const ratings = ['G', 'PG', 'PG-13', 'R', 'TV-14', 'TV-MA'];
const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

const SearchFilters: React.FC<SearchFiltersProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { searchFilters, setSearchFilters } = useContentStore();

  useEffect(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleFilterChange = (key: string, value: any) => {
    setSearchFilters({
      ...searchFilters,
      [key]: value
    });
  };

  const handleGenreToggle = (genre: string) => {
    const currentGenres = searchFilters.genre || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    handleFilterChange('genre', newGenres);
  };

  const clearFilters = () => {
    setSearchFilters({});
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute top-12 left-0 right-0 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Filters</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilterChange('type', undefined)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !searchFilters.type 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('type', 'movie')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                searchFilters.type === 'movie' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => handleFilterChange('type', 'series')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                searchFilters.type === 'series' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genres
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  searchFilters.genre?.includes(genre)
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating
            </label>
            <select
              value={searchFilters.rating || ''}
              onChange={(e) => handleFilterChange('rating', e.target.value || undefined)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Ratings</option>
              {ratings.map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year
            </label>
            <select
              value={searchFilters.year || ''}
              onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-700">
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;