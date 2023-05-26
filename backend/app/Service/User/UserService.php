<?php

namespace App\Service\User;

use App\Models\EmployeeAssign;
use App\Models\EmployeeProject;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserService implements UserServiceInterface
{
    public function store($data)
    {
        $data = array_merge($data, ['password' => Hash::make($data['password'])]);
        $user = User::create($data);
        $user->assignRole($data['role']);
        return $user;
    }

    public function update($id, $data)
    {
        $user = User::where('id', $id)->first();
        $user->update($data);
        $user->syncRoles($data['role']);
        return $user;
    }

    public function delete($id)
    {
        // $data = User::where('id', $id)->first();

        // return $data->delete();

        $data = User::find($id);

        // $data = User::where('id', $id)->first();

        $userIsInEmployeeProject = EmployeeProject::where('user_id', $id)->exists();
        $userIsInEmployeeAssign = EmployeeAssign::where('employee_id', $id)->exists();
        $userResignRole = $data->roles->contains('name','resign_employee');

        if ($userIsInEmployeeProject || $userIsInEmployeeAssign || $userResignRole) {
            return false;
        }

        $data->roles->detach();

        return $data->delete();
    }
}
