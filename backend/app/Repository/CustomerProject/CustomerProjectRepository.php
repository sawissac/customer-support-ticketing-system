<?php

namespace App\Repository\CustomerProject;

use App\Models\CustomerProject;

class CustomerProjectRepository implements CustomerProjectRepoInterface
{
    public function get()
    {
        $data = CustomerProject::with('user', 'project', 'ticket')->get();

        return $data;
    }

    public function show($id)
    {
        $result = CustomerProject::with('user', 'project', 'ticket')->where('id', $id)->first();

        return $result;
    }

    public function paginate()
    {
        $data = CustomerProject::with('user', 'project', 'ticket')->paginate(6);

        return $data;
    }

    public function projectByUserID($id)
    {
        $data = CustomerProject::where('user_id', $id)->with('project')->get();

        return $data;
    }
}
