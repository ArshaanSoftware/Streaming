import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useContentStore } from '../../store/contentStore';
import ContentCard from '../ContentCard';

const SearchResults: React.FC = () => {
  const { searchResults, searchQuery, isLoading } = useContentStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && searchResults.length > 0) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [searchResults]);

  if (!searchQuery) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 md:px-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-gray-400 mb-8">
          {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
        </p>

        {searchResults.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-400 mb-4">No results found</h2>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div 
            ref={containerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {searchResults.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;