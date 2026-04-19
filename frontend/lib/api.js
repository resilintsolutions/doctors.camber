const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    let message = body.message || `Request failed (${res.status})`;
    if (body.errors && typeof body.errors === 'object') {
      const flat = Object.values(body.errors).flat();
      if (flat.length) {
        message = flat.join(' ');
      }
    }
    throw new Error(message);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}
