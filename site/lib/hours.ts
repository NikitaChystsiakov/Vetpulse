// Режим работы «Пульса»: пн–пт 9:00–21:00, сб 9:00–18:00, вс — выходной.
// NOTICES — их объявления об изменении графика (на vetpulse.by они висят первым экраном).
export const NOTICES: Record<string, { close: number; text: string }> = {
  '2026-10-08': { close: 18, text: '8 октября клиника работает до 18:00' },
};

const DAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function hoursOf(d: Date): { open: number; close: number } | null {
  const n = NOTICES[key(d)];
  if (d.getDay() === 0) return null;
  const close = n?.close ?? (d.getDay() === 6 ? 18 : 21);
  return { open: 9, close };
}

export const noticeOf = (d: Date) => NOTICES[key(d)]?.text ?? null;

function nextOpen(d: Date): string {
  for (let i = 1; i < 8; i++) {
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (hoursOf(t)) return i === 1 ? 'завтра в 9:00' : `в ${DAYS[t.getDay()]} в 9:00`;
  }
  return '';
}

// «Сегодня, пт — открыто до 21:00» / «Сейчас закрыто — откроемся завтра в 9:00»
export function statusOf(d: Date): { open: boolean; text: string } {
  const h = hoursOf(d);
  const hr = d.getHours() + d.getMinutes() / 60;
  if (h && hr < h.open) return { open: false, text: `Сегодня откроемся в 9:00, работаем до ${h.close}:00` };
  if (h && hr < h.close) return { open: true, text: `Сегодня, ${SHORT[d.getDay()]} — открыто до ${h.close}:00` };
  return { open: false, text: `Сейчас закрыто — откроемся ${nextOpen(d)}` };
}

export const WEEK = [
  { days: 'Пн–пт', idx: [1, 2, 3, 4, 5], time: '9:00–21:00' },
  { days: 'Суббота', idx: [6], time: '9:00–18:00' },
  { days: 'Воскресенье', idx: [0], time: 'выходной' },
];
