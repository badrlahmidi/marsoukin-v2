<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * List user's orders
     */
    public function index(Request $request)
    {
        $orders = Order::with([
            'items.product.primaryImage',
            'items.artisanProfile',
            'shippingAddress',
        ])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Create new order
     */
    public function create(Request $request)
    {
        $request->validate([
            'shipping_address_id' => 'required|exists:addresses,id',
            'billing_address_id' => 'required|exists:addresses,id',
            'payment_method' => 'required|in:cod,card,bank_transfer',
            'notes' => 'nullable|string',
        ]);

        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->first();

        if (!$cart || $cart->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Votre panier est vide',
            ], 400);
        }

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = $cart->getSubtotal();
            $shippingTotal = $this->calculateShipping($cart);
            $commissionTotal = 0;

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'payment_status' => $request->payment_method === 'cod' ? 'pending' : 'pending',
                'subtotal' => $subtotal,
                'shipping_total' => $shippingTotal,
                'commission_total' => 0, // Will be calculated
                'total' => $subtotal + $shippingTotal,
                'shipping_address_id' => $request->shipping_address_id,
                'billing_address_id' => $request->billing_address_id,
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($cart->items as $cartItem) {
                $product = $cartItem->product;
                
                // Get commission
                $commission = Commission::getForProduct($product);
                $itemTotal = $cartItem->price * $cartItem->quantity;
                $commissionAmount = $commission ? $commission->calculateCommission($itemTotal) : 0;
                $commissionTotal += $commissionAmount;

                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'product_variant_id' => $cartItem->product_variant_id,
                    'artisan_profile_id' => $product->artisan_profile_id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->price,
                    'total_price' => $itemTotal,
                    'commission_amount' => $commissionAmount,
                    'status' => 'pending',
                ]);

                // Update stock
                if ($cartItem->variant) {
                    $cartItem->variant->decrement('stock', $cartItem->quantity);
                } else {
                    $product->decrement('stock', $cartItem->quantity);
                }
            }

            // Update order with commission total
            $order->update([
                'commission_total' => $commissionTotal,
            ]);

            // Clear cart
            $cart->clear();

            DB::commit();

            $order->load([
                'items.product.primaryImage',
                'items.artisanProfile',
                'shippingAddress',
                'billingAddress',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Commande créée avec succès',
                'data' => $order,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la commande',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get single order
     */
    public function show(Request $request, $orderNumber)
    {
        $order = Order::with([
            'items.product.primaryImage',
            'items.artisanProfile',
            'items.variant',
            'shippingAddress',
            'billingAddress',
        ])
            ->where('user_id', $request->user()->id)
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Cancel order
     */
    public function cancel(Request $request, $orderNumber)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        if (!$order->canBeCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'Cette commande ne peut plus être annulée',
            ], 400);
        }

        $order->cancel();

        return response()->json([
            'success' => true,
            'message' => 'Commande annulée avec succès',
            'data' => $order,
        ]);
    }

    /**
     * Calculate shipping cost
     */
    private function calculateShipping($cart)
    {
        // TODO: Implement real shipping calculation
        // For now, flat rate
        return 30.00; // 30 MAD
    }
}
