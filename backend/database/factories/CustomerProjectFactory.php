<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerProject>
 */
class CustomerProjectFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => 3,
            'project_id' => $this->faker->unique()->numberBetween(1,10),
        ];
    }
}
