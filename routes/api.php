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
   Route::get('/recipes/all',[\App\Http\Controllers\RecipesController::class,'allRecipes']);
   Route::get('/coaches/all',[\App\Http\Controllers\CoachController::class,'allCoachs']);
   Route::get('/recipefavorites',[\App\Http\Controllers\FavoritesController::class,'recipeFavorites']);
   Route::get('/favorites',[\App\Http\Controllers\FavoritesController::class,'coachesFavorites']);
   Route::get('/favorites/all',[\App\Http\Controllers\FavoritesController::class,'allFavorites']);
   Route::get('/ratings', [App\Http\Controllers\ClientController::class, 'Ratings']);
});

// Route::middleware('auth:api')->group(function (){
    Route::group(['middleware' => 'role:client'],function (){
Route::get('/coach/{id}', [App\Http\Controllers\CoachController::class, 'getCoachById']);
Route::post('/fave/recipe/{id}',[\App\Http\Controllers\FavoritesController::class,'createRecipeFavorites']);
Route::post('/fave/coach/{id}',[\App\Http\Controllers\FavoritesController::class,'createCoachFavorites']);
Route::delete('/unfave/{id}',[\App\Http\Controllers\FavoritesController::class,'removeFavorites']);
Route::post('/checkout',[\App\Http\Controllers\ClientController::class,'checkout']);
Route::get('/Reservations', [App\Http\Controllers\ClientController::class, 'clientReservation']);
Route::post('/Rate', [App\Http\Controllers\ClientController::class, 'Rate']);
});
    Route::group(['middleware' => 'role:coach'],function (){
       });
    Route::group(['middleware' => 'role:admin'],function (){
        });
    Route::post('/logout',[\App\Http\Controllers\AuthController::class,'logout']);
// });
Route::post('/stripe/webhook', [App\Http\Controllers\ClientController::class, 'handleStripeWebhook']);
Route::get('/recipes/coach',[\App\Http\Controllers\RecipesController::class,'CoachRecipes']);

Route::post('/recipes/create',[\App\Http\Controllers\RecipesController::class,'createRecipe']);
Route::get('/chatForm/{user_id}', [App\Http\Controllers\chatController::class, 'chatForm']);
Route::post('/chatMessage/{user_id}', [App\Http\Controllers\chatController::class, 'sendMessage']);
Route::get('/bringClients', [App\Http\Controllers\chatController::class, 'bringClients']);
Route::get('/Auth', [App\Http\Controllers\chatController::class, 'auth']);
