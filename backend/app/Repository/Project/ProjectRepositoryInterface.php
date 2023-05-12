<?php

namespace App\Repository\Project;

interface ProjectRepositoryInterface
{
    public function get();

    public function show($id);
}
