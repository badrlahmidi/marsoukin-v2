import apiClient from '@/lib/axios';
import { Cart, AddToCartData, UpdateCartItemData, ApiResponse } from '@/types';

class CartService {
  /**
   * Récupérer le panier
   */
  async getCart(): Promise<Cart> {
    const response = await apiClient.get<ApiResponse<Cart>>('/cart');
    return response.data.data;
  }

  /**
   * Ajouter un produit au panier
   */
  async addToCart(data: AddToCartData): Promise<Cart> {
    const response = await apiClient.post<ApiResponse<Cart>>('/cart/add', data);
    return response.data.data;
  }

  /**
   * Mettre à jour la quantité d'un article
   */
  async updateCartItem(itemId: number, data: UpdateCartItemData): Promise<Cart> {
    const response = await apiClient.put<ApiResponse<Cart>>(`/cart/update/${itemId}`, data);
    return response.data.data;
  }

  /**
   * Supprimer un article du panier
   */
  async removeFromCart(itemId: number): Promise<Cart> {
    const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/remove/${itemId}`);
    return response.data.data;
  }

  /**
   * Vider le panier
   */
  async clearCart(): Promise<void> {
    await apiClient.delete('/cart/clear');
  }
}

export default new CartService();