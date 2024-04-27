<?php

    namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Reservation;
use Illuminate\Http\Request;
    use Stripe\Stripe;
    use Stripe\Checkout\Session;
    use Exception;
    use Illuminate\Http\JsonResponse;

    class ClientController extends Controller
    {
        public function checkout(Request $request): JsonResponse
        {
            $request->validate([
                'amount' => 'required',
                'coach_id' => 'required', // Assuming coach_id is provided in the request
                'client_id' => 'required', // Assuming client_id is provided in the request
            ]);

            Stripe::setApiKey(env('STRIPE_SECRET'));

            try {
                // Create a session for Stripe Checkout
                $session = Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'MAD',
                            'unit_amount' => $request->amount, // Convert MAD to smallest currency unit (cents)
                            'product_data' => [
                                'name' => $request->coach, // Replace with actual product name
                            ],
                        ],
                        'quantity' => 1
                    ]],
                    'mode' => 'payment',
                    'success_url' => route('payment.success', ['session_id' => '{CHECKOUT_SESSION_ID}']),
                    'cancel_url' => route('payment.cancel'),
                ]);

                return response()->json(['sessionId' => $session->id]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        public function handlePaymentSuccess(Request $request): JsonResponse
        {
            // Check if the payment was successful
            if ($request->session_id) {
                // Retrieve session data from Stripe
                Stripe::setApiKey(env('STRIPE_SECRET'));
                $session = Session::retrieve($request->session_id);

                // Check if the payment status is successful
                if ($session->payment_status === 'paid') {
                    // Create reservation
                    Reservation::create([
                        'duration' => $session->duration,
                        'total_price' => $session->amount,
                        'coach_id' => $session->metadata->coach_id,
                        'client_id' => $session->metadata->client_id,
                    ]);

                    // Return success response
                    return response()->json(['message' => 'Reservation created successfully']);
                } else {
                    // Payment was not successful, return error response
                    return response()->json(['error' => 'Payment was not successful'], 400);
                }
            } else {
                // Session ID not provided, return error response
                return response()->json(['error' => 'Session ID not provided'], 400);
            }
        }
    }
