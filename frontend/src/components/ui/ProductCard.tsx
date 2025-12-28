import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.primaryImage?.url || '/placeholder-product.jpg';
  const inStock = product.stock > 0;

  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
            {product.average_rating && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span>{product.average_rating.toFixed(1)}</span>
                <span>({product.total_reviews})</span>
              </div>
            )}
          </div>

          <Button
            size="sm"
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to cart functionality
              console.log('Add to cart:', product.id);
            }}
          >
            {inStock ? 'Ajouter' : 'Épuisé'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
