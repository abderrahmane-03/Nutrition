<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

use Illuminate\Support\Facades\DB;
class FavoriteRepository implements FavoriteRepositoryInterface
{
 public function createCoachFavorites(Request $request,$id)
    {
        $user=Auth::guard('api')->user();
        $clientId  =  $user->client->id;
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
        $clientId  =  $user->client->id;
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
    // Query to retrieve favorites for the specific client
    // Query to retrieve favorites for the specific client
$clientId = Auth::guard('api')->user()->client->id;
$clientFavorites = Favorite::with(['coache.user', 'recipe'])
    ->where('client_id', $clientId)
    ->get();

// Query to count occurrences of each recipe or coach across all clients
$allFavorites = Favorite::select('recipe_id', 'coache_id', DB::raw('COUNT(id) as id_count'))
    ->groupBy('recipe_id', 'coache_id')
    ->get();

// Prepare associative arrays for counting
$recipeCounts = [];
$coachCounts = [];

// Count occurrences of each recipe and coach
foreach ($allFavorites as $favorite) {
    if ($favorite->recipe_id !== null) {
        $recipeCounts[$favorite->recipe_id] = $favorite->id_count;
    }
    if ($favorite->coache_id !== null) {
        $coachCounts[$favorite->coache_id] = $favorite->id_count;
    }
}

// Prepare merged data
$mergedFavorites = [];
foreach ($clientFavorites as $favorite) {
    $coach = $favorite->coache()->first(); // Use method call to access the relationship
    $user = $coach ? $coach->user : null;
    $mergedFavorites[] = [
        'favorite' => $favorite,
        'coach_user' => $user,
        'recipe_count' => isset($recipeCounts[$favorite->recipe_id]) ? $recipeCounts[$favorite->recipe_id] : 0,
        'coach_count' => isset($coachCounts[$favorite->coache_id]) ? $coachCounts[$favorite->coache_id] : 0,
    ];
}

return response()->json([
    'status' => 'success',
    'favorites' => $mergedFavorites
], 200);

}

public function coachesFavorites()
{
    // Query to count occurrences of each coach across all clients
    $allFavorites = Favorite::select('coache_id', DB::raw('COUNT(id) as coach_count'))
        ->groupBy('coache_id')
        ->get();

    // Query to retrieve favorites for the specific client
    $clientId = Auth::guard('api')->user()->client->id;
    $clientFavorites = Favorite::with(['coache'])
        ->where('client_id', $clientId)
        ->get();

    return response()->json([
        'status' => 'success',
        'favorites' => $clientFavorites,
        'coach_counts' => $allFavorites->pluck('coach_count', 'coache_id')->toArray()
    ], 200);
}

public function recipeFavorites()
    {
    // Query to retrieve favorites for the specific client
    $allFavorites = Favorite::select('recipe_id', DB::raw('COUNT(id) as recipe_count'))
    ->groupBy('recipe_id')
    ->get();

// Query to retrieve favorites for the specific client
$clientId = Auth::guard('api')->user()->client->id;
$clientFavorites = Favorite::with(['recipe'])
    ->where('client_id', $clientId)
    ->get();

return response()->json([
    'status' => 'success',
    'favorites' => $clientFavorites,
    'recipe_counts' => $allFavorites->pluck('recipe_count', 'recipe_id')->toArray()
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
