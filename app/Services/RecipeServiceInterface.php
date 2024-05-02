<?php

namespace App\Services;

use Illuminate\Http\Request;

interface RecipeServiceInterface
{
    public function createRecipe(Request $request);
    public function updateRecipe(Request $request, $id);
    public function allRecipes();

    public function CoachRecipes();
}
