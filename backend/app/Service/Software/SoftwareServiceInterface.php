<?php

namespace App\Service\Software;

interface SoftwareServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
