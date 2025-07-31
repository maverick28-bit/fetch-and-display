import Product from '@/components/Product';
import ProductList from '@/components/ProductList';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Beautiful animated background */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-50 animate-float"></div>
      <div className="absolute inset-0 bg-[var(--gradient-hero)]"></div>
      
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4 space-y-16">
          {/* Enhanced Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 backdrop-blur-sm">
              <div className="bg-background/80 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium text-primary">✨ Beautiful Product Showcase</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight">
              Product Detail Demo
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Intern Assignment: Product Components with API Integration
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full"></div>
          </div>
          
          {/* Featured Product Detail */}
          <section className="animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Featured Product Detail
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover our carefully selected featured product with enhanced details and beautiful presentation
              </p>
            </div>
            <Product productId={1} />
          </section>

          <Separator className="my-16 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Product Grid */}
          <section className="animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Product Collection
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Browse our extensive collection of premium products, each designed with attention to detail
              </p>
            </div>
            <ProductList limit={10} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
