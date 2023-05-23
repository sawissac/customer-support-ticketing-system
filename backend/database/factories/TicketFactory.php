<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'tickets_id' => Str::lower(Str::random(3)) . mt_rand(1000, 9999),
            'customer_project_id' => $this->faker->numberBetween(1,10),
            'subject' => $this->faker->word(5),
            'description' =>  $this->faker->paragraph(3),
            'status' => 'open',
            'priority' => 'high',
        ];
    }
}
