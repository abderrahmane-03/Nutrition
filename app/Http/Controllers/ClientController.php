<?php

    namespace App\Http\Controllers;

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
            ]);

            Stripe::setApiKey(env('STRIPE_SECRET'));

            try {
                $session = Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'MAD',
                            'unit_amount' => $request->amount * 100,
                            'product_data' => [
                                'name' => 'Name', 
                            ],
                        ],
                        'quantity' => 1
                    ]],
                    'mode' => 'payment',
                    'success_url' => 'http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => 'http://localhost:3000/payment-cancel',
                ]);

                return response()->json(['sessionId' => $session->id]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    }


    // public function handlePaymentSuccess(Request $request)
    // {
    //     $sessionId = $request->get('session_id');

    //     try {
    //         // Update the payment status of the order using the OrderService
    //         $order = $this->orderService->updateStatusPayment($sessionId);

    //         // Return a JSON response with the updated order and success message
    //         return response()->json([
    //             'order' => $order,
    //             'message' => 'Payment status updated successfully'
    //         ], 200);
    //     } catch (Exception $e) {
    //         // Handle any exceptions and return an error response
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
