# 🏺 Marsoukin

> Plateforme e-commerce multi-vendeurs dédiée à l'artisanat marocain traditionnel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)

## 📝 Description

**Marsoukin** est une marketplace inspirée d'Etsy, conçue pour promouvoir et vendre l'artisanat marocain authentique. La plateforme connecte les artisans locaux avec des acheteurs du monde entier, tout en offrant une expérience d'achat fluide et sécurisée.

### ✨ Fonctionnalités Principales

- 🛍️ **Multi-vendeurs**: Chaque artisan gère sa propre boutique
- 🌐 **Interface multilingue**: Support de l'arabe, du français et de l'anglais
- 💳 **Paiements sécurisés**: Cash on delivery, cartes bancaires, virements
- 📦 **Gestion logistique**: Suivi des commandes par artisan
- 📊 **Tableau de bord artisan**: Statistiques, gestion des produits et commandes
- 🛡️ **Panel admin**: Modération, gestion des commissions, validation des artisans
- ⭐ **Système d'avis**: Les acheteurs peuvent laisser des reviews
- 🔍 **Recherche avancée**: Filtres par catégorie, prix, ville d'origine

## 🛠️ Stack Technique

### Backend
- **Framework**: Laravel 11
- **Base de données**: MySQL 8.0+ / PostgreSQL 14+
- **API**: RESTful avec Laravel Sanctum
- **Admin**: FilamentPHP v3
- **Storage**: Laravel Storage (Local/S3)
- **Cache**: Redis
- **Queue**: Laravel Queue

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Axios
- **Forms**: React Hook Form + Zod

## 📂 Structure du Projet

```
marsoukin-v2/
├── backend/           # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   ├── Policies/
│   │   └── Services/
│   ├── database/migrations/
│   └── routes/api.php
├── frontend/          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── public/
└── docs/              # Documentation
    └── PROJECT_STRUCTURE.md
```

Pour la structure détaillée, consultez [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)

## 🚀 Installation

### Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+ ou PostgreSQL 14+
- Redis (optionnel, recommandé)

### Backend (Laravel)

```bash
# Cloner le repository
git clone https://github.com/badrlahmidi/marsoukin-v2.git
cd marsoukin-v2/backend

# Installer les dépendances
composer install

# Configuration
cp .env.example .env
php artisan key:generate

# Configurer la base de données dans .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=marsoukin
DB_USERNAME=root
DB_PASSWORD=

# Migrations et seeders
php artisan migrate
php artisan db:seed

# Lancer le serveur
php artisan serve
```

### Frontend (Next.js)

```bash
cd ../frontend

# Installer les dépendances
npm install
# ou
yarn install

# Configuration
cp .env.example .env.local

# Configurer l'API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Lancer en mode développement
npm run dev
# ou
yarn dev
```

Accédez à l'application sur `http://localhost:3000`

## 📚 Routes API Principales

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/me
```

### Produits
```
GET    /api/products
GET    /api/products/{id}
GET    /api/categories
```

### Espace Artisan
```
GET    /api/artisan/dashboard
GET    /api/artisan/products
POST   /api/artisan/products
PUT    /api/artisan/products/{id}
GET    /api/artisan/orders
```

Pour la documentation complète des routes, consultez [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md#routes-api-principales)

## 👥 Utilisateurs par Défaut (Seeders)

Après avoir exécuté les seeders, vous pouvez vous connecter avec :

**Admin**
- Email: `admin@marsoukin.ma`
- Password: `password`

**Artisan**
- Email: `artisan@example.com`
- Password: `password`

**Acheteur**
- Email: `buyer@example.com`
- Password: `password`

## 🧪 Tests

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run test
# ou
yarn test
```

## 📦 Déploiement

### Backend
- **Recommandé**: Laravel Forge, DigitalOcean, AWS EC2
- **Serveur Web**: Nginx ou Apache
- **Process Manager**: Supervisor (pour les queues)

### Frontend
- **Recommandé**: Vercel, Netlify
- **Alternative**: VPS avec PM2

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Badr Lahmidi**
- GitHub: [@badrlahmidi](https://github.com/badrlahmidi)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

<p align="center">Fait avec ❤️ pour promouvoir l'artisanat marocain</p>
