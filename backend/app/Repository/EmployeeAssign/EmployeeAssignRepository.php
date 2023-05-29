<?php

namespace App\Repository\EmployeeAssign;

use App\Models\EmployeeAssign;

class EmployeeAssignRepository implements EmployeeAssignRepoInterface
{
    public function get()
    {
        $data = EmployeeAssign::with('employee', 'ticket')->get();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeAssign::with('user', 'ticket')->where('id', $id)->first();

        return $result;
    }

   
}
