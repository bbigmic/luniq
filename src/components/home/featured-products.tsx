'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  comparePrice: string | null;
  sku: string;
  quantity: number;
  status: string;
  featured: boolean;
  images: string[];
  categoryName: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export function FeaturedProducts() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Fetch only featured products
      const response = await fetch('/api/products?featured=true&limit=8');
      if (!response.ok) throw new Error('Failed to fetch featured products');
      
      const data = await response.json();
      setFeaturedProducts(data.products);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Fallback to getting first 8 products if no featured products
      try {
        const fallbackResponse = await fetch('/api/products?limit=8');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setFeaturedProducts(fallbackData.products);
        }
      } catch (fallbackError) {
        console.error('Error fetching fallback products:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading featured products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 bg-card border-border hover:border-primary/20">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img 
                      src={product.images?.[0] || '/images/products/placeholder.svg'} 
                      alt={product.name}
                      className="w-full h-full object-contain p-3 sm:p-4 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {product.featured && (
                    <Badge className="absolute top-1 sm:top-2 left-1 sm:left-2 text-xs">
                      Featured
                    </Badge>
                  )}

                  {product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price) && (
                    <Badge variant="destructive" className="absolute top-1 sm:top-2 right-1 sm:right-2 text-xs">
                      Sale
                    </Badge>
                  )}

                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-6 w-6 sm:h-8 sm:w-8 ${isInWishlist(product.id) ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Heart clicked for product:', product.id, 'isInWishlist:', isInWishlist(product.id));
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product.id);
                        }
                      }}
                    >
                      <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 space-y-2">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-bold">{formatPrice(parseFloat(product.price))}</span>
                  {product.comparePrice && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {formatPrice(parseFloat(product.comparePrice))}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs sm:text-sm text-muted-foreground ml-1">(4.8)</span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">{product.categoryName}</p>
              </CardContent>

              <CardFooter className="p-3 sm:p-4 pt-0">
                <Button
                  className="w-full"
                  size="sm"
                  disabled={product.quantity === 0}
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: product.images?.[0] || '/images/products/placeholder.svg',
                    sku: product.sku
                  })}
                >
                  <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">
                    {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}