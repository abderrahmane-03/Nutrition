<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthServiceInterface;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    public function coachRegistration(Request $request)
    {
        return $this->authService->coachRegistration($request);
    }

    public function clientRegistration(Request $request)
    {
        return $this->authService->clientRegistration($request);
    }

    public function login(Request $request)
    {
        return $this->authService->login($request);
    }

    public function logout(Request $request)
    {
        return $this->authService->logout($request);
    }
}
