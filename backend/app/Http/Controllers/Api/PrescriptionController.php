<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PrescriptionController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Prescription::query()
            ->where('tenant_id', app('tenant_id'))
            ->with('patient:id,full_name,patient_code')
            ->latest()
            ->paginate(20);

        return response()->json($items);
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
            'appointment_id' => [
                'nullable',
                'integer',
                function (string $attribute, mixed $value, \Closure $fail) use ($tenantId): void {
                    if ($value === null || $value === '') {
                        return;
                    }
                    if (! Appointment::query()->where('tenant_id', $tenantId)->whereKey($value)->exists()) {
                        $fail('The selected appointment is invalid.');
                    }
                },
            ],
            'diagnosis' => ['nullable', 'string'],
            'instructions' => ['required', 'string'],
            'medications' => ['required', 'array', 'min:1'],
            'medications.*.name' => ['required', 'string'],
            'medications.*.dosage' => ['required', 'string'],
            'medications.*.frequency' => ['required', 'string'],
            'medications.*.duration' => ['required', 'string'],
            'follow_up_date' => ['nullable', 'date'],
        ]);

        $validated['tenant_id'] = $tenantId;
        $validated['doctor_user_id'] = $request->user()->id;
        $validated['prescription_number'] = 'RX-'.Str::upper(Str::random(10));
        $validated['version'] = 1;

        $item = Prescription::query()->create($validated);

        return response()->json($item, 201);
    }

    public function show(Prescription $prescription): JsonResponse
    {
        return response()->json($prescription->load('patient'));
    }

    public function update(Request $request, Prescription $prescription): JsonResponse
    {
        $validated = $request->validate([
            'diagnosis' => ['nullable', 'string'],
            'instructions' => ['sometimes', 'string'],
            'medications' => ['sometimes', 'array', 'min:1'],
            'medications.*.name' => ['required_with:medications', 'string'],
            'medications.*.dosage' => ['required_with:medications', 'string'],
            'medications.*.frequency' => ['required_with:medications', 'string'],
            'medications.*.duration' => ['required_with:medications', 'string'],
            'follow_up_date' => ['nullable', 'date'],
        ]);

        $validated['version'] = $prescription->version + 1;

        $prescription->update($validated);

        return response()->json($prescription);
    }

    public function destroy(Prescription $prescription): JsonResponse
    {
        $prescription->delete();

        return response()->json([], 204);
    }
}
