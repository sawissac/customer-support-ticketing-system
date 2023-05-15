<?php

namespace App\Service\Project;

use App\Models\Project;

class ProjectService implements ProjectServiceInterface
{
    public function store($data)
    {
        $data = Project::with('users')->get();

        return $data;
    }

    public function update($id, $data)
    {
        $result = Project::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = Project::where('id', $id)->first();

        return $data->delete();
    }
}