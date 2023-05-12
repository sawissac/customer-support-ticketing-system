<?php

namespace App\Repository\EmployeeProject;

use App\Models\EmployeeProject;

interface EmployeeProjectRepoInterface
{
    public function index();
    public function show($id);
}
