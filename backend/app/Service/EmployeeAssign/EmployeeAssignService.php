<?php

namespace App\Service\EmployeeAssign;

use App\Models\EmployeeAssign;
use App\Models\EmployeeProject;

class EmployeeAssignService implements EmployeeAssignServiceInterface
{
    public function store($data)
    {
        $existingData = EmployeeProject::where('project_id', $data['project_id'])
            ->where('user_id', $data['employee_id'])
            ->first();

        if (!$existingData) {
            EmployeeProject::create([
                'project_id' => $data['project_id'],
                'user_id' => $data['employee_id'],
            ]);
        }

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
