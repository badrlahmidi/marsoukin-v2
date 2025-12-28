import apiClient from '@/lib/axios';
import { Order, CreateOrderData, OrderFilters, ApiResponse, PaginatedResponse } from '@/types';

class OrderService {
  /**
   * Récupérer la liste des commandes
   */
  async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>('/orders', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Créer une nouvelle commande
   */
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
    return response.data.data;
  }

  /**
   * Récupérer une commande par son numéro
   */
  async getOrder(orderNumber: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderNumber}`);
    return response.data.data;
  }

  /**
   * Annuler une commande
   */
  async cancelOrder(orderNumber: string): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${orderNumber}/cancel`);
    return response.data.data;
  }
}

export default new OrderService();