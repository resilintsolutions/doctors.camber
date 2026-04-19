<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function registerTenant(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tenant_name' => ['required', 'string', 'max:150'],
            'doctor_name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
        ]);

        $tenant = Tenant::query()->create([
            'name' => $data['tenant_name'],
            'slug' => Str::slug($data['tenant_name']).'-'.Str::random(5),
            'status' => 'active',
            'plan' => 'trial',
            'storage_quota_mb' => 1024,
        ]);

        $user = User::query()->create([
            'tenant_id' => $tenant->id,
            'name' => $data['doctor_name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => 'tenant_owner',
        ]);

        $token = $user->createToken('auth')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user, 'tenant' => $tenant], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user' => $user,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->load('tenant'));
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
