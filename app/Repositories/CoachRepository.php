<?php

namespace App\Repositories;

use App\Models\Coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class CoachRepository implements CoachRepositoryInterface
{

    public function updateCoach(Request $request, $id)
    {
        $Coach = Coach::findOrFail($id);

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'cooking_time' => 'required',
            'ingredients' => 'required',
            'instructions' => 'required',
            'nutrition_information' => 'required',
            'coach_id' => 'required',
        ]);

        $Coach->update($request->all());

        return response()->json([
            'message' => 'Coach data updated successfully',
            'updated_Coach' => $Coach
        ]);
    }



    public function getCoachById($id)
    {
        try {
            $coach = Coach::findOrFail($id);
            // You can modify the response format as needed
            return response()->json($coach);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch coach data'], 404);
        }
    }


    public function allCoachs()
    {
        $Coachs = Coach::with('user')->get();
        return response()->json([
            'status' => 'success',
            'Coachs' => $Coachs
        ],200);
    }



}
