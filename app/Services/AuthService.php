<?php

// App/Services/AuthService.php

namespace App\Services;

use Illuminate\Http\Request;
use App\Services\AuthServiceInterface;
use App\Repositories\AuthRepositoryInterface;

class AuthService implements AuthServiceInterface
{
    protected $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function coachRegistration(Request $request)
    {
        return $this->authRepository->coachRegistration($request);
    }

    public function clientRegistration(Request $request)
    {
        return $this->authRepository->clientRegistration($request);
    }

    public function login(Request $request)
    {
        return $this->authRepository->login($request);
    }

    public function logout(Request $request)
    {
        return $this->authRepository->logout();
    }
}
