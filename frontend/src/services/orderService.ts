import axios from '@/lib/axios';
import type { Order, ApiResponse, PaginatedResponse } from '@/types';

interface CreateOrderData {
  address_id: number;
  payment_method: 'cash_on_delivery' | 'card' | 'bank_transfer';
  notes?: string;
}

export const orderService = {
  async getAll(page = 1): Promise<PaginatedResponse<Order>> {
    const response = await axios.get<PaginatedResponse<Order>>('/orders', {
      params: { page },
    });
    return response.data;
  },

  async getByNumber(orderNumber: string): Promise<Order> {
    const response = await axios.get<ApiResponse<Order>>(
      `/orders/${orderNumber}`
    );
    return response.data.data;
  },

  async create(data: CreateOrderData): Promise<Order> {
    const response = await axios.post<ApiResponse<Order>>('/orders', data);
    return response.data.data;
  },

  async cancel(orderNumber: string): Promise<Order> {
    const response = await axios.post<ApiResponse<Order>>(
      `/orders/${orderNumber}/cancel`
    );
    return response.data.data;
  },
};
