'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

const categoryIcons: Record<string, string> = {
  electronics: '📱',
  fashion: '👕',
  'home-garden': '🏠',
  sports: '⚽',
  books: '📚',
  beauty: '💄',
  automotive: '🚗',
  health: '🏥',
  toys: '🧸',
  jewelry: '💍',
};

const categoryColors: Record<string, string> = {
  electronics: 'from-blue-500/20 to-purple-500/20',
  fashion: 'from-pink-500/20 to-rose-500/20',
  'home-garden': 'from-green-500/20 to-emerald-500/20',
  sports: 'from-orange-500/20 to-red-500/20',
  books: 'from-yellow-500/20 to-amber-500/20',
  beauty: 'from-purple-500/20 to-pink-500/20',
  automotive: 'from-gray-500/20 to-slate-500/20',
  health: 'from-red-500/20 to-pink-500/20',
  toys: 'from-yellow-500/20 to-orange-500/20',
  jewelry: 'from-amber-500/20 to-yellow-500/20',
};

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      // Show only first 6 categories on home page
      setCategories(data.categories.slice(0, 6));
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading categories...</span>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 sm:p-6">
                  <div className={`w-full h-24 sm:h-32 rounded-lg bg-gradient-to-br ${categoryColors[category.slug] || 'from-gray-500/20 to-slate-500/20'} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-3xl sm:text-4xl">{categoryIcons[category.slug] || '📦'}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {category.productCount} products
                      </span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories">
            <Button variant="outline" size="lg">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}