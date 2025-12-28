import { create } from 'zustand';
import { Cart } from '@/types';

interface CartState {
  cart: Cart | null;
  itemsCount: number;
  subtotal: number;
  setCart: (cart: Cart, itemsCount: number, subtotal: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  itemsCount: 0,
  subtotal: 0,
  setCart: (cart, itemsCount, subtotal) => set({ cart, itemsCount, subtotal }),
  clearCart: () => set({ cart: null, itemsCount: 0, subtotal: 0 }),
}));
