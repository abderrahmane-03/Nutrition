<?php
namespace App\Repositories;

use App\Models\Recipe;
use Illuminate\Http\Request;

interface RecipeRepositoryInterface
{
    public function createRecipe(Request $request);
    public function updateRecipe(Request $request, $id);
    public function deleteRecipe(Request $request, Recipe $Recipe);
    public function allRecipes();
    public function CoachRecipes();
}
