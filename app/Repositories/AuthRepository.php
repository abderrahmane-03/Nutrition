<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Coach;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthRepository implements AuthRepositoryInterface
{
    public function coachRegistration(Request $request)
    {
        try {
            $userdata = $request->validate([
                'name' => 'nullable',
                'lastname' => 'nullable', // Change 'lastname' to 'lastName' here
                'username' => 'nullable',
                'email' => 'nullable',
                'password' => 'nullable',
                'sport' => 'nullable',
                'experience' => 'nullable',
                'bio' => 'nullable',
                'gender' => 'nullable',
                'profile_picture' => 'nullable',
            ]);
            if ($request->hasFile('profile_picture')) {
                $file = $request->file('profile_picture');
                $pictureName = time() . '.' . $file->extension();
                $file->move(public_path('image'), $pictureName);
            }
            $user = User::create([
                'name' => $userdata['name'],
                'lastname' => $userdata['lastname'],
                'username' => $userdata['username'],
                'role' => 'coach',
                'email' => $userdata['email'],
                'password' => Hash::make($userdata['password']),
                'gender' => $userdata['gender'],
                'profile_picture' => $userdata['profile_picture'],
            ]);

            Coach::create([
                'sport' => $userdata['sport'],
                'experience' => $userdata['experience'],
                'user_id' => $user->id,
            ]);

            return $user; // Return the created user entity
        } catch (\Exception $e) {
            // Log the exception or handle it as needed
            throw $e; // Re-throw the exception to be handled elsewhere
        }
    }

    public function clientRegistration(Request $request)
    {
        try {
            $userdata = $request->validate([
                'firstName' => 'nullable',
                'lastName' => 'nullable', // Change 'lastname' to 'lastName' here
                'userName' => 'nullable',
                'email' => 'nullable',
                'password' => 'nullable',
                'age' => 'nullable',
                'height' => 'nullable',
                'weight' => 'nullable',
                'interest' => 'nullable',
                'profile_picture' => 'nullable',
            ]);
            if ($request->hasFile('profile_picture')) {
                $file = $request->file('profile_picture');
                $pictureName = time() . '.' . $file->extension();
                $file->move(public_path('image'), $pictureName);
            } 
            $user = User::create([
                'name' => $userdata['firstName'],
                'lastname' => $userdata['lastName'], // Change 'lastName' to 'lastname'
                'role' => 'client',
                'username' => $userdata['userName'],
                'email' => $userdata['email'],
                'password' => Hash::make($userdata['password']),
                'profile_picture' => $userdata['profile_picture'],
            ]);

            Client::create([
                'user_id' => $user->id,
                'age' => $userdata['age'],
                'height' => $userdata['height'],
                'weight' => $userdata['weight'],
                'gender' => $request->gender,
                'interest' => $request->interest,
            ]);

            return $user; // Return the created user entity
        } catch (\Exception $e) {
            // Log the exception or handle it as needed
            throw $e; // Re-throw the exception to be handled elsewhere
        }
    }
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


    public function logout()
    {
        try {
            auth()->logout();

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully logged out.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'internal_server_error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
