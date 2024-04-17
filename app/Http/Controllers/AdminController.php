<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    /**
     * Ban a user.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *     path="/api/users/ban/{user}",
     *     summary="Ban a user",
     *     tags={"Admin"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="ID of the user to ban",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User banned successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User banned successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function banUser(User $user)
    {
        try {
            $user->banned_at = now();
            $user->save();
            return response()->json([
                'status' => 'success',
                'message' => 'user ' . $user->name . ' banned successfully'
            ]);
        }
        catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }
}
