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

        $clientId = Auth::guard('api')->user()->client->id;
        $Favorite = Favorite::create([
        'recipe_id' => $id,
        'client_id' => $clientId,
]);


        return response()->json([
            'status' => 'success',
            'message' => 'Coach faveed Successfully!',
            'data' => $Favorite,
        ]);
    }
    public function createRecipeFavorites(Request $request,$id)
    {

        $clientId  =  Auth::guard('api')->user()->client->id;
        $Favorite = Favorite::create([
            'recipe_id' => $id,
            'client_id' => $clientId->client_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe faveed Successfully!',
            'data' => $Favorite,
        ]);
    }

    public function allFavorites()
    {
        $clientId = Auth::guard('api')->user()->client->id;

        $favorites = Favorite::with(['coach', 'recipe'])
            ->where('client_id', $clientId)
            ->get();

        return response()->json([
            'status' => 'success',
            'favorites' => $favorites
        ], 200);
    }

    public function removeCoachFavorites(Request $request,$id)
    {

        $clientId = Auth::guard('api')->user()->client->id;
        $Favorite = Favorite::remove([
        'recipe_id' => $id,
        'client_id' => $clientId,
]);


        return response()->json([
            'status' => 'success',
            'message' => 'Coach faveed Successfully!',
            'data' => $Favorite,
        ]);
    }
    public function removeRecipeFavorites(Request $request,$id)
    {

        $clientId  =  Auth::guard('api')->user()->client->id;
        $Favorite = Favorite::remove([
            'recipe_id' => $id,
            'client_id' => $clientId->client_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe faveed Successfully!',
            'data' => $Favorite,
        ]);
    }

}
