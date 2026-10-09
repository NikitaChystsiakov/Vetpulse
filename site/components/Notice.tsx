'use client';

import { noticeOf, statusOf } from '@/lib/hours';
import { useNow } from './useNow';

// Полоса над шапкой: живой статус + их объявления об изменении графика.
// ?now=2026-10-08T12:00 — показать объявление, ?now=2026-10-11T12:00 — воскресенье.
export default function Notice() {
  const now = useNow();
  if (!now) return <div className="nt"><div className="wrap nt-in">&nbsp;</div></div>;
  const st = statusOf(now);
  const notice = noticeOf(now);
  return (
    <div className={`nt${notice ? ' nt-alert' : ''}`} role="status">
      <div className="wrap nt-in">
        <span className={`nt-dot${st.open ? '' : ' off'}`} aria-hidden="true" />
        {notice ? <b>{notice}. Приносим извинения за неудобства.</b> : <b>{st.text}</b>}
        <span className="nt-sep" aria-hidden="true">·</span>
        <span className="nt-rest">приём по предварительной записи</span>
      </div>
    </div>
  );
}
