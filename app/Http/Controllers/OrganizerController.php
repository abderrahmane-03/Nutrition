<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Annoucement;
use App\Models\Application;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class OrganizerController extends Controller
{
     /**
     * Accept an application.
     *
     * @param \App\Models\Application $application
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/application/accept/{application}",
     *     summary="Accept an application",
     *     tags={"Organizer"},
     *     @OA\Parameter(
     *         name="application",
     *         in="path",
     *         description="ID of the application to accept",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Application accepted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Application accepted successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Application not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function acceptApplication (Application $application){
        try {
            $organizer_id = Auth::user()->organizer->id;
            $organizer_announcements = Annoucement::where('organizer_id',$organizer_id)->pluck('id')->toArray();
            if(in_array($application->announcement_id , $organizer_announcements)){
                $application->confirmed_at = now();
                $application->save();
                return response()->json([
                    'status' => 'success',
                    'message' => 'application ' . $application->id . ' accepted successfully'
                ]);
            }
           else{
               return response()->json([
                   'status' => 'failed',
                   'message' => 'You cannot Make operations on applications that doesnt belong to your events '
               ]);
           }
        }
        catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }
     /**
     * Reject an application.
     *
     * @param \App\Models\Application $application
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/application/reject/{application}",
     *     summary="Reject an application",
     *     tags={"Organizer"},
     *     @OA\Parameter(
     *         name="application",
     *         in="path",
     *         description="ID of the application to reject",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Application rejected successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Application rejected successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Application not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function rejectApplication (Application $application){
        try {
            $organizer_id = Auth::user()->organizer->id;
            $organizer_announcements = Annoucement::where('organizer_id',$organizer_id)->pluck('id')->toArray();
           if (in_array($application->announcement_id , $organizer_announcements)){
               $application->rejected_at = now();
               $application->save();
               return response()->json([
                   'status' => 'success',
                   'message' => 'application ' . $application->id . ' rejected successfully'
               ]);
           }
           else{
               return response()->json([
                   'status' => 'failed',
                   'message' => 'You cannot Make operations on applications that doesnt belong to your event '
               ]);
           }
        }
        catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }


    /**
     * Retrieve all pending applications.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/applications/requests/all",
     *     summary="Retrieve all pending applications",
     *     tags={"Organizer"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all pending applications",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="pending_applications",
     *                 type="string"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function allRequests()
    {
        $organizer_id = Auth::user()->organizer->id;
        $organizer_announcements = Annoucement::where('organizer_id',$organizer_id)->pluck('id')->toArray();
        $applications = Application::whereIn('announcement_id',$organizer_announcements)
            ->whereNull('confirmed_at')
            ->whereNull('rejected_at')
            ->get();

        return response()->json([
           'status' => 'success',
           'pending_applications' =>$applications
        ]);
    }
    public function allapps()
    {
      $applications = Application::all();

        return response()->json([
           'status' => 'success',
           'pending_applications' =>$applications
        ]);
    }

}
