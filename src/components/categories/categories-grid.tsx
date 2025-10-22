'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Sparkles,
  ArrowRight,
  Loader2,
  Car,
  Heart,
  Gamepad2,
  Gem
} from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

const categoryIcons: Record<string, any> = {
  electronics: <Smartphone className="h-12 w-12" />,
  fashion: <Shirt className="h-12 w-12" />,
  'home-garden': <Home className="h-12 w-12" />,
  sports: <Dumbbell className="h-12 w-12" />,
  books: <Book className="h-12 w-12" />,
  beauty: <Sparkles className="h-12 w-12" />,
  automotive: <Car className="h-12 w-12" />,
  health: <Heart className="h-12 w-12" />,
  toys: <Gamepad2 className="h-12 w-12" />,
  jewelry: <Gem className="h-12 w-12" />,
};

const categoryColors: Record<string, string> = {
  electronics: 'bg-blue-500/10 text-blue-600',
  fashion: 'bg-pink-500/10 text-pink-600',
  'home-garden': 'bg-green-500/10 text-green-600',
  sports: 'bg-orange-500/10 text-orange-600',
  books: 'bg-purple-500/10 text-purple-600',
  beauty: 'bg-rose-500/10 text-rose-600',
  automotive: 'bg-gray-500/10 text-gray-600',
  health: 'bg-red-500/10 text-red-600',
  toys: 'bg-yellow-500/10 text-yellow-600',
  jewelry: 'bg-amber-500/10 text-amber-600',
};

export function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading categories...</span>
      </div>
    );
  }

  return (
    <div>
      <ScrollAnimation direction="fade" delay={0.2} duration={0.8}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse All Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of product categories and find what you need
          </p>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <ScrollAnimation 
            key={category.id} 
            direction="up" 
            delay={0.4 + (index * 0.1)} 
            duration={0.6} 
            distance={30}
          >
            <Link href={`/products?category=${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${categoryColors[category.slug] || 'bg-gray-500/10 text-gray-600'}`}>
                      {categoryIcons[category.slug] || <Smartphone className="h-12 w-12" />}
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {category.productCount} products
                    </Badge>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Shop Now
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </ScrollAnimation>
        ))}
      </div>

      <ScrollAnimation direction="up" delay={0.8} duration={0.6} distance={40}>
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
              <p className="text-muted-foreground mb-6">
                Browse all our products or use our search feature to find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    View All Products
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border border-input px-6 py-2 rounded-md hover:bg-muted transition-colors">
                    Contact Support
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollAnimation>
    </div>
  );
}