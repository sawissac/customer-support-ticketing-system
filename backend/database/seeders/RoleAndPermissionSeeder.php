<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'Admin']);
        $dev = Role::create(['name' => 'Dev']);
        $customer = Role::create(['name' => 'Customer']);

        $user_list = Permission::create(['name' => 'userList']);
        $user_create = Permission::create(['name' => 'userCreate']);
        $user_edit = Permission::create(['name' => 'userEdit']);
        $user_delete = Permission::create(['name' => 'userDelete']);
        $user_show = Permission::create(['name' => 'userShow']);

        $admin->givePermissionTo([

            $user_list, $user_create, $user_edit, $user_delete, $user_show,

        ]);
    }
}
