<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware('guest')->group(function (){
    Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
    Route::post('/register/coach',[\App\Http\Controllers\AuthController::class,'coachRegistration']);
   Route::post('/register/client',[\App\Http\Controllers\AuthController::class,'clientRegistration']);
});
Route::get('/recipes/all',[\App\Http\Controllers\RecipesController::class,'allRecipes']);
Route::get('/coaches/all',[\App\Http\Controllers\CoachController::class,'allCoachs']);
Route::get('/favorites/all',[\App\Http\Controllers\FavoritesController::class,'allFavorites']);
Route::post('/fave/recipe/{id}',[\App\Http\Controllers\FavoritesController::class,'createRecipeFavorites']);
Route::post('/fave/coach/{id}',[\App\Http\Controllers\FavoritesController::class,'createCoachFavorites']);
Route::post('/unfave/recipe/{id}',[\App\Http\Controllers\FavoritesController::class,'removeRecipeFavorites']);
Route::post('/unfave/coach/{id}',[\App\Http\Controllers\FavoritesController::class,'removeCoachFavorites']);

Route::middleware('auth:api')->group(function (){
    Route::group(['middleware' => 'role:Client'],function (){
    });
    Route::group(['middleware' => 'role:Coach'],function (){
       });
    Route::group(['middleware' => 'role:admin'],function (){
        });
    Route::post('/logout',[\App\Http\Controllers\AuthController::class,'logout']);
});

