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
    Route::post('/register/Coach',[\App\Http\Controllers\AuthController::class,'coachRegistration']);
    Route::post('/register/Writer',[\App\Http\Controllers\AuthController::class,'writerRegistration']);
    Route::post('/register/Client',[\App\Http\Controllers\AuthController::class,'clientRegistration']);
});


Route::middleware('auth:api')->group(function (){
    Route::group(['middleware' => 'role:Client'],function (){
    });
    Route::group(['middleware' => 'role:Coach'],function (){
       });
    Route::group(['middleware' => 'role:Writer'],function (){
       });
    Route::group(['middleware' => 'role:admin'],function (){
        });
    Route::post('/logout',[\App\Http\Controllers\AuthController::class,'logout']);
});

