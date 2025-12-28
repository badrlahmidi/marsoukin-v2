'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ReturnsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Politique de Retour & Remboursement
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Délai de retour</h2>
              <p className="text-gray-700 mb-4">
                Vous disposez de <strong>14 jours</strong> à compter de la réception de votre commande pour nous retourner 
                un produit qui ne vous convient pas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Conditions de retour</h2>
              <p className="text-gray-700 mb-4">
                Pour être accepté, un retour doit respecter les conditions suivantes :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Le produit doit être dans son état d'origine, non utilisé et non endommagé</li>
                <li>✓ L'emballage d'origine doit être conservé</li>
                <li>✓ Toutes les étiquettes doivent être intactes</li>
                <li>✓ Les accessoires et documentation doivent être inclus</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Procédure de retour</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Contactez-nous</h4>
                    <p className="text-gray-700">
                      Envoyez un email à <a href="mailto:contact@marsoukin.ma" className="text-blue-600">contact@marsoukin.ma</a> avec votre numéro de commande et le motif du retour.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Recevez l'autorisation</h4>
                    <p className="text-gray-700">
                      Nous vous enverrons une autorisation de retour avec l'adresse d'expédition sous 24-48h.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Renvoyez le produit</h4>
                    <p className="text-gray-700">
                      Emballez soigneusement le produit et expédiez-le à l'adresse indiquée. Les frais de retour sont à votre charge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Recevez votre remboursement</h4>
                    <p className="text-gray-700">
                      Après réception et vérification du produit, vous serez remboursé sous 7 jours ouvrables.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Modalités de remboursement</h2>
              <p className="text-gray-700 mb-4">
                Le remboursement sera effectué selon le mode de paiement initial :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Carte bancaire:</strong> Crédit sur votre compte sous 5-7 jours</li>
                <li><strong>Paiement à la livraison:</strong> Virement bancaire (coordonnées bancaires requises)</li>
                <li><strong>Virement:</strong> Virement bancaire sur le compte d'origine</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⛔ Produits non retournables</h2>
              <p className="text-gray-700 mb-4">
                Certains produits ne peuvent pas être retournés pour des raisons d'hygiène ou de personnalisation :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Produits personnalisés ou sur mesure</li>
                <li>✗ Produits alimentaires</li>
                <li>✗ Produits d'hygiène personnelle</li>
                <li>✗ Produits soldés ou en promotion spéciale (sauf défaut)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Produits défectueux</h2>
              <p className="text-gray-700 mb-4">
                Si vous recevez un produit défectueux ou endommagé, contactez-nous immédiatement. 
                Nous prendrons en charge les frais de retour et procéderons à un remplacement ou remboursement complet.
              </p>
            </section>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
              <div className="flex">
                <div className="text-2xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Important</h3>
                  <p className="text-gray-700">
                    Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part. 
                    Nous vous recommandons d'utiliser un service de livraison avec suivi.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions sur les retours ?</h3>
              <p className="text-gray-700 mb-4">
                Notre équipe est là pour vous aider avec votre demande de retour.
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
