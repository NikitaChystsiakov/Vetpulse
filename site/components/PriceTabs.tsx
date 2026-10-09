'use client';

import { useRef, useState } from 'react';
import { LINKS, PRICE_GROUPS } from '@/lib/content';
import { ArrowIcon } from './icons';

// Прейскурант группами: слева вкладки, справа строки «услуга — цена».
export default function PriceTabs() {
  const [cur, setCur] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = PRICE_GROUPS[cur];

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (cur + d + PRICE_GROUPS.length) % PRICE_GROUPS.length;
    setCur(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="pt">
      <div className="pt-tabs" role="tablist" aria-label="Группы услуг" aria-orientation="vertical" onKeyDown={onKey}>
        {PRICE_GROUPS.map((x, i) => (
          <button key={x.id} ref={el => { tabs.current[i] = el; }} role="tab" id={`tab-${x.id}`} aria-selected={i === cur}
            aria-controls="pt-panel" tabIndex={i === cur ? 0 : -1} onClick={() => setCur(i)}>
            {x.t}
          </button>
        ))}
      </div>
      <div className="pt-panel" id="pt-panel" role="tabpanel" aria-labelledby={`tab-${g.id}`}>
        <p className="pt-text">{g.text}</p>
        <dl className="pt-rows">
          {g.rows.map(r => (
            <div key={r.t}>
              <dt>{r.t}{r.note && <small>{r.note}</small>}</dt>
              <dd>{r.price}</dd>
            </div>
          ))}
        </dl>
        <div className="pt-links">
          <a href={g.href} target="_blank" rel="noreferrer">Подробнее об услуге <ArrowIcon size={16} /></a>
          <a href={LINKS.prices} target="_blank" rel="noreferrer">Весь прейскурант <ArrowIcon size={16} /></a>
        </div>
      </div>
    </div>
  );
}
