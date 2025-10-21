'use client';

import { Suspense } from 'react';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Newsletter } from '@/components/home/newsletter';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Force dynamic rendering to avoid static generation issues with cart context
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Ładowanie...</div></div>}>
          <FeaturedProducts />
        </Suspense>
        {/* Features Section */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px] -mt-2 sm:-mt-4">
          {/* Static Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/image-luniq-liquids.avif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 90%',
              height: '100%',
              width: '100%'
            }}
          ></div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            <div className="w-full">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                  Dlaczego wybrać LuniQ Vape?
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4">
                  Doświadcz najwyższej jakości z naszymi zaufanymi usługami
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Truck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl text-white">Darmowa Dostawa</p>
                    <p className="text-sm sm:text-base md:text-lg text-white/80">Od zamówień powyżej 200zł</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl text-white">Bezpieczne Płatności</p>
                    <p className="text-sm sm:text-base md:text-lg text-white/80">100% zabezpieczone</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 group">
                  <div className="p-3 sm:p-4 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex-shrink-0 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                    <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl text-white">Łatwe Zwroty</p>
                    <p className="text-sm sm:text-base md:text-lg text-white/80">30-dniowa polityka</p>
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
