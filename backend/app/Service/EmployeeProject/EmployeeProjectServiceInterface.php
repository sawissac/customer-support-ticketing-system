<?php

namespace App\Service\EmployeeProject;

use App\Models\EmployeeProject;

interface EmployeeProjectServiceInterface
{
    public function store($id);
    public function update($id, $data);
    public function delete($id);
}
