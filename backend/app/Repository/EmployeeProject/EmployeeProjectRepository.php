<?php

namespace App\Repository\EmployeeProject;

use App\Models\EmployeeProject;
class EmployeeProjectRepository implements EmployeeProjectRepositoryInterface
{
    public function get()
    {
        $data = EmployeeProject::with('user', 'project')->get();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeProject::with('user', 'project')->where('id', $id)->first();

        return $result;
    }
}
