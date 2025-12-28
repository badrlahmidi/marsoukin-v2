// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'artisan' | 'buyer';
  phone?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface ArtisanProfile {
  id: number;
  user_id: number;
  shop_name: string;
  slug: string;
  bio?: string;
  city: string;
  specialty: string;
  verified: boolean;
  commission_rate: number;
  user?: User;
}

// Product Types
export interface Product {
  id: number;
  artisan_id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
  artisan?: ArtisanProfile;
  reviews_avg?: number;
  reviews_count?: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  value: string;
  price_modifier: number;
  stock: number;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
  products_count?: number;
}

// Cart Types
export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  product?: Product;
  variant?: ProductVariant;
}

// Order Types
export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  status: OrderStatus;
  payment_method: 'cash_on_delivery' | 'card' | 'bank_transfer';
  payment_status: 'pending' | 'paid' | 'failed';
  subtotal: number;
  shipping_cost: number;
  total: number;
  items: OrderItem[];
  shipping_address?: Address;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id?: number;
  artisan_id: number;
  quantity: number;
  price: number;
  product?: Product;
  variant?: ProductVariant;
}

// Address Types
export interface Address {
  id: number;
  user_id: number;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  is_default: boolean;
}

// Review Types
export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  user?: User;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'buyer' | 'artisan';
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
