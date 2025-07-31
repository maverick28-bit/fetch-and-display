import { useState, useEffect } from 'react';
import { Product as ProductType } from '@/types/product';
import { API_ENDPOINTS } from '@/config/api';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Package2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProductListResponse {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductListProps {
  limit?: number;
}

const ProductList = ({ limit = 10 }: ProductListProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${API_ENDPOINTS.DUMMY_JSON_BASE}${API_ENDPOINTS.PRODUCTS}?limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data: ProductListResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <Card key={index} className="bg-product-card border-product-card-border">
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full bg-loading-bg" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-16 bg-loading-bg" />
                <Skeleton className="h-5 w-3/4 bg-loading-bg" />
                <Skeleton className="h-4 w-full bg-loading-bg" />
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-20 bg-loading-bg" />
                    <Skeleton className="h-4 w-16 bg-loading-bg" />
                  </div>
                  <Skeleton className="h-8 w-16 bg-loading-bg" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)]">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 text-destructive justify-center">
            <AlertCircle className="h-6 w-6" />
            <div className="text-center">
              <h3 className="font-semibold">Error Loading Products</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)]">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 text-muted-foreground justify-center">
            <Package2 className="h-6 w-6" />
            <p>No products found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onClick={() => {
            // Could navigate to detailed product view
            console.log('Product clicked:', product.id);
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;