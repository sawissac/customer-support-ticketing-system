<?php

namespace App\Repository\User;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function get()
    {
        $data = User::with('roles')->get();

        return $data;
    }

    public function show($id)
    {
        $result = User::with('roles')->where('id', $id)->first();

        return $result;
    }

    public function employee()
    {
        $employeeData = User::whereHas('roles', function ($query) {
            $query->where('name', 'employee');
        })->with('roles')->get();

        return $employeeData;
    }

    public function customer()
    {
        $customerData = User::whereHas('roles', function ($query) {
            $query->where('name', 'customer');
        })->with('roles')->get();

        return $customerData;
    }
}
