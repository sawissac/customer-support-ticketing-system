<?php

namespace App\Service\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserService implements UserServiceInterface
{
    public function store($data)
    {
        $data = array_merge($data,['password' => Hash::make($data['password'])]);

        return User::create($data);
    }

    public function update($id, $data)
    {
        $data = array_merge($data,['password' => Hash::make($data['password'])]);

        $result = User::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = User::where('id', $id)->first();

        return $data->delete();
    }
}
