import { create } from 'zustand';
import { Product, ProductFilters, Category } from '@/types';
import { productService, categoryService } from '@/services';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  categories: Category[];
  currentProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
  };
  
  // Actions
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProduct: (slug: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {
  page: 1,
  per_page: 12,
  sort_by: 'created_at',
  sort_order: 'desc',
};

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  filters: initialFilters,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  },

  fetchProducts: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const mergedFilters = { ...get().filters, ...filters };
      const response = await productService.getProducts(mergedFilters);
      
      set({
        products: response.data,
        pagination: {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          total: response.meta.total,
          perPage: response.meta.per_page,
        },
        filters: mergedFilters,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de chargement des produits';
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await productService.getFeaturedProducts();
      set({ featuredProducts: products, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de chargement';
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoryService.getCategories();
      set({ categories });
    } catch (error: any) {
      console.error('Erreur de chargement des catégories:', error);
    }
  },

  fetchProduct: async (slug) => {
    set({ isLoading: true, error: null, currentProduct: null });
    try {
      const product = await productService.getProduct(slug);
      set({ currentProduct: product, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Produit non trouvé';
      set({ error: errorMessage, isLoading: false });
    }
  },

  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productService.searchProducts(query, get().filters);
      set({
        products: response.data,
        pagination: {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          total: response.meta.total,
          perPage: response.meta.per_page,
        },
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de recherche';
      set({ error: errorMessage, isLoading: false });
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },
}));