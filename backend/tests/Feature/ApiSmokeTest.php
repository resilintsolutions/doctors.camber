<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_tenant_and_me_endpoint(): void
    {
        $response = $this->postJson('/api/auth/register-tenant', [
            'tenant_name' => 'Test Clinic',
            'doctor_name' => 'Dr. Test',
            'email' => 'doc@test.com',
            'password' => 'password123',
        ]);

        $response->assertCreated();
        $response->assertJsonStructure(['token', 'user', 'tenant']);

        $token = $response->json('token');

        $this->withToken($token)
            ->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('email', 'doc@test.com');
    }

    public function test_cannot_use_other_tenants_patient_for_appointment(): void
    {
        $a = $this->postJson('/api/auth/register-tenant', [
            'tenant_name' => 'Clinic A',
            'doctor_name' => 'Dr. A',
            'email' => 'a@test.com',
            'password' => 'password123',
        ]);
        $a->assertCreated();
        $tokenA = $a->json('token');

        $b = $this->postJson('/api/auth/register-tenant', [
            'tenant_name' => 'Clinic B',
            'doctor_name' => 'Dr. B',
            'email' => 'b@test.com',
            'password' => 'password123',
        ]);
        $b->assertCreated();

        $this->assertNotSame(
            User::query()->where('email', 'a@test.com')->value('tenant_id'),
            User::query()->where('email', 'b@test.com')->value('tenant_id'),
            'Test requires two distinct tenants'
        );

        $patient = $this->withToken($tokenA)->postJson('/api/patients', [
            'full_name' => 'Patient One',
            'phone' => '555-0001',
        ]);
        $patient->assertCreated();
        $patientId = $patient->json('id');

        $this->assertNotEquals(
            Patient::query()->findOrFail($patientId)->tenant_id,
            User::query()->where('email', 'b@test.com')->value('tenant_id'),
            'Patient A must belong to a different tenant than user B'
        );

        $this->flushHeaders();
        Sanctum::actingAs(User::query()->where('email', 'b@test.com')->firstOrFail());

        $this->postJson('/api/appointments', [
            'patient_id' => $patientId,
            'appointment_type' => 'consultation',
            'appointment_date' => '2030-01-15',
            'slot_time' => '10:00',
            'status' => 'booked',
        ])->assertUnprocessable();
    }
}
