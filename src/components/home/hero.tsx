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
                <span className="text-primary block">Elevate Your Style</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Curated black-and-gold essentials inspired by modern luxury aesthetics. Discover the latest drops and timeless staples.
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

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Free Shipping</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Secure Payment</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">100% protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 sm:col-span-1 col-span-1 sm:col-start-auto">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Easy Returns</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">30-day policy</p>
                </div>
              </div>
            </div>
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
