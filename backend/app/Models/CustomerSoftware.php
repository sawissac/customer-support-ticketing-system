<?php

namespace App\Models;

use App\Models\User;
use App\Models\Software;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerSoftware extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'software_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function software()
    {
        return $this->belongsTo(Software::class);
    }
}
