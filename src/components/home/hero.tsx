import Link from 'next/link';
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
                Discover Amazing
                <span className="text-primary block">Products</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Shop the latest trends with our curated collection of premium products. 
                Quality guaranteed, delivered to your doorstep.
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
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 sm:p-6 lg:p-8">
              <div className="h-full w-full rounded-xl bg-muted flex items-center justify-center">
                <div className="text-center space-y-2 sm:space-y-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-primary" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">Featured Product Image</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-lg sm:text-xl lg:text-2xl">✨</span>
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-secondary/20 rounded-full flex items-center justify-center animate-pulse delay-1000">
              <span className="text-sm sm:text-base lg:text-xl">🎯</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
