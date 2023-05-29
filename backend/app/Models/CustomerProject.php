<?php

namespace App\Models;

use App\Models\User;
use App\Models\Ticket;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerProject extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = ['user_id', 'project_id'];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project():BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function ticket():HasMany
    {
        return $this->hasMany(Ticket::class,'customer_project_id');
    }
}
