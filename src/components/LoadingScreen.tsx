import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && logoRef.current && progressRef.current) {
      const tl = gsap.timeline();

      // Logo animation
      tl.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
      );

      // Progress bar animation
      tl.fromTo(
        progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 2, ease: 'power2.out' },
        '-=0.5'
      );

      // Fade out
      tl.to(
        containerRef.current,
        { 
          opacity: 0, 
          duration: 0.5, 
          ease: 'power2.out',
          onComplete: onComplete
        },
        '+=0.5'
      );
    }
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    >
      <div ref={logoRef} className="text-red-600 font-bold text-6xl mb-8">
        StreamFlix
      </div>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-red-600 rounded-full"
          style={{ width: '0%' }}
        />
      </div>
      
      <p className="text-white text-sm mt-4 opacity-60">Loading your experience...</p>
    </div>
  );
};

export default LoadingScreen;