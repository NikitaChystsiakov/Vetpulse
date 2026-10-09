'use client';

import { noticeOf, statusOf, WEEK } from '@/lib/hours';
import { useNow } from './useNow';

// График с подсветкой сегодняшней строки и живым статусом.
export default function Hours() {
  const now = useNow();
  const today = now?.getDay();
  const st = now ? statusOf(now) : null;
  const notice = now ? noticeOf(now) : null;
  return (
    <div className="hr">
      <dl>
        {WEEK.map(w => (
          <div key={w.days} className={today !== undefined && w.idx.includes(today) ? 'on' : ''}>
            <dt>{w.days}</dt><dd>{w.time}</dd>
          </div>
        ))}
      </dl>
      <p className={`hr-st${st && !st.open ? ' off' : ''}`}>{notice ?? st?.text ?? ' '}</p>
    </div>
  );
}
