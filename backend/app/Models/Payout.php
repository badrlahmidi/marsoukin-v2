<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    use HasFactory;

    protected $fillable = [
        'artisan_profile_id',
        'amount',
        'currency',
        'status',
        'method',
        'period_start',
        'period_end',
        'notes',
        'reference_number',
        'bank_details',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'period_start' => 'date',
        'period_end' => 'date',
        'bank_details' => 'array',
        'paid_at' => 'datetime',
    ];

    // Relations
    public function artisanProfile()
    {
        return $this->belongsTo(ArtisanProfile::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    // Helper Methods
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    public function markAsPaid(string $referenceNumber = null): void
    {
        $this->update([
            'status' => 'paid',
            'paid_at' => now(),
            'reference_number' => $referenceNumber ?? $this->reference_number,
        ]);
    }

    public function cancel(): void
    {
        if ($this->status === 'pending') {
            $this->update(['status' => 'cancelled']);
        }
    }

    // Generate reference number
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payout) {
            if (empty($payout->reference_number)) {
                $payout->reference_number = 'PAY-' . strtoupper(uniqid());
            }
        });
    }
}
