<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ArtisanProfile;
use Illuminate\Http\Request;

class ArtisanController extends Controller
{
    /**
     * List all artisans
     */
    public function index(Request $request)
    {
        $query = ArtisanProfile::with(['user'])
            ->withCount('products')
            ->where('status', 'approved');

        // Filtres
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('shop_name', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if ($sortBy === 'products') {
            $query->orderBy('products_count', $sortOrder);
        } elseif ($sortBy === 'name') {
            $query->orderBy('shop_name', $sortOrder);
        } else {
            $query->orderBy('created_at', $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $artisans = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $artisans,
        ]);
    }

    /**
     * Get single artisan by slug
     */
    public function show($slug)
    {
        $artisan = ArtisanProfile::with(['user'])
            ->withCount('products')
            ->where('slug', $slug)
            ->where('status', 'approved')
            ->firstOrFail();

        // Get artisan statistics
        $artisan->total_sales = $artisan->orderItems()->whereHas('order', function ($query) {
            $query->where('status', 'completed');
        })->sum('total_price');

        $artisan->total_orders = $artisan->orderItems()->distinct('order_id')->count('order_id');

        $artisan->average_rating = $artisan->reviews()->avg('rating');
        $artisan->total_reviews = $artisan->reviews()->count();

        return response()->json([
            'success' => true,
            'data' => $artisan,
        ]);
    }

    /**
     * Get products for an artisan
     */
    public function products($slug, Request $request)
    {
        $artisan = ArtisanProfile::where('slug', $slug)
            ->where('status', 'approved')
            ->firstOrFail();

        $query = $artisan->products()
            ->with(['category', 'primaryImage'])
            ->active();

        // Filtres
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('min_price')) {
            $query->where('base_price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('base_price', '<=', $request->max_price);
        }

        if ($request->has('in_stock')) {
            $query->inStock();
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if ($sortBy === 'price') {
            $query->orderBy('base_price', $sortOrder);
        } elseif ($sortBy === 'popular') {
            $query->orderBy('views_count', 'desc');
        } else {
            $query->orderBy('created_at', $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'artisan' => $artisan,
            'data' => $products,
        ]);
    }
}
