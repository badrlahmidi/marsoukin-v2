import apiClient from '@/lib/axios';
import { Category, ApiResponse } from '@/types';

class CategoryService {
  /**
   * Récupérer toutes les catégories
   */
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  }

  /**
   * Récupérer une catégorie par son slug
   */
  async getCategory(slug: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
    return response.data.data;
  }
}

export default new CategoryService();