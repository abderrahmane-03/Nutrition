<?php

namespace App\Http\Controllers;

use Exception;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\Review;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Stripe\Exception\SignatureVerificationException;

class ClientController extends Controller
{

    public function handleStripeWebhook(Request $request)
    {
        // Retrieve the webhook payload from the request body
        $payload = $request->getContent();

        // Verify the webhook signature to ensure it's from Stripe
        // This step is crucial for security; use Stripe's official library for verification

        // Initialize Stripe with your secret key
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        // Your webhook secret from Stripe
        $webhookSecret = 'whsec_wQvyY28h10kUxVYvgLHvb2vCHajhhtNU';

        try {
            // Construct the event from the payload
            $event = Webhook::constructEvent(
                $payload,
                $request->header('Stripe-Signature'),
                $webhookSecret
            );

            // Check the type of event
            if ($event->type === 'checkout.session.completed') {
                $session = $event->data->object;
                // Retrieve session data from Stripe
                $sessionId = $session->id;
                // Call handlePaymentSuccess with the retrieved session ID
                $response = $this->handlePaymentSuccess($sessionId);
                return $response;
            }

            // Handle other types of events if needed

            return response()->json(['status' => 'success']);
        } catch (SignatureVerificationException $e) {
            // Invalid signature
            Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return response()->json(['error' => 'Signature verification failed'], 400);
        } catch (\Exception $e) {
            // Handle webhook verification or processing errors
            Log::error('Webhook processing error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function checkout(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'duration' => 'required',
            'coach_id' => 'required',
        ]);

        Stripe::setApiKey(env('STRIPE_SECRET'));
        $clientId = Auth::guard('api')->user()->client->id;

        try {
            // Create a session for Stripe Checkout
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'MAD',
                        'unit_amount' => $request->amount * 100, // Convert MAD to smallest currency unit (cents)
                        'product_data' => [
                            'name' => $request->name, // Replace with actual product name
                        ],
                    ],
                    'quantity' => 1
                ]],
                'mode' => 'payment',
                'success_url' => 'http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => 'http://localhost:3000/payment-cancel',
                'metadata' => [
                    'amount' => $request->amount,
                    'duration' => $request->duration,
                    'coach_id' => $request->coach_id,
                    'client_id' => $clientId,
                ],
            ]);

            return response()->json(['sessionId' => $session->id]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function Rate(Request $request): JsonResponse
    {
        $request->validate([
            'rating' => 'required',
            'coache_id' => 'required',
        ]);

      $clientId = Auth::guard('api')->user()->client->id;

        try {
            // Create a session for Stripe Checkout
            $Review = Review::create([
                'rating'=>$request->rating,
                'coache_id'=>$request->coache_id,
                'client_id'=>$clientId,
            ]);

            return response()->json(['sessionId' => $Review]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function Ratings(): JsonResponse
{
    $clientId = Auth::guard('api')->user()->client->id ;

    try {
        // Retrieve ratings for the client
        $ratings = Review::where('client_id', $clientId)->get();

        // Return the ratings directly
        return response()->json($ratings->toArray());
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function handlePaymentSuccess($sessionId)
    {
        try {
            // Retrieve session data from Stripe
            $session = \Stripe\Checkout\Session::retrieve($sessionId);

            // Check if the payment status is successful
            if ($session->payment_status === 'paid') {
                // Create reservation
                Reservation::create([
                    'duration' => $session->metadata->duration,
                    'total_price' => $session->metadata->amount,
                    'coach_id' => $session->metadata->coach_id,
                    'client_id' => $session->metadata->client_id,
                ]);

                // Return success response
                return response()->json(['message' => 'Reservation created successfully']);
            } else {
                // Payment was not successful, return error response
                return response()->json(['error' => 'Payment was not successful'], 400);
            }
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Handle Stripe API errors
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (Exception $e) {
            // Handle any other errors that occur during the process
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function clientReservation(){
     $clientId=Auth::guard('api')->user()->client->id;

     $reservations=Reservation::where('client_id',$clientId)->get();

     return response()->json([
        'status' => 'success',
        'reservations' => $reservations,

    ], 200);
    }



}
