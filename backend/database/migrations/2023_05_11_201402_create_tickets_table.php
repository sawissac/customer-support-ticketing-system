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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('tickets_id');
            $table->integer('project_id');
            $table->string('subject');
            $table->text('description');
            $table->string('status');
            $table->string('priority');
            $table->date('ticket_start_date')->default(date('Y-m-d'));;
            $table->date('ticket_end_date')->default(date('Y-m-d'));;
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
        Schema::dropIfExists('tickets');
    }
};