<?php

namespace App\Repository\EmployeeProject;

use App\Models\EmployeeProject;

class EmployeeProjectRepository implements EmployeeProjectRepoInterface
{
    public function index()
    {
        $data = EmployeeProject::all();
        return $data;
    }
    public function show($id)
    {
        $data = EmployeeProject::where('id', $id)->first();
        return $data;
    }
}
