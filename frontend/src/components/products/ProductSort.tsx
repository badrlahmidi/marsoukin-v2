// frontend/src/components/products/ProductSort.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSortProps {
  onSortChange: (sort: string) => void;
}

export default function ProductSort({ onSortChange }: ProductSortProps) {
  const [selectedSort, setSelectedSort] = useState('popular');

  const sortOptions = [
    { value: 'popular', label: 'Plus populaires' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'rating', label: 'Mieux notés' },
  ];

  const handleChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <div className="relative inline-block">
      <label className="text-sm text-gray-600 mr-2">Trier par:</label>
      <div className="relative inline-block">
        <select
          value={selectedSort}
          onChange={(e) => handleChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
