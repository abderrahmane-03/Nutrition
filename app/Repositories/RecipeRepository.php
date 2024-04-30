<?php

namespace App\Repositories;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class RecipeRepository implements RecipeRepositoryInterface
{
    public function createRecipe(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required',
                'description' => 'required',
                'cooking_time' => 'required',
                'ingredients' => 'required',
                'instructions' => 'required',
                'picture' => 'required',
                'nutrition_information' => 'required',
                'coach_id' => 'required',
            ]);
            if ($request->hasFile('picture')) {
                $file = $request->file('picture');
                $pictureName = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/pictures', $pictureName); // Store file in storage/app/public/pictures
                $PictureUrl = 'storage/pictures/' . $pictureName; // Save the file path in the database
            }
            $recipe = Recipe::create([
                'title' => $request->title,
                'description' => $request->description,
                'cooking_time' => $request->cooking_time,
                'ingredients' => $request->ingredients,
                'instructions' => $request->instructions,
                'nutrition_information' => $request->nutrition_information,
                'picture' => $PictureUrl,
                'coach_id' => $request->coach_id,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe Created Successfully!',
                'data' => $recipe,
                'session' => Session::get('role')
            ]);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    public function updateRecipe(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'cooking_time' => 'required',
            'ingredients' => 'required',
            'instructions' => 'required',
            'nutrition_information' => 'required',
            'coach_id' => 'required',
        ]);

        $recipe->update($request->all());

        return response()->json([
            'message' => 'Recipe data updated successfully',
            'updated_recipe' => $recipe
        ]);
    }



    public function deleteRecipe(Request $request, Recipe $Recipe){
        $Recipe->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Recipe ' . $Recipe->title . ' deleted successfully'
        ]);
    }



    public function allRecipes()
    {
        $Recipes = Recipe::all();
        return response()->json([
            'status' => 'success',
            'Recipes' => $Recipes
        ],200);
    }



}
