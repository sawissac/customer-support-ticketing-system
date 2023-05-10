<?php

namespace App\Repository\AssignedEmployee;

use App\Models\AssignedEmployee;

class AssEmployeeRepository implements AssEmployeeRepositoryInterface
{
    public function get()
    {
        $data = AssignedEmployee::all();

        return $data;
    }

    public function show($id)
    {
        $result = AssignedEmployee::where('software_id', $id)->get();

        return $result;
    }
}
