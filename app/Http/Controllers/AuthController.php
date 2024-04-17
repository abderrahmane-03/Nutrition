<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Organizer;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Mockery\Exception;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{

    /**
* @OA\Post(
     *     path="api/register/organizer",
     *     summary="Register a new organizer",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="organizer's name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="organizer's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="organizer's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="201", description="organizer registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function organizerRegistration(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name' => $request->name,
                'role' => 'organizer',
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Organizer::create([
                'user_id' => $user->id
            ]);

            $token = auth()->guard('api')->attempt(['email' => $request->email, 'password' => $request->password]);

            return response()->json([
                'status' => 'success',
                'message' => 'Organizer account created successfully',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 201);
        }
        catch (\Exception $e){
            return \response()->json($e->getMessage());
        }

    }

    /**
* @OA\Post(
     *     path="api/register/volunteer",
     *     summary="Register a new volanteer",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="volanteer's name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="volanteer's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="volanteer's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="201", description="volanteer registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function volunteerRegistration(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
                'skills' => 'required',
            ]);

            $user = User::create([
                'name' => $request->name,
                'role' => 'volunteer',
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Volunteer::create([
                'user_id' => $user->id,
                'skills' => json_encode($request->skills)
            ]);

            $token = auth()->guard('api')->attempt(['email' => $request->email, 'password' => $request->password]);

            return response()->json([
                'status' => 'success',
                'message' => 'Volunteer account created successfully',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 201);
        }
        catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }


    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Authenticate user and generate JWT token",
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="User's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required',
                'password' => 'required',
            ]);

            $credentials = $request->only('email', 'password');

            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'FAILED',
                    'message' => 'NO EXISTING USER WITH THIS EMAIL'
                ]);
            }
            else if($user->banned_at){
                return response()->json([
                    'status' => 'error',
                    'message' => 'SORRY U WERE BANNED ON ' . $user->banned_at,
                ]);
            }

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'INVALID PASSWORD'
                ]);
            }
            $token = auth()->guard('api')->attempt($credentials);
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }
        catch (\Exception $e){
            return  response()->json($e->getMessage());
        }
    }


    /**
 * Log out the authenticated user.
 *
 * @return \Illuminate\Http\JsonResponse
 *
 * @OA\Post(
 *     path="/api/logout",
 *     summary="Log out the authenticated user",
 *     tags={"Authentication"},
 *     security={{ "bearerAuth":{} }},
 *     @OA\Response(
 *         response=200,
 *         description="Successfully logged out",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="status",
 *                 type="string",
 *                 example="success"
 *             ),
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="Successfully logged out"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthenticated",
 *     )
 * )
 */
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out'
        ]);
    }

}
