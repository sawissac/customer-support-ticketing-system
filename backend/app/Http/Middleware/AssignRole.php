<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    public function handle($request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if ($user && $user->hasRole('admin')) {
            return $next($request);
        }
        if ($user && $user->hasRole($roles)) {
            return $next($request);
        }
        return response()->json([
            'error' => 'Unauthorized'
        ], 403);
    }
}
