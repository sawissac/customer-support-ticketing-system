<?php

namespace App\Repository\EmployeeAssign;

use App\Models\EmployeeAssign;


class EmployeeAssignRepository implements EmployeeAssignRepoInterface
{
    public function get()
    {
        $data = EmployeeAssign::all();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeAssign::where('id', $id)->first();

        return $result;
    }
}
