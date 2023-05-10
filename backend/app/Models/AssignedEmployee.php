<?php

namespace App\Models;

use App\Models\User;
use App\Models\Software;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssignedEmployee extends Model
{
    use HasFactory;

    protected $fillable = ['software_id', 'user_id', 'status'];

    public function software()
    {
        return $this->belongsTo(Software::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
