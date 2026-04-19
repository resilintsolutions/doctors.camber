'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/Card';

const input =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500/20 focus:border-brand-500 focus:ring-2';

export default function AppointmentsPage() {
  const ready = useRequireAuth();
  const [items, setItems] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    patient_id: '',
    appointment_type: 'consultation',
    appointment_date: '',
    slot_time: '09:00',
    status: 'booked',
    fee: '',
    notes: '',
  });

  async function loadList() {
    setError('');
    try {
      const data = await apiFetch('/appointments');
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

  async function submit(event) {
    event.preventDefault();
    setError('');
    const payload = {
      patient_id: Number(form.patient_id),
      appointment_type: form.appointment_type,
      appointment_date: form.appointment_date,
      slot_time: form.slot_time,
      status: form.status,
      fee: form.fee === '' ? null : Number(form.fee),
      notes: form.notes || null,
    };
    await apiFetch('/appointments', { method: 'POST', body: JSON.stringify(payload) });
    setForm({
      patient_id: '',
      appointment_type: 'consultation',
      appointment_date: '',
      slot_time: '09:00',
      status: 'booked',
      fee: '',
      notes: '',
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
      <PageHeader title="Appointments" description="Schedule visits and track status for each patient." />

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900">New appointment</h2>
        <p className="mt-1 text-sm text-slate-600">You will be recorded as the consulting doctor for this visit.</p>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
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
            {patients.length === 0 ? (
              <p className="mt-1 text-xs text-amber-700">Add patients first before booking.</p>
            ) : null}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Type</label>
            <select
              className={input}
              value={form.appointment_type}
              onChange={(e) => setForm({ ...form, appointment_type: e.target.value })}
            >
              <option value="consultation">Consultation</option>
              <option value="follow_up">Follow-up</option>
              <option value="procedure">Procedure</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
            <select
              className={input}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no_show">No show</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Date</label>
            <input
              type="date"
              className={input}
              required
              value={form.appointment_date}
              onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Slot time</label>
            <input
              type="time"
              className={input}
              required
              value={form.slot_time}
              onChange={(e) => setForm({ ...form, slot_time: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Fee (optional)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className={input}
              placeholder="0.00"
              value={form.fee}
              onChange={(e) => setForm({ ...form, fee: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-600">Notes</label>
            <textarea
              className={`${input} min-h-[88px]`}
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Book appointment
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Upcoming & recent</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Time</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Patient</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                items.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 text-slate-800">{a.appointment_date}</td>
                    <td className="px-4 py-3 text-slate-700">{a.slot_time}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{a.patient?.full_name || '—'}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{a.appointment_type?.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium capitalize text-brand-900">
                        {a.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
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
