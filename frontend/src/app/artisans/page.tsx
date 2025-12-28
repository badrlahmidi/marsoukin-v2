'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ArtisansPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Nos Artisans
        </h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">👨‍🎨</div>
          <p className="text-gray-600 text-lg">
            Page en construction. Les artisans seront bientôt disponibles !
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
