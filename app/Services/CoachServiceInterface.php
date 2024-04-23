<?php

namespace App\Services;

use Illuminate\Http\Request;

interface CoachServiceInterface
{
    public function updateCoach(Request $request, $id);
    public function allCoachs();

}
