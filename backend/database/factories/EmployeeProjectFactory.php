<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmployeeProject>
 */
class EmployeeProjectFactory extends Factory
{
    public function definition()
    {
        return [
            'project_id' => $this->faker->unique()->randomDigit(1, 10),
            'user_id' => 2,
        ];
    }
}
