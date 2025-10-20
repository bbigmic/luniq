import { Suspense } from 'react';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Newsletter } from '@/components/home/newsletter';
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
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Loading...</div></div>}>
          <FeaturedProducts />
        </Suspense>
        {/* Categories removed per request */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
