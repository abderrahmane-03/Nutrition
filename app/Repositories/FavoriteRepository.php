<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class FavoriteRepository implements FavoriteRepositoryInterface
{
 public function createCoachFavorites(Request $request,$id)
    {
        $user=Auth::guard('api')->user();
        $clientId  =  $user->id;
        $Favorite = Favorite::create([
            'coache_id' => $id,
            'client_id' => $clientId,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Recipe faveed Successfully!',
            'data' => $Favorite,
        ]);
    }

    public function createRecipeFavorites(Request $request,$id)
    {

        $user=Auth::guard('api')->user();
        $clientId  =  $user->id;
        $Favorite = Favorite::create([
            'recipe_id' => $id,
            'client_id' => $clientId,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Recipe faveed Successfully!',
            'data' => $Favorite,
        ]);
    }

    public function allFavorites()
    {

        $user=Auth::guard('api')->user();
        $clientId  =  $user->id;

        $favorites = Favorite::with(['coach', 'recipe'])
            ->where('client_id', $clientId)
            ->get();

        return response()->json([
            'status' => 'success',
            'favorites' => $favorites
        ], 200);
    }

    public function removeFavorites( Favorite $favorite,$id)
    {

        $deleted = $favorite->where('id', $id)->delete();

    if ($deleted) {
        return response()->json([
            'status' => 'success',
            'message' => 'Favorite deleted successfully'
        ],200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to delete favorite'
        ],400);
    }
    }


}
