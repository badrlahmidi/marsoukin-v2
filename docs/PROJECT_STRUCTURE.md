# MARSOUKIN - Structure du Projet

## Architecture Globale

```
marsoukin-v2/
├── backend/          # Laravel 11 API Backend
├── frontend/         # React/Next.js Frontend
├── docs/            # Documentation
└── README.md        # Documentation principale
```

## Backend - Laravel 11

### Structure des Dossiers

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── RegisterController.php
│   │   │   │   │   └── LoginController.php
│   │   │   │   ├── Buyer/
│   │   │   │   │   ├── ProductController.php
│   │   │   │   │   ├── CartController.php
│   │   │   │   │   ├── CheckoutController.php
│   │   │   │   │   ├── OrderController.php
│   │   │   │   │   └── ReviewController.php
│   │   │   │   ├── Artisan/
│   │   │   │   │   ├── ArtisanProductController.php
│   │   │   │   │   ├── ArtisanOrderController.php
│   │   │   │   │   ├── ArtisanDashboardController.php
│   │   │   │   │   └── ArtisanPayoutController.php
│   │   │   │   └── Admin/
│   │   │   │       ├── AdminArtisanController.php
│   │   │   │       ├── AdminProductController.php
│   │   │   │       ├── AdminOrderController.php
│   │   │   │       ├── AdminCategoryController.php
│   │   │   │       └── AdminCommissionController.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   ├── Product/
│   │   │   ├── Order/
│   │   │   └── Artisan/
│   │   ├── Middleware/
│   │   └── Resources/
│   ├── Models/
│   │   ├── User.php
│   │   ├── ArtisanProfile.php
│   │   ├── Shop.php
│   │   ├── Category.php
│   │   ├── Product.php
│   │   ├── ProductImage.php
│   │   ├── ProductVariant.php
│   │   ├── Cart.php
│   │   ├── CartItem.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── OrderShipment.php
│   │   ├── Address.php
│   │   ├── Commission.php
│   │   ├── Payout.php
│   │   └── Review.php
│   ├── Policies/
│   │   ├── ProductPolicy.php
│   │   ├── OrderPolicy.php
│   │   └── ArtisanPolicy.php
│   ├── Services/
│   │   ├── PaymentService.php
│   │   ├── CommissionService.php
│   │   └── NotificationService.php
│   └── Providers/
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_users_table.php
│   │   ├── 2024_01_01_000001_create_artisan_profiles_table.php
│   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   ├── 2024_01_01_000003_create_products_table.php
│   │   ├── 2024_01_01_000004_create_product_images_table.php
│   │   ├── 2024_01_01_000005_create_product_variants_table.php
│   │   ├── 2024_01_01_000006_create_addresses_table.php
│   │   ├── 2024_01_01_000007_create_carts_table.php
│   │   ├── 2024_01_01_000008_create_cart_items_table.php
│   │   ├── 2024_01_01_000009_create_orders_table.php
│   │   ├── 2024_01_01_000010_create_order_items_table.php
│   │   ├── 2024_01_01_000011_create_commissions_table.php
│   │   ├── 2024_01_01_000012_create_payouts_table.php
│   │   └── 2024_01_01_000013_create_reviews_table.php
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   ├── CategorySeeder.php
│   │   └── ProductSeeder.php
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
├── config/
├── tests/
│   ├── Feature/
│   └── Unit/
└── storage/
```

## Frontend - React/Next.js + TypeScript

### Structure des Dossiers

```
frontend/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                    # Home
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                # Products listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Product detail
│   │   │   ├── shops/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Shop detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   └── account/
│   │   │       └── orders/
│   │   │           ├── page.tsx
│   │   │           └── [id]/
│   │   │               └── page.tsx        # Order detail
│   │   └── (artisan)/
│   │       ├── artisan/
│   │       │   ├── dashboard/
│   │       │   │   └── page.tsx
│   │       │   ├── products/
│   │       │   │   ├── page.tsx
│   │       │   │   ├── new/
│   │       │   │   │   └── page.tsx
│   │       │   │   └── [id]/
│   │       │   │       └── page.tsx
│   │       │   ├── orders/
│   │       │   │   ├── page.tsx
│   │       │   │   └── [id]/
│   │       │   │       └── page.tsx
│   │       │   └── payouts/
│   │       │       └── page.tsx
│   │       └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── SidebarArtisan.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   └── ProductForm.tsx
│   │   ├── shop/
│   │   │   ├── ShopHeader.tsx
│   │   │   ├── ShopTabs.tsx
│   │   │   └── ShopCard.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── order/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderTimeline.tsx
│   │   │   └── OrderItems.tsx
│   │   └── forms/
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       └── ImageUpload.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── productService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── cartService.ts
│   │   │   └── authService.ts
│   │   └── utils.ts
│   ├── store/
│   │   ├── cartStore.ts
│   │   ├── userStore.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── user.ts
│   │   └── cart.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── icons/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Routes API Principales

### Authentication
```
POST   /api/auth/register           # Inscription acheteur
POST   /api/auth/register-artisan    # Inscription artisan
POST   /api/auth/login               # Connexion
POST   /api/auth/logout              # Déconnexion
GET    /api/me                       # Profil utilisateur
```

### Catalogue Public
```
GET    /api/categories               # Liste des catégories
GET    /api/products                 # Liste des produits (+ filtres)
GET    /api/products/{id}            # Détail produit
GET    /api/shops                    # Liste des boutiques
GET    /api/shops/{id}               # Détail boutique
```

### Panier & Commande (Acheteur)
```
GET    /api/cart                     # Mon panier
POST   /api/cart/items               # Ajouter au panier
PUT    /api/cart/items/{id}          # Modifier quantité
DELETE /api/cart/items/{id}          # Supprimer du panier
POST   /api/checkout                 # Finaliser commande
GET    /api/orders                   # Mes commandes
GET    /api/orders/{id}              # Détail commande
```

### Espace Artisan
```
GET    /api/artisan/dashboard        # Statistiques
GET    /api/artisan/products         # Mes produits
POST   /api/artisan/products         # Créer produit
GET    /api/artisan/products/{id}    # Détail produit
PUT    /api/artisan/products/{id}    # Modifier produit
DELETE /api/artisan/products/{id}    # Supprimer produit
POST   /api/artisan/products/{id}/images  # Upload image
GET    /api/artisan/orders           # Commandes reçues
GET    /api/artisan/orders/{id}      # Détail commande
PUT    /api/artisan/orders/{id}/status    # Changer statut
GET    /api/artisan/payouts          # Mes paiements
```

### Admin
```
GET    /api/admin/artisans           # Gérer artisans
PUT    /api/admin/artisans/{id}/approve   # Approuver artisan
PUT    /api/admin/artisans/{id}/suspend   # Suspendre artisan
GET    /api/admin/products           # Modération produits
PUT    /api/admin/products/{id}/status    # Changer statut produit
GET    /api/admin/orders             # Toutes les commandes
GET    /api/admin/payouts            # Gérer paiements
POST   /api/admin/commissions        # Gérer commissions
```

## Schémas de Base de Données

### users
```sql
id                  BIGINT PRIMARY KEY
name                VARCHAR(255)
email               VARCHAR(255) UNIQUE
password            VARCHAR(255)
role                ENUM('buyer', 'artisan', 'admin')
phone               VARCHAR(50) NULL
email_verified_at   TIMESTAMP NULL
remember_token      VARCHAR(100) NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### artisan_profiles
```sql
id                      BIGINT PRIMARY KEY
user_id                 BIGINT FOREIGN KEY -> users.id
shop_name               VARCHAR(255)
slug                    VARCHAR(255) UNIQUE
city                    VARCHAR(100)
country                 VARCHAR(100) DEFAULT 'Morocco'
bio                     TEXT NULL
logo_url                VARCHAR(255) NULL
banner_url              VARCHAR(255) NULL
identity_document_url   VARCHAR(255) NULL
status                  ENUM('pending', 'approved', 'rejected', 'suspended')
created_at              TIMESTAMP
updated_at              TIMESTAMP
```

### categories
```sql
id           BIGINT PRIMARY KEY
parent_id    BIGINT NULL FOREIGN KEY -> categories.id
name         VARCHAR(255)
slug         VARCHAR(255) UNIQUE
description  TEXT NULL
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

### products
```sql
id                  BIGINT PRIMARY KEY
artisan_profile_id  BIGINT FOREIGN KEY -> artisan_profiles.id
category_id         BIGINT FOREIGN KEY -> categories.id
title               VARCHAR(255)
slug                VARCHAR(255) UNIQUE
description         TEXT
base_price          DECIMAL(10,2)
currency            VARCHAR(10) DEFAULT 'MAD'
stock               INT
status              ENUM('draft', 'active', 'hidden', 'rejected')
is_featured         BOOLEAN DEFAULT false
weight              DECIMAL(10,2) NULL
dimensions          VARCHAR(100) NULL
origin_city         VARCHAR(100) NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### product_images
```sql
id          BIGINT PRIMARY KEY
product_id  BIGINT FOREIGN KEY -> products.id
url         VARCHAR(255)
is_primary  BOOLEAN DEFAULT false
position    INT
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### product_variants
```sql
id          BIGINT PRIMARY KEY
product_id  BIGINT FOREIGN KEY -> products.id
sku         VARCHAR(100) UNIQUE
name        VARCHAR(255)
price       DECIMAL(10,2) NULL
stock       INT
attributes  JSON
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### orders
```sql
id                      BIGINT PRIMARY KEY
user_id                 BIGINT FOREIGN KEY -> users.id
order_number            VARCHAR(50) UNIQUE
status                  ENUM('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')
payment_method          ENUM('cod', 'card', 'bank_transfer')
payment_status          ENUM('pending', 'paid', 'failed', 'refunded')
subtotal                DECIMAL(10,2)
shipping_total          DECIMAL(10,2)
commission_total        DECIMAL(10,2)
total                   DECIMAL(10,2)
currency                VARCHAR(10) DEFAULT 'MAD'
shipping_address_id     BIGINT FOREIGN KEY -> addresses.id
billing_address_id      BIGINT FOREIGN KEY -> addresses.id
notes                   TEXT NULL
created_at              TIMESTAMP
updated_at              TIMESTAMP
```

### order_items
```sql
id                  BIGINT PRIMARY KEY
order_id            BIGINT FOREIGN KEY -> orders.id
product_id          BIGINT FOREIGN KEY -> products.id
product_variant_id  BIGINT NULL FOREIGN KEY -> product_variants.id
artisan_profile_id  BIGINT FOREIGN KEY -> artisan_profiles.id
quantity            INT
unit_price          DECIMAL(10,2)
total_price         DECIMAL(10,2)
commission_amount   DECIMAL(10,2)
status              ENUM('pending', 'accepted', 'shipped', 'completed', 'cancelled')
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### addresses
```sql
id              BIGINT PRIMARY KEY
user_id         BIGINT FOREIGN KEY -> users.id
type            ENUM('billing', 'shipping')
full_name       VARCHAR(255)
phone           VARCHAR(50)
address_line1   VARCHAR(255)
address_line2   VARCHAR(255) NULL
city            VARCHAR(100)
postal_code     VARCHAR(20)
country         VARCHAR(100) DEFAULT 'Morocco'
is_default      BOOLEAN DEFAULT false
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### commissions
```sql
id          BIGINT PRIMARY KEY
name        VARCHAR(255)
percentage  DECIMAL(5,2)
category_id BIGINT NULL FOREIGN KEY -> categories.id
is_active   BOOLEAN DEFAULT true
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### payouts
```sql
id                  BIGINT PRIMARY KEY
artisan_profile_id  BIGINT FOREIGN KEY -> artisan_profiles.id
amount              DECIMAL(10,2)
currency            VARCHAR(10) DEFAULT 'MAD'
status              ENUM('pending', 'processing', 'paid', 'failed')
method              ENUM('bank_transfer', 'cash', 'other')
period_start        DATE NULL
period_end          DATE NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### reviews
```sql
id              BIGINT PRIMARY KEY
order_item_id   BIGINT FOREIGN KEY -> order_items.id
user_id         BIGINT FOREIGN KEY -> users.id
product_id      BIGINT FOREIGN KEY -> products.id
rating          TINYINT (1-5)
comment         TEXT NULL
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

## Technologies Utilisées

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: MySQL 8.0+ / PostgreSQL 14+
- **Authentication**: Laravel Sanctum
- **Admin Panel**: FilamentPHP v3
- **API**: RESTful API
- **File Storage**: Laravel Storage (Local/S3)
- **Queue**: Laravel Queue (Redis)
- **Cache**: Redis

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand / Redux Toolkit
- **API Client**: Axios
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Image Upload**: react-dropzone

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Deployment**: 
  - Backend: VPS (Ubuntu) / Laravel Forge
  - Frontend: Vercel / Netlify
- **Database Hosting**: Managed MySQL/PostgreSQL
- **File Storage**: AWS S3 / DigitalOcean Spaces

## Points Clés d'Architecture

### Multi-vendeurs
- Chaque commande est **splittée** par artisan via `order_items.artisan_profile_id`
- Les artisans voient uniquement leurs produits dans les commandes
- Le calcul de commission se fait automatiquement par `CommissionService`

### Gestion des Rôles
- **Buyer**: Peut acheter, voir ses commandes, laisser des avis
- **Artisan**: Gestion de ses produits, commandes, statistiques
- **Admin**: Modération totale (artisans, produits, commissions)
- Utilisation de **Policies** Laravel pour la sécurité

### Workflow Artisan
1. Inscription + informations boutique
2. En attente d'approbation admin (`status: pending`)
3. Une fois approuvé (`status: approved`), peut créer des produits
4. Produits soumis à modération admin avant publication

### Workflow Commande
1. Acheteur finalise panier → création `Order` + `OrderItems`
2. Chaque `OrderItem` contient `artisan_profile_id`
3. Artisan change le statut de ses items: `pending → accepted → shipped → completed`
4. Calcul automatique des payouts selon commissions

## Commandes pour Démarrer

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
