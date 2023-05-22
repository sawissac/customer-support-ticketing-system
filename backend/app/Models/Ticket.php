<?php

namespace App\Models;

use App\Models\CustomerProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'drive_link',
        'start_date',
        'end_date',
    ];

    public function customer_project(): BelongsTo
    {
        return $this->belongsTo(CustomerProject::class);
    }
}
