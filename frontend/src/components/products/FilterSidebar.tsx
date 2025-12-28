// frontend/src/components/products/FilterSidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types/product';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

export default function FilterSidebar({ onFilterChange, currentFilters }: FilterSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [localFilters, setLocalFilters] = useState({
    category: currentFilters.category || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
    city: currentFilters.city || '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const applyFilters = () => {
    const cleanFilters = Object.entries(localFilters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
    onFilterChange(cleanFilters);
  };

  const resetFilters = () => {
    const emptyFilters = { category: '', minPrice: '', maxPrice: '', city: '' };
    setLocalFilters(emptyFilters);
    onFilterChange({});
  };

  const cities = ['Fès', 'Marrakech', 'Casablanca', 'Rabat', 'Meknès', 'Tanger', 'Agadir', 'Essaouira'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        <button onClick={resetFilters} className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          <X className="w-4 h-4" /> Réinitialiser
        </button>
      </div>

      {/* Catégories */}
      <div className="mb-6 border-b pb-6">
        <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="category" value="" checked={localFilters.category === ''} onChange={(e) => handleFilterChange('category', e.target.value)} className="w-4 h-4 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-700">Toutes</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center">
              <input type="radio" name="category" value={cat.slug} checked={localFilters.category === cat.slug} onChange={(e) => handleFilterChange('category', e.target.value)} className="w-4 h-4 text-indigo-600" />
              <span className="ml-2 text-sm text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="mb-6 border-b pb-6">
        <h3 className="font-medium text-gray-900 mb-3">Prix (MAD)</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Min</label>
            <input type="number" placeholder="0" value={localFilters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Max</label>
            <input type="number" placeholder="10000" value={localFilters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Ville */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Ville d'origine</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="city" value="" checked={localFilters.city === ''} onChange={(e) => handleFilterChange('city', e.target.value)} className="w-4 h-4 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-700">Toutes</span>
          </label>
          {cities.map((city) => (
            <label key={city} className="flex items-center">
              <input type="radio" name="city" value={city} checked={localFilters.city === city} onChange={(e) => handleFilterChange('city', e.target.value)} className="w-4 h-4 text-indigo-600" />
              <span className="ml-2 text-sm text-gray-700">{city}</span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={applyFilters} className="w-full">Appliquer les filtres</Button>
    </div>
  );
}
