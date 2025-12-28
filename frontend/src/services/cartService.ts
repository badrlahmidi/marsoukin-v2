import axios from '@/lib/axios';
import type { Cart, ApiResponse } from '@/types';

interface AddToCartData {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export const cartService = {
  async get(): Promise<Cart> {
    const response = await axios.get<ApiResponse<Cart>>('/cart');
    return response.data.data;
  },

  async add(data: AddToCartData): Promise<Cart> {
    const response = await axios.post<ApiResponse<Cart>>('/cart/add', data);
    return response.data.data;
  },

  async update(itemId: number, quantity: number): Promise<Cart> {
    const response = await axios.put<ApiResponse<Cart>>(
      `/cart/update/${itemId}`,
      { quantity }
    );
    return response.data.data;
  },

  async remove(itemId: number): Promise<Cart> {
    const response = await axios.delete<ApiResponse<Cart>>(
      `/cart/remove/${itemId}`
    );
    return response.data.data;
  },

  async clear(): Promise<void> {
    await axios.delete('/cart/clear');
  },
};
