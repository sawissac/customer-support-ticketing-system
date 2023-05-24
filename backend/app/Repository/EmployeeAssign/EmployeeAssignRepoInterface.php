<?php

namespace App\Repository\EmployeeAssign;

interface EmployeeAssignRepoInterface
{
    public function get();

    public function show($id);

    public function employeeByTicketID($id);
    
    public function employeeByEmployee($id);
}
