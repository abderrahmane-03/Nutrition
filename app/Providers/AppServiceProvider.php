<?php

namespace App\Providers;

use App\Models\Favorite;
use App\Services\AuthService;
use App\Services\CoachService;
use App\Services\RecipeService;
use App\Services\FavoriteService;
use App\Repositories\AuthRepository;
use App\Repositories\CoachRepository;
use App\Repositories\RecipeRepository;
use App\Services\AuthServiceInterface;
use App\Services\CoachServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Repositories\FavoriteRepository;
use App\Services\RecipeServiceInterface;
use App\Services\FavoriteServiceInterface;
use App\Repositories\AuthRepositoryInterface;
use App\Repositories\CoachRepositoryInterface;
use App\Repositories\RecipeRepositoryInterface;
use App\Repositories\FavoriteRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(RecipeRepositoryInterface::class, RecipeRepository::class);
        $this->app->bind(CoachRepositoryInterface::class, CoachRepository::class);
        $this->app->bind(FavoriteRepositoryInterface::class, FavoriteRepository::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(RecipeServiceInterface::class, RecipeService::class);
        $this->app->bind(CoachServiceInterface::class, CoachService::class);
        $this->app->bind(FavoriteServiceInterface::class, FavoriteService::class);
    }

    public function boot()
    {
        //
    }
}
