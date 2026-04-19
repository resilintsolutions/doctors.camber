<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'patient_id',
        'appointment_id',
        'doctor_user_id',
        'prescription_number',
        'diagnosis',
        'instructions',
        'medications',
        'follow_up_date',
        'version',
    ];

    protected $casts = [
        'medications' => 'array',
        'follow_up_date' => 'date',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
