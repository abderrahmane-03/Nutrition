<?php
namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Http\Request;

interface FavoriteRepositoryInterface
{
    public function allFavorites();
    public function recipeFavorites();

    public function coachesFavorites();
    public function createCoachFavorites(Request $request,$id);
    public function createRecipeFavorites(Request $request,$id);
    public function removeFavorites( Favorite $favorite,$id);
}
