import axios from '@/lib/axios';
import type { Category, Product, ApiResponse, PaginatedResponse } from '@/types';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await axios.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  async getBySlug(slug: string): Promise<Category> {
    const response = await axios.get<ApiResponse<Category>>(
      `/categories/${slug}`
    );
    return response.data.data;
  },

  async getProducts(
    slug: string,
    page = 1
  ): Promise<PaginatedResponse<Product>> {
    const response = await axios.get<PaginatedResponse<Product>>(
      `/categories/${slug}/products`,
      {
        params: { page },
      }
    );
    return response.data;
  },
};
