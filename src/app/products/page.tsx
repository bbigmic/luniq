'use client';

import { Suspense, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    search: '',
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">All Products</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover our complete collection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </aside>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid filters={filters} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
