<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class CheckForRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$role): Response
    {
        $user = Auth::guard('api')->user();
        // return response()->json($user->role);
        if ($user->role != $role) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Sorry, you have no permissions to perform this action'
            ]);
        }
        return $next($request);
    }


}
