'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/Card';

const input =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500/20 focus:border-brand-500 focus:ring-2';

export default function PatientsPage() {
  const ready = useRequireAuth();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    gender: '',
    dob: '',
    email: '',
    blood_group: '',
    allergies: '',
  });

  async function load() {
    setError('');
    try {
      const q = search ? `?search=${encodeURIComponent(search)}` : '';
      const data = await apiFetch(`/patients${q}`);
      setRows(data.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!ready) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional load on mount
  }, [ready]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    const payload = {
      full_name: form.full_name,
      phone: form.phone,
      gender: form.gender || undefined,
      dob: form.dob || undefined,
      email: form.email || undefined,
      blood_group: form.blood_group || undefined,
      allergies: form.allergies || undefined,
    };
    await apiFetch('/patients', { method: 'POST', body: JSON.stringify(payload) });
    setForm({
      full_name: '',
      phone: '',
      gender: '',
      dob: '',
      email: '',
      blood_group: '',
      allergies: '',
    });
    await load();
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
      <PageHeader title="Patients" description="Register and search patients within your practice." />

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900">Add patient</h2>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-600">Full name</label>
            <input
              className={input}
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
            <input
              className={input}
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Gender</label>
            <select
              className={input}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">—</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Date of birth</label>
            <input
              type="date"
              className={input}
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
            <input
              type="email"
              className={input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Blood group</label>
            <input
              className={input}
              placeholder="e.g. O+"
              value={form.blood_group}
              onChange={(e) => setForm({ ...form, blood_group: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="mb-1 block text-xs font-medium text-slate-600">Allergies</label>
            <input
              className={input}
              placeholder="Known allergies or NKDA"
              value={form.allergies}
              onChange={(e) => setForm({ ...form, allergies: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Save patient
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Directory</h2>
          <div className="flex gap-2">
            <input
              className={`${input} max-w-xs`}
              placeholder="Search name, phone, code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), load())}
            />
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                load();
              }}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Code</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Gender</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">DOB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No patients yet. Add your first patient above.
                  </td>
                </tr>
              ) : (
                rows.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{p.patient_code}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{p.full_name}</td>
                    <td className="px-4 py-3 text-slate-700">{p.phone}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{p.gender || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{p.dob || '—'}</td>
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
