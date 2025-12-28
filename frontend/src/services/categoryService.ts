import apiClient from '@/lib/axios';
import { Category } from '@/types/product';

export const categoryService = {
  /**
   * Récupérer toutes les catégories
   */
  async getAll() {
    const response = await apiClient.get<{ data: Category[] }>('/categories');
    return response.data;
  },

  /**
   * Récupérer une catégorie par son slug
   */
  async getBySlug(slug: string) {
    const response = await apiClient.get<{ data: Category }>(`/categories/${slug}`);
    return response.data;
  },
};
