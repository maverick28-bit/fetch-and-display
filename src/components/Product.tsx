import { useState, useEffect } from 'react';
import { getProductUrl } from '@/config/api';
import { Product as ProductType, ProductComponentProps } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Star, Package } from 'lucide-react';

const Product = ({ productId = 1 }: ProductComponentProps) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(getProductUrl(productId));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }
        
        const data: ProductType = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg bg-loading-bg" />
                <div className="flex gap-2">
                  <Skeleton className="h-16 w-16 rounded bg-loading-bg" />
                  <Skeleton className="h-16 w-16 rounded bg-loading-bg" />
                  <Skeleton className="h-16 w-16 rounded bg-loading-bg" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-loading-bg" />
                <Skeleton className="h-6 w-1/2 bg-loading-bg" />
                <Skeleton className="h-12 w-1/3 bg-loading-bg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-loading-bg" />
                  <Skeleton className="h-4 w-full bg-loading-bg" />
                  <Skeleton className="h-4 w-3/4 bg-loading-bg" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Error Loading Product</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Package className="h-6 w-6" />
              <p>Product not found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-card)] overflow-hidden transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)]">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-6 space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-secondary/50">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-16 w-16 object-cover rounded border border-product-card-border hover:border-primary transition-colors cursor-pointer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-foreground leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Rating and Stock */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <Badge 
                  variant={product.stock > 0 ? "default" : "destructive"} 
                  className="text-xs"
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-price-highlight">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      -{product.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;