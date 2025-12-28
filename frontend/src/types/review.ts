import { User } from './auth';
import { Product } from './product';

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  order_id: number;
  rating: number;
  title?: string;
  comment?: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  user?: User;
  product?: Product;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  product_id: number;
  order_id: number;
  rating: number;
  title?: string;
  comment?: string;
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  comment?: string;
}