export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  products_count?: number;
  children?: Category[];
  parent?: Category;
  created_at: string;
  updated_at: string;
}