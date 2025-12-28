import axios from '@/lib/axios';
import type { Review, ApiResponse } from '@/types';

interface CreateReviewData {
  product_id: number;
  rating: number;
  comment?: string;
}

export const reviewService = {
  async create(data: CreateReviewData): Promise<Review> {
    const response = await axios.post<ApiResponse<Review>>('/reviews', data);
    return response.data.data;
  },

  async update(id: number, data: Partial<CreateReviewData>): Promise<Review> {
    const response = await axios.put<ApiResponse<Review>>(
      `/reviews/${id}`,
      data
    );
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/reviews/${id}`);
  },
};
