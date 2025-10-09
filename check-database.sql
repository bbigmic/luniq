-- Check database state and fix category product counts

-- Check if categories exist
SELECT id, name, slug FROM categories ORDER BY name;

-- Check if products exist and their categories
SELECT 
    p.id, 
    p.name, 
    p.status, 
    c.name as category_name, 
    c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY c.name, p.name;

-- Check product counts by category
SELECT 
    c.name as category_name,
    c.slug as category_slug,
    COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
GROUP BY c.id, c.name, c.slug
ORDER BY c.name;
