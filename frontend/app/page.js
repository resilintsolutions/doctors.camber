import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/80 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Multi-tenant SaaS</p>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Run your chamber online — appointments, patients, and prescriptions in one place
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Secure tenant isolation, a fast doctor portal, and workflows built for private practice. Register your
            practice and start in minutes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              Create your practice
            </Link>
            <Link
              href="/login"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Sign in to portal
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Tenant onboarding', 'Each practice gets isolated data and branded workspace access.'],
            ['Patient records', 'Demographics, codes, allergies, and emergency contacts in one profile.'],
            ['Scheduling', 'Book visits with type, slot, status, and fee tracking.'],
            ['E-prescriptions', 'Structured medications with versioning and follow-up dates.'],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur"
            >
              <h2 className="font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
