import { Category } from './category';
import { User } from './auth';

export interface Product {
  id: number;
  artisan_id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  sku?: string;
  is_active: boolean;
  is_featured: boolean;
  weight?: number;
  dimensions?: string;
  materials?: string;
  origin_city?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
  artisan?: {
    id: number;
    name: string;
    slug: string;
    avatar?: string;
    city?: string;
  };
  reviews_count: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  sku?: string;
  price_adjustment: number;
  stock: number;
  is_active: boolean;
}

export interface ProductFilters {
  category_id?: number;
  artisan_id?: number;
  min_price?: number;
  max_price?: number;
  city?: string;
  search?: string;
  is_featured?: boolean;
  sort_by?: 'price' | 'created_at' | 'name' | 'popularity';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}