<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary(): JsonResponse
    {
        $tenantId = app('tenant_id');

        $statusCounts = Appointment::query()
            ->where('tenant_id', $tenantId)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        return response()->json([
            'patients_total' => Patient::query()->where('tenant_id', $tenantId)->count(),
            'appointments_total' => Appointment::query()->where('tenant_id', $tenantId)->count(),
            'prescriptions_total' => Prescription::query()->where('tenant_id', $tenantId)->count(),
            'appointments_by_status' => $statusCounts,
        ]);
    }
}
