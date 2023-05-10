<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Software;
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
        Software::create([
            'name' => 'AcePlusSolution',
        ]);

        Software::create([
            'name' => 'AceDataSystem',

        ]);


        $this->call(RoleAndPermissionSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
