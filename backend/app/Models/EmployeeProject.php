<?php

namespace App\Models;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeProject extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = ['project_id', 'user_id'];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function project():BelongsTo
    {
        return $this->belongsTo(Project::class,'project_id');
    }

    public function employeeAssign():BelongsTo
    {
        return $this->belongsTo(EmployeeAssign::class);
    }
}
