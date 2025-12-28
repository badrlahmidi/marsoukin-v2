// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'artisan' | 'admin';
  created_at: string;
  updated_at: string;
  artisanProfile?: ArtisanProfile;
  addresses?: Address[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

// Product Types
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  base_price: number;
  stock: number;
  status: 'draft' | 'active' | 'hidden' | 'rejected';
  is_featured: boolean;
  views_count: number;
  weight?: number;
  dimensions?: string;
  origin_city?: string;
  category_id: number;
  artisan_profile_id: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  artisanProfile?: ArtisanProfile;
  primaryImage?: ProductImage;
  images?: ProductImage[];
  variants?: ProductVariant[];
  reviews?: Review[];
  average_rating?: number;
  total_reviews?: number;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  sku?: string;
  price: number;
  stock: number;
  attributes: Record<string, any>;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: number;
  order: number;
  is_active: boolean;
  parent?: Category;
  children?: Category[];
  products_count?: number;
}

// Artisan Types
export interface ArtisanProfile {
  id: number;
  user_id: number;
  shop_name: string;
  slug: string;
  bio?: string;
  logo_url?: string;
  banner_url?: string;
  city: string;
  country: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  user?: User;
  products_count?: number;
  total_sales?: number;
  total_orders?: number;
  average_rating?: number;
  total_reviews?: number;
}

// Cart Types
export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_variant_id?: number;
  quantity: number;
  price: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  data: {
    cart: Cart;
    items_count: number;
    subtotal: number;
  };
}

// Order Types
export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
  payment_method: 'cod' | 'card' | 'bank_transfer';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  shipping_total: number;
  commission_total: number;
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_variant_id?: number;
  artisan_profile_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  commission_amount: number;
  status: string;
  product?: Product;
  variant?: ProductVariant;
  artisanProfile?: ArtisanProfile;
}

// Address Types
export interface Address {
  id: number;
  user_id: number;
  type: 'billing' | 'shipping';
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  full_address?: string;
}

// Review Types
export interface Review {
  id: number;
  order_item_id: number;
  user_id: number;
  product_id: number;
  artisan_profile_id: number;
  rating: number;
  comment: string;
  images?: string[];
  is_verified_purchase: boolean;
  is_approved: boolean;
  admin_response?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  product?: Product;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
