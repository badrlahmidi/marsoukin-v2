<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artisan_profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('restrict');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('base_price', 10, 2);
            $table->string('currency', 10)->default('MAD');
            $table->integer('stock')->default(0);
            $table->enum('status', ['draft', 'active', 'hidden', 'rejected'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->decimal('weight', 10, 2)->nullable()->comment('en kg');
            $table->string('dimensions', 100)->nullable()->comment('L x W x H en cm');
            $table->string('origin_city', 100)->nullable();
            $table->integer('views_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('artisan_profile_id');
            $table->index('category_id');
            $table->index('status');
            $table->index('is_featured');
            $table->index('slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
