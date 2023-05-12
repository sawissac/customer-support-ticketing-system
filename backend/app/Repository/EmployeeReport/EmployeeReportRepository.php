<?php

namespace App\Repository\EmployeeReport;

use App\Models\EmployeeReport;

class EmployeeReportRepository implements EmployeeReportRepositoryInterface
{
    public function get()
    {
        $data = EmployeeReport::all();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeReport::where('id', $id)->first();

        return $result;
    }
}
