<?php

namespace App\Service\CustomerSoftware;

use App\Models\CustomerSoftware;

class CustomerSoftwareService implements CustomerSoftwareServiceInterface
{
    public function store($data)
    {
        return CustomerSoftware::create($data);
    }

    public function update($id, $data)
    {
        $result = CustomerSoftware::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = CustomerSoftware::where('id', $id)->first();

        return $data->delete();
    }
}