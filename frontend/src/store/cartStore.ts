import { create } from 'zustand';
import { Cart, AddToCartData } from '@/types';
import { cartService } from '@/services';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (data: AddToCartData) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemsCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.getCart();
      set({ cart, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de chargement du panier';
      set({ error: errorMessage, isLoading: false });
    }
  },

  addToCart: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.addToCart(data);
      set({ cart, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur d\'ajout au panier';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.updateCartItem(itemId, { quantity });
      set({ cart, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de mise à jour';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  removeItem: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.removeFromCart(itemId);
      set({ cart, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de suppression';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await cartService.clearCart();
      set({ cart: null, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de vidage du panier';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  getItemsCount: () => {
    const { cart } = get();
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    const { cart } = get();
    return cart?.total || 0;
  },
}));