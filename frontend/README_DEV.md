# Marsoukin Frontend - Guide de Développement

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Backend Laravel en cours d'exécution sur `http://localhost:8000`

### Installation

```bash
# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📋 Configuration

### Variables d'environnement (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Marsoukin
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏛️ Architecture

### Structure des dossiers

```
src/
├── app/                 # Pages Next.js (App Router)
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Homepage
│   ├── login/
│   ├── register/
│   ├── products/
│   ├── cart/
│   └── profile/
├── components/         # Composants réutilisables
│   ├── layout/          # Header, Footer, Nav
│   └── ui/              # Composants UI (buttons, cards, etc.)
├── lib/                # Utilitaires
│   ├── axios.ts         # Configuration API
│   ├── utils.ts         # Fonctions utilitaires
│   └── constants.ts     # Constantes de l'app
├── services/           # Services API
│   ├── authService.ts
│   ├── productService.ts
│   ├── cartService.ts
│   └── orderService.ts
├── store/              # Zustand stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── productStore.ts
├── types/              # Types TypeScript
│   ├── auth.ts
│   ├── product.ts
│   ├── cart.ts
│   └── order.ts
├── hooks/              # Custom hooks
│   ├── useAuth.ts
│   └── useCart.ts
└── middleware.ts       # Middleware Next.js
```

## 📦 Gestion de l'État

### Zustand Stores

#### Auth Store
```typescript
import { useAuthStore } from '@/store';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  // ...
}
```

#### Cart Store
```typescript
import { useCartStore } from '@/store';

function MyComponent() {
  const { cart, addToCart, removeItem } = useCartStore();
  // ...
}
```

## 🔗 Services API

Tous les services sont prêt-configurés avec Axios et incluent la gestion des tokens.

### Exemple d'utilisation

```typescript
import { productService } from '@/services';

const products = await productService.getProducts({
  category_id: 1,
  page: 1,
  per_page: 12,
});
```

## 🎨 Composants UI

### Utiliser les composants

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## 🔒 Protection des Routes

Le middleware protège automatiquement les routes sensibles.

### Routes protégées
- `/profile`
- `/cart`
- `/checkout`
- `/orders`

### Utiliser le hook useAuth

```typescript
import { useRequireAuth } from '@/hooks';

function ProtectedPage() {
  const { user, isLoading } = useRequireAuth();
  
  if (isLoading) return <div>Chargement...</div>;
  
  return <div>Bonjour {user?.name}</div>;
}
```

## 🧰 Utilitaires

### Formatage

```typescript
import { formatPrice, formatDate, getImageUrl } from '@/lib/utils';

formatPrice(1500); // "1 500,00 MAD"
formatDate(new Date()); // "28/12/2025"
getImageUrl('products/image.jpg'); // URL complète
```

## 🐛 Débogage

### Logs API
Les requêtes API sont automatiquement loggées dans la console.

### Erreurs
Les erreurs sont capturées par les intercepteurs Axios et affichées avec toast.

## 📚 Prochaines Étapes

Consultez les issues GitHub pour voir les fonctionnalités à implémenter :
- [Issue #11](https://github.com/badrlahmidi/marsoukin-v2/issues/11) - Architecture ✅
- [Issue #12](https://github.com/badrlahmidi/marsoukin-v2/issues/12) - Layout
- [Issue #13](https://github.com/badrlahmidi/marsoukin-v2/issues/13) - Pages Produits
- [Issue #14](https://github.com/badrlahmidi/marsoukin-v2/issues/14) - Panier & Checkout

## 🤝 Contribution

Voir [CONTRIBUTING.md](../CONTRIBUTING.md) pour les guidelines.
