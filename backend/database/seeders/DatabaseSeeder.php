<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Ticket;
use App\Models\Project;
use App\Models\EmployeeAssign;
use App\Models\CustomerProject;
use App\Models\EmployeeProject;
use App\Models\EmployeeReport;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleAndPermissionSeeder::class);
        $this->call(AdminSeeder::class);

        Project::create([
            'project_id' => 'aa11ss',
            'name' => "ACE Project1",
        ]);

        Project::create([
            'project_id' => 'ss22dd',
            'name' => "ACE",
        ]);

        EmployeeProject::create([
            'project_id' => 1,
            'user_id' => 2,
        ]);

        EmployeeProject::create([
            'project_id' => 2,
            'user_id' => 2,
        ]);

        CustomerProject::create([
            'project_id' => 1,
            'user_id' => 3,
        ]);

        CustomerProject::create([
            'project_id' => 2,
            'user_id' => 3,
        ]);

        CustomerProject::create([
            'project_id' => 3,
            'user_id' => 3,
        ]);

        CustomerProject::create([
            'project_id' => 4,
            'user_id' => 3,
        ]);


        Ticket::create([
            'tickets_id' => 'aa11ss',
            'customer_project_id' => 1,
            'subject' => 'report',
            'description' => 'sadklfjdaslkfjsaldkjf',
            'status' => 'open',
            'priority' => 'medium',
        ]);

        Ticket::create([
            'tickets_id' => 'bb22ss',
            'customer_project_id' => 1,
            'subject' => 'error',
            'description' => 'sadklfjdaslkfjsaldkjf',
            'status' => 'open',
            'priority' => 'high',
        ]);

        EmployeeAssign::create([
            'admin_id' => 1,
            'employee_id' => 2,
            'ticket_id' => 1,
            'status' => 'open',
        ]);

        EmployeeAssign::create([
            'admin_id' => 1,
            'employee_id' => 2,
            'ticket_id' => 2,
            'status' => 'open',
        ]);

        EmployeeReport::create([
            'user_id' => 2,
            'tickets_id' => 1,
            'description' => 'sdafdasfdafsdsdasadfdf',
        ]);

        EmployeeReport::create([
            'user_id' => 2,
            'tickets_id' => 2,
            'description' => 'sdfsdsdafdasfdafsdsdasadfdf',
        ]);


    }
}
