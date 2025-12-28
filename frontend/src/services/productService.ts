import apiClient from '@/lib/axios';
import { Product, ProductFilters, ApiResponse, PaginatedResponse } from '@/types';

class ProductService {
  /**
   * Récupérer la liste des produits
   */
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Récupérer les produits en vedette
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured', {
      params: { limit },
    });
    return response.data.data;
  }

  /**
   * Rechercher des produits
   */
  async searchProducts(query: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products/search', {
      params: { search: query, ...filters },
    });
    return response.data;
  }

  /**
   * Récupérer un produit par son slug
   */
  async getProduct(slug: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
    return response.data.data;
  }

  /**
   * Récupérer les produits d'une catégorie
   */
  async getProductsByCategory(categorySlug: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      `/categories/${categorySlug}/products`,
      { params: filters }
    );
    return response.data;
  }

  /**
   * Récupérer les produits d'un artisan
   */
  async getProductsByArtisan(artisanSlug: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      `/artisans/${artisanSlug}/products`,
      { params: filters }
    );
    return response.data;
  }
}

export default new ProductService();