import { Product } from './product';
import { Address } from './common';

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  address_id: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  items: OrderItem[];
  address?: Address;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id?: number;
  artisan_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  commission_rate: number;
  commission_amount: number;
  product: Product;
  artisan?: {
    id: number;
    name: string;
    shop_name: string;
  };
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'cash_on_delivery' | 'bank_transfer' | 'credit_card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CreateOrderData {
  address_id: number;
  payment_method: PaymentMethod;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}