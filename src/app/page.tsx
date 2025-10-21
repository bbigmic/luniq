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
        <section className="relative py-24 sm:py-32 overflow-hidden min-h-[700px] -mt-4">
          {/* Parallax Background */}
          <div 
            id="parallax-bg"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
            style={{
              backgroundImage: 'url(/images/luniq-display-case.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 65%',
              transform: 'translateY(0px)',
              minHeight: '120%',
              top: '-10%'
            }}
          ></div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[700px]">
            <div className="w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  Why Choose LuniQ Vape?
                </h2>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                  Experience premium quality with our trusted services
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
                <div className="flex flex-col items-center space-y-4 group">
                  <div className="p-4 bg-primary/20 backdrop-blur-sm rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-lg sm:text-xl text-white">Free Shipping</p>
                    <p className="text-sm sm:text-base text-white/80">On orders over $50</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4 group">
                  <div className="p-4 bg-primary/20 backdrop-blur-sm rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-lg sm:text-xl text-white">Secure Payment</p>
                    <p className="text-sm sm:text-base text-white/80">100% protected</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4 group">
                  <div className="p-4 bg-primary/20 backdrop-blur-sm rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-lg sm:text-xl text-white">Easy Returns</p>
                    <p className="text-sm sm:text-base text-white/80">30-day policy</p>
                  </div>
                </div>
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
