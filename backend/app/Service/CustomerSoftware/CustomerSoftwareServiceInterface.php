<?php

namespace App\Service\CustomerSoftware;

interface CustomerSoftwareServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
