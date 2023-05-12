<?php

namespace App\Service\EmployeeAssign;

use App\Models\EmployeeAssign;

class EmployeeAssignService implements EmployeeAssignServiceInterface
{
    public function store($data)
    {
        return EmployeeAssign::create($data);
    }

    public function update($id, $data)
    {
        $result = EmployeeAssign::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = EmployeeAssign::where('id', $id)->first();

        return $data->delete();
    }
}
