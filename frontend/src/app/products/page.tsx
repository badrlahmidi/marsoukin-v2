// frontend/src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductSort from '@/components/products/ProductSort';
import Pagination from '@/components/products/Pagination';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  search?: string;
  sort?: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Charger les produits
  useEffect(() => {
    loadProducts();
  }, [currentPage, filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({
        page: currentPage,
        per_page: 12,
        ...filters,
      });
      
      setProducts(response.data);
      setTotalPages(response.meta.last_page);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue: string) => {
    setFilters({ ...filters, sort: sortValue });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Découvrez nos produits artisanaux
          </h1>
          <p className="text-gray-600">
            {loading ? 'Chargement...' : `${products.length} produits disponibles`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
              <ProductSort onSortChange={handleSortChange} />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : products.length > 0 ? (
              <>
                <ProductGrid products={products} />
                
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  Aucun produit trouvé avec ces filtres
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
