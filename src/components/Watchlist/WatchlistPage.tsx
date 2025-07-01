import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAuthStore } from '../../store/authStore';
import { useContentStore } from '../../store/contentStore';
import ContentCard from '../ContentCard';

const WatchlistPage: React.FC = () => {
  const { activeProfile } = useAuthStore();
  const { allContent } = useContentStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const watchlistContent = activeProfile?.watchlist
    .map(id => allContent.find(content => content.id === id))
    .filter(Boolean) || [];

  useEffect(() => {
    if (containerRef.current && watchlistContent.length > 0) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [watchlistContent]);

  return (
    <div className="min-h-screen bg-black pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          My Watchlist
        </h1>

        {watchlistContent.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-400 mb-4">Your watchlist is empty</h2>
            <p className="text-gray-500">Add movies and TV shows to watch them later</p>
          </div>
        ) : (
          <div 
            ref={containerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {watchlistContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;