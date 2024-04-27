<?php

namespace App\Services;

use App\Models\Favorite;
use Illuminate\Http\Request;

interface FavoriteServiceInterface
{

    public function removeFavorites(Favorite $favorite,$id);
    public function createRecipeFavorites(Request $request,$id);
    public function createCoachFavorites(Request $request,$id);
    public function allFavorites();
    public function recipeFavorites();
    public function coachesFavorites();
}
