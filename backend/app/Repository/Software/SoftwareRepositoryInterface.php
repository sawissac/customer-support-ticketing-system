<?php

namespace App\Repository\Software;

interface SoftwareRepositoryInterface
{
    public function get();

    public function show($id);
}
