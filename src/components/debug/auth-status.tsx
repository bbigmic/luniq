'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 bg-yellow-50 border-yellow-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Auth Debug (Dev Only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Status:</span>
          <Badge variant={status === 'authenticated' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
        
        {session && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs">User ID:</span>
              <span className="text-xs font-mono">{session.user?.id || 'No ID'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Email:</span>
              <span className="text-xs">{session.user?.email || 'No Email'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Name:</span>
              <span className="text-xs">{session.user?.name || 'No Name'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Role:</span>
              <span className="text-xs">{session.user?.role || 'No Role'}</span>
            </div>
          </>
        )}
        
        {!session && status === 'unauthenticated' && (
          <div className="text-xs text-red-600">
            User not authenticated
          </div>
        )}
      </CardContent>
    </Card>
  );
}
