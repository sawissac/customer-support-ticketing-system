<?php

namespace App\Service\EmployeeAssign;

interface EmployeeAssginServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
