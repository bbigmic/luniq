'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Settings,
  Tag
} from 'lucide-react';

const navigation = [
  { name: 'Panel', href: '/admin', icon: LayoutDashboard },
  { name: 'Produkty', href: '/admin/products', icon: Package },
  { name: 'Kategorie', href: '/admin/categories', icon: Tag },
  { name: 'Zamówienia', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Użytkownicy', href: '/admin/users', icon: Users },
  { name: 'Analityka', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Ustawienia', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 bg-card border-r lg:min-h-0 min-h-screen">
      <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2 min-h-full">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
