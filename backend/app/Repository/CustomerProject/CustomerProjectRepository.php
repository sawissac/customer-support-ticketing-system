<?php

namespace App\Repository\CustomerProject;

use App\Models\CustomerProject;

class CustomerProjectRepository implements CustomerProjectRepoInterface
{
    public function get()
    {
        $data = CustomerProject::all();

        return $data;
    }

    public function show($id)
    {
        $result = CustomerProject::where('id', $id)->first();

        return $result;
    }
}