<?php

namespace App\Service\EmployeeReport;

use App\Models\EmployeeReport;

class EmployeeReportService  implements EmployeeReportServiceInterface
{
    public function store($data)
    {
        return EmployeeReport::create($data);
    }

    public function update($id, $data)
    {
        $result = EmployeeReport::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = EmployeeReport::where('id', $id)->first();

        return $data->delete();
    }
}
