<?php

use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\TenantController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register-tenant', [AuthController::class, 'registerTenant']);

Route::middleware(['auth:sanctum', 'tenant.scope'])->group(function (): void {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);

    Route::apiResource('/patients', PatientController::class);
    Route::apiResource('/appointments', AppointmentController::class);
    Route::apiResource('/prescriptions', PrescriptionController::class);

    Route::get('/tenant', [TenantController::class, 'show']);
    Route::put('/tenant', [TenantController::class, 'update']);
});
