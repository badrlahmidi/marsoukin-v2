'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

// Type temporaire pour les items du panier
type CartItem = {
  id: number;
  productId: number;
  productSlug: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  artisan: string;
};

export default function CartPage() {
  // Données de démonstration - à remplacer par un vrai state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      productSlug: 'tajine-traditionnel-fes',
      title: 'Tajine Traditionnel de Fès',
      price: 450.00,
      quantity: 1,
      stock: 25,
      artisan: 'Atelier Youssef'
    },
    {
      id: 2,
      productId: 2,
      productSlug: 'tapis-berbere-beni-ouarain',
      title: 'Tapis Berbère Beni Ouarain',
      price: 2500.00,
      quantity: 1,
      stock: 3,
      artisan: 'Tissage Khadija'
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(Math.max(1, newQuantity), item.stock) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 30.00 : 0; // Frais de livraison fixes
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits artisanaux et ajoutez-les à votre panier !
            </p>
            <Link href="/products">
              <Button size="lg">Découvrir les produits</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Image placeholder */}
                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>

                    {/* Détails */}
                    <div className="flex-1">
                      <Link href={`/products/${item.productSlug}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 mb-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">Par {item.artisan}</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantité et actions */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        ✕ Supprimer
                      </button>

                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/products">
              <Button variant="outline" className="mt-4">
                ← Continuer mes achats
              </Button>
            </Link>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Résumé de la commande
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total ({cartItems.length} articles)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-3">
                Passer la commande →
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Paiement sécurisé • Livraison sous 2-5 jours
              </p>
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🚚 Livraison gratuite</h3>
              <p className="text-sm text-gray-600">
                Pour toute commande supérieure à 500 MAD
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
