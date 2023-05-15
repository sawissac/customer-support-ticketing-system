<?php

namespace App\Repository\User;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function get()
    {
        $data = User::all();

        return $data;
    }

    public function show($id)
    {
        $result = User::where('id', $id)->first();

        return $result;
    }
}