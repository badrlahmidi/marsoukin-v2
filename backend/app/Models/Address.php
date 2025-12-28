<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'full_name',
        'phone',
        'address_line1',
        'address_line2',
        'city',
        'postal_code',
        'country',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shippingOrders()
    {
        return $this->hasMany(Order::class, 'shipping_address_id');
    }

    public function billingOrders()
    {
        return $this->hasMany(Order::class, 'billing_address_id');
    }

    // Helper Methods
    public function isShipping(): bool
    {
        return $this->type === 'shipping';
    }

    public function isBilling(): bool
    {
        return $this->type === 'billing';
    }

    public function getFullAddressAttribute(): string
    {
        $parts = [
            $this->address_line1,
            $this->address_line2,
            $this->city,
            $this->postal_code,
            $this->country,
        ];

        return implode(', ', array_filter($parts));
    }

    // Auto-set as default if it's the first address
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($address) {
            if (!$address->user->addresses()->where('type', $address->type)->exists()) {
                $address->is_default = true;
            }
        });

        // When setting an address as default, unset others
        static::saving(function ($address) {
            if ($address->is_default) {
                Address::where('user_id', $address->user_id)
                    ->where('type', $address->type)
                    ->where('id', '!=', $address->id)
                    ->update(['is_default' => false]);
            }
        });
    }
}
