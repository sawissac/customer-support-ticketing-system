<?php

namespace App\Service\AssignedEmployee;

interface AssEmployeeServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
