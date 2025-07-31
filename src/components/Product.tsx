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
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-product-card border-product-card-border shadow-[var(--shadow-xl)] overflow-hidden transition-[var(--transition-spring)] hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] relative group">
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-8 space-y-6">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-80 object-cover transition-all duration-500 hover:scale-110 hover:rotate-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Enhanced Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-lg border-2 border-product-card-border hover:border-primary transition-all duration-300 cursor-pointer hover:scale-110 hover:-rotate-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Product Details */}
            <div className="p-8 space-y-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-medium px-3 py-1 border-2">
                    {product.brand}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
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

              {/* Enhanced Price Section */}
              <div className="space-y-2 p-4 rounded-xl bg-gradient-to-r from-price-highlight/10 to-transparent border border-price-highlight/20">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-bold text-price-highlight drop-shadow-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <Badge variant="destructive" className="text-sm font-bold px-3 py-1 bg-gradient-to-r from-destructive to-destructive/80 shadow-lg animate-pulse">
                      -{product.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <p className="text-base text-muted-foreground line-through font-medium">
                    Original: ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Enhanced Description */}
              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-muted/30 to-transparent border border-muted/50">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary-glow rounded-full"></div>
                  Product Description
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
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