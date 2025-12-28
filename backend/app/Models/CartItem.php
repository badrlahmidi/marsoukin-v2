<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'product_variant_id',
        'quantity',
        'price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
    ];

    // Relations
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    // Helper Methods
    public function getSubtotal(): float
    {
        return $this->price * $this->quantity;
    }

    public function updateQuantity(int $quantity): void
    {
        $this->update(['quantity' => max(1, $quantity)]);
    }

    public function incrementQuantity(int $amount = 1): void
    {
        $this->increment('quantity', $amount);
    }

    public function decrementQuantity(int $amount = 1): void
    {
        $newQuantity = $this->quantity - $amount;
        
        if ($newQuantity <= 0) {
            $this->delete();
        } else {
            $this->decrement('quantity', $amount);
        }
    }
}
