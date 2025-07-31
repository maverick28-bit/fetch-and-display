import Product from '@/components/Product';
import ProductList from '@/components/ProductList';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Product Detail Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            Intern Assignment: Product Components with API Integration
          </p>
        </div>
        
        {/* Featured Product Detail */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Featured Product Detail</h2>
          <Product productId={1} />
        </section>

        <Separator className="my-8" />
        
        {/* Product Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">All Products</h2>
          <ProductList limit={10} />
        </section>
      </div>
    </div>
  );
};

export default Index;
