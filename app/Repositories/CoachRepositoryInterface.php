<?php
namespace App\Repositories;

use App\Models\Coach;
use Illuminate\Http\Request;

interface CoachRepositoryInterface
{
    public function updateCoach(Request $request, $id);
    public function allCoachs();
    public function getCoachById($id);
}
