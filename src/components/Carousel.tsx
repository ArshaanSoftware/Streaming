import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContentCard from './ContentCard';
import { Content } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
  title: string;
  content: Content[];
}

const Carousel: React.FC<CarouselProps> = ({ title, content }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (titleRef.current && carouselRef.current) {
      gsap.fromTo(
        titleRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        carouselRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      gsap.to(scrollContainerRef.current, {
        scrollLeft: targetScroll,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: updateScrollButtons
      });
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative mb-12">
      <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-8">
        {title}
      </h2>
      
      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div ref={carouselRef} className="flex space-x-4">
            {content.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;