'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartItems() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-3 sm:space-y-4">
        {state.items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">SKU: {item.sku}</p>
                  <p className="text-primary font-medium text-sm sm:text-base">{formatPrice(item.price)}</p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end space-x-2">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-12 sm:w-16 text-center text-xs sm:text-sm"
                      min="1"
                    />
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right ml-2">
                    <p className="font-semibold text-sm sm:text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4">
          <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
            Clear Cart
          </Button>
          <Link href="/products" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-3 sm:space-y-4">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Items ({state.totalItems})</span>
              <span>{formatPrice(state.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Tax</span>
              <span>{formatPrice(state.totalPrice * 0.08)}</span>
            </div>
            <div className="border-t pt-3 sm:pt-4">
              <div className="flex justify-between font-semibold text-base sm:text-lg">
                <span>Total</span>
                <span>{formatPrice(state.totalPrice * 1.08)}</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full" size="sm">
                Proceed to Checkout
              </Button>
            </Link>
            
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Secure checkout powered by Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
