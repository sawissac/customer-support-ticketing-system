<?php

namespace App\Repository\CustomerProject;

interface CustomerProjectRepoInterface
{
    public function get();

    public function show($id);

    public function paginate();
}
