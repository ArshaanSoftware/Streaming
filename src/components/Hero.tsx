import React, { useEffect, useRef } from 'react';
import { Play, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { Content } from '../types';

interface HeroProps {
  content: Content;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && contentRef.current && buttonRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        heroRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      )
      .fromTo(
        contentRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
      .fromTo(
        buttonRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
        '-=0.5'
      );
    }
  }, [content]);

  return (
    <div
      ref={heroRef}
      className="relative h-screen flex items-center justify-start overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.backdrop})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <div ref={contentRef} className="relative z-10 max-w-2xl px-4 md:px-8 ml-0 md:ml-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-xl">
          {content.description}
        </p>
        
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-green-400 font-semibold">{content.rating}</span>
          <span className="text-gray-300">{content.year}</span>
          <span className="text-gray-300">{content.duration}</span>
        </div>

        <div className="flex items-center space-x-2 mb-8">
          {content.genre.map((g, index) => (
            <span key={index} className="text-gray-300 text-sm">
              {g}{index < content.genre.length - 1 && ' • '}
            </span>
          ))}
        </div>

        <div ref={buttonRef} className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
            <Play size={20} fill="currentColor" />
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition-all duration-200 transform hover:scale-105">
            <Info size={20} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;