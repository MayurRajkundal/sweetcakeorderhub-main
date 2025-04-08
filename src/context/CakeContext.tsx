
import React, { createContext, useContext, useState } from 'react';
import { Cake, Product, ProductCategory, CakeOrder } from '../types/product';
import { CakeContextType, CakeProviderProps } from './CakeContextTypes';
import { 
  initialCakes, 
  initialPastries, 
  initialCupcakes, 
  initialCookies, 
  initialBreads 
} from '../data/productData';

const CakeContext = createContext<CakeContextType>({
  cakes: initialCakes,
  pastries: initialPastries,
  cupcakes: initialCupcakes,
  cookies: initialCookies,
  breads: initialBreads,
  getAllProducts: () => [],
  getPopularProducts: () => [],
  getProductsByCategory: () => [],
  orders: [],
  addOrder: () => {},
  getCakeById: () => undefined,
  getProductById: () => undefined
});

export const useCakeContext = () => useContext(CakeContext);

export const CakeProvider: React.FC<CakeProviderProps> = ({ children }) => {
  const [cakes] = useState<Cake[]>(initialCakes);
  const [pastries] = useState<Product[]>(initialPastries);
  const [cupcakes] = useState<Product[]>(initialCupcakes);
  const [cookies] = useState<Product[]>(initialCookies);
  const [breads] = useState<Product[]>(initialBreads);
  const [orders, setOrders] = useState<CakeOrder[]>([]);

  const getAllProducts = (): Product[] => {
    return [...cakes, ...pastries, ...cupcakes, ...cookies, ...breads];
  };

  const getPopularProducts = (): Product[] => {
    return getAllProducts().filter(product => product.popular);
  };

  const getProductsByCategory = (category: ProductCategory): Product[] => {
    switch (category) {
      case 'cakes':
        return cakes;
      case 'pastries':
        return pastries;
      case 'cupcakes':
        return cupcakes;
      case 'cookies':
        return cookies;
      case 'breads':
        return breads;
      default:
        return [];
    }
  };

  const addOrder = (order: CakeOrder) => {
    setOrders(prevOrders => [...prevOrders, order]);
    console.log('Order added:', order);
  };

  const getCakeById = (id: string) => {
    return cakes.find(cake => cake.id === id) as Cake | undefined;
  };

  const getProductById = (id: string) => {
    return getAllProducts().find(product => product.id === id);
  };

  return (
    <CakeContext.Provider 
      value={{ 
        cakes, 
        pastries, 
        cupcakes, 
        cookies, 
        breads, 
        getAllProducts, 
        getPopularProducts,
        getProductsByCategory,
        orders, 
        addOrder, 
        getCakeById,
        getProductById
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};
