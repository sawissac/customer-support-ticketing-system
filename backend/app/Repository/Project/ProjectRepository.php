<?php

namespace App\Repository\Project;

use App\Models\Project;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function get()
    {
        $data = Project::with('employee_project', 'customer_project')
                    ->get();

        return $data;
    }

    public function show($id)
    {
        $result = Project::with('employee_project.user', 'customer_project.user')
                    ->where('id', $id)
                    ->first();

        return $result;
    }
}
