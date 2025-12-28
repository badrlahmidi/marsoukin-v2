<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ArtisanProfile;

class ArtisanProfileSeeder extends Seeder
{
    public function run(): void
    {
        // Profil pour Youssef (ID 4)
        $youssef = User::find(4);
        if ($youssef) {
            ArtisanProfile::create([
                'user_id' => $youssef->id,
                'shop_name' => 'Atelier Youssef Poterie',
                'slug' => 'atelier-youssef-poterie',
                'city' => 'Fès',
                'country' => 'Morocco',
                'bio' => 'Artisan potier depuis 3 générations, spécialisé dans la poterie traditionnelle de Fès.',
                'status' => 'approved',
            ]);
        }

        // Profil pour Khadija (ID 5)
        $khadija = User::find(5);
        if ($khadija) {
            ArtisanProfile::create([
                'user_id' => $khadija->id,
                'shop_name' => 'Tissage Khadija',
                'slug' => 'tissage-khadija',
                'city' => 'Marrakech',
                'country' => 'Morocco',
                'bio' => 'Créatrice de tapis berbères authentiques, techniques ancestrales transmises par ma grand-mère.',
                'status' => 'approved',
            ]);
        }

        // Profil pour Hassan (ID 6)
        $hassan = User::find(6);
        if ($hassan) {
            ArtisanProfile::create([
                'user_id' => $hassan->id,
                'shop_name' => 'Bijoux Hassan',
                'slug' => 'bijoux-hassan',
                'city' => 'Essaouira',
                'country' => 'Morocco',
                'bio' => 'Création de bijoux berbères en argent et pierres semi-précieuses, inspirés des traditions amazigh.',
                'status' => 'approved',
            ]);
        }
    }
}
