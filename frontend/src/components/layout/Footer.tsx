import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🛍️ Marsoukin</h3>
            <p className="text-gray-400 text-sm">
              Plateforme marocaine dédiée à l'artisanat authentique.
              Découvrez des produits uniques créés par des artisans locaux.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-400 hover:text-white">Produits</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white">Catégories</Link></li>
              <li><Link href="/artisans" className="text-gray-400 hover:text-white">Artisans</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">À propos</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Livraison</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Retours</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 contact@marsoukin.ma</li>
              <li>📱 +212 600 000 000</li>
              <li>📍 Marrakech, Maroc</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Marsoukin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
