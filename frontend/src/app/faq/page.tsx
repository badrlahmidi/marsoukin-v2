'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    category: 'Commandes',
    question: 'Comment passer une commande ?',
    answer: 'Pour passer une commande, ajoutez simplement les produits à votre panier, puis cliquez sur "Passer la commande". Suivez les étapes pour renseigner vos informations de livraison et de paiement.'
  },
  {
    category: 'Commandes',
    question: 'Puis-je modifier ma commande après validation ?',
    answer: 'Vous pouvez modifier votre commande dans les 2 heures suivant sa validation. Contactez notre service client pour toute modification.'
  },
  {
    category: 'Livraison',
    question: 'Quels sont les délais de livraison ?',
    answer: 'Les délais de livraison sont généralement de 2 à 5 jours ouvrables pour tout le Maroc. Les commandes sont expédiées sous 24h après validation.'
  },
  {
    category: 'Livraison',
    question: 'La livraison est-elle gratuite ?',
    answer: 'La livraison est gratuite pour toute commande supérieure à 500 MAD. Pour les commandes inférieures, des frais de 30 MAD s\'appliquent.'
  },
  {
    category: 'Paiement',
    question: 'Quels modes de paiement acceptez-vous ?',
    answer: 'Nous acceptons les paiements par carte bancaire, paiement à la livraison (cash), et virement bancaire.'
  },
  {
    category: 'Paiement',
    question: 'Le paiement en ligne est-il sécurisé ?',
    answer: 'Oui, tous nos paiements en ligne sont sécurisés via un système de cryptage SSL. Vos données bancaires sont protégées.'
  },
  {
    category: 'Retours',
    question: 'Puis-je retourner un produit ?',
    answer: 'Vous avez 14 jours après réception pour retourner un produit non utilisé dans son emballage d\'origine. Les frais de retour sont à votre charge.'
  },
  {
    category: 'Retours',
    question: 'Comment faire un retour ?',
    answer: 'Contactez notre service client pour obtenir une autorisation de retour. Renvoyez ensuite le produit à l\'adresse indiquée. Le remboursement sera effectué sous 7 jours après réception.'
  },
  {
    category: 'Produits',
    question: 'Les produits sont-ils authentiques ?',
    answer: 'Oui, tous nos produits sont 100% authentiques et fabriqués par des artisans marocains certifiés. Chaque produit est vérifié avant expédition.'
  },
  {
    category: 'Produits',
    question: 'Puis-je personnaliser un produit ?',
    answer: 'Certains artisans proposent des services de personnalisation. Contactez-nous pour vérifier la disponibilité pour le produit souhaité.'
  }
];

const FAQAccordion: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{item.question}</span>
        <span className="text-2xl text-gray-500">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700">
          {item.answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');

  const categories = ['Toutes', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filteredFaqs = selectedCategory === 'Toutes'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Foire Aux Questions (FAQ)
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions les plus fréquentes
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Catégories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div>
            {filteredFaqs.map((faq, index) => (
              <FAQAccordion
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-blue-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Vous n'avez pas trouvé la réponse à votre question ?
            </h3>
            <p className="text-gray-600 mb-4">
              Notre équipe est là pour vous aider
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
