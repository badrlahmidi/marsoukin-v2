import axios from '@/lib/axios';
import type {
  ArtisanProfile,
  Product,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

export const artisanService = {
  async getAll(page = 1): Promise<PaginatedResponse<ArtisanProfile>> {
    const response = await axios.get<PaginatedResponse<ArtisanProfile>>(
      '/artisans',
      {
        params: { page },
      }
    );
    return response.data;
  },

  async getBySlug(slug: string): Promise<ArtisanProfile> {
    const response = await axios.get<ApiResponse<ArtisanProfile>>(
      `/artisans/${slug}`
    );
    return response.data.data;
  },

  async getProducts(
    slug: string,
    page = 1
  ): Promise<PaginatedResponse<Product>> {
    const response = await axios.get<PaginatedResponse<Product>>(
      `/artisans/${slug}/products`,
      {
        params: { page },
      }
    );
    return response.data;
  },
};
