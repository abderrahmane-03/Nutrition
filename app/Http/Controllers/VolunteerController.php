<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerController extends Controller
{

    /**
     * Apply for an announcement.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *     path="/api/application/create",
     *     summary="Apply for an announcement",
     *     tags={"Volunteer"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="announcement_id",
     *                 type="integer",
     *                 example=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Application done successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Application done successfully, waiting for admin approval"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */

     
    public function applyForAnnouncement(Request $request)
    {
        try {
            Application::create([
                'volunteer_id' => Auth::user()->volunteer->id,
                'announcement_id' => $request->announcement_id
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Application done succesfully waiting for admin approval '
            ]);
        }
        catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }

}
