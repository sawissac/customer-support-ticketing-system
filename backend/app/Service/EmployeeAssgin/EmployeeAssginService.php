<?php

namespace App\Service\EmployeeAssgin;

use App\Models\EmployeeAssgin;

class EmployeeAssginService implements EmployeeAssginServiceInterface
{
    public function store($data)
    {
        return EmployeeAssgin::create($data);
    }

    public function update($id, $data)
    {
        $result = EmployeeAssgin::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = EmployeeAssgin::where('id', $id)->first();

        return $data->delete();
    }
}