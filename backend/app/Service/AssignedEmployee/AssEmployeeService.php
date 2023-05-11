<?php

namespace App\Service\AssignedEmployee;

use App\Models\AssignedEmployee;

class AssEmployeeService implements AssEmployeeServiceInterface
{
    public function store($data)
    {
        return AssignedEmployee::create($data);
    }

    public function update($id, $data)
    {
        $result = AssignedEmployee::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = AssignedEmployee::where('id', $id)->first();

        return $data->delete();
    }
}
