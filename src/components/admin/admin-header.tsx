'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, LogOut, User } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="bg-background border-b px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">Panel administracyjny</h1>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Zarządzaj swoją platformą e-commerce</p>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <div className="hidden sm:flex items-center space-x-2">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">Administrator</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-xs sm:text-sm">
            <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Wyloguj</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
