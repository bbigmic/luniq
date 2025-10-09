import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and technology',
    icon: <Smartphone className="h-12 w-12" />,
    productCount: 150,
    color: 'bg-blue-500/10 text-blue-600',
    href: '/products?category=electronics'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    icon: <Shirt className="h-12 w-12" />,
    productCount: 200,
    color: 'bg-pink-500/10 text-pink-600',
    href: '/products?category=fashion'
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Everything for your home',
    icon: <Home className="h-12 w-12" />,
    productCount: 120,
    color: 'bg-green-500/10 text-green-600',
    href: '/products?category=home-garden'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Fitness and outdoor gear',
    icon: <Dumbbell className="h-12 w-12" />,
    productCount: 80,
    color: 'bg-orange-500/10 text-orange-600',
    href: '/products?category=sports'
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Knowledge and entertainment',
    icon: <Book className="h-12 w-12" />,
    productCount: 300,
    color: 'bg-purple-500/10 text-purple-600',
    href: '/products?category=books'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Health and beauty products',
    icon: <Sparkles className="h-12 w-12" />,
    productCount: 90,
    color: 'bg-rose-500/10 text-rose-600',
    href: '/products?category=beauty'
  }
];

export function CategoriesGrid() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Browse All Categories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse range of product categories and find what you need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${category.color}`}>
                    {category.icon}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} products
                  </span>
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Shop Now
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

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
    </div>
  );
}
