<?php

namespace App\Services;

use Illuminate\Http\Request;

interface FavoriteServiceInterface
{

    public function removeRecipeFavorites(Request $request,$id);
    public function removeCoachFavorites(Request $request,$id);

    public function createRecipeFavorites(Request $request,$id);
    public function createCoachFavorites(Request $request,$id);
    public function allFavorites();
}
