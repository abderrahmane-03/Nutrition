<?php

// App/Services/FavoriteService.php

namespace App\Services;

use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Repositories\FavoriteRepositoryInterface;

class FavoriteService implements FavoriteServiceInterface
{
    protected $FavoriteRepository;

    public function __construct(FavoriteRepositoryInterface $FavoriteRepository)
    {
        $this->FavoriteRepository = $FavoriteRepository;
    }

    public function allFavorites()
    {
        return $this->FavoriteRepository->allFavorites();
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
        return $this->FavoriteRepository->removeFavorites($favorite,$id);
    }

}
