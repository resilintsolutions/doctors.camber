'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Card } from '@/components/Card';

const input =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/20 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    tenant_name: '',
    doctor_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch('/auth/register-tenant', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-brand-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-brand-800">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
              DC
            </span>
            Doctors Chamber
          </Link>
        </div>
        <Card>
          <h1 className="text-xl font-bold text-slate-900">Create your practice</h1>
          <p className="mt-1 text-sm text-slate-600">You will be the tenant owner for this chamber.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Practice / chamber name</label>
              <input
                className={input}
                placeholder="e.g. Green Valley Clinic"
                value={form.tenant_name}
                onChange={(e) => setForm({ ...form, tenant_name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your name</label>
              <input
                className={input}
                placeholder="Dr. Jane Smith"
                value={form.doctor_name}
                onChange={(e) => setForm({ ...form, doctor_name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className={input}
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                className={input}
                autoComplete="new-password"
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <p className="mt-1 text-xs text-slate-500">At least 8 characters.</p>
            </div>
            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Creating…' : 'Create practice & sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
