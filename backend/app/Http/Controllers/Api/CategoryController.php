<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * List all categories
     */
    public function index()
    {
        $categories = Category::with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])
            ->withCount('products')
            ->active()
            ->root()
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Get single category by slug
     */
    public function show($slug)
    {
        $category = Category::with(['children' => function ($query) {
            $query->active()->withCount('products');
        }, 'parent'])
            ->withCount('products')
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    /**
     * Get products for a category
     */
    public function products($slug, Request $request)
    {
        $category = Category::where('slug', $slug)->active()->firstOrFail();

        $query = $category->products()
            ->with(['artisanProfile', 'primaryImage'])
            ->active();

        // Filtres additionnels
        if ($request->has('min_price')) {
            $query->where('base_price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('base_price', '<=', $request->max_price);
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
            'category' => $category,
            'data' => $products,
        ]);
    }
}
