export interface ArtisanProfile {
  id: number;
  user_id: number;
  shop_name: string;
  slug: string;
  bio?: string;
  specialties?: string;
  city?: string;
  avatar?: string;
  cover_image?: string;
  phone?: string;
  website?: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  commission_rate: number;
  is_featured: boolean;
  products_count: number;
  total_sales: number;
  average_rating: number;
  member_since: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ArtisanFilters {
  city?: string;
  specialty?: string;
  search?: string;
  sort_by?: 'name' | 'created_at' | 'rating' | 'sales';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}