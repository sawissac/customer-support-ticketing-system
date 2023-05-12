<?php

namespace App\Repository\EmployeeProject;

use App\Models\EmployeeProject;

interface EmployeeProjectRepoInterface
{
    public function get();
    public function show($id);
}
