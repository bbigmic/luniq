import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories, products } from '@/lib/db/schema';
import { eq, sql, and } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get total count of active products
    const totalProductsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(eq(products.status, 'active'));

    const totalProducts = totalProductsResult[0]?.count || 0;

    // First, let's get all categories
    const allCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
      })
      .from(categories)
      .orderBy(categories.name);

    // Then get product counts for each category using a separate query
    const categoriesWithCounts = await Promise.all(
      allCategories.map(async (category) => {
        const productCountResult = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(products)
          .where(
            and(
              eq(products.categoryId, category.id),
              eq(products.status, 'active')
            )
          );

        return {
          ...category,
          productCount: productCountResult[0]?.count || 0,
        };
      })
    );

    return NextResponse.json({ 
      categories: categoriesWithCounts,
      totalProducts 
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
