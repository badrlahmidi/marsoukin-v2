import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, Product } from '@/types';
import { cartService } from '@/services/cartService';

interface CartState {
  cart: Cart | null;
  itemsCount: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (product_id: number, variant_id?: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(\n  persist(
    (set, get) => ({
      cart: null,
      itemsCount: 0,
      total: 0,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartService.get();
          set({ cart, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch cart',
            isLoading: false,
          });
        }
      },

      addItem: async (product_id, variant_id, quantity = 1) => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartService.add({ product_id, variant_id, quantity });
          set({ cart, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to add item',
            isLoading: false,
          });
          throw error;
        }
      },

      updateItem: async (itemId, quantity) => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartService.update(itemId, quantity);
          set({ cart, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to update item',
            isLoading: false,
          });
          throw error;
        }
      },

      removeItem: async (itemId) => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartService.remove(itemId);
          set({ cart, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to remove item',
            isLoading: false,
          });
        }
      },

      clearCart: async () => {
        try {
          set({ isLoading: true, error: null });
          await cartService.clear();
          set({ cart: null, itemsCount: 0, total: 0, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to clear cart',
            isLoading: false,
          });
        }
      },

      calculateTotals: () => {
        const { cart } = get();
        if (!cart || !cart.items) {
          set({ itemsCount: 0, total: 0 });
          return;
        }

        const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ itemsCount, total });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);
