<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_item_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('artisan_profile_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned()->comment('Note de 1 à 5');
            $table->text('comment')->nullable();
            $table->json('images')->nullable()->comment('Photos du produit reçu');
            $table->boolean('is_verified_purchase')->default(true);
            $table->boolean('is_approved')->default(true);
            $table->text('admin_response')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            
            $table->index('product_id');
            $table->index('artisan_profile_id');
            $table->index('user_id');
            $table->index('rating');
            $table->index('is_approved');
            
            // Un utilisateur ne peut laisser qu'un avis par order_item
            $table->unique('order_item_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
