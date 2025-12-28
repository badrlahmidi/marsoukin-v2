'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import Link from 'next/link';

type Category = {
  name: string;
  slug: string;
  emoji: string;
  description: string;
};

const categories: Category[] = [
  {
    name: 'Tajines',
    slug: 'tajines',
    emoji: '🍲',
    description: 'Tajines traditionnels en terre cuite, parfaits pour vos plats marocains'
  },
  {
    name: 'Tapis',
    slug: 'tapis',
    emoji: '🧶',
    description: 'Tapis berbères authentiques tissés à la main'
  },
  {
    name: 'Poterie',
    slug: 'poterie',
    emoji: '🏺',
    description: 'Poteries et céramiques marocaines décorées'
  },
  {
    name: 'Bijoux',
    slug: 'bijoux',
    emoji: '💍',
    description: 'Bijoux artisanaux en argent et pierres semi-précieuses'
  },
  {
    name: 'Maroquinerie',
    slug: 'maroquinerie',
    emoji: '👜',
    description: 'Sacs, ceintures et accessoires en cuir véritable'
  },
  {
    name: 'Décoration',
    slug: 'decoration',
    emoji: '🏠',
    description: 'Objets décoratifs pour embellir votre intérieur'
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    emoji: '🧵',
    description: 'Caftans, djellabas et vêtements traditionnels'
  },
  {
    name: 'Lampes',
    slug: 'lampes',
    emoji: '💡',
    description: 'Lampes et lanternes orientales en fer forgé'
  },
  {
    name: 'Épices',
    slug: 'epices',
    emoji: '🌶️',
    description: 'Épices et mélanges authentiques du Maroc'
  },
  {
    name: 'Bois',
    slug: 'bois',
    emoji: '🪵',
    description: 'Objets sculptés en bois de thuya et cèdre'
  },
  {
    name: 'Cosmétiques',
    slug: 'cosmetiques',
    emoji: '🧼',
    description: 'Produits naturels : argan, savon noir, ghassoul'
  },
  {
    name: 'Vannerie',
    slug: 'vannerie',
    emoji: '🧱',
    description: 'Paniers tressés en osier et fibres naturelles'
  }
];

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Catégories de Produits
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explorez notre large sélection d'artisanat marocain classé par catégorie
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm flex-1">
                  {category.description}
                </p>
                <div className="mt-4 text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Découvrir →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-lg mb-6 text-blue-100">
            Parcourez tous nos produits ou utilisez la recherche
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
                Voir tous les produits
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-colors">
                Contactez-nous
              </button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
