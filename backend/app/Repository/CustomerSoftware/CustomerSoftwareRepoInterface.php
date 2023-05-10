<?php

namespace App\Repository\CustomerSoftware;

interface CustomerSoftwareRepoInterface
{
    public function get();

    public function show($id);
}