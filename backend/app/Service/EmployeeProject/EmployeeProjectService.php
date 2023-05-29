<?php

namespace App\Service\EmployeeProject;

use App\Models\EmployeeAssign;
use App\Models\EmployeeProject;
use App\Models\Project;

class EmployeeProjectService implements EmployeeProjectServiceInterface
{
    public function store($data)
    {
        return EmployeeProject::create($data);
    }

    public function update($id, $data)
    {
        $result = EmployeeProject::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $user = EmployeeProject::where('id',$id)->first();

        if($user->employeeAssign->exits()){
            return false;
        }

        return $user->delete();
    }
}
