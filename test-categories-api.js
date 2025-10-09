// Test script to check categories API
// Run this in browser console on your deployed site

async function testCategoriesAPI() {
  try {
    console.log('Testing categories API...');
    const response = await fetch('/api/categories');
    const data = await response.json();
    
    console.log('Categories API Response:', data);
    console.log('Total categories:', data.categories?.length || 0);
    console.log('Total products:', data.totalProducts || 0);
    
    if (data.categories) {
      data.categories.forEach(category => {
        console.log(`${category.name}: ${category.productCount} products`);
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error testing categories API:', error);
  }
}

// Run the test
testCategoriesAPI();
