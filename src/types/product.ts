
// Define product types
export type ProductSize = 'small' | 'medium' | 'large';
export type CakeFlavor = 'vanilla' | 'chocolate' | 'strawberry' | 'red velvet' | 'carrot' | 'lemon';
export type CakeFilling = 'buttercream' | 'chocolate ganache' | 'cream cheese' | 'fruit jam' | 'caramel';
export type CakeTopping = 'fresh fruit' | 'chocolate shavings' | 'flowers' | 'sprinkles' | 'macarons';
export type PaymentMethod = 'cod'; // Simplified to only cash on delivery

export type ProductCategory = 'cakes' | 'pastries' | 'cupcakes' | 'cookies' | 'breads';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  popular: boolean;
}

export interface Cake extends Product {
  flavors: CakeFlavor[];
  fillings: CakeFilling[];
  toppings: CakeTopping[];
}

export interface OrderBase {
  productId: string;
  size: ProductSize;
  deliveryLocation: string;
  deliveryDate: Date;
  deliveryTime: string;
  specialInstructions: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface CakeOrder extends OrderBase {
  layers?: number;
  flavor?: CakeFlavor;
  filling?: CakeFilling;
  topping?: CakeTopping;
  nameOnCake?: string;
  paymentMethod?: PaymentMethod;
}

// Define a SupabaseOrder interface that matches the database schema
export interface SupabaseOrder {
  user_id: string | null;
  product_id: string;
  product_name: string;
  size: string;
  layers: number | null;
  flavor: string | null;
  filling: string | null;
  topping: string | null;
  name_on_cake: string | null;
  delivery_location: string;
  delivery_date: string; // String format for DB storage
  delivery_time: string;
  special_instructions: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  payment_status: string;
  total_amount: number;
}
