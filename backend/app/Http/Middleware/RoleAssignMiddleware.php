<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleAssignMiddleware
{
    public function handle(Request $request, Closure $next, $roles)
    {

        $user = $request->user();

        if ($user && $user->hasRole('admin')) {
            return $next($request);
        }

        if ($user && $user->hasRole($roles)) {
            return $next($request);
        }
        return response()->json(['message' => 'Unauthorized'], 403);

    }
}
