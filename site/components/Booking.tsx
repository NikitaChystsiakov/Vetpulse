'use client';

import { useEffect, useState } from 'react';
import { DOCTORS, LINKS, MAIN_PHONE, type DoctorId } from '@/lib/content';

type Pick = DoctorId | 'any';
const EVENT = 'pulse:pick-doctor';

// Кнопка «Записаться к …» в карточке врача: подставляет врача в форму и прокручивает к ней.
export function PickDoctor({ id, children }: { id: DoctorId; children: React.ReactNode }) {
  return (
    <a className="btn" href="#book" onClick={() => window.dispatchEvent(new CustomEvent<Pick>(EVENT, { detail: id }))}>
      {children}
    </a>
  );
}

// Форма «Записаться на приём» — поля как на vetpulse.by: имя*, телефон*, e-mail, сообщение.
// Добавлен только выбор врача. Администратор перезванивает и согласует время — слотов на сайте у клиники нет.
export default function Booking() {
  const [doc, setDoc] = useState<Pick>('any');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const on = (e: Event) => { setDoc((e as CustomEvent<Pick>).detail); setSent(false); };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  const phoneOk = phone.replace(/\D/g, '').length >= 9;
  const nameOk = name.trim().length > 0;

  if (sent) {
    const d = DOCTORS.find(x => x.id === doc);
    return (
      <div className="bk bk-done" aria-live="polite">
        <svg className="bk-ecg" viewBox="0 0 220 48" fill="none" aria-hidden="true"><path d="M0 30h84l10-18 12 30 14-40 12 40 8-12h80" /></svg>
        <h3>Заявка принята, {name.trim()}</h3>
        <p>Администратор перезвонит на {phone} и подберёт удобное время{d ? ` у ${d.gen}` : ''}.</p>
        <p className="bk-note">Это демо — заявка никуда не отправляется.</p>
        <button className="btn btn-ghost" onClick={() => { setSent(false); setTried(false); }}>Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form className="bk" noValidate onSubmit={e => { e.preventDefault(); setTried(true); if (phoneOk && nameOk) setSent(true); }}>
      <fieldset className="bk-doc">
        <legend>К врачу</legend>
        <div>
          {([['any', 'Любой врач'], ...DOCTORS.map(d => [d.id, d.label])] as [Pick, string][]).map(([id, t]) => (
            <label key={id} className={doc === id ? 'on' : ''}>
              <input type="radio" name="doctor" value={id} checked={doc === id} onChange={() => setDoc(id)} />{t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="bk-2">
        <label className={tried && !nameOk ? 'err' : ''}>
          <span>Ваше имя*</span>
          <input name="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} aria-invalid={tried && !nameOk} />
          {tried && !nameOk && <em>Как к вам обращаться?</em>}
        </label>
        <label className={tried && !phoneOk ? 'err' : ''}>
          <span>Телефон*</span>
          <input name="phone" type="tel" inputMode="tel" placeholder="+375 __ ___-__-__" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} aria-invalid={tried && !phoneOk} />
          {tried && !phoneOk && <em>Нужен номер, чтобы перезвонить</em>}
        </label>
      </div>
      <label><span>E-mail</span><input name="email" type="email" autoComplete="email" /></label>
      <label><span>Сообщение</span><textarea name="message" rows={3} placeholder="Кто питомец и что беспокоит" /></label>
      <button className="btn bk-go" type="submit">Записаться на приём</button>
      <p className="bk-small">Перезвоним и согласуем время. Можно сразу позвонить: <a href={`tel:${MAIN_PHONE.tel}`}>{MAIN_PHONE.value}</a>. Отправляя заявку, вы соглашаетесь с <a href={LINKS.cookie} target="_blank" rel="noreferrer">правилами обработки данных</a>.</p>
    </form>
  );
}
