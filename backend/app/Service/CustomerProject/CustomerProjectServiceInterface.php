<?php

namespace App\Service\CustomerProject;

interface CustomerProjectServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
