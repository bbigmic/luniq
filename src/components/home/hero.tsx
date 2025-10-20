import Link from 'next/link';
// Image import not needed since we use <picture>/<img>
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Luniq
                <span className="text-primary block">Kultowy z natury</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Smak, który wyznacza standardy
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Features moved to bottom of the page */}
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <picture>
                <source srcSet="/video/WhatsAppVideo2025-10-20at08.23.02-ezgif.com-video-to-avif-converter.avif" type="image/avif" />
                <img
                  src="/images/products/placeholder.svg"
                  alt="Featured visual"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
