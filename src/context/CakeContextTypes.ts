
import { ReactNode } from 'react';
import { Cake, Product, ProductCategory, CakeOrder } from '../types/product';

export interface CakeContextType {
  cakes: Cake[];
  pastries: Product[];
  cupcakes: Product[];
  cookies: Product[];
  breads: Product[];
  getAllProducts: () => Product[];
  getPopularProducts: () => Product[];
  getProductsByCategory: (category: ProductCategory) => Product[];
  orders: CakeOrder[];
  addOrder: (order: CakeOrder) => void;
  getCakeById: (id: string) => Cake | undefined;
  getProductById: (id: string) => Product | undefined;
}

export interface CakeProviderProps {
  children: ReactNode;
}
