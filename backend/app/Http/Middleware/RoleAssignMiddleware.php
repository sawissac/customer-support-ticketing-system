<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleAssignMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {

        $user = $request->user();

        // Assign the appropriate role(s) to the user

        if ($user && $user->hasRole($role)) {
            return $next($request);
        }

        // User does not have the required role
        return response()->json(['message' => 'Unauthorized'], 403);

    }
}