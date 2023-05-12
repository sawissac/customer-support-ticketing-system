<?php

namespace App\Repository\EmployeeProject;

use App\Models\EmployeeProject;

<<<<<<< HEAD
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
=======
class EmployeeProjectRepository implements EmployeeProjectRepositoryInterface
{
    public function get()
    {
        $data = EmployeeProject::with('user')->get();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeProject::where('id', $id)->first();

        return $result;
>>>>>>> main
    }
}
