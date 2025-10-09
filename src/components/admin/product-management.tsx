'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  MoreHorizontal
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-hot-toast';

// Mock data - replace with actual data fetching

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      sku: 'PWH-001',
      price: 299.99,
      comparePrice: 399.99,
      quantity: 50,
      status: 'active',
      category: 'Electronics',
      image: '/images/products/headphones.svg',
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      sku: 'SFW-002',
      price: 199.99,
      comparePrice: 249.99,
      quantity: 25,
      status: 'active',
      category: 'Electronics',
      image: '/images/products/watch.svg',
    },
    {
      id: '3',
      name: 'Wireless Charging Pad',
      sku: 'WCP-003',
      price: 49.99,
      comparePrice: 69.99,
      quantity: 30,
      status: 'active',
      category: 'Electronics',
      image: '/images/products/placeholder.svg',
    },
    {
      id: '4',
      name: 'Bluetooth Speaker',
      sku: 'BS-004',
      price: 79.99,
      comparePrice: 99.99,
      quantity: 15,
      status: 'active',
      category: 'Electronics',
      image: '/images/products/speaker.svg',
    },
    {
      id: '5',
      name: 'Gaming Laptop',
      sku: 'GL-005',
      price: 1299.99,
      comparePrice: 1499.99,
      quantity: 8,
      status: 'active',
      category: 'Electronics',
      image: '/images/products/laptop.svg',
    },
  ]);

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProducts(prev => prev.filter(product => product.id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Link href="/admin/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('draft')}
              >
                Draft
              </Button>
              <Button
                variant={filterStatus === 'archived' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('archived')}
              >
                Archived
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            A list of all your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatPrice(product.price)}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right space-y-1">
                    <Badge 
                      variant={
                        product.status === 'active' ? 'default' :
                        product.status === 'draft' ? 'secondary' : 'destructive'
                      }
                    >
                      {product.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} in stock
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" title="View Product">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit Product">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Delete Product"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="More Options">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
