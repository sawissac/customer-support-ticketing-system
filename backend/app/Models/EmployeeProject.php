<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeProject extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
