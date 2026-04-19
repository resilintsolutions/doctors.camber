<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $tenant = Tenant::query()->findOrFail($request->user()->tenant_id);

        return response()->json($tenant);
    }

    public function update(Request $request): JsonResponse
    {
        $tenant = Tenant::query()->findOrFail($request->user()->tenant_id);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:150'],
            'status' => ['sometimes', 'string', 'max:40'],
            'plan' => ['sometimes', 'string', 'max:40'],
        ]);

        $tenant->update($validated);

        return response()->json($tenant);
    }
}
