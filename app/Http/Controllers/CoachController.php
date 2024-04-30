<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\CoachRepositoryInterface;

class CoachController extends Controller
{
    private $CoachRepository;

    public function __construct(CoachRepositoryInterface $CoachRepository)
    {
        $this->CoachRepository = $CoachRepository;
    }


    public function updateCoach(Request $request, $id)
    {
        return $this->CoachRepository->updateCoach($request,$id);
    }

    public function allCoachs()
    {
       
        return $this->CoachRepository->allCoachs();
    }
    public function getCoachById($id)
    {
        return $this->CoachRepository->getCoachById($id);
    }


}
