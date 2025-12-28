'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { productService } from '@/services/product.service';
import { Product } from '@/types';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useParams } from 'next/navigation';

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

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(product.base_price)}
          </p>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              console.log('Ajouter au panier:', product.id);
            }}
          >
            {inStock ? 'Ajouter' : 'Épuisé'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Mapping des slugs vers les noms de catégories
  const categoryNames: Record<string, string> = {
    'tajines': 'Tajines',
    'tapis': 'Tapis',
    'poterie': 'Poterie',
    'bijoux': 'Bijoux'
  };

  const categoryName = categoryNames[slug] || slug;

  useEffect(() => {
    if (slug) {
      loadProducts();
    }
  }, [slug, currentPage]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProductsByCategory(slug, {
        page: currentPage,
        per_page: 12,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      
      if (response.data) {
        setProducts(response.data);
        setTotalPages(response.last_page || 1);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Produits</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-gray-600">Découvrez notre collection de {categoryName.toLowerCase()}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Précédent
                </Button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Suivant →
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg mb-4">
              Aucun produit dans cette catégorie pour le moment.
            </p>
            <Link href="/products">
              <Button>Voir tous les produits</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
