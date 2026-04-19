<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PatientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenantId = app('tenant_id');
        $search = $request->string('search')->toString();

        $patients = Patient::query()
            ->where('tenant_id', $tenantId)
            ->when($search, fn ($query) => $query->where(function ($q) use ($search): void {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('patient_code', 'like', "%{$search}%");
            }))
            ->latest()
            ->paginate(20);

        return response()->json($patients);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'dob' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', 'max:30'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['nullable', 'email'],
            'address' => ['nullable', 'string'],
            'blood_group' => ['nullable', 'string', 'max:5'],
            'allergies' => ['nullable', 'string'],
            'chronic_conditions' => ['nullable', 'string'],
            'emergency_contact' => ['nullable', 'string'],
        ]);

        $validated['tenant_id'] = app('tenant_id');
        $validated['patient_code'] = 'PT-'.Str::upper(Str::random(8));

        $patient = Patient::query()->create($validated);

        return response()->json($patient, 201);
    }

    public function show(Patient $patient): JsonResponse
    {
        return response()->json($patient->load('appointments'));
    }

    public function update(Request $request, Patient $patient): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['sometimes', 'string', 'max:255'],
            'dob' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', 'max:30'],
            'phone' => ['sometimes', 'string', 'max:30'],
            'email' => ['nullable', 'email'],
            'address' => ['nullable', 'string'],
            'blood_group' => ['nullable', 'string', 'max:5'],
            'allergies' => ['nullable', 'string'],
            'chronic_conditions' => ['nullable', 'string'],
            'emergency_contact' => ['nullable', 'string'],
        ]);

        $patient->update($validated);

        return response()->json($patient);
    }

    public function destroy(Patient $patient): JsonResponse
    {
        $patient->delete();

        return response()->json([], 204);
    }
}
