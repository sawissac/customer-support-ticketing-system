<?php

namespace App\Service\User;

use App\Models\CustomerProject;
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
        $data = User::find($id);

        $userIsInEmployeeProject = EmployeeProject::where('user_id', $id)->exists();
        $userIsInCustomerProject = CustomerProject::where('user_id', $id)->exists();
        $userIsInEmployeeAssign = EmployeeAssign::where('employee_id', $id)->exists();
        $userResignRole = $data->roles->contains('name','resign_employee');
        $userAdminRole = $data->roles->contains('name','admin');

        if ($userIsInEmployeeProject || $userIsInEmployeeAssign || $userResignRole || $userAdminRole || $userIsInCustomerProject) {
            return false;
        }

        return $data->delete();
    }
}
