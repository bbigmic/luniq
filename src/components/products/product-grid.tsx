'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number | null;
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

interface ProductGridProps {
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
  };
}

export function ProductGrid({ filters = {} }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        ...(filters.inStock && { inStock: filters.inStock.toString() }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, sortBy, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-muted-foreground text-sm sm:text-base">
          Showing {pagination.total} products
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs sm:text-sm font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 sm:px-3 py-1 border border-input bg-background rounded-md text-xs sm:text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-gray-900 border-gray-700 hover:border-gray-600">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square bg-gray-800 flex items-center justify-center">
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

                  {product.comparePrice && product.comparePrice > product.price && (
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
                  <span className="text-base sm:text-lg font-bold">{formatPrice(product.price)}</span>
                  {product.comparePrice && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">{product.categoryName}</p>
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
              </CardContent>

              <CardFooter className="p-3 sm:p-4 pt-0">
                <Button
                  className="w-full"
                  size="sm"
                  disabled={product.quantity === 0}
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
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
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
