import { Product as ProductType } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: ProductType;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card 
      className="bg-product-card border-product-card-border shadow-[var(--shadow-card)] overflow-hidden transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-secondary/50 h-48">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          {product.discountPercentage > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2 text-xs"
            >
              -{product.discountPercentage}% OFF
            </Badge>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          <div>
            <Badge variant="secondary" className="text-xs mb-2">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-price-highlight">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <Badge 
                variant={product.stock > 0 ? "default" : "destructive"} 
                className="text-xs"
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>
            
            <Button 
              size="sm" 
              className="gap-2"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;