<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Repositories\RecipeRepositoryInterface;

class RecipesController extends Controller
{
    private $recipeRepository;

    public function __construct(RecipeRepositoryInterface $recipeRepository)
    {
        $this->recipeRepository = $recipeRepository;
    }

    public function createRecipe(Request $request)
    {
        return $this->recipeRepository->createRecipe($request);
    }

    public function updateRecipe(Request $request, $id)
    {
        return $this->recipeRepository->updateRecipe($request,$id);
    }

    public function allRecipes()
    {
        return $this->recipeRepository->allRecipes();
    }


}
