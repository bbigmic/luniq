'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock data - replace with actual data fetching
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    comparePrice: 399.99,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    comparePrice: null,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 89,
    badge: 'New',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Wireless Charging Pad',
    price: 49.99,
    comparePrice: 69.99,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 203,
    badge: 'Sale',
    category: 'Electronics',
    inStock: false,
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    price: 79.99,
    comparePrice: null,
    image: '/api/placeholder/300/300',
    rating: 4.5,
    reviews: 156,
    badge: null,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 149.99,
    comparePrice: 199.99,
    image: '/api/placeholder/300/300',
    rating: 4.9,
    reviews: 78,
    badge: 'Best Seller',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '6',
    name: '4K Ultra HD Monitor',
    price: 399.99,
    comparePrice: 499.99,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 92,
    badge: 'Sale',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '7',
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    comparePrice: null,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 134,
    badge: null,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '8',
    name: 'Noise Cancelling Earbuds',
    price: 179.99,
    comparePrice: 229.99,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 167,
    badge: 'New',
    category: 'Electronics',
    inStock: true,
  },
];

export function ProductGrid() {
  const [sortBy, setSortBy] = useState('featured');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {products.length} products
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-input bg-background rounded-md text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-24 h-24 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Product Image</p>
                  </div>
                </div>
                
                {product.badge && (
                  <Badge 
                    variant={product.badge === 'Sale' ? 'destructive' : 'default'}
                    className="absolute top-2 left-2"
                  >
                    {product.badge}
                  </Badge>
                )}
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>
              
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                {product.comparePrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{product.category}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                size="sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  );
}
