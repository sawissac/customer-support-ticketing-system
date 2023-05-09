<?php

namespace App\Service\User;

interface UserServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
