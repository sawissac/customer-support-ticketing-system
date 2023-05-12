<?php

namespace App\Service\EmployeeAssgin;

interface EmployeeAssginServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}