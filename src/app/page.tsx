'use client';

import { Suspense, useEffect } from 'react';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Newsletter } from '@/components/home/newsletter';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Force dynamic rendering to avoid static generation issues with cart context
export const dynamic = 'force-dynamic';

export default function HomePage() {
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Disable parallax on mobile for better performance
          if (window.innerWidth <= 768) return;
          
          const parallaxElement = document.getElementById('parallax-bg');
          if (!parallaxElement) {
            console.log('Parallax element not found');
            ticking = false;
            return;
          }
          
          const scrolled = window.pageYOffset;
          const speed = 0.3; // Slower speed for more noticeable effect
          const yPos = -(scrolled * speed);
          
          console.log('Scrolling:', scrolled, 'Y Position:', yPos);
          parallaxElement.style.transform = `translateY(${yPos}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Loading...</div></div>}>
          <FeaturedProducts />
        </Suspense>
        {/* Features Section with Parallax Background */}
        <section className="relative py-40 sm:py-48 overflow-hidden min-h-[800px]">
          {/* Parallax Background */}
          <div 
            id="parallax-bg"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
            style={{
              backgroundImage: 'url(/images/luniq-display-case.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
              transform: 'translateY(0px)',
              minHeight: '100%',
              top: '0%'
            }}
          ></div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-primary/20 backdrop-blur-sm rounded-xl flex-shrink-0 border border-primary/30">
                  <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <p className="font-semibold text-base sm:text-lg text-white">Free Shipping</p>
                <p className="text-sm sm:text-base text-white/80">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-primary/20 backdrop-blur-sm rounded-xl flex-shrink-0 border border-primary/30">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <p className="font-semibold text-base sm:text-lg text-white">Secure Payment</p>
                <p className="text-sm sm:text-base text-white/80">100% protected</p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-primary/20 backdrop-blur-sm rounded-xl flex-shrink-0 border border-primary/30">
                  <RotateCcw className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <p className="font-semibold text-base sm:text-lg text-white">Easy Returns</p>
                <p className="text-sm sm:text-base text-white/80">30-day policy</p>
              </div>
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
