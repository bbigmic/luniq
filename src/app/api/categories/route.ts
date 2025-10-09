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

    // Fetch categories with product counts
    const categoriesData = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        productCount: sql<number>`COUNT(${products.id})`,
      })
      .from(categories)
      .leftJoin(products, and(
        eq(products.categoryId, categories.id),
        eq(products.status, 'active')
      ))
      .groupBy(categories.id, categories.name, categories.slug, categories.description)
      .orderBy(categories.name);

    return NextResponse.json({ 
      categories: categoriesData,
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
