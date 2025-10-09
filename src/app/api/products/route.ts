import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/db/schema';
import { eq, and, gte, lte, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'featured';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [eq(products.status, 'active')];

    if (category && category !== 'all') {
      const categoryData = await db.select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, category))
        .limit(1);
      
      if (categoryData.length > 0) {
        whereConditions.push(eq(products.categoryId, categoryData[0].id));
      }
    }

    if (minPrice) {
      whereConditions.push(gte(products.price, parseFloat(minPrice).toString()));
    }

    if (maxPrice) {
      whereConditions.push(lte(products.price, parseFloat(maxPrice).toString()));
    }

    if (inStock === 'true') {
      whereConditions.push(gte(products.quantity, 1));
    }

    if (search) {
      const searchConditions = [
        like(products.name, `%${search}%`),
        like(products.description, `%${search}%`),
        like(products.shortDescription, `%${search}%`)
      ].filter(Boolean);
      
      if (searchConditions.length > 0) {
        whereConditions.push(or(...searchConditions));
      }
    }

    // Build order by clause
    let orderBy;
    switch (sortBy) {
      case 'price-low':
        orderBy = products.price;
        break;
      case 'price-high':
        orderBy = products.price;
        break;
      case 'name':
        orderBy = products.name;
        break;
      case 'newest':
        orderBy = products.createdAt;
        break;
      case 'featured':
      default:
        orderBy = products.featured;
        break;
    }

    // Fetch products with category information
    const productsData = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        shortDescription: products.shortDescription,
        price: products.price,
        comparePrice: products.comparePrice,
        sku: products.sku,
        quantity: products.quantity,
        status: products.status,
        featured: products.featured,
        images: products.images,
        categoryName: categories.name,
        categorySlug: categories.slug,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...whereConditions))
      .orderBy(sortBy === 'price-high' ? orderBy : orderBy)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: products.id })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...whereConditions));

    // Get category counts for filters
    const categoryCounts = await db
      .select({
        categorySlug: categories.slug,
        categoryName: categories.name,
        count: products.id,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.status, 'active'));

    const categoryStats = categoryCounts.reduce((acc: any, item) => {
      if (item.categorySlug) {
        acc[item.categorySlug] = {
          name: item.categoryName,
          count: (acc[item.categorySlug]?.count || 0) + 1,
        };
      }
      return acc;
    }, {});

    return NextResponse.json({
      products: productsData,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        totalPages: Math.ceil(totalCount.length / limit),
      },
      filters: {
        categories: categoryStats,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
