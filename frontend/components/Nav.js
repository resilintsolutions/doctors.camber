'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

const items = [
  ['Dashboard', '/dashboard'],
  ['Patients', '/patients'],
  ['Appointments', '/appointments'],
  ['Prescriptions', '/prescriptions'],
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  }, [pathname]);

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
        <Link href={token ? '/dashboard' : '/'} className="mr-2 flex items-center gap-2 font-semibold text-brand-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white shadow-sm">
            DC
          </span>
          <span className="hidden sm:inline">Doctors Chamber</span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-1 sm:gap-2">
          {token
            ? items.map(([label, href]) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })
            : null}
        </nav>
        <div className="flex items-center gap-2">
          {!token ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Create practice
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
