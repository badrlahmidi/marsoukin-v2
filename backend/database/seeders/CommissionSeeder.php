<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Commission;
use App\Models\Category;

class CommissionSeeder extends Seeder
{
    public function run(): void
    {
        // Commission par défaut (15%)
        Commission::create([
            'name' => 'Commission Standard',
            'percentage' => 15.00,
            'is_default' => true,
            'is_active' => true,
            'description' => 'Commission par défaut pour tous les produits',
        ]);

        // Commission pour la Poterie (12%)
        $pottery = Category::where('slug', 'poterie-ceramique')->first();
        if ($pottery) {
            Commission::create([
                'name' => 'Commission Poterie',
                'percentage' => 12.00,
                'category_id' => $pottery->id,
                'is_default' => false,
                'is_active' => true,
                'description' => 'Commission réduite pour la poterie',
            ]);
        }

        // Commission pour le Textile (10%)
        $textile = Category::where('slug', 'textile-tissage')->first();
        if ($textile) {
            Commission::create([
                'name' => 'Commission Textile',
                'percentage' => 10.00,
                'category_id' => $textile->id,
                'is_default' => false,
                'is_active' => true,
                'description' => 'Commission réduite pour le textile',
            ]);
        }

        // Commission pour les Bijoux (20%)
        $jewelry = Category::where('slug', 'bijoux-accessoires')->first();
        if ($jewelry) {
            Commission::create([
                'name' => 'Commission Bijoux',
                'percentage' => 20.00,
                'category_id' => $jewelry->id,
                'is_default' => false,
                'is_active' => true,
                'description' => 'Commission pour les bijoux',
            ]);
        }
    }
}
