-- Comprehensive diagnostic script for all categories and products

-- Check all categories
SELECT 
    'CATEGORIES' as section,
    id, 
    name, 
    slug,
    description
FROM categories 
ORDER BY name;

-- Check product counts by category (should match expected counts)
SELECT 
    'PRODUCT_COUNTS' as section,
    c.name as category_name,
    c.slug as category_slug,
    COUNT(p.id) as actual_product_count,
    CASE 
        WHEN c.slug = 'electronics' THEN 12
        WHEN c.slug = 'fashion' THEN 5
        WHEN c.slug = 'home-garden' THEN 5
        WHEN c.slug = 'sports' THEN 5
        WHEN c.slug = 'books' THEN 5
        WHEN c.slug = 'beauty' THEN 5
        WHEN c.slug = 'automotive' THEN 3
        WHEN c.slug = 'health' THEN 3
        WHEN c.slug = 'toys' THEN 3
        WHEN c.slug = 'jewelry' THEN 3
        ELSE 0
    END as expected_product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
GROUP BY c.id, c.name, c.slug
ORDER BY c.name;

-- Check all products with their categories
SELECT 
    'PRODUCTS_WITH_CATEGORIES' as section,
    p.id,
    p.name,
    p.slug,
    p.status,
    c.name as category_name,
    c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY c.name, p.name;

-- Summary of missing products by category
SELECT 
    'MISSING_PRODUCTS_SUMMARY' as section,
    c.name as category_name,
    c.slug as category_slug,
    CASE 
        WHEN c.slug = 'electronics' THEN 12
        WHEN c.slug = 'fashion' THEN 5
        WHEN c.slug = 'home-garden' THEN 5
        WHEN c.slug = 'sports' THEN 5
        WHEN c.slug = 'books' THEN 5
        WHEN c.slug = 'beauty' THEN 5
        WHEN c.slug = 'automotive' THEN 3
        WHEN c.slug = 'health' THEN 3
        WHEN c.slug = 'toys' THEN 3
        WHEN c.slug = 'jewelry' THEN 3
        ELSE 0
    END as expected_count,
    COUNT(p.id) as actual_count,
    CASE 
        WHEN c.slug = 'electronics' THEN 12
        WHEN c.slug = 'fashion' THEN 5
        WHEN c.slug = 'home-garden' THEN 5
        WHEN c.slug = 'sports' THEN 5
        WHEN c.slug = 'books' THEN 5
        WHEN c.slug = 'beauty' THEN 5
        WHEN c.slug = 'automotive' THEN 3
        WHEN c.slug = 'health' THEN 3
        WHEN c.slug = 'toys' THEN 3
        WHEN c.slug = 'jewelry' THEN 3
        ELSE 0
    END - COUNT(p.id) as missing_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
GROUP BY c.id, c.name, c.slug
ORDER BY missing_count DESC, c.name;
