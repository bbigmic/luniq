'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  X,
  Heart,
  Package
} from 'lucide-react';

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/images/luniq-logo-new.png" 
              alt="Luniq Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
            />
            <span className="text-xl sm:text-2xl font-bold">LuniQ Vape</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Szukaj produktów..."
                className="pl-10 pr-4 text-base h-12"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link href="/products" className="text-base font-medium hover:text-primary transition-colors">
              Produkty
            </Link>
            {/* Categories link removed */}
            {session && (
              <Link href="/orders" className="text-base font-medium hover:text-primary transition-colors">
                Zamówienia
              </Link>
            )}
            <Link href="/about" className="text-base font-medium hover:text-primary transition-colors">
              O nas
            </Link>
            <Link href="/contact" className="text-base font-medium hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Search - Mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-10 w-10 sm:h-12 sm:w-12"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 relative">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                {wishlistState.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">
                    {wishlistState.totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 sm:h-12 sm:w-12">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu - Desktop */}
            {session ? (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="hidden lg:flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <User className="h-5 w-5" />
                  </Button>
                  <span className="text-sm font-medium">{session.user.name}</span>
                  {session.user.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                        Admin
                      </Button>
                    </Link>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="h-10 px-3 text-sm"
                >
                  Wyloguj
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="h-10 px-3 text-sm">
                    Zaloguj
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="h-10 px-3 text-sm">
                    Rejestracja
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 sm:h-12 sm:w-12"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Szukaj produktów..."
                className="pl-10 pr-4 text-base h-12"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 mb-2 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg shadow-sm">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-base font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produkty
              </Link>
              {/* Categories link removed */}
              {session && (
                <Link 
                  href="/orders" 
                  className="text-base font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Zamówienia
                </Link>
              )}
              <Link 
                href="/about" 
                className="text-base font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                O nas
              </Link>
              <Link 
                href="/contact" 
                className="text-base font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
              {session && (
                <Link 
                  href="/wishlist" 
                  className="text-base font-medium hover:text-primary transition-colors flex items-center space-x-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>Lista życzeń {wishlistState.totalItems > 0 && `(${wishlistState.totalItems})`}</span>
                </Link>
              )}
              
              {/* Mobile User Actions */}
              {session ? (
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">{session.user.name}</span>
                    </div>
                    {session.user.role === 'admin' && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                          Admin
                        </Button>
                      </Link>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full h-10 text-sm"
                  >
                    Wyloguj
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full h-10 text-sm">
                      Zaloguj
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full h-10 text-sm">
                      Rejestracja
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
