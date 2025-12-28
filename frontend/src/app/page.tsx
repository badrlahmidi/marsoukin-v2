'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { productService } from '@/services/product.service';
import { Product } from '@/types';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

// Composant ProductCard inline
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = product.primaryImage?.url || '/placeholder-product.jpg';
  const inStock = product.stock > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Pas d'image</span>
          </div>
          {product.is_featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              ⭐ Vedette
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Rupture de stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        {product.artisanProfile && (
          <Link 
            href={`/artisans/${product.artisanProfile.slug}`}
            className="text-sm text-gray-600 hover:text-blue-600 mb-2 block"
          >
            Par {product.artisanProfile.shop_name}
          </Link>
        )}

        {product.origin_city && (
          <p className="text-xs text-gray-500 mb-3">📍 {product.origin_city}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(product.base_price)}
            </p>
            {product.average_rating && product.average_rating > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span>{product.average_rating.toFixed(1)}</span>
                <span>({product.total_reviews})</span>
              </div>
            )}
          </div>

          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              console.log('Ajouter au panier:', product.id);
              // TODO: Implémenter la logique d'ajout au panier
            }}
          >
            {inStock ? 'Ajouter' : 'Épuisé'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getFeaturedProducts();
      
      if (response.success && response.data) {
        setFeaturedProducts(response.data);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des produits vedettes:', error);
      setFeaturedProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Section Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Découvrez l'artisanat marocain authentique
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Explorez une sélection unique de produits faits main par des artisans talentueux du Maroc.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Explorer les produits
                </Button>
              </Link>
              <Link href="/artisans">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                  Découvrir les artisans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits Vedettes */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Produits Vedettes ⭐</h2>
          <Link href="/products">
            <Button variant="outline">Voir tout →</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-gray-600 text-lg mb-4">
              Aucun produit vedette pour le moment.
            </p>
            <Link href="/products">
              <Button>Voir tous les produits</Button>
            </Link>
          </div>
        )}
      </section>

      {/* Section Caractéristiques */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Marsoukin ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Artisanat Authentique</h3>
              <p className="text-gray-600">
                Des produits uniques créés à la main par des artisans locaux passionnés
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison dans tout le Maroc en 2-5 jours ouvrables
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-6xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-3">Qualité Garantie</h3>
              <p className="text-gray-600">
                Satisfaction garantie ou remboursement sous 14 jours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Catégories Populaires */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Catégories Populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Tajines', emoji: '🍲', slug: 'tajines' },
            { name: 'Tapis', emoji: '🧶', slug: 'tapis' },
            { name: 'Poterie', emoji: '🏺', slug: 'poterie' },
            { name: 'Bijoux', emoji: '💍', slug: 'bijoux' },
          ].map((category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl mb-3">{category.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section Appel à l'action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Vous êtes artisan ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Rejoignez notre plateforme et vendez vos créations à des milliers de clients au Maroc
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Devenir vendeur →
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
