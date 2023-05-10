<?php

namespace App\Service\Software;

use App\Models\Software;

class SoftwareService implements SoftwareServiceInterface
{
    public function store($data)
    {
        return Software::create($data);
    }

    public function update($id, $data)
    {
        $result = Software::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = Software::where('id', $id)->first();

        return $data->delete();
    }
}
