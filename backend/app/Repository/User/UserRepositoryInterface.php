<?php

namespace App\Repository\User;

interface UserRepositoryInterface
{
    public function get();

    public function show($id);

    public function employee();

    public function customer();
}
