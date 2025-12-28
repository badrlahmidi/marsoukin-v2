'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ShippingPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Livraison & Expédition
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚚 Délais de livraison</h2>
              <p className="text-gray-700 mb-4">
                Nous nous engageons à livrer vos commandes dans les meilleurs délais. Les délais indicatifs sont les suivants :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Casablanca & Rabat:</strong> 2-3 jours ouvrables</li>
                <li><strong>Grandes villes:</strong> 3-4 jours ouvrables</li>
                <li><strong>Autres régions:</strong> 4-5 jours ouvrables</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Frais de livraison</h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  🎉 Livraison GRATUITE pour les commandes supérieures à 500 MAD
                </p>
                <p className="text-gray-700">
                  Pour les commandes inférieures à 500 MAD, des frais de livraison de 30 MAD s'appliquent.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Traitement des commandes</h2>
              <p className="text-gray-700 mb-4">
                Toutes les commandes passées avant 15h du lundi au vendredi sont traitées le jour même. 
                Les commandes passées après 15h ou pendant le week-end seront traitées le jour ouvrable suivant.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Suivi de commande</h2>
              <p className="text-gray-700 mb-4">
                Dès l'expédition de votre commande, vous recevrez un email de confirmation avec un numéro de suivi. 
                Vous pourrez suivre votre colis en temps réel via votre compte ou en contactant notre service client.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏠 Zones de livraison</h2>
              <p className="text-gray-700 mb-4">
                Nous livrons dans tout le Maroc, y compris :
              </p>
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                <li>✓ Casablanca</li>
                <li>✓ Rabat</li>
                <li>✓ Marrakech</li>
                <li>✓ Fès</li>
                <li>✓ Tanger</li>
                <li>✓ Agadir</li>
                <li>✓ Oujda</li>
                <li>✓ Tétouan</li>
                <li>✓ Meknès</li>
                <li>✓ Essaouira</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Et toutes les autres villes et régions du royaume.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Emballage</h2>
              <p className="text-gray-700 mb-4">
                Tous nos produits sont soigneusement emballés pour garantir leur protection pendant le transport. 
                Les articles fragiles bénéficient d'un emballage renforcé.
              </p>
            </section>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions sur la livraison ?</h3>
              <p className="text-gray-700 mb-4">
                Notre service client est à votre disposition pour toute question concernant la livraison.
              </p>
              <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contactez-nous →
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
