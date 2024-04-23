<?php

namespace App\Http\Controllers;


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
    public function removeRecipeFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->removeRecipeFavorites($request,$id);
    }
    public function removeCoachFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->removeCoachFavorites($request,$id);
    }
    public function allFavorites()
    {
        return $this->FavoriteRepository->allFavorites();
    }


}
