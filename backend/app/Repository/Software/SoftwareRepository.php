<?php

namespace App\Repository\Software;

use App\Models\Software;

class SoftwareRepository implements SoftwareRepositoryInterface
{
    public function get()
    {
        $data = Software::all();

        return $data;
    }

    public function show($id)
    {
        $result = Software::where('id', $id)->first();

        return $result;
    }
}
