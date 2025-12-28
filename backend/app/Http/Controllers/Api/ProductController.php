<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * List all products with filters
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'artisanProfile', 'primaryImage'])
            ->active();

        // Filtres
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('category_slug')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category_slug);
            });
        }

        if ($request->has('artisan_id')) {
            $query->where('artisan_profile_id', $request->artisan_id);
        }

        if ($request->has('min_price')) {
            $query->where('base_price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('base_price', '<=', $request->max_price);
        }

        if ($request->has('city')) {
            $query->where('origin_city', $request->city);
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
        } elseif ($sortBy === 'name') {
            $query->orderBy('title', $sortOrder);
        } else {
            $query->orderBy('created_at', $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Get featured products
     */
    public function featured()
    {
        $products = Product::with(['category', 'artisanProfile', 'primaryImage'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Search products
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $query = $request->get('q', '');

        $products = Product::with(['category', 'artisanProfile', 'primaryImage'])
            ->active()
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhereHas('category', function ($q) use ($query) {
                      $q->where('name', 'like', "%{$query}%");
                  })
                  ->orWhereHas('artisanProfile', function ($q) use ($query) {
                      $q->where('shop_name', 'like', "%{$query}%");
                  });
            })
            ->paginate(12);

        return response()->json([
            'success' => true,
            'query' => $query,
            'data' => $products,
        ]);
    }

    /**
     * Get single product by slug
     */
    public function show($slug)
    {
        $product = Product::with([
            'category',
            'artisanProfile.user',
            'images',
            'variants',
            'reviews' => function ($query) {
                $query->approved()->with('user')->latest();
            }
        ])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $product->incrementViews();

        // Add computed properties
        $product->average_rating = $product->averageRating();
        $product->total_reviews = $product->totalReviews();

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }
}
