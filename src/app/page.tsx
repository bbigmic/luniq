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
          const parallaxElement = document.getElementById('parallax-bg');
          if (!parallaxElement) {
            console.log('Parallax element not found');
            ticking = false;
            return;
          }
          
          const scrolled = window.pageYOffset;
          const isMobile = window.innerWidth <= 768;
          const speed = isMobile ? 0.1 : 0.3; // Slower on mobile, normal on desktop
          const yPos = -(scrolled * speed);
          
          console.log('Scrolling:', scrolled, 'Y Position:', yPos, 'Mobile:', isMobile);
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
      window.addEventListener('resize', handleScroll, { passive: true });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] -mt-2 sm:-mt-4">
          {/* Parallax Background */}
          <div 
            id="parallax-bg"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/luniq-display-case.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 90%',
              transform: 'translateY(0px)',
              height: '100%',
              width: '100%'
            }}
          ></div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
            <div className="w-full">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Why Choose LuniQ Vape?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
                  Experience premium quality with our trusted services
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Truck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-base sm:text-lg md:text-xl text-white">Free Shipping</p>
                    <p className="text-xs sm:text-sm md:text-base text-white/80">On orders over $50</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-base sm:text-lg md:text-xl text-white">Secure Payment</p>
                    <p className="text-xs sm:text-sm md:text-base text-white/80">100% protected</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-base sm:text-lg md:text-xl text-white">Easy Returns</p>
                    <p className="text-xs sm:text-sm md:text-base text-white/80">30-day policy</p>
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
