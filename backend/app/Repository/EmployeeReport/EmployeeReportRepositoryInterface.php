<?php

namespace App\Repository\EmployeeReport;


interface EmployeeReportRepositoryInterface
{
    public function get();

    public function show($id);
}
