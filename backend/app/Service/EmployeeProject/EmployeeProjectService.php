<?php

namespace App\Service\EmployeeProject;

use App\Models\EmployeeAssign;
use App\Models\EmployeeProject;
use App\Models\User;

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
        $data = EmployeeProject::where('id',$id)->first();

        return $data->delete();
    }
}
