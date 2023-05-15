<?php

namespace App\Models;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeAssign extends Model
{
    use HasFactory;
    protected $fillable = ['admin_id', 'employee_id', 'tickets_id'];

    public function admin():BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function employee():BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function ticket():BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }
}