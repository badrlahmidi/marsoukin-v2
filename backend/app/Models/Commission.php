<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'percentage',
        'category_id',
        'is_default',
        'is_active',
        'description',
    ];

    protected $casts = [
        'percentage' => 'decimal:2',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];

    // Relations
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    // Helper Methods
    public function calculateCommission(float $amount): float
    {
        return round(($amount * $this->percentage) / 100, 2);
    }

    // Get commission for a product (by category or default)
    public static function getForProduct(Product $product): ?Commission
    {
        // Try to find commission by category
        $commission = static::active()
            ->where('category_id', $product->category_id)
            ->first();

        // Fallback to default commission
        if (!$commission) {
            $commission = static::active()->default()->first();
        }

        return $commission;
    }

    // Ensure only one default commission
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($commission) {
            if ($commission->is_default) {
                Commission::where('id', '!=', $commission->id)
                    ->update(['is_default' => false]);
            }
        });
    }
}
