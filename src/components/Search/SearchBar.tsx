import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { gsap } from 'gsap';
import { useContentStore } from '../../store/contentStore';
import SearchFilters from './SearchFilters';

interface SearchBarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isExpanded, onToggle }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { searchContent, clearSearch, searchQuery } = useContentStore();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
      gsap.fromTo(containerRef.current,
        { width: '40px' },
        { width: '300px', duration: 0.3, ease: 'power2.out' }
      );
    } else if (!isExpanded && containerRef.current) {
      gsap.to(containerRef.current, {
        width: '40px',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isExpanded]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      searchContent(searchQuery);
    } else {
      clearSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
    onToggle();
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="relative flex items-center bg-gray-800 rounded-full overflow-hidden"
        style={{ width: isExpanded ? '300px' : '40px' }}
      >
        <button
          onClick={onToggle}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <Search size={20} />
        </button>
        
        {isExpanded && (
          <>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2"
            />
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <Filter size={16} />
            </button>
            
            {query && (
              <button
                onClick={handleClear}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </>
        )}
      </div>

      {showFilters && isExpanded && (
        <SearchFilters 
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;