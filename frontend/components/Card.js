export function Card({ className = '', children }) {
  return <div className={`rounded-xl border border-slate-200/80 bg-white p-5 shadow-card ${className}`}>{children}</div>;
}
