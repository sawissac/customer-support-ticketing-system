<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'tickets_id',
        'customer_project_id',
        'subject',
        'description',
        'status',
        'priority',
        'ticket_start_date',
        'ticket_end_date',
    ];
}
