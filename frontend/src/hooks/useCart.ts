import { useEffect } from 'react';
import { useCartStore } from '@/store';
import { useAuthStore } from '@/store';
import { AddToCartData } from '@/types';
import toast from 'react-hot-toast';

export function useCart() {
  const { isAuthenticated } = useAuthStore();
  const {
    cart,
    isLoading,
    error,
    fetchCart,
    addToCart: addToCartAction,
    updateQuantity: updateQuantityAction,
    removeItem: removeItemAction,
    clearCart: clearCartAction,
    getItemsCount,
    getTotal,
  } = useCartStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = async (data: AddToCartData) => {
    try {
      await addToCartAction(data);
      toast.success('Produit ajouté au panier');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout au panier');
      throw error;
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await updateQuantityAction(itemId, quantity);
    } catch (error) {
      toast.error('Erreur de mise à jour');
      throw error;
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await removeItemAction(itemId);
      toast.success('Produit retiré du panier');
    } catch (error) {
      toast.error('Erreur de suppression');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAction();
      toast.success('Panier vidé');
    } catch (error) {
      toast.error('Erreur');
      throw error;
    }
  };

  return {
    cart,
    isLoading,
    error,
    itemsCount: getItemsCount(),
    total: getTotal(),
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };
}