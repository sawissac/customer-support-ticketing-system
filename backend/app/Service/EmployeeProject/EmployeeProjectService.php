<?php

namespace App\Service\EmployeeProject;

use App\Models\EmployeeAssign;
use App\Models\EmployeeProject;

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

        $data = EmployeeProject::find($id);

        $userIsInEmployeeAssign =  EmployeeAssign::where('employee_id', $id)->exists();

        if($userIsInEmployeeAssign) {
            return false;
        }

        return $data->delete();
    }


}
