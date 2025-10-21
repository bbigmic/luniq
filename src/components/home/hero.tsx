import Link from 'next/link';
// Image import not needed since we use <picture>/<img>
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Use the AVIF as a background image with animation */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat animate-pulse"
          style={{
            backgroundImage: 'url(/video/WhatsAppVideo2025-10-20at08.23.02-ezgif.com-video-to-avif-converter.avif)'
          }}
        ></div>
        
        {/* Animated gradient overlay for dynamic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-gradient"></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Luniq Vape
              <span className="text-primary block">Kultowy z natury</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto">
              Smak, który wyznacza standardy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
