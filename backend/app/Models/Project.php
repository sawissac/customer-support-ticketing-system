<?php

namespace App\Models;

use App\Models\CustomerProject;
use App\Models\EmployeeProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Project extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'project_id',
        'name',
    ];

    public function employee_project():HasMany
    {
        return $this->hasMany(EmployeeProject::class);
    }

    public function customer_project():HasMany
    {
        return $this->hasMany(CustomerProject::class);
    }
}
