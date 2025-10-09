'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Categories will be fetched from API

export function AddProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    comparePrice: '',
    sku: '',
    quantity: '',
    categoryId: '',
    status: 'active',
    featured: false,
    images: ['/images/products/placeholder.svg'],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                placeholder="product-url-slug"
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief product description"
              />
            </div>

            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Product SKU"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="comparePrice">Compare at Price</Label>
              <Input
                id="comparePrice"
                name="comparePrice"
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="categoryId">Category *</Label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                disabled={loadingCategories}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">
                  {loadingCategories ? 'Loading categories...' : 'Select a category'}
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="description">Product Description *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-input bg-background rounded-md resize-none"
              placeholder="Detailed product description..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Status & Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Status & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="rounded border-input"
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
