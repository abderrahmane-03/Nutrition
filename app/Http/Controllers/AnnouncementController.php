<?php

namespace App\Http\Controllers;

use App\Models\Annoucement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Facades\JWTAuth;

class AnnouncementController extends Controller
{
    /**
     * Create a new announcement.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *     path="/api/announcement/create",
     *     summary="Create a new announcement",
     *     tags={"Announcement"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 example="New Announcement"
     *             ),
     *             @OA\Property(
     *                 property="description",
     *                 type="string",
     *                 example="This is a new announcement"
     *             ),
     *             @OA\Property(
     *                 property="date",
     *                 type="string",
     *                 format="date",
     *                 example="2024-04-01"
     *             ),
     *             @OA\Property(
     *                 property="location",
     *                 type="string",
     *                 example="New York"
     *             ),
     *             @OA\Property(
     *                 property="type",
     *                 type="string",
     *                 example="Public"
     *             ),
     *             @OA\Property(
     *                 property="required_skills",
     *                 type="array",
     *                 @OA\Items(type="string"),
     *                 example={"Skill 1", "Skill 2"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Announcement created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Announcement Created Successfully !"
     *             ),
     *             @OA\Property(
     *                 property="data",
     *                 type="object"
     *             ),
     *             @OA\Property(
     *                 property="session",
     *                 type="string",
     *                 example="admin"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function createAnnouncement(Request $request)
    {
     try{
         $request->validate([
             'title' => 'required',
             'description' => 'required',
             'date' => 'required',
             'location' => 'required',
             'type' => 'required',
             'required_skills' => 'required'
         ]);

         $user = Auth::user();

         $announcement = Annoucement::create([
             'title' => $request->title,
             'description' => $request->description,
             'date' => $request->date,
             'location' => $request->location ,
             'required_skills' => json_encode($request->required_skills),
             'type' => $request->type,
             'organizer_id' => $user->organizer->id
         ]);

         return response()->json([
             'status' => 'success',
             'message' => 'Announcement Created Successfully !',
             'data' => $announcement,
             'session' => Session::get('role')
         ]);
     }
     catch(\Exception $e){
         return response()->json($e->getMessage());
     }
    }



    /**
     * Update an existing announcement.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Put(
     *     path="/api/announcement/update/{announcement}",
     *     summary="Update an existing announcement",
     *     tags={"Announcement"},
     *     @OA\Parameter(
     *         name="announcement",
     *         in="path",
     *         description="ID of the announcement to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 example="Updated Announcement"
     *             ),
     *             @OA\Property(
     *                 property="description",
     *                 type="string",
     *                 example="This is the updated announcement"
     *             ),
     *             @OA\Property(
     *                 property="date",
     *                 type="string",
     *                 format="date",
     *                 example="2024-04-01"
     *             ),
     *             @OA\Property(
     *                 property="location",
     *                 type="string",
     *                 example="Updated Location"
     *             ),
     *             @OA\Property(
     *                 property="type",
     *                 type="string",
     *                 example="Updated Type"
     *             ),
     *             @OA\Property(
     *                 property="required_skills",
     *                 type="array",
     *                 @OA\Items(type="string"),
     *                 example={"Updated Skill 1", "Updated Skill 2"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Announcement updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Announcement data updated successfully"
     *             ),
     *             @OA\Property(
     *                 property="updated_announcement",
     *                 type="object"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Announcement not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */

     public function updateAnnouncement(Request $request, $id)
     {
         $user = Auth::user();

         $announcement = Annoucement::findOrFail($id);

         if ($user->organizer->id !== $announcement->organizer_id) {
             return response()->json([
                 'error' => 'You are not authorized to update this announcement.'
             ], 403);
         }

         $request->validate([
             'title' => 'required|string',
             'description' => 'required|string',
             'type' => 'required|string',
             'location' => 'required|string',
             'date' => 'required|date',
         ]);

         $announcement->update($request->all());

         return response()->json([
             'message' => 'Announcement data updated successfully',
             'updated_announcement' => $announcement
         ]);
     }


    /**
     * Delete an existing announcement.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Delete(
     *     path="/api/announcement/delete/{announcement}",
     *     summary="Delete an existing announcement",
     *     tags={"Announcement"},
     *     @OA\Parameter(
     *         name="announcement",
     *         in="path",
     *         description="ID of the announcement to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Announcement deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Announcement 'Title' deleted successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Announcement not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function deleteAnnouncement(Request $request, Annoucement $announcement){
        $announcement->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'announcement ' . $announcement->title . ' deleted successfully'
        ]);
    }


    /**
     * Retrieve all announcements.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/announcements/all",
     *     summary="Retrieve all announcements",
     *     tags={"Announcement"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all announcements",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="announcements",
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
    public function allAnnouncements()
    {
        $announcements = Annoucement::all();
        return response()->json([
            'status' => 'success',
            'announcements' => $announcements
        ],200);
    }


    /**
     * Filter announcements by keyword.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @OA\Post(
     *     path="/api/announcements/filter",
     *     summary="Filter announcements by keyword",
     *     tags={"Announcement"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="keyword",
     *                 type="string",
     *                 example="Event"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of filtered announcements",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="announcements",
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
    public function announcementsFilter(Request $request)
    {
        try {
            $keyword = $request->keyword ;
            $announcements = DB::table('announcements')
                ->where(function ($query) use ($keyword){
                    $query->where('location',$keyword)
                        ->orWhere('type',$keyword);
                })
                ->get();
            return response()->json([
                'status' => 'success',
                'announcements' => $announcements
            ],200);
        }
        catch (\Exception $e){
            response()->json($e->getMessage());
        }

    }

}
