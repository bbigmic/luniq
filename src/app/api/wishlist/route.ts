import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { wishlist, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET user's wishlist
export async function GET(request: NextRequest) {
  try {
    console.log('Wishlist GET request received');
    const session = await getServerSession(authOptions);
    console.log('Session data:', { 
      hasSession: !!session, 
      userId: session?.user?.id, 
      userEmail: session?.user?.email 
    });
    
    if (!session?.user?.id) {
      console.log('Authentication failed - no session or user ID');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userWishlist = await db
      .select({
        id: wishlist.id,
        productId: wishlist.productId,
        createdAt: wishlist.createdAt,
        product: {
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          comparePrice: products.comparePrice,
          images: products.images,
          status: products.status,
          quantity: products.quantity,
        }
      })
      .from(wishlist)
      .leftJoin(products, eq(wishlist.productId, products.id))
      .where(eq(wishlist.userId, session.user.id))
      .orderBy(wishlist.createdAt);

    return NextResponse.json({
      wishlist: userWishlist,
    });

  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

// POST add item to wishlist
export async function POST(request: NextRequest) {
  try {
    console.log('Wishlist POST request received');
    const session = await getServerSession(authOptions);
    console.log('Session data:', { 
      hasSession: !!session, 
      userId: session?.user?.id, 
      userEmail: session?.user?.email 
    });
    
    if (!session?.user?.id) {
      console.log('Authentication failed - no session or user ID');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if item is already in wishlist
    const existingItem = await db
      .select()
      .from(wishlist)
      .where(
        and(
          eq(wishlist.userId, session.user.id),
          eq(wishlist.productId, productId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      return NextResponse.json(
        { error: 'Item already in wishlist' },
        { status: 409 }
      );
    }

    // Add to wishlist
    const newWishlistItem = await db
      .insert(wishlist)
      .values({
        userId: session.user.id,
        productId: productId,
      })
      .returning();

    return NextResponse.json({
      message: 'Item added to wishlist',
      item: newWishlistItem[0],
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

// DELETE remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    console.log('Wishlist DELETE request received');
    const session = await getServerSession(authOptions);
    console.log('Session data:', { 
      hasSession: !!session, 
      userId: session?.user?.id, 
      userEmail: session?.user?.email 
    });
    
    if (!session?.user?.id) {
      console.log('Authentication failed - no session or user ID');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Remove from wishlist
    const deletedItem = await db
      .delete(wishlist)
      .where(
        and(
          eq(wishlist.userId, session.user.id),
          eq(wishlist.productId, productId)
        )
      )
      .returning();

    if (deletedItem.length === 0) {
      return NextResponse.json(
        { error: 'Item not found in wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Item removed from wishlist',
    });

  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
