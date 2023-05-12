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
        $developer = Role::create(['name' => 'employee']);
        $customer = Role::create(['name' => 'customer']);
        $guest = Role::create(['name' => 'guest']);

        $canCreateUser = Permission::create(['name' => 'canCreateUser']);
        $canUpdateUser = Permission::create(['name' => 'canUpdateUser']);
        $canDeleteUser = Permission::create(['name' => 'canDeleteUser']);
        $canShowUser = Permission::create(['name' => 'canShowUser']);

        $canCreateSoftwareList = Permission::create(['name' => 'canCreateSoftwareList']);
        $canUpdateSoftwareList = Permission::create(['name' => 'canUpdateSoftwareList']);
        $canDeleteSoftwareList = Permission::create(['name' => 'canDeleteSoftwareList']);
        $canShowSoftwareList = Permission::create(['name' => 'canShowSoftwareList']);

        $canCreateCustomerSoftwareList = Permission::create(['name' => 'canCreateCustomerSoftwareList']);
        $canUpdateCustomerSoftwareList = Permission::create(['name' => 'canUpdateCustomerSoftwareList']);
        $canDeleteCustomerSoftwareList = Permission::create(['name' => 'canDeleteCustomerSoftwareList']);
        $canShowCustomerSoftwareList = Permission::create(['name' => 'canShowCustomerSoftwareList']);

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
            $canCreateSoftwareList,
            $canUpdateSoftwareList,
            $canDeleteSoftwareList,
            $canShowSoftwareList,
            $canCreateCustomerSoftwareList,
            $canUpdateCustomerSoftwareList,
            $canDeleteCustomerSoftwareList,
            $canShowCustomerSoftwareList,
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
        $developer->givePermissionTo([
            $canShowUser,
            $canShowSoftwareList,
            $canShowCustomerSoftwareList,
            $canUpdateTickets,
            $canShowTickets,
            $canShowAssignDev,
        ]);
        $customer->givePermissionTo([
            $canShowCustomerSoftwareList,
            $canCreateTickets,
            $canUpdateTickets,
            $canShowTickets,
            $canShowAssignDev,
        ]);
    }
}
