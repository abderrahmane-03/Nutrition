<?php

// App/Services/CoachService.php

namespace App\Services;

use App\Repositories\CoachRepositoryInterface;
use Illuminate\Http\Request;

class CoachService implements CoachServiceInterface
{
    protected $CoachRepository;

    public function __construct(CoachRepositoryInterface $CoachRepository)
    {
        $this->CoachRepository = $CoachRepository;
    }

    public function updateCoach(Request $request, $id)
    {
        return $this->CoachRepository->updateCoach($request, $id);
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
