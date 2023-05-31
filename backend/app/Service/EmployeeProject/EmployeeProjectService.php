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
        $data = EmployeeProject::where('id', $id)->first();

        $employeeAssign = EmployeeAssign::where('employee_id', $data->user_id)->exists();

        if ($employeeAssign) {
            return false;
        }

        return $data->delete();
    }
}
