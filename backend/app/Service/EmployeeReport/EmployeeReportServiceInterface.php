<?php

namespace App\Service\EmployeeReport;

interface EmployeeReportServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
