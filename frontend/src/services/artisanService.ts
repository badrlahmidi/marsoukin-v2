import apiClient from '@/lib/axios';
import { ArtisanProfile, ArtisanFilters, ApiResponse, PaginatedResponse } from '@/types';

class ArtisanService {
  /**
   * Récupérer la liste des artisans
   */
  async getArtisans(filters?: ArtisanFilters): Promise<PaginatedResponse<ArtisanProfile>> {
    const response = await apiClient.get<PaginatedResponse<ArtisanProfile>>('/artisans', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Récupérer un artisan par son slug
   */
  async getArtisan(slug: string): Promise<ArtisanProfile> {
    const response = await apiClient.get<ApiResponse<ArtisanProfile>>(`/artisans/${slug}`);
    return response.data.data;
  }
}

export default new ArtisanService();