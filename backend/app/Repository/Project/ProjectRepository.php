<?php

namespace App\Repository\Project;

use App\Models\Project;


class ProjectRepository implements ProjectRepositoryInterface
{
    public function get()
    {
        $data = Project::all();

        return $data;
    }

    public function show($id)
    {
        $result = Project::where('id', $id)->first();

        return $result;
    }
}
