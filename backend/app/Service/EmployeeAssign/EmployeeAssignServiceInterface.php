<?php

namespace App\Service\EmployeeAssign;

interface EmployeeAssignServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
