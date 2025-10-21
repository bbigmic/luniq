import Link from 'next/link';
// Image import not needed since we use <picture>/<img>
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Use the AVIF as a background image with smooth animation */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat hero-background"
          style={{
            backgroundImage: 'url(/video/WhatsAppVideo2025-10-20at08.23.02-ezgif.com-video-to-avif-converter.avif)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
        
        {/* Smooth gradient overlay for dynamic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white">
              Luniq Vape
              <span className="text-primary block">Kultowy z natury</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto px-4">
              Smak, który wyznacza standardy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-sm sm:text-base px-6 py-3">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black text-sm sm:text-base px-6 py-3">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
