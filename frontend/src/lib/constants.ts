// Configuration de l'application
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Marsoukin';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Pagination
export const PRODUCTS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE || '12');
export const ARTISANS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ARTISANS_PER_PAGE || '12');

// Upload
export const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'); // 5MB
export const ALLOWED_IMAGE_TYPES = (process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp').split(',');

// Cache TTL (en millisecondes)
export const CACHE_TTL = parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'); // 5 minutes

// Rôles utilisateurs
export const USER_ROLES = {
  ADMIN: 'admin',
  ARTISAN: 'artisan',
  CUSTOMER: 'customer',
} as const;

// Statuts de commande
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  processing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

// Méthodes de paiement
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash_on_delivery: 'Paiement à la livraison',
  bank_transfer: 'Virement bancaire',
  credit_card: 'Carte bancaire',
};

// Villes du Maroc (principales)
export const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Fès',
  'Marrakech',
  'Tanger',
  'Salé',
  'Meknès',
  'Oujda',
  'Kenitra',
  'Agadir',
  'Tétouan',
  'Safi',
  'Mohammedia',
  'Khouribga',
  'El Jadida',
  'Beni Mellal',
  'Aït Melloul',
  'Nador',
  'Dar Bouazza',
  'Settat',
];

// Réseaux sociaux
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/marsoukin',
  instagram: 'https://instagram.com/marsoukin',
  twitter: 'https://twitter.com/marsoukin',
};