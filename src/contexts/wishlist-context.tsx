'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface WishlistItem {
  id: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    comparePrice: string | null;
    images: string[];
    status: string;
    quantity: number;
  };
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }
  | { type: 'CLEAR_WISHLIST' };

const WishlistContext = createContext<{
  state: WishlistState;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
} | null>(null);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  // Ensure state has proper structure
  const safeState = {
    items: state?.items || [],
    totalItems: state?.totalItems || 0,
  };

  switch (action.type) {
    case 'ADD_ITEM': {
      const newItems = [...safeState.items, action.payload];
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = safeState.items.filter(item => item.productId !== action.payload);
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }
    
    case 'LOAD_WISHLIST': {
      return {
        items: Array.isArray(action.payload) ? action.payload : [],
        totalItems: Array.isArray(action.payload) ? action.payload.length : 0,
      };
    }
    
    case 'CLEAR_WISHLIST':
      return {
        items: [],
        totalItems: 0,
      };
    
    default:
      return safeState;
  }
};

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { data: session } = useSession();

  // Load wishlist from API when user is authenticated
  useEffect(() => {
    if (session?.user?.id) {
      fetchWishlist();
    } else {
      // Clear wishlist when user logs out
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [session?.user?.id]);

  const fetchWishlist = async () => {
    try {
      console.log('Fetching wishlist for user:', { hasSession: !!session, userId: session?.user?.id });
      const response = await fetch('/api/wishlist');
      console.log('Wishlist fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist data received:', data);
        dispatch({ type: 'LOAD_WISHLIST', payload: data.wishlist || [] });
      } else {
        const error = await response.json();
        console.log('Wishlist fetch error:', error);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addItem = async (productId: string) => {
    console.log('Adding item to wishlist:', { productId, hasSession: !!session, userId: session?.user?.id });
    
    if (!session?.user?.id) {
      console.log('No session or user ID - showing sign in message');
      toast.error('Please sign in to add items to your wishlist');
      return;
    }

    try {
      console.log('Making wishlist POST request...');
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      console.log('Wishlist response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist add success:', data);
        dispatch({ type: 'ADD_ITEM', payload: data.item });
        toast.success('Added to wishlist!');
      } else {
        const error = await response.json();
        console.log('Wishlist add error:', error);
        if (response.status === 409) {
          toast.error('Item already in wishlist');
        } else if (response.status === 401) {
          toast.error('Please sign in to add items to your wishlist');
        } else {
          toast.error(error.error || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeItem = async (productId: string) => {
    console.log('Removing item from wishlist:', { productId, hasSession: !!session, userId: session?.user?.id });
    
    if (!session?.user?.id) {
      console.log('No session or user ID for remove operation');
      return;
    }

    try {
      console.log('Making wishlist DELETE request...');
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      console.log('Wishlist DELETE response status:', response.status);
      
      if (response.ok) {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
        toast.success('Removed from wishlist');
      } else {
        const error = await response.json();
        console.log('Wishlist remove error:', error);
        toast.error(error.error || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return state.items.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  // Ensure context state is always valid
  const safeState = {
    items: context.state?.items || [],
    totalItems: context.state?.totalItems || 0,
  };
  
  return {
    ...context,
    state: safeState,
  };
}
