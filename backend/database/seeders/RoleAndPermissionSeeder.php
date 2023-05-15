<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin']);
        $employee = Role::create(['name' => 'employee']);
        $customer = Role::create(['name' => 'customer']);
        $resign_employee = Role::create(['name' => 'guest']);

        $canCreateUser = Permission::create(['name' => 'canCreateUser']);
        $canUpdateUser = Permission::create(['name' => 'canUpdateUser']);
        $canDeleteUser = Permission::create(['name' => 'canDeleteUser']);
        $canShowUser = Permission::create(['name' => 'canShowUser']);

        $canCreateProjectList = Permission::create(['name' => 'canCreateProjectList']);
        $canUpdateProjectList = Permission::create(['name' => 'canUpdateProjectList']);
        $canDeleteProjectList = Permission::create(['name' => 'canDeleteProjectList']);
        $canShowProjectList = Permission::create(['name' => 'canShowProjectList']);

        $canCreateCustomerProjectList = Permission::create(['name' => 'canCreateCustomerProjectList']);
        $canUpdateCustomerProjectList = Permission::create(['name' => 'canUpdateCustomerProjectList']);
        $canDeleteCustomerProjectList = Permission::create(['name' => 'canDeleteCustomerProjectList']);
        $canShowCustomerProjectList = Permission::create(['name' => 'canShowCustomerProjectList']);

        $canCreateTickets = Permission::create(['name' => 'canCreateTickets']);
        $canUpdateTickets = Permission::create(['name' => 'canUpdateTickets']);
        $canDeleteTickets = Permission::create(['name' => 'canDeleteTickets']);
        $canShowTickets = Permission::create(['name' => 'canShowTickets']);

        $canShowReportHistory = Permission::create(['name' => 'canShowReportHistory']);

        $canCreateAssignDev = Permission::create(['name' => 'canCreateAssignDev']);
        $canUpdateAssignDev = Permission::create(['name' => 'canUpdateAssignDev']);
        $canDeleteAssignDev = Permission::create(['name' => 'canDeleteAssignDev']);
        $canShowAssignDev = Permission::create(['name' => 'canShowAssignDev']);

        $admin->givePermissionTo([
            $canCreateUser,
            $canUpdateUser,
            $canDeleteUser,
            $canShowUser,

            $canCreateProjectList,
            $canUpdateProjectList,
            $canDeleteProjectList,
            $canShowProjectList,

            $canCreateCustomerProjectList,
            $canUpdateCustomerProjectList,
            $canDeleteCustomerProjectList,
            $canShowCustomerProjectList,

            $canCreateTickets,
            $canUpdateTickets,
            $canDeleteTickets,
            $canShowTickets,

            $canShowReportHistory,

            $canCreateAssignDev,
            $canUpdateAssignDev,
            $canDeleteAssignDev,
            $canShowAssignDev,
        ]);

        $employee->givePermissionTo([
            $canShowUser,
            $canShowProjectList,
            $canShowCustomerProjectList,
            $canUpdateTickets,
            $canShowTickets,
            $canShowAssignDev,
        ]);

        $customer->givePermissionTo([
            $canShowCustomerProjectList,
            $canCreateTickets,
            $canUpdateTickets,
            $canShowTickets,
            $canShowAssignDev,
        ]);

    }
}