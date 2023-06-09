<?php

namespace App\Models;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeAssign extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['ticket_id', 'employee_id', 'status', 'task_name', 'start_date', 'end_date' ];


    public function employee():BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function ticket():BelongsTo
    {
        return $this->belongsTo(Ticket::class,'ticket_id');
    }
}
