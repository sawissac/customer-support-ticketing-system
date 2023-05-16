<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleAssignMiddleware
{
    public function handle(Request $request, Closure $next, $roles)
    {

        $user = $request->user();

        // Assign the appropriate role(s) to the user

        // if ($user->hasRole($role)) {
        //     return $next($request);
        // }
        if ($user && $user->hasRole('admin')) {
            return $next($request);
        }

        // Check if the user has any of the required roles
        // foreach ($roles as $role) {
            if ($user && $user->hasRole($roles)) {
                return $next($request);
            }
        // }

        // User does not have the required role
        return response()->json(['message' => 'Unauthorized'], 403);

    }
}
