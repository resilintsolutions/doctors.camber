<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->string('patient_code');
            $table->string('full_name');
            $table->date('dob')->nullable();
            $table->string('gender', 30)->nullable();
            $table->string('phone', 30);
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('blood_group', 5)->nullable();
            $table->text('allergies')->nullable();
            $table->text('chronic_conditions')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->timestamps();

            $table->unique(['tenant_id', 'patient_code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
