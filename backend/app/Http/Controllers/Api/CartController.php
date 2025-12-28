<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get user's cart
     */
    public function index(Request $request)
    {
        $cart = $this->getOrCreateCart($request->user());

        $cart->load([
            'items.product.primaryImage',
            'items.product.artisanProfile',
            'items.variant'
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'cart' => $cart,
                'items_count' => $cart->getTotalItems(),
                'subtotal' => $cart->getSubtotal(),
            ],
        ]);
    }

    /**
     * Add item to cart
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $variant = $request->variant_id ? ProductVariant::findOrFail($request->variant_id) : null;

        // Check stock
        $availableStock = $variant ? $variant->stock : $product->stock;
        if ($request->quantity > $availableStock) {
            return response()->json([
                'success' => false,
                'message' => 'Stock insuffisant',
            ], 400);
        }

        $cart = $this->getOrCreateCart($request->user());
        $cartItem = $cart->addItem($product, $request->quantity, $variant);

        $cart->load([
            'items.product.primaryImage',
            'items.product.artisanProfile',
            'items.variant'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Produit ajouté au panier',
            'data' => [
                'cart' => $cart,
                'items_count' => $cart->getTotalItems(),
                'subtotal' => $cart->getSubtotal(),
            ],
        ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->getOrCreateCart($request->user());
        $cartItem = $cart->items()->findOrFail($itemId);

        // Check stock
        $product = $cartItem->product;
        $variant = $cartItem->variant;
        $availableStock = $variant ? $variant->stock : $product->stock;

        if ($request->quantity > $availableStock) {
            return response()->json([
                'success' => false,
                'message' => 'Stock insuffisant',
            ], 400);
        }

        $cartItem->updateQuantity($request->quantity);

        $cart->load([
            'items.product.primaryImage',
            'items.product.artisanProfile',
            'items.variant'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Panier mis à jour',
            'data' => [
                'cart' => $cart,
                'items_count' => $cart->getTotalItems(),
                'subtotal' => $cart->getSubtotal(),
            ],
        ]);
    }

    /**
     * Remove item from cart
     */
    public function remove(Request $request, $itemId)
    {
        $cart = $this->getOrCreateCart($request->user());
        $cartItem = $cart->items()->findOrFail($itemId);
        $cartItem->delete();

        $cart->load([
            'items.product.primaryImage',
            'items.product.artisanProfile',
            'items.variant'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Produit retiré du panier',
            'data' => [
                'cart' => $cart,
                'items_count' => $cart->getTotalItems(),
                'subtotal' => $cart->getSubtotal(),
            ],
        ]);
    }

    /**
     * Clear cart
     */
    public function clear(Request $request)
    {
        $cart = $this->getOrCreateCart($request->user());
        $cart->clear();

        return response()->json([
            'success' => true,
            'message' => 'Panier vidé',
            'data' => [
                'cart' => $cart,
                'items_count' => 0,
                'subtotal' => 0,
            ],
        ]);
    }

    /**
     * Get or create cart for user
     */
    private function getOrCreateCart($user)
    {
        return Cart::firstOrCreate([
            'user_id' => $user->id,
        ]);
    }
}
