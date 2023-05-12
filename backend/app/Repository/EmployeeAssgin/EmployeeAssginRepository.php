<?php

namespace App\Repository\EmployeeAssgin;

use App\Models\EmployeeAssgin;
use App\Repository\EmployeeAssgin\EmployeeAssginRepoInterface;

class EmployeeAssginRepository implements EmployeeAssginRepoInterface
{
    public function get()
    {
        $data = EmployeeAssgin::all();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeAssgin::where('id', $id)->first();

        return $result;
    }
}
