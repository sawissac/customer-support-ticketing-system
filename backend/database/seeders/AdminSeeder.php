<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $employee = User::create([
            'name' => 'dev',
            'email' => 'dev@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $customer = User::create([
            'name' => 'customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('password'),
        ]);
<<<<<<< HEAD
        $admin->assignRole('admin');
        $employee->assignRole('employee');
        $customer->assignRole('customer');
=======
        $admin -> assignRole('admin','guest');
        $employee -> assignRole('employee','guest');
        $customer -> assignRole('Customer','guest');
>>>>>>> origin/tta-dev
    }
}