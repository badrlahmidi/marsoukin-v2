<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Create a new review
     */
    public function create(Request $request)
    {
        $request->validate([
            'order_item_id' => 'required|exists:order_items,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
            'images' => 'nullable|array|max:5',
            'images.*' => 'nullable|string',
        ]);

        $orderItem = OrderItem::with(['order', 'product', 'artisanProfile'])
            ->findOrFail($request->order_item_id);

        // Check if order belongs to user
        if ($orderItem->order->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        // Check if order item can be reviewed
        if (!$orderItem->canBeReviewed()) {
            return response()->json([
                'success' => false,
                'message' => 'Cet article ne peut pas être évalué',
            ], 400);
        }

        // Check if already reviewed
        if ($orderItem->review()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà évalué cet article',
            ], 400);
        }

        $review = Review::create([
            'order_item_id' => $request->order_item_id,
            'user_id' => $request->user()->id,
            'product_id' => $orderItem->product_id,
            'artisan_profile_id' => $orderItem->artisan_profile_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'images' => $request->images,
            'is_verified_purchase' => true,
            'is_approved' => true, // Auto-approve for now
        ]);

        $review->load(['user', 'product']);

        return response()->json([
            'success' => true,
            'message' => 'Avis ajouté avec succès',
            'data' => $review,
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
            'images' => 'nullable|array|max:5',
            'images.*' => 'nullable|string',
        ]);

        $review = Review::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
            'images' => $request->images,
        ]);

        $review->load(['user', 'product']);

        return response()->json([
            'success' => true,
            'message' => 'Avis mis à jour avec succès',
            'data' => $review,
        ]);
    }

    /**
     * Delete a review
     */
    public function delete(Request $request, $id)
    {
        $review = Review::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Avis supprimé avec succès',
        ]);
    }
}
