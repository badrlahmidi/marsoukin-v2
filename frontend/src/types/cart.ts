import { Product, ProductVariant } from './product';

export interface Cart {
  id: number;
  user_id?: number;
  session_id?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  subtotal: number;
  product: Product;
  variant?: ProductVariant;
  created_at: string;
  updated_at: string;
}

export interface AddToCartData {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}