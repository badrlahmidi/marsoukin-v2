'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          À propos de Marsoukin
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="text-6xl text-center mb-6">🎨</div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Marsoukin est une plateforme marocaine dédiée à la promotion et à la vente de l'artisanat local. 
              Notre mission est de connecter les artisans talentueux du Maroc avec des clients à travers tout le pays.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nous croyons en la préservation du patrimoine artisanal marocain et offrons une vitrine moderne 
              pour les créateurs passionnés qui perpétuent les traditions ancestrales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre Mission</h3>
              <p className="text-gray-600">
                Valoriser l'artisanat marocain en offrant une plateforme accessible et moderne
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre Communauté</h3>
              <p className="text-gray-600">
                Plus de 100 artisans partenaires dans toutes les régions du Maroc
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre Engagement</h3>
              <p className="text-gray-600">
                Qualité garantie, authenticité certifiée et commerce équitable
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi choisir Marsoukin ?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Produits artisanaux authentiques 100% marocains</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Soutien direct aux artisans locaux</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Livraison dans tout le Maroc</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Service client réactif et professionnel</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Paiement sécurisé et garantie satisfaction</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
