<?php

namespace App\Service\Project;

use App\Models\Project;
use Illuminate\Support\Str;

class ProjectService implements ProjectServiceInterface
{
    public function store($data)
    {
        $project_id = Str::random(3) . mt_rand(10000, 99999);

        $data['project_id'] = $project_id;

        return Project::create($data);
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
