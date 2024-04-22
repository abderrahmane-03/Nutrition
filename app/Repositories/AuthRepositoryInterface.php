<?php
// App/Repositories/AuthRepositoryInterface.php

namespace App\Repositories;

use Illuminate\Http\Request;

interface AuthRepositoryInterface
{
    public function coachRegistration(Request $request);
    public function clientRegistration(Request $request);
    public function login(Request $request);
    public function logout();
}
