'use client';

import { Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingInstagram() {
  const [scrollY, setScrollY] = useState(0);
  const [animatedY, setAnimatedY] = useState(0);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const animate = () => {
      setAnimatedY(prev => {
        const diff = scrollY - prev;
        return prev + diff * 0.15; // Czynnik opóźnienia - efekt "gonienia"
      });
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollY]);

  return (
    <a
      href="https://www.instagram.com/luniqvape/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-6 z-50 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 group"
      style={{
        top: `${96 + animatedY * 1}px`,
        transition: 'top 0.6s ease-out',
      }}
      aria-label="Odwiedź nas na Instagramie"
    >
      <Instagram className="h-6 w-6 text-white" />
    </a>
  );
}

