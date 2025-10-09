import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get total products count
    const totalProducts = await db.select().from(products);
    
    // Get products by status
    const activeProducts = await db.select().from(products).where(eq(products.status, 'active'));
    
    // Get categories
    const allCategories = await db.select().from(categories);
    
    // Get product count by category
    const categoryCounts = await Promise.all(
      allCategories.map(async (category) => {
        const categoryProducts = await db.select().from(products).where(eq(products.categoryId, category.id));
        return {
          category: category.name,
          slug: category.slug,
          totalProducts: categoryProducts.length,
          activeProducts: categoryProducts.filter(p => p.status === 'active').length,
        };
      })
    );

    return NextResponse.json({
      debug: true,
      totalProducts: totalProducts.length,
      activeProducts: activeProducts.length,
      categories: allCategories.length,
      categoryCounts,
      sampleProducts: totalProducts.slice(0, 3).map(p => ({
        name: p.name,
        status: p.status,
        categoryId: p.categoryId,
      })),
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Debug failed', details: error },
      { status: 500 }
    );
  }
}
