import React, { useRef, useState } from 'react';
import { Play, Plus, Check, ChevronDown, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { Content } from '../types';
import { useAuthStore } from '../store/authStore';
import VideoPlayer from './VideoPlayer/VideoPlayer';

interface ContentCardProps {
  content: Content;
  onHover?: (content: Content | null) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onHover }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const { activeProfile, addToWatchlist, removeFromWatchlist } = useAuthStore();
  
  const isInWatchlist = activeProfile?.watchlist.includes(content.id) || false;

  const handleMouseEnter = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    onHover?.(content);
  };

  const handleMouseLeave = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    onHover?.(null);
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(content.id);
    } else {
      addToWatchlist(content.id);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPlayer(true);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative flex-shrink-0 w-48 md:w-64 cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300"
            loading="lazy"
          />
          
          {content.watchProgress && content.watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-red-600"
                style={{ width: `${content.watchProgress * 100}%` }}
              />
            </div>
          )}

          {content.isNew && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}

          {content.isTrending && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              TRENDING
            </div>
          )}
          
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center transition-opacity duration-300"
          >
            <div className="flex space-x-2">
              <button 
                onClick={handlePlay}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <Play size={16} className="text-white" fill="currentColor" />
              </button>
              <button 
                onClick={handleWatchlistToggle}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                {isInWatchlist ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Plus size={16} className="text-white" />
                )}
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                <Info size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-16 left-0 right-0 p-3 bg-gray-900 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-xl">
          <h3 className="text-white font-semibold text-sm mb-1 truncate">{content.title}</h3>
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
            <span className="text-green-400">{content.rating}</span>
            <span>{content.year}</span>
            <span>{content.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {content.genre.slice(0, 2).map((genre, index) => (
              <span key={index} className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showPlayer && (
        <VideoPlayer 
          content={content} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
    </>
  );
};

export default ContentCard;