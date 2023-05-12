<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
<<<<<<<< HEAD:backend/database/migrations/2023_05_11_065314_create_projects_table.php
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_id');
            $table->string('name');
            $table->date('manage_start_date')->default(date('Y-m-d'));
            $table->date('manage_end_date')->default(date('Y-m-d'));
========
        Schema::create('employee_assgins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('tickets_id');
>>>>>>>> origin/tta-dev:backend/database/migrations/2023_05_12_025431_create_employee_assgins_table.php
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
<<<<<<<< HEAD:backend/database/migrations/2023_05_11_065314_create_projects_table.php
        Schema::dropIfExists('projects');
========
        Schema::dropIfExists('employee_assgins');
>>>>>>>> origin/tta-dev:backend/database/migrations/2023_05_12_025431_create_employee_assgins_table.php
    }
};
