<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmployeeAssign>
 */
class EmployeeAssignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'employee_id' => 2,
            'ticket_id' => rand(1,10),
            'status' => 'open',
            'task_name' => $this->faker->word(7),
        ];
    }
}
