
import React from 'react';
import { Link } from 'react-router-dom';
import { useCakeContext } from '@/context/CakeContext';
import { ProductCategory } from '@/types/product';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ id, name, description, price, image, popular }: { 
  id: string; 
  name: string; 
  description: string;
  price: number; 
  image: string; 
  popular: boolean;
}) => (
  <Link to={`/catalog/${id}`} className="cake-card group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
    <div className="aspect-square overflow-hidden bg-muted">
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium">{name}</h3>
        {popular && <Badge className="bg-primary/10 text-primary">Popular</Badge>}
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
      <p className="mt-2 font-medium text-primary">₹{price.toFixed(2)}</p>
    </div>
  </Link>
);

const CategoryShowcase = ({ 
  category, 
  title, 
  subtitle 
}: { 
  category: ProductCategory; 
  title: string; 
  subtitle: string;
}) => {
  const { getProductsByCategory } = useCakeContext();
  const products = getProductsByCategory(category).slice(0, 4);

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline" className="mb-2">{title}</Badge>
            <h2 className="font-display text-3xl font-bold md:text-4xl">{subtitle}</h2>
          </div>
          <Link to="/catalog" className="mt-4 font-medium text-primary hover:underline md:mt-0">
            See all {title.toLowerCase()} →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              popular={product.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
