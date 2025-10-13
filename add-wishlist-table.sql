-- Migration: Add wishlist table
-- This script adds the wishlist table to an existing database

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, product_id)
);

-- Add some sample wishlist items for testing
INSERT INTO wishlist (user_id, product_id, created_at) VALUES
((SELECT id FROM users WHERE email = 'john@example.com'), (SELECT id FROM products WHERE sku = 'SFW-002'), NOW() - INTERVAL '2 days'),
((SELECT id FROM users WHERE email = 'john@example.com'), (SELECT id FROM products WHERE sku = 'WCP-003'), NOW() - INTERVAL '1 day'),
((SELECT id FROM users WHERE email = 'jane@example.com'), (SELECT id FROM products WHERE sku = 'PWH-001'), NOW() - INTERVAL '3 days'),
((SELECT id FROM users WHERE email = 'jane@example.com'), (SELECT id FROM products WHERE sku = 'BS-004'), NOW() - INTERVAL '1 day'),
((SELECT id FROM users WHERE email = 'bob@example.com'), (SELECT id FROM products WHERE sku = 'GN-047'), NOW() - INTERVAL '4 days')
ON CONFLICT (user_id, product_id) DO NOTHING;

-- Verify the table was created
SELECT 'Wishlist table created successfully' as status;
