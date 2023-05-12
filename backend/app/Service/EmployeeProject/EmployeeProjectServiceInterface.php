<?php

namespace App\Service\EmployeeProject;


interface EmployeeProjectServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
