<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Ticket;
use App\Models\Project;
use App\Models\CustomerProject;
use App\Models\EmployeeProject;
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

        // Project::factory()->count(10)->create();
        // CustomerProject::factory()->count(10)->create();
        // Ticket::factory()->count(10)->create();
        // EmployeeProject::factory()->count(10)->create();

    }
}

