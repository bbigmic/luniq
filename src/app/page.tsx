import { Suspense } from 'react';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Categories } from '@/components/home/categories';
import { Newsletter } from '@/components/home/newsletter';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedProducts />
        </Suspense>
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
