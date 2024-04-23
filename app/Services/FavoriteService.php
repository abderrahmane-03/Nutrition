<?php

// App/Services/FavoriteService.php

namespace App\Services;

use App\Repositories\FavoriteRepositoryInterface;
use Illuminate\Http\Request;

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
    public function removeRecipeFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->removeRecipeFavorites($request,$id);
    }
    public function removeCoachFavorites(Request $request,$id)
    {
        return $this->FavoriteRepository->removeCoachFavorites($request,$id);
    }

}
