<?php

namespace App\Service\CustomerProject;

use App\Models\CustomerProject;

class CustomerProjectService implements CustomerProjectServiceInterface
{
    public function store($data)
    {
        return CustomerProject::create($data);
    }

    public function update($id, $data)
    {
        $result = CustomerProject::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = CustomerProject::where('id', $id)->first();

        if ($data->tickets()->exists()) {
            return false;
        }

        return $data->delete();
    }
}
