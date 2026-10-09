'use client';

import { useEffect, useState } from 'react';

// Текущее время только на клиенте (без расхождения с серверным HTML).
// ?now=2026-10-08T22:10 — заморозить время, чтобы показать статус «закрыто».
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('now');
    const fixed = q ? new Date(q) : null;
    setNow(fixed ?? new Date());
    if (fixed) return;
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return now;
}
