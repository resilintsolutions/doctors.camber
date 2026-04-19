'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRequireAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!t) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  return ready;
}
