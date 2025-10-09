import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock data - replace with actual data fetching
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    comparePrice: 399.99,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
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
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
