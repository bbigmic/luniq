-- Insert ALL missing products for ALL categories
-- This script will insert products that don't already exist

-- ELECTRONICS Category (12 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.', 'Premium wireless headphones with noise cancellation', 299.99, 399.99, 'PWH-001', 50, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/headphones.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'premium-wireless-headphones');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Smart Fitness Watch', 'smart-fitness-watch', 'Advanced fitness tracking with heart rate monitoring, GPS, and water resistance. Track your workouts and health metrics.', 'Smart fitness watch with health tracking', 199.99, 249.99, 'SFW-002', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/watch.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-fitness-watch');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Wireless Charging Pad', 'wireless-charging-pad', 'Fast wireless charging for your devices. Compatible with all Qi-enabled smartphones and accessories.', 'Fast wireless charging pad', 49.99, 69.99, 'WCP-003', 30, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'wireless-charging-pad');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Bluetooth Speaker', 'bluetooth-speaker', 'Portable speaker with excellent sound quality and long battery life. Perfect for outdoor adventures and parties.', 'Portable Bluetooth speaker', 79.99, 99.99, 'BS-004', 15, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/speaker.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'bluetooth-speaker');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Gaming Laptop', 'gaming-laptop', 'High-performance gaming laptop with RTX graphics and fast SSD storage. Perfect for gaming and content creation.', 'High-performance gaming laptop', 1299.99, 1499.99, 'GL-005', 8, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/laptop.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'gaming-laptop');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Smartphone Pro', 'smartphone-pro', 'Latest smartphone with advanced camera system, 5G connectivity, and all-day battery life.', 'Latest smartphone with pro camera', 899.99, 999.99, 'SP-006', 20, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/phone.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smartphone-pro');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Digital Camera', 'digital-camera', 'Professional digital camera with 4K video recording and advanced autofocus system.', 'Professional digital camera', 599.99, 699.99, 'DC-007', 12, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/camera.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'digital-camera');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Tablet Pro', 'tablet-pro', 'High-resolution tablet with powerful processor and long battery life. Perfect for work and entertainment.', 'High-resolution tablet', 399.99, 499.99, 'TP-008', 18, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/tablet.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'tablet-pro');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Mechanical Keyboard', 'mechanical-keyboard', 'Premium mechanical keyboard with RGB lighting and tactile switches for the ultimate typing experience.', 'Premium mechanical keyboard', 149.99, 179.99, 'MK-009', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/keyboard.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'mechanical-keyboard');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Wireless Mouse', 'wireless-mouse', 'Ergonomic wireless mouse with precision tracking and long battery life.', 'Wireless ergonomic mouse', 59.99, 79.99, 'WM-010', 35, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'wireless-mouse');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Monitor 4K', 'monitor-4k', '27-inch 4K monitor with stunning clarity and color accuracy.', '4K Ultra HD Monitor', 399.99, 499.99, 'M4K-011', 15, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'monitor-4k');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Webcam HD', 'webcam-hd', 'High-definition webcam perfect for video calls and streaming.', 'HD Webcam', 89.99, 119.99, 'WH-012', 22, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'webcam-hd');

-- FASHION Category (5 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Classic Denim Jacket', 'classic-denim-jacket', 'Timeless denim jacket made from premium cotton. Perfect for casual wear.', 'Premium denim jacket', 89.99, 119.99, 'CDJ-013', 40, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', true, '["/images/products/denim-jacket.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'classic-denim-jacket');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Cotton T-Shirt', 'cotton-t-shirt', 'Soft cotton t-shirt available in multiple colors. Comfortable and stylish.', 'Premium cotton t-shirt', 24.99, 34.99, 'CTS-014', 100, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/tshirt.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'cotton-t-shirt');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Running Sneakers', 'running-sneakers', 'Comfortable running shoes with excellent cushioning and support.', 'Athletic running shoes', 129.99, 159.99, 'RS-015', 30, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/sneakers.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'running-sneakers');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Leather Handbag', 'leather-handbag', 'Elegant leather handbag perfect for everyday use.', 'Genuine leather handbag', 199.99, 249.99, 'LH-016', 20, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', true, '["/images/products/handbag.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'leather-handbag');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Winter Coat', 'winter-coat', 'Warm winter coat with water-resistant fabric and cozy lining.', 'Insulated winter coat', 149.99, 199.99, 'WC-017', 25, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/winter-coat.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'winter-coat');

-- HOME & GARDEN Category (5 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Smart Coffee Maker', 'smart-coffee-maker', 'WiFi-enabled coffee maker with app control and precise brewing.', 'Smart coffee maker', 199.99, 249.99, 'SCM-018', 15, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', true, '["/images/products/coffee-maker.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-coffee-maker');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Air Purifier', 'air-purifier', 'HEPA air purifier that removes 99.97% of airborne particles.', 'HEPA air purifier', 179.99, 229.99, 'AP-019', 20, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/air-purifier.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'air-purifier');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Garden Tools Set', 'garden-tools-set', 'Complete set of garden tools for all your gardening needs.', 'Professional garden tools', 79.99, 99.99, 'GTS-020', 35, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/garden-tools.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'garden-tools-set');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Smart Thermostat', 'smart-thermostat', 'WiFi smart thermostat that learns your schedule and saves energy.', 'Smart home thermostat', 129.99, 159.99, 'ST-021', 18, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/thermostat.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-thermostat');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Bed Sheets Set', 'bed-sheets-set', 'Luxury cotton bed sheets in various sizes and colors.', 'Premium cotton bed sheets', 69.99, 89.99, 'BSS-022', 50, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/bed-sheets.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'bed-sheets-set');

-- SPORTS Category (5 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Yoga Mat', 'yoga-mat', 'Non-slip yoga mat with excellent grip and cushioning.', 'Premium yoga mat', 39.99, 54.99, 'YM-023', 60, (SELECT id FROM categories WHERE slug = 'sports'), 'active', true, '["/images/products/yoga-mat.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'yoga-mat');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Dumbbell Set', 'dumbbell-set', 'Adjustable dumbbell set for home workouts.', 'Adjustable dumbbells', 149.99, 199.99, 'DS-024', 25, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/dumbbells.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'dumbbell-set');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Running Treadmill', 'running-treadmill', 'Foldable treadmill with incline and heart rate monitoring.', 'Home treadmill', 599.99, 799.99, 'RT-025', 8, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/treadmill.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'running-treadmill');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Basketball', 'basketball', 'Official size basketball with excellent grip and durability.', 'Professional basketball', 29.99, 39.99, 'BB-026', 45, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/basketball.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'basketball');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Swimming Goggles', 'swimming-goggles', 'Anti-fog swimming goggles with UV protection.', 'Competition swimming goggles', 24.99, 34.99, 'SG-027', 70, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/goggles.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'swimming-goggles');

-- BOOKS Category (5 products) - Already created in previous script
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Programming Guide', 'programming-guide', 'Complete guide to modern programming techniques and best practices.', 'Programming fundamentals', 49.99, 69.99, 'PG-028', 80, (SELECT id FROM categories WHERE slug = 'books'), 'active', true, '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'programming-guide');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Fiction Novel', 'fiction-novel', 'Bestselling fiction novel with compelling characters and plot.', 'Award-winning fiction', 16.99, 24.99, 'FN-029', 120, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'fiction-novel');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Cookbook', 'cookbook', 'Beautiful cookbook with recipes from around the world.', 'International cuisine cookbook', 34.99, 44.99, 'CB-030', 90, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'cookbook');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'History Book', 'history-book', 'Comprehensive history book covering major world events.', 'World history reference', 42.99, 59.99, 'HB-031', 65, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'history-book');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Self-Help Book', 'self-help-book', 'Motivational self-help book for personal development.', 'Personal growth guide', 19.99, 29.99, 'SHB-032', 110, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'self-help-book');

-- BEAUTY Category (5 products) - Already created in previous script
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Skincare Set', 'skincare-set', 'Complete skincare routine with cleanser, toner, and moisturizer.', 'Anti-aging skincare set', 89.99, 119.99, 'SS-033', 40, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', true, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'skincare-set');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Makeup Palette', 'makeup-palette', 'Professional makeup palette with 20 versatile colors.', 'Professional makeup set', 49.99, 69.99, 'MP-034', 55, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'makeup-palette');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Hair Dryer', 'hair-dryer', 'Professional hair dryer with ionic technology and multiple settings.', 'Ionic hair dryer', 79.99, 99.99, 'HD-035', 30, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'hair-dryer');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Perfume', 'perfume', 'Luxury perfume with long-lasting fragrance.', 'Premium fragrance', 129.99, 159.99, 'PF-036', 25, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'perfume');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Face Mask Set', 'face-mask-set', 'Hydrating face mask set for all skin types.', 'Hydrating face masks', 24.99, 34.99, 'FMS-037', 75, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'face-mask-set');

-- AUTOMOTIVE Category (3 products) - Already created in previous script
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Car Phone Mount', 'car-phone-mount', 'Magnetic phone mount for car dashboard with strong grip.', 'Dashboard phone holder', 19.99, 29.99, 'CPM-038', 100, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/car-mount.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-phone-mount');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Car Charger', 'car-charger', 'Fast charging car charger with multiple USB ports.', 'USB car charger', 24.99, 34.99, 'CC-039', 85, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/car-charger.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-charger');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Car Floor Mats', 'car-floor-mats', 'All-weather car floor mats with custom fit.', 'All-weather floor mats', 49.99, 69.99, 'CFM-040', 60, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/floor-mats.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-floor-mats');

-- HEALTH Category (3 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Blood Pressure Monitor', 'blood-pressure-monitor', 'Digital blood pressure monitor with large display.', 'Digital BP monitor', 59.99, 79.99, 'BPM-041', 45, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'blood-pressure-monitor');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Vitamin Supplements', 'vitamin-supplements', 'Daily multivitamin supplements for overall health.', 'Daily multivitamins', 29.99, 39.99, 'VS-042', 90, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'vitamin-supplements');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Massage Gun', 'massage-gun', 'Deep tissue massage gun for muscle recovery.', 'Therapeutic massage device', 89.99, 119.99, 'MG-043', 35, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'massage-gun');

-- TOYS Category (3 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Building Blocks Set', 'building-blocks-set', 'Creative building blocks set for endless fun.', 'Educational building blocks', 39.99, 54.99, 'BBS-044', 70, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'building-blocks-set');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Remote Control Car', 'remote-control-car', 'Fast remote control car with LED lights.', 'RC racing car', 79.99, 99.99, 'RCC-045', 40, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'remote-control-car');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Board Game', 'board-game', 'Classic board game for family entertainment.', 'Strategy board game', 34.99, 44.99, 'BG-046', 55, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'board-game');

-- JEWELRY Category (3 products)
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Gold Necklace', 'gold-necklace', 'Elegant gold necklace with intricate design.', 'Premium gold necklace', 299.99, 399.99, 'GN-047', 15, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', true, '["/images/products/necklace.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'gold-necklace');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Silver Ring', 'silver-ring', 'Beautiful silver ring with gemstone setting.', 'Sterling silver ring', 149.99, 199.99, 'SR-048', 25, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', false, '["/images/products/ring.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'silver-ring');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 'Diamond Earrings', 'diamond-earrings', 'Sparkling diamond earrings for special occasions.', 'Luxury diamond earrings', 599.99, 799.99, 'DE-049', 10, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', true, '["/images/products/earrings.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'diamond-earrings');
