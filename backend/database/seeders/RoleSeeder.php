<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin Marsoukin',
            'email' => 'admin@marsoukin.ma',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+212 600 000 001',
        ]);

        // Acheteur 1
        User::create([
            'name' => 'Ahmed Benali',
            'email' => 'ahmed@example.com',
            'password' => Hash::make('password'),
            'role' => 'buyer',
            'phone' => '+212 600 000 002',
        ]);

        // Acheteur 2
        User::create([
            'name' => 'Fatima Zahra',
            'email' => 'fatima@example.com',
            'password' => Hash::make('password'),
            'role' => 'buyer',
            'phone' => '+212 600 000 003',
        ]);

        // Artisan 1
        User::create([
            'name' => 'Youssef Artisan',
            'email' => 'youssef@example.com',
            'password' => Hash::make('password'),
            'role' => 'artisan',
            'phone' => '+212 600 000 004',
        ]);

        // Artisan 2
        User::create([
            'name' => 'Khadija Artisan',
            'email' => 'khadija@example.com',
            'password' => Hash::make('password'),
            'role' => 'artisan',
            'phone' => '+212 600 000 005',
        ]);

        // Artisan 3
        User::create([
            'name' => 'Hassan Artisan',
            'email' => 'hassan@example.com',
            'password' => Hash::make('password'),
            'role' => 'artisan',
            'phone' => '+212 600 000 006',
        ]);
    }
}
