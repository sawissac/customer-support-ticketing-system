<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeProject extends Model
{
    protected $fillable = ['project_id','user_id'];
    use HasFactory;
}
