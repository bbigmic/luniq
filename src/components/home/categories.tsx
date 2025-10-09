import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    icon: '📱',
    count: 156,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing & accessories',
    icon: '👕',
    count: 89,
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything for your home',
    icon: '🏠',
    count: 234,
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: '4',
    name: 'Sports',
    description: 'Fitness and outdoor gear',
    icon: '⚽',
    count: 67,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: '5',
    name: 'Books',
    description: 'Knowledge and entertainment',
    icon: '📚',
    count: 123,
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    id: '6',
    name: 'Beauty',
    description: 'Health and beauty products',
    icon: '💄',
    count: 78,
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

export function Categories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} products
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
