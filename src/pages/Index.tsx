import Product from '@/components/Product';

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Product Detail Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            Intern Assignment: Product Component with API Integration
          </p>
        </div>
        
        <Product productId={1} />
      </div>
    </div>
  );
};

export default Index;
