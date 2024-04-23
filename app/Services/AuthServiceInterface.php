<?php

namespace App\Services;

use Illuminate\Http\Request;

interface AuthServiceInterface
{
    public function login(Request $request);
    public function logout(Request $request);
    public function coachRegistration(Request $request);
    public function clientRegistration(Request $request);
}
