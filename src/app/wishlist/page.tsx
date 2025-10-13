'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import Link from 'next/link';

export default function WishlistPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { addItem } = useCart();
  const { state, removeItem: removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading wishlist...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please sign in</h2>
            <p className="text-muted-foreground mb-4">
              You need to be signed in to view your wishlist
            </p>
            <Button onClick={() => router.push('/auth/signin')}>
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
                My Wishlist
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding products you love to your wishlist
            </p>
            <Link href="/products">
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {state.items.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-square bg-gray-800 flex items-center justify-center">
                      <img
                        src={item.product.images?.[0] || '/images/products/placeholder.svg'}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-3 sm:p-4 hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromWishlist(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {item.product.status === 'active' && item.product.quantity === 0 && (
                      <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-3 sm:p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Added {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg font-bold">
                      {formatPrice(parseFloat(item.product.price))}
                    </span>
                    {item.product.comparePrice && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        {formatPrice(parseFloat(item.product.comparePrice))}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      className="flex-1"
                      size="sm"
                      disabled={item.product.quantity === 0}
                      onClick={() => addItem({
                        id: item.product.id,
                        name: item.product.name,
                        price: parseFloat(item.product.price),
                        image: item.product.images?.[0] || '/images/products/placeholder.svg',
                        sku: item.product.id
                      })}
                    >
                      <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {item.product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    
                    <Link href={`/products/${item.product.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
