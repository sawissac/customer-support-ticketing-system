<?php

namespace App\Service\EmployeeProject;

<<<<<<< HEAD
use App\Models\EmployeeProject;

interface EmployeeProjectServiceInterface
{
    public function store($id);
    public function update($id, $data);
=======

interface EmployeeProjectServiceInterface
{
    public function store($data);

    public function update($id, $data);

>>>>>>> main
    public function delete($id);
}
