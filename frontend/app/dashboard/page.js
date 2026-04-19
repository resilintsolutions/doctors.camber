'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/Card';

export default function DashboardPage() {
  const ready = useRequireAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready) return;
    apiFetch('/dashboard/summary')
      .then(setSummary)
      .catch((e) => setError(e.message));
  }, [ready]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your practice activity and appointment mix."
      />

      {error ? (
        <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!summary ? (
        <p className="text-slate-500">Loading summary…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Patients" value={summary.patients_total} hint="Registered under your tenant" />
            <StatCard label="Appointments" value={summary.appointments_total} hint="All time" />
            <StatCard label="Prescriptions" value={summary.prescriptions_total} hint="Issued records" />
          </div>

          <Card className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">Appointments by status</h2>
            <p className="mt-1 text-sm text-slate-600">Counts grouped from your scheduling data.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {Object.keys(summary.appointments_by_status || {}).length === 0 ? (
                <p className="text-sm text-slate-500">No appointments yet.</p>
              ) : (
                Object.entries(summary.appointments_by_status).map(([status, total]) => (
                  <span
                    key={status}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm"
                  >
                    <span className="font-medium capitalize text-slate-800">{status.replace(/_/g, ' ')}</span>
                    <span className="rounded-md bg-white px-2 py-0.5 font-semibold text-brand-800">{total}</span>
                  </span>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </main>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </Card>
  );
}
