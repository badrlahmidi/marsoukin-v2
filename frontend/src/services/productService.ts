import axios from '@/lib/axios';
import type {
  Product,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

interface ProductFilters {
  category_id?: number;
  artisan_id?: number;
  min_price?: number;
  max_price?: number;
  city?: string;
  search?: string;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  per_page?: number;
}

export const productService = {
  async getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await axios.get<PaginatedResponse<Product>>('/products', {
      params: filters,
    });
    return response.data;
  },

  async getBySlug(slug: string): Promise<Product> {
    const response = await axios.get<ApiResponse<Product>>(`/products/${slug}`);
    return response.data.data;
  },

  async getFeatured(): Promise<Product[]> {
    const response = await axios.get<ApiResponse<Product[]>>(
      '/products/featured'
    );
    return response.data.data;
  },

  async search(query: string): Promise<Product[]> {
    const response = await axios.get<ApiResponse<Product[]>>(
      '/products/search',
      {
        params: { q: query },
      }
    );
    return response.data.data;
  },
};
