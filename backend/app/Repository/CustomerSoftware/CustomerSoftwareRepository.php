<?php

namespace App\Repository\CustomerSoftware;

use App\Models\CustomerSoftware;
use App\Models\Software;

class CustomerSoftwareRepository implements CustomerSoftwareRepoInterface
{
    public function get()
    {
        $data = CustomerSoftware::all();

        return $data;
    }

    public function show($id)
    {
        $result = CustomerSoftware::where('id', $id)->first();

        return $result;
    }
}