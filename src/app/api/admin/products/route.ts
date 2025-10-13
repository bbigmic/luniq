import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET all products for admin with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Calculate offset
    const offset = (page - 1) * limit;

    // Get all products first (we'll filter client-side for simplicity)
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(products.createdAt);

    // Apply filters on the results (client-side)
    let filteredProducts = allProducts;
    
    // Apply search filter
    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter
    if (status && status !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.status === status
      );
    }

    // Get total count after filtering
    const totalCount = filteredProducts.length;

    // Apply pagination to filtered results
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received product creation request:', body);
    
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      comparePrice,
      costPrice,
      sku,
      barcode,
      quantity,
      lowStockThreshold,
      weight,
      categoryId,
      status,
      featured,
      metaTitle,
      metaDescription,
      tags,
      images,
    } = body;

    // Validate required fields
    if (!name || !slug || !description || !price || !sku || !quantity || !categoryId) {
      console.log('Missing required fields:', { name, slug, description, price, sku, quantity, categoryId });
      return NextResponse.json(
        { error: 'Missing required fields', details: { name: !!name, slug: !!slug, description: !!description, price: !!price, sku: !!sku, quantity: !!quantity, categoryId: !!categoryId } },
        { status: 400 }
      );
    }

    console.log('Creating product with data:', {
      name,
      slug,
      description,
      shortDescription: shortDescription || null,
      price: price.toString(),
      comparePrice: comparePrice ? comparePrice.toString() : null,
      costPrice: costPrice ? costPrice.toString() : null,
      sku,
      barcode: barcode || null,
      quantity,
      lowStockThreshold: lowStockThreshold || 5,
      weight: weight || null,
      dimensions: null,
      images: images || [],
      categoryId,
      status: status || 'active',
      featured: featured || false,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      tags: tags || [],
    });

    // Create the product
    const newProduct = await db
      .insert(products)
      .values({
        name,
        slug,
        description,
        shortDescription: shortDescription || null,
        price: price.toString(),
        comparePrice: comparePrice ? comparePrice.toString() : null,
        costPrice: costPrice ? costPrice.toString() : null,
        sku,
        barcode: barcode || null,
        quantity,
        lowStockThreshold: lowStockThreshold || 5,
        weight: weight || null,
        dimensions: null,
        images: images || [],
        categoryId,
        status: status || 'active',
        featured: featured || false,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        tags: tags || [],
      })
      .returning();

    console.log('Product created successfully:', newProduct[0]);
    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
