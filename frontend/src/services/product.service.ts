import api from '@/lib/api';
import { Product, PaginatedResponse, ApiResponse } from '@/types';

export const productService = {
  /**
   * Get all products with filters
   */
  async getProducts(params?: {
    category_id?: number;
    category_slug?: string;
    artisan_id?: number;
    min_price?: number;
    max_price?: number;
    city?: string;
    in_stock?: boolean;
    sort_by?: 'price' | 'popular' | 'name' | 'created_at';
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<Product>> {
    const response = await api.get('/products', { params });
    return response.data;
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    const response = await api.get('/products/featured');
    return response.data;
  },

  /**
   * Search products by query
   */
  async searchProducts(query: string, page: number = 1, perPage: number = 20): Promise<PaginatedResponse<Product>> {
    const response = await api.get('/products/search', { 
      params: { 
        q: query,
        page,
        per_page: perPage
      } 
    });
    return response.data;
  },

  /**
   * Get a single product by slug
   */
  async getProduct(slug: string): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(
    categorySlug: string, 
    params?: {
      min_price?: number;
      max_price?: number;
      sort_by?: 'price' | 'popular' | 'name' | 'created_at';
      sort_order?: 'asc' | 'desc';
      per_page?: number;
      page?: number;
    }
  ): Promise<PaginatedResponse<Product>> {
    const response = await api.get('/products', { 
      params: {
        category_slug: categorySlug,
        ...params
      }
    });
    return response.data;
  },

  /**
   * Get products by artisan
   */
  async getProductsByArtisan(
    artisanId: number,
    params?: {
      per_page?: number;
      page?: number;
    }
  ): Promise<PaginatedResponse<Product>> {
    const response = await api.get('/products', { 
      params: {
        artisan_id: artisanId,
        ...params
      }
    });
    return response.data;
  },
};
