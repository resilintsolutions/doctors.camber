<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $appointments = Appointment::query()
            ->where('tenant_id', app('tenant_id'))
            ->with(['patient:id,full_name,patient_code', 'doctor:id,name'])
            ->latest('appointment_date')
            ->paginate(20);

        return response()->json($appointments);
    }

    public function store(Request $request): JsonResponse
    {
        $tenantId = $request->user()->tenant_id;

        $validated = $request->validate([
            'patient_id' => [
                'required',
                'integer',
                function (string $attribute, mixed $value, \Closure $fail) use ($tenantId): void {
                    if (! Patient::query()->where('tenant_id', $tenantId)->whereKey($value)->exists()) {
                        $fail('The selected patient is invalid.');
                    }
                },
            ],
            'appointment_type' => ['required', 'string', 'max:50'],
            'appointment_date' => ['required', 'date'],
            'slot_time' => ['required', 'string', 'max:30'],
            'status' => ['required', 'string', 'max:30'],
            'fee' => ['nullable', 'numeric'],
            'notes' => ['nullable', 'string'],
        ]);

        $validated['tenant_id'] = $tenantId;
        $validated['doctor_user_id'] = $request->user()->id;

        $appointment = Appointment::query()->create($validated);

        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment): JsonResponse
    {
        return response()->json($appointment->load('patient', 'doctor'));
    }

    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        $validated = $request->validate([
            'appointment_type' => ['sometimes', 'string', 'max:50'],
            'appointment_date' => ['sometimes', 'date'],
            'slot_time' => ['sometimes', 'string', 'max:30'],
            'status' => ['sometimes', 'string', 'max:30'],
            'fee' => ['nullable', 'numeric'],
            'notes' => ['nullable', 'string'],
        ]);

        $appointment->update($validated);

        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->delete();

        return response()->json([], 204);
    }
}
