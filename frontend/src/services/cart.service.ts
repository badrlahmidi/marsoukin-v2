import api from '@/lib/api';
import { CartResponse } from '@/types';

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(data: {
    product_id: number;
    variant_id?: number;
    quantity: number;
  }): Promise<CartResponse> {
    const response = await api.post('/cart/add', data);
    return response.data;
  },

  async updateCartItem(itemId: number, quantity: number): Promise<CartResponse> {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(itemId: number): Promise<CartResponse> {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  },

  async clearCart(): Promise<CartResponse> {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};
