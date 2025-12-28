<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ArtisanProfile;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $youssef = ArtisanProfile::where('slug', 'atelier-youssef-poterie')->first();
        $khadija = ArtisanProfile::where('slug', 'tissage-khadija')->first();
        $hassan = ArtisanProfile::where('slug', 'bijoux-hassan')->first();

        $tajineCategory = Category::where('slug', 'tajines')->first();
        $tapisCategory = Category::where('slug', 'tapis-berberes')->first();
        $colliersCategory = Category::where('slug', 'colliers')->first();

        // Produits de Youssef
        if ($youssef && $tajineCategory) {
            $product1 = Product::create([
                'artisan_profile_id' => $youssef->id,
                'category_id' => $tajineCategory->id,
                'title' => 'Tajine Traditionnel de Fès',
                'slug' => 'tajine-traditionnel-fes',
                'description' => 'Tajine artisanal en céramique peinte à la main avec motifs géométriques traditionnels. Idéal pour cuisson lente.',
                'base_price' => 450.00,
                'currency' => 'MAD',
                'stock' => 25,
                'status' => 'active',
                'is_featured' => true,
                'weight' => 2.5,
                'dimensions' => '30x30x20',
                'origin_city' => 'Fès',
            ]);

            ProductImage::create([
                'product_id' => $product1->id,
                'url' => 'https://placehold.co/600x400/blue/white?text=Tajine+Fes',
                'is_primary' => true,
                'position' => 1,
            ]);

            $product2 = Product::create([
                'artisan_profile_id' => $youssef->id,
                'category_id' => $tajineCategory->id,
                'title' => 'Grand Tajine Familial',
                'slug' => 'grand-tajine-familial',
                'description' => 'Grand tajine de 35cm, parfait pour les repas en famille. Décoration florale traditionnelle.',
                'base_price' => 650.00,
                'currency' => 'MAD',
                'stock' => 15,
                'status' => 'active',
                'is_featured' => false,
                'weight' => 3.5,
                'dimensions' => '35x35x25',
                'origin_city' => 'Fès',
            ]);

            ProductImage::create([
                'product_id' => $product2->id,
                'url' => 'https://placehold.co/600x400/green/white?text=Grand+Tajine',
                'is_primary' => true,
                'position' => 1,
            ]);
        }

        // Produits de Khadija
        if ($khadija && $tapisCategory) {
            $product3 = Product::create([
                'artisan_profile_id' => $khadija->id,
                'category_id' => $tapisCategory->id,
                'title' => 'Tapis Berbère Beni Ouarain',
                'slug' => 'tapis-berbere-beni-ouarain',
                'description' => 'Tapis berbère authentique tissé à la main en laine naturelle. Motifs géométriques noir et blanc.',
                'base_price' => 2500.00,
                'currency' => 'MAD',
                'stock' => 8,
                'status' => 'active',
                'is_featured' => true,
                'weight' => 8.0,
                'dimensions' => '200x150x2',
                'origin_city' => 'Marrakech',
            ]);

            ProductImage::create([
                'product_id' => $product3->id,
                'url' => 'https://placehold.co/600x400/orange/white?text=Tapis+Berbere',
                'is_primary' => true,
                'position' => 1,
            ]);

            $product4 = Product::create([
                'artisan_profile_id' => $khadija->id,
                'category_id' => $tapisCategory->id,
                'title' => 'Petit Tapis Azilal',
                'slug' => 'petit-tapis-azilal',
                'description' => 'Tapis coloré aux motifs abstraits, parfait pour décorer une entrée ou un salon.',
                'base_price' => 1200.00,
                'currency' => 'MAD',
                'stock' => 12,
                'status' => 'active',
                'is_featured' => false,
                'weight' => 4.0,
                'dimensions' => '120x80x2',
                'origin_city' => 'Marrakech',
            ]);

            ProductImage::create([
                'product_id' => $product4->id,
                'url' => 'https://placehold.co/600x400/red/white?text=Tapis+Azilal',
                'is_primary' => true,
                'position' => 1,
            ]);
        }

        // Produits de Hassan
        if ($hassan && $colliersCategory) {
            $product5 = Product::create([
                'artisan_profile_id' => $hassan->id,
                'category_id' => $colliersCategory->id,
                'title' => 'Collier Berbère en Argent',
                'slug' => 'collier-berbere-argent',
                'description' => 'Collier artisanal en argent massif avec pierres d\'ambre. Design inspiré des bijoux amazigh.',
                'base_price' => 850.00,
                'currency' => 'MAD',
                'stock' => 20,
                'status' => 'active',
                'is_featured' => true,
                'weight' => 0.15,
                'dimensions' => '50x3x1',
                'origin_city' => 'Essaouira',
            ]);

            ProductImage::create([
                'product_id' => $product5->id,
                'url' => 'https://placehold.co/600x400/silver/black?text=Collier+Argent',
                'is_primary' => true,
                'position' => 1,
            ]);
        }
    }
}
