'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/Card';

const input =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500/20 focus:border-brand-500 focus:ring-2';

const emptyMed = { name: '', dosage: '', frequency: '', duration: '' };

export default function PrescriptionsPage() {
  const ready = useRequireAuth();
  const [items, setItems] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    patient_id: '',
    diagnosis: '',
    instructions: '',
    follow_up_date: '',
    medications: [{ ...emptyMed }],
  });

  async function loadList() {
    setError('');
    try {
      const data = await apiFetch('/prescriptions');
      setItems(data.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadPatients() {
    const data = await apiFetch('/patients');
    setPatients(data.data || []);
  }

  useEffect(() => {
    if (!ready) return;
    loadList();
    loadPatients().catch(() => {});
  }, [ready]);

  function setMed(i, field, value) {
    setForm((prev) => {
      const next = [...prev.medications];
      next[i] = { ...next[i], [field]: value };
      return { ...prev, medications: next };
    });
  }

  function addMedRow() {
    setForm((prev) => ({ ...prev, medications: [...prev.medications, { ...emptyMed }] }));
  }

  function removeMedRow(i) {
    setForm((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, idx) => idx !== i),
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    const meds = form.medications.filter((m) => m.name.trim());
    if (meds.length === 0) {
      setError('Add at least one medication line.');
      return;
    }
    const payload = {
      patient_id: Number(form.patient_id),
      appointment_id: null,
      diagnosis: form.diagnosis || null,
      instructions: form.instructions,
      follow_up_date: form.follow_up_date || null,
      medications: meds,
    };
    await apiFetch('/prescriptions', { method: 'POST', body: JSON.stringify(payload) });
    setForm({
      patient_id: '',
      diagnosis: '',
      instructions: '',
      follow_up_date: '',
      medications: [{ ...emptyMed }],
    });
    await loadList();
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader title="Prescriptions" description="Issue structured prescriptions with medication lines and versioning." />

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900">New prescription</h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Patient</label>
            <select
              className={input}
              required
              value={form.patient_id}
              onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
            >
              <option value="">Select patient…</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name} ({p.patient_code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Diagnosis (optional)</label>
            <input
              className={input}
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Instructions</label>
            <textarea
              className={`${input} min-h-[80px]`}
              required
              placeholder="General advice, diet, rest…"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Follow-up date (optional)</label>
            <input
              type="date"
              className={input}
              value={form.follow_up_date}
              onChange={(e) => setForm({ ...form, follow_up_date: e.target.value })}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Medications</span>
              <button
                type="button"
                onClick={addMedRow}
                className="text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                + Add line
              </button>
            </div>
            <div className="space-y-3">
              {form.medications.map((m, i) => (
                <div
                  key={i}
                  className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3 sm:grid-cols-2 lg:grid-cols-5"
                >
                  <input
                    className={input}
                    placeholder="Drug name"
                    value={m.name}
                    onChange={(e) => setMed(i, 'name', e.target.value)}
                  />
                  <input
                    className={input}
                    placeholder="Dosage"
                    value={m.dosage}
                    onChange={(e) => setMed(i, 'dosage', e.target.value)}
                  />
                  <input
                    className={input}
                    placeholder="Frequency"
                    value={m.frequency}
                    onChange={(e) => setMed(i, 'frequency', e.target.value)}
                  />
                  <input
                    className={input}
                    placeholder="Duration"
                    value={m.duration}
                    onChange={(e) => setMed(i, 'duration', e.target.value)}
                  />
                  <div className="flex items-center lg:justify-end">
                    {form.medications.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeMedRow(i)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Issue prescription
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Recent prescriptions</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Rx no.</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Patient</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Follow-up</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No prescriptions yet.
                  </td>
                </tr>
              ) : (
                items.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.prescription_number}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{r.patient?.full_name || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{r.follow_up_date || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">v{r.version}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
