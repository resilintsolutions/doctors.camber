<?php

namespace App\Providers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::bind('patient', function (string $value) {
            $tenantId = auth()->user()?->tenant_id;
            abort_unless($tenantId, 403);

            return Patient::query()
                ->where('tenant_id', $tenantId)
                ->whereKey($value)
                ->firstOrFail();
        });

        Route::bind('appointment', function (string $value) {
            $tenantId = auth()->user()?->tenant_id;
            abort_unless($tenantId, 403);

            return Appointment::query()
                ->where('tenant_id', $tenantId)
                ->whereKey($value)
                ->firstOrFail();
        });

        Route::bind('prescription', function (string $value) {
            $tenantId = auth()->user()?->tenant_id;
            abort_unless($tenantId, 403);

            return Prescription::query()
                ->where('tenant_id', $tenantId)
                ->whereKey($value)
                ->firstOrFail();
        });
    }
}
