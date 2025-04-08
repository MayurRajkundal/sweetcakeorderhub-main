
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCakeContext } from '@/context/CakeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatIndianRupees } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getCakeById } = useCakeContext();
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button className="mt-8" onClick={() => navigate('/catalog')}>
          Return to Catalog
        </Button>
      </div>
    );
  }

  // Check if the product is a cake (has flavors, fillings, toppings)
  const isCake = product.category === 'cakes';
  const cake = isCake ? getCakeById(id || '') : null;

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image || "/placeholder.svg"} 
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              {product.popular && <Badge className="bg-primary/10 text-primary">Popular</Badge>}
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-primary">{formatIndianRupees(product.price)}</p>
          </div>

          {isCake && cake && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Available Flavors</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cake.flavors.map((flavor) => (
                    <Badge key={flavor} variant="secondary">
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Available Fillings</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cake.fillings.map((filling) => (
                    <Badge key={filling} variant="secondary">
                      {filling}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Available Toppings</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cake.toppings.map((topping) => (
                    <Badge key={topping} variant="secondary">
                      {topping}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={() => navigate('/order', { state: { selectedProductId: product.id } })}>
              Order This {product.category.slice(0, -1)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
