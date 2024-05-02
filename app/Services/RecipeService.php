<?php

// App/Services/RecipeService.php

namespace App\Services;

use App\Repositories\RecipeRepositoryInterface;
use Illuminate\Http\Request;

class RecipeService implements RecipeServiceInterface
{
    protected $RecipeRepository;

    public function __construct(RecipeRepositoryInterface $RecipeRepository)
    {
        $this->RecipeRepository = $RecipeRepository;
    }


    public function createRecipe(Request $request)
    {
        return $this->RecipeRepository->createRecipe($request);
    }
    public function updateRecipe(Request $request, $id)
    {
        return $this->RecipeRepository->updateRecipe($request, $id);
    }

    public function allRecipes()
    {
        return $this->RecipeRepository->allRecipes();
    }
    public function CoachRecipes()
    {
        return $this->RecipeRepository->CoachRecipes();
    }

}
