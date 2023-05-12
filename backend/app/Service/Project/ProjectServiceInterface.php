<?php

namespace App\Service\Project;

interface ProjectServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
