<?php
namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Http\Request;

interface FavoriteRepositoryInterface
{
    public function allFavorites();
    public function createCoachFavorites(Request $request,$id);
    public function createRecipeFavorites(Request $request,$id);
    public function removeCoachFavorites(Request $request,$id);
    public function removeRecipeFavorites(Request $request,$id);
}
