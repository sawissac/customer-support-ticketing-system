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
        $resign_employee = Role::create(['name' => 'resign_employee']);

        $canUserList = Permission::create(['name' => 'canUserList']);
        $canCreateUser = Permission::create(['name' => 'canCreateUser']);
        $canUpdateUser = Permission::create(['name' => 'canUpdateUser']);
        $canDeleteUser = Permission::create(['name' => 'canDeleteUser']);
        $canShowUser = Permission::create(['name' => 'canShowUser']);

        $canCreateProjectList = Permission::create(['name' => 'canCreateProjectList']);
        $canUpdateProjectList = Permission::create(['name' => 'canUpdateProjectList']);
        $canDeleteProjectList = Permission::create(['name' => 'canDeleteProjectList']);
        $canShowProjectList = Permission::create(['name' => 'canShowProjectList']);

        $canCreateEmployeeProjectList = Permission::create(['name' => 'canCreateEmployeeProjectList']);
        $canUpdateEmployeeProjectList = Permission::create(['name' => 'canUpdateEmployeeProjectList']);
        $canDeleteEmployeeProjectList = Permission::create(['name' => 'canDeleteEmployeeProjectList']);
        $canShowEmployeeProjectList = Permission::create(['name' => 'canShowEmployeeProjectList']);

        $canCreateCustomerProjectList = Permission::create(['name' => 'canCreateCustomerProjectList']);
        $canUpdateCustomerProjectList = Permission::create(['name' => 'canUpdateCustomerProjectList']);
        $canDeleteCustomerProjectList = Permission::create(['name' => 'canDeleteCustomerProjectList']);
        $canShowCustomerProjectList = Permission::create(['name' => 'canShowCustomerProjectList']);

        $canCreateTickets = Permission::create(['name' => 'canCreateTickets']);
        $canUpdateTickets = Permission::create(['name' => 'canUpdateTickets']);
        $canDeleteTickets = Permission::create(['name' => 'canDeleteTickets']);
        $canShowTickets = Permission::create(['name' => 'canShowTickets']);

        $canCreateReport = Permission::create(['name' => 'canCreateReport']);
        $canUpdateReport = Permission::create(['name' => 'canUpdateReport']);
        $canDeleteReport = Permission::create(['name' => 'canDeleteReportHistory']);
        $canShowReport = Permission::create(['name' => 'canShowReport']);

        $canCreateAssignEmployee = Permission::create(['name' => 'canCreateAssignEmployee']);
        $canUpdateAssignEmployee = Permission::create(['name' => 'canUpdateAssignEmployee']);
        $canDeleteAssignEmployee = Permission::create(['name' => 'canDeleteAssignEmployee']);
        $canShowAssignEmployee = Permission::create(['name' => 'canShowAssignEmployee']);

        $admin->givePermissionTo([
            $canUserList,
            $canCreateUser,
            $canUpdateUser,
            $canDeleteUser,
            $canShowUser,

            $canCreateProjectList,
            $canUpdateProjectList,
            $canDeleteProjectList,
            $canShowProjectList,

            $canUpdateEmployeeProjectList,
            $canCreateEmployeeProjectList,
            $canDeleteEmployeeProjectList,
            $canShowEmployeeProjectList,

            $canCreateCustomerProjectList,
            $canUpdateCustomerProjectList,
            $canDeleteCustomerProjectList,
            $canShowCustomerProjectList,

            $canCreateTickets,
            $canUpdateTickets,
            $canDeleteTickets,
            $canShowTickets,

            $canShowReport,
            $canCreateReport,
            $canUpdateReport,
            $canDeleteReport,

            $canCreateAssignEmployee,
            $canUpdateAssignEmployee,
            $canDeleteAssignEmployee,
            $canShowAssignEmployee,
        ]);

        $employee->givePermissionTo([
            $canShowAssignEmployee,
            $canUpdateAssignEmployee
        ]);

        $customer->givePermissionTo([
            $canShowCustomerProjectList,
            $canCreateTickets,
            $canUpdateTickets,
            $canShowTickets,
            $canShowAssignEmployee,
        ]);
    }
}
