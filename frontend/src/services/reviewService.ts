import apiClient from '@/lib/axios';
import { Review, CreateReviewData, UpdateReviewData, ApiResponse } from '@/types';

class ReviewService {
  /**
   * Créer un avis
   */
  async createReview(data: CreateReviewData): Promise<Review> {
    const response = await apiClient.post<ApiResponse<Review>>('/reviews', data);
    return response.data.data;
  }

  /**
   * Mettre à jour un avis
   */
  async updateReview(id: number, data: UpdateReviewData): Promise<Review> {
    const response = await apiClient.put<ApiResponse<Review>>(`/reviews/${id}`, data);
    return response.data.data;
  }

  /**
   * Supprimer un avis
   */
  async deleteReview(id: number): Promise<void> {
    await apiClient.delete(`/reviews/${id}`);
  }
}

export default new ReviewService();