<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Catégories principales
        $pottery = Category::create([
            'name' => 'Poterie & Céramique',
            'slug' => 'poterie-ceramique',
            'description' => 'Articles en poterie et céramique traditionnelle marocaine',
            'order' => 1,
            'is_active' => true,
        ]);

        $textile = Category::create([
            'name' => 'Textile & Tissage',
            'slug' => 'textile-tissage',
            'description' => 'Tapis, couvertures et textiles artisanaux',
            'order' => 2,
            'is_active' => true,
        ]);

        $jewelry = Category::create([
            'name' => 'Bijoux & Accessoires',
            'slug' => 'bijoux-accessoires',
            'description' => 'Bijoux berbères et accessoires traditionnels',
            'order' => 3,
            'is_active' => true,
        ]);

        $wood = Category::create([
            'name' => 'Bois & Marqueterie',
            'slug' => 'bois-marqueterie',
            'description' => 'Objets sculptés et marqueterie',
            'order' => 4,
            'is_active' => true,
        ]);

        $leather = Category::create([
            'name' => 'Maroquinerie',
            'slug' => 'maroquinerie',
            'description' => 'Sacs, babouches et articles en cuir',
            'order' => 5,
            'is_active' => true,
        ]);

        // Sous-catégories pour Poterie
        Category::create([
            'parent_id' => $pottery->id,
            'name' => 'Tajines',
            'slug' => 'tajines',
            'order' => 1,
            'is_active' => true,
        ]);

        Category::create([
            'parent_id' => $pottery->id,
            'name' => 'Vaisselle',
            'slug' => 'vaisselle',
            'order' => 2,
            'is_active' => true,
        ]);

        // Sous-catégories pour Textile
        Category::create([
            'parent_id' => $textile->id,
            'name' => 'Tapis Berbères',
            'slug' => 'tapis-berberes',
            'order' => 1,
            'is_active' => true,
        ]);

        Category::create([
            'parent_id' => $textile->id,
            'name' => 'Coussins',
            'slug' => 'coussins',
            'order' => 2,
            'is_active' => true,
        ]);

        // Sous-catégories pour Bijoux
        Category::create([
            'parent_id' => $jewelry->id,
            'name' => 'Colliers',
            'slug' => 'colliers',
            'order' => 1,
            'is_active' => true,
        ]);

        Category::create([
            'parent_id' => $jewelry->id,
            'name' => 'Bracelets',
            'slug' => 'bracelets',
            'order' => 2,
            'is_active' => true,
        ]);
    }
}
