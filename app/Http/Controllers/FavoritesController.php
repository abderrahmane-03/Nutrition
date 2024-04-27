<?php

namespace App\Http\Controllers;


use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Repositories\FavoriteRepositoryInterface;

class FavoritesController extends Controller
{
    private $FavoriteRepository;

    public function __construct(FavoriteRepositoryInterface $FavoriteRepository)
    {
        $this->FavoriteRepository = $FavoriteRepository;
    }
    public function createRecipeFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->createRecipeFavorites($request,$id);
    }
    public function createCoachFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->createCoachFavorites($request,$id);
    }
    public function removeFavorites(Favorite $favorite,$id)
    {
        return $this->FavoriteRepository->removeFavorites( $favorite,$id);
    }
    public function allFavorites()
    {
        return $this->FavoriteRepository->allFavorites();
    }
    public function coachesFavorites()
    {
        return $this->FavoriteRepository->coachesFavorites();
    }
    public function recipeFavorites()
    {
        return $this->FavoriteRepository->recipeFavorites();
    }



}
