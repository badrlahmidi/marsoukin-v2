'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { productService } from '@/services/product.service';
import { Product } from '@/types';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProduct(slug);
      
      if (response.success && response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Produit non trouvé
            </h2>
            <Link href="/products">
              <Button>Retour aux produits</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const inStock = product.stock > 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Produits</Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/categories/${product.category.slug}`} className="hover:text-blue-600">
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-400">Image du produit</span>
            </div>
            {product.is_featured && (
              <div className="inline-block bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold">
                ⭐ Produit vedette
              </div>
            )}
          </div>

          {/* Détails */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {product.artisanProfile && (
              <Link 
                href={`/artisans/${product.artisanProfile.slug}`}
                className="inline-block text-blue-600 hover:text-blue-700 mb-4"
              >
                Par {product.artisanProfile.shop_name} →
              </Link>
            )}

            {product.origin_city && (
              <p className="text-gray-600 mb-4">📍 Fabriqué à {product.origin_city}</p>
            )}

            {product.average_rating && product.average_rating > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500 text-xl">
                      {star <= Math.round(product.average_rating!) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.average_rating.toFixed(1)} ({product.total_reviews} avis)
                </span>
              </div>
            )}

            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {formatPrice(product.base_price)}
              </p>
              {inStock ? (
                <p className="text-green-600 font-medium">✓ En stock ({product.stock} disponibles)</p>
              ) : (
                <p className="text-red-600 font-medium">✗ Rupture de stock</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Aucune description disponible.'}
              </p>
            </div>

            {product.dimensions && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Dimensions</h3>
                <p className="text-gray-700">{product.dimensions}</p>
              </div>
            )}

            {product.weight && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Poids</h3>
                <p className="text-gray-700">{product.weight}</p>
              </div>
            )}

            {/* Quantité et Achat */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="font-medium text-gray-900">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                    disabled={!inStock}
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                    disabled={!inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!inStock}
                  onClick={() => console.log('Ajouter au panier', { product, quantity })}
                >
                  🛒 Ajouter au panier
                </Button>
                <button
                  className="px-6 py-3 border-2 border-gray-300 rounded-md hover:bg-gray-50"
                  title="Ajouter aux favoris"
                >
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
