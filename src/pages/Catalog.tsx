
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCakeContext } from '@/context/CakeContext';
import { ProductCategory } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const Catalog = () => {
  const { getProductsByCategory } = useCakeContext();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('cakes');

  const products = getProductsByCategory(activeCategory);
  
  const categoryTitles: Record<ProductCategory, string> = {
    'cakes': 'Custom Cakes',
    'pastries': 'Flaky Pastries', 
    'cupcakes': 'Delicious Cupcakes',
    'cookies': 'Sweet Cookies',
    'breads': 'Artisan Breads'
  };

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Our Delicious Bakery Collection
        </h1>
        <p className="mt-4 text-muted-foreground">
          Browse our selection of handcrafted bakery items made with premium ingredients.
          All items can be customized to your preferences.
        </p>
      </div>

      <div className="mt-10">
        <Tabs defaultValue="cakes" className="w-full" onValueChange={(value) => setActiveCategory(value as ProductCategory)}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="pastries">Pastries</TabsTrigger>
            <TabsTrigger value="cupcakes">Cupcakes</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
            <TabsTrigger value="breads">Breads</TabsTrigger>
          </TabsList>
          {Object.entries(categoryTitles).map(([category, title]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <h2 className="mb-6 text-2xl font-bold">{title}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {getProductsByCategory(category as ProductCategory).map((product) => (
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Catalog;
