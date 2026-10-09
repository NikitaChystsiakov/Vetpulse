'use client';

import { useEffect, useRef, useState } from 'react';
import { ADDRESS, MAIN_PHONE, NAV, PHONES } from '@/lib/content';
import { CloseIcon, MenuIcon, PhoneIcon } from './icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  return (
    <header className="hd" ref={ref}>
      <div className="wrap hd-in">
        <a className="hd-logo" href="#top" aria-label="Ветклиника «Пульс» — на главную">
          <img src="/img/logo.png" alt="" width="62" height="65" />
          <span>Пульс<small>ветеринарная клиника</small></span>
        </a>
        <nav className="hd-nav" aria-label="Разделы">{NAV.map(n => <a key={n.t} href={n.href}>{n.t}</a>)}</nav>
        <span className="sp" />
        <div className="hd-contact">
          <a href={`tel:${MAIN_PHONE.tel}`}>{MAIN_PHONE.value}</a>
          <span>{ADDRESS.replace('Минск, ', '')} · м. Ковальская Слобода</span>
        </div>
        <a className="btn hd-book" href="#book">Записаться</a>
        <a className="hd-call" href={`tel:${MAIN_PHONE.tel}`} aria-label={`Позвонить ${MAIN_PHONE.value}`}><PhoneIcon size={20} /></a>
        <button className="hd-menu" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <div className="hd-sheet">
          <nav aria-label="Меню">{NAV.map(n => <a key={n.t} href={n.href} onClick={() => setOpen(false)}>{n.t}</a>)}</nav>
          <ul>{PHONES.map(p => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.value}</a><span>{p.label}</span></li>)}</ul>
          <p>{ADDRESS} · пн–пт 9–21, сб 9–18</p>
        </div>
      )}
    </header>
  );
}
