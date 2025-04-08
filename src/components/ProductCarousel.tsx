
import React from 'react';
import { Link } from 'react-router-dom';
import { useCakeContext } from '@/context/CakeContext';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const ProductCard = ({ id, name, price, image, popular }: { 
  id: string; 
  name: string; 
  price: number; 
  image: string; 
  popular: boolean;
}) => (
  <div className="cake-card group relative overflow-hidden rounded-lg">
    <div className="aspect-square overflow-hidden bg-muted">
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col justify-between p-4">
      <h3 className="font-display text-lg font-medium">{name}</h3>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-medium text-primary">₹{price.toFixed(2)}</p>
        {popular && <Badge variant="secondary">Popular</Badge>}
      </div>
    </div>
  </div>
);

const ProductCarousel = () => {
  const { getPopularProducts } = useCakeContext();
  const popularProducts = getPopularProducts();

  return (
    <div className="w-full">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {popularProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link to={`/catalog/${product.id}`}>
                <ProductCard 
                  id={product.id} 
                  name={product.name} 
                  price={product.price} 
                  image={product.image} 
                  popular={product.popular} 
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-end gap-2 mt-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
