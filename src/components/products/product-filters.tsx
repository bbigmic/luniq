'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X, Search, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
  }) => void;
  initialFilters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
  };
}

export function ProductFilters({ onFiltersChange, initialFilters }: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    priceRange: [initialFilters?.minPrice || 0, initialFilters?.maxPrice || 1000],
    selectedCategories: initialFilters?.category && initialFilters.category !== 'all' 
      ? [initialFilters.category] 
      : ['all'],
    inStockOnly: initialFilters?.inStock || false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories([{ id: 'all', name: 'All Categories', slug: 'all', description: '', productCount: data.totalProducts || 0 }, ...data.categories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Sync with initial filters when they change
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        search: initialFilters.search || '',
        priceRange: [initialFilters.minPrice || 0, initialFilters.maxPrice || 1000],
        selectedCategories: initialFilters.category && initialFilters.category !== 'all' 
          ? [initialFilters.category] 
          : ['all'],
        inStockOnly: initialFilters.inStock || false,
      });
    }
  }, [initialFilters]);

  useEffect(() => {
    const categoryFilter = filters.selectedCategories.includes('all')
      ? undefined
      : filters.selectedCategories.join(','); // Pass multiple categories as comma-separated string

    onFiltersChange({
      search: filters.search || undefined,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      inStock: filters.inStockOnly || undefined,
      category: categoryFilter,
    });
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      handleFilterChange('selectedCategories', ['all']);
    } else {
      const currentCategories = filters.selectedCategories.includes('all') 
        ? [] 
        : filters.selectedCategories;
      
      let newCategories;
      if (currentCategories.includes(categoryId)) {
        // Remove category if already selected
        newCategories = currentCategories.filter(id => id !== categoryId);
        // If no categories left, select 'all'
        if (newCategories.length === 0) {
          newCategories = ['all'];
        }
      } else {
        // Add category
        newCategories = [...currentCategories, categoryId];
      }
      
      handleFilterChange('selectedCategories', newCategories);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: [0, 1000],
      selectedCategories: ['all'],
      inStockOnly: false,
    });
  };

  const activeFiltersCount = [
    !filters.selectedCategories.includes('all'),
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000,
    filters.inStockOnly,
    filters.search.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
          <h3 className="text-base sm:text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs sm:text-sm">
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
            <Slider
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={(value) => {
                handleFilterChange('priceRange', value);
              }}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {loadingCategories ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              <span className="ml-2 text-xs sm:text-sm">Loading categories...</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={filters.selectedCategories.includes(category.slug)}
                    onChange={() => handleCategoryChange(category.slug)}
                    className="rounded border-gray-300 h-4 w-4"
                  />
                  <label 
                    htmlFor={category.id}
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer truncate"
                  >
                    {category.name}
                  </label>
                  <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                    ({category.productCount})
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="in-stock"
              checked={filters.inStockOnly}
              onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
              className="rounded border-gray-300 h-4 w-4"
            />
            <label 
              htmlFor="in-stock"
              className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}