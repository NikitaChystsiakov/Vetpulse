import Notice from '@/components/Notice';
import Header from '@/components/Header';
import PriceTabs from '@/components/PriceTabs';
import Booking, { PickDoctor } from '@/components/Booking';
import Hours from '@/components/Hours';
import { ArrowIcon, CheckIcon, DoorIcon, FacebookIcon, InstagramIcon, MailIcon, MetroIcon, PhoneIcon, PinIcon, StarIcon } from '@/components/icons';
import { ADDRESS, DOCTORS, EMAIL, FACTS, LINKS, MAIN_PHONE, NAV, PERKS, PHONES, RATING, REVIEWS, STORY } from '@/lib/content';

// Линия кардиограммы из логотипа — один и тот же рисунок в герое и в футере.
const ECG = 'M0 70H330l18-30 22 70 30-110 26 120 20-50h354';

export default function Home() {
  return (
    <>
      <Notice />
      <Header />
      <main id="top">
        {/* Первый экран: их ресепшен, белая карточка, преимущества галочками */}
        <section className="hero wrap">
          <div className="hero-ph">
            <img src="/img/reception.jpg" alt="Ресепшен и ветаптека клиники «Пульс» на Левкова, 43" width="1920" height="1500" />
            <svg className="hero-ecg" viewBox="0 0 800 120" fill="none" aria-hidden="true"><path d={ECG} /></svg>
          </div>
          <div className="hero-card">
            <h1>Ветеринарная клиника <i>«Пульс»</i> в&nbsp;Минске</h1>
            <p className="hero-lead">Лечим кошек и собак: терапия, дерматология, урология, хирургия, УЗИ и анализы на месте. С любовью к каждому пациенту.</p>
            <ul className="checks">
              {PERKS.map(p => <li key={p}><span><CheckIcon /></span>{p}</li>)}
            </ul>
            <div className="hero-cta">
              <a className="btn" href="#book">Записаться на приём</a>
              <a className="btn btn-ghost" href="#prices">Цены на услуги</a>
            </div>
          </div>
        </section>

        {/* Услуги и цены */}
        <section className="sec" id="prices" aria-labelledby="prices-h">
          <div className="wrap prices">
            <div className="prices-head">
              <h2 id="prices-h">Услуги и цены</h2>
              <p>Цены из прейскуранта клиники, в белорусских рублях. Препараты и расходные материалы считаются отдельно — кроме услуг с пометкой «всё включено».</p>
              <p className="prices-first"><b>42 р.</b> первичный приём врача</p>
            </div>
            <PriceTabs />
          </div>
        </section>

        {/* Врачи */}
        <section className="sec sec-tint" id="doctors" aria-labelledby="doctors-h">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="doctors-h">Врачи клиники</h2>
              <p>В отзывах наших врачей называют по имени. Можно записаться к конкретному врачу — администратор подберёт время в его смену.</p>
            </div>
            <div className="docs">
              {DOCTORS.map(d => (
                <article className="doc" key={d.id}>
                  <img src={d.photo} alt={d.name} width="600" height="600" loading="lazy" />
                  <div className="doc-t">
                    <p className="doc-role">{d.role}</p>
                    <h3>{d.name}</h3>
                    <p className="doc-deg">{d.degree} · {d.years}</p>
                    <ul className="doc-spec">{d.spec.map(s => <li key={s}>{s}</li>)}</ul>
                    <div className="doc-bio"><p>{d.bio}</p><p>{d.schools}</p></div>
                    <PickDoctor id={d.id}>Записаться к {d.short}</PickDoctor>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* О клинике */}
        <section className="sec" id="about" aria-labelledby="about-h">
          <div className="wrap about">
            <div className="about-t">
              <h2 id="about-h">Клиника и аптека в одном месте</h2>
              <p className="about-lead">Обследование, лечение, препараты и корма — на Левкова, 43. Помогаем распознать болезнь до того, как она из маленькой неприятности превратится в большую проблему.</p>
              <dl className="facts">
                {FACTS.map(f => <div key={f.t}><dt>{f.t}</dt><dd>{f.d}</dd></div>)}
              </dl>
              <p className="about-lic">Лицензия № 02150\2818 от 19.09.2019, выдана Министерством сельского хозяйства и продовольствия РБ.</p>
            </div>
            <div className="mosaic">
              <img className="m-a" src="/img/int2.jpg" alt="Холл и ресепшен клиники" width="500" height="500" loading="lazy" />
              <img src="/img/int3.jpg" alt="Двери приёмных кабинетов" width="500" height="500" loading="lazy" />
              <img src="/img/int5.jpg" alt="Ветаптека: лечебные корма и информация" width="500" height="500" loading="lazy" />
              <img src="/img/int4.jpg" alt="Зона ожидания у кабинетов" width="500" height="500" loading="lazy" />
              <img src="/img/int1.jpg" alt="Стойка ресепшена с логотипом «Пульс»" width="500" height="500" loading="lazy" />
              <img src="/img/int6.jpg" alt="Витрина ветаптеки" width="500" height="500" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="sec sec-tint" id="reviews" aria-labelledby="reviews-h">
          <div className="wrap">
            <div className="sec-head rv-head">
              <h2 id="reviews-h">Что пишут владельцы</h2>
              <a className="rv-rate" href={LINKS.yandex} target="_blank" rel="noreferrer">
                <b>{RATING.value}</b>
                <span><span className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <StarIcon key={i} size={15} />)}</span>{RATING.count} на Яндекс Картах</span>
              </a>
            </div>
            <div className="rv">
              <figure className="rv-story">
                <blockquote>
                  <p className="rv-q">«{STORY.quote}»</p>
                  <p>{STORY.text}</p>
                </blockquote>
                <figcaption><b>{STORY.who}</b><span>{STORY.src} · врач: {STORY.doctor}</span></figcaption>
              </figure>
              <div className="rv-list">
                {REVIEWS.map(r => (
                  <figure key={r.who}>
                    <blockquote><p>{r.text}</p></blockquote>
                    <figcaption><b>{r.who}</b><span>{r.src} · врач: {r.doctor}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="rv-more">
              <a href={LINKS.reviews} target="_blank" rel="noreferrer">Все отзывы на сайте <ArrowIcon size={16} /></a>
              <a href={LINKS.yandex} target="_blank" rel="noreferrer">{RATING.reviews} на Яндекс Картах <ArrowIcon size={16} /></a>
            </div>
          </div>
        </section>

        {/* Запись и контакты */}
        <section className="sec" id="contacts" aria-labelledby="book-h">
          <div className="wrap book" id="book">
            <div className="book-form">
              <h2 id="book-h">Записаться на приём</h2>
              <p className="book-lead">Приём ведётся по предварительной записи. Оставьте телефон — администратор перезвонит и согласует время.</p>
              <Booking />
            </div>
            <div className="book-info">
              <h3>Как нас найти</h3>
              <ul className="info">
                <li><PinIcon /><span><b>{ADDRESS}</b>Октябрьский район, рядом ж/д и автовокзал</span></li>
                <li><MetroIcon /><span><b>10 минут от метро «Ковальская Слобода»</b></span></li>
                <li><DoorIcon /><span><b>Вход в клинику слева от главного входа</b></span></li>
                <li><PhoneIcon /><span>{PHONES.map(p => <a key={p.tel} href={`tel:${p.tel}`}>{p.value} <small>{p.label}</small></a>)}</span></li>
                <li><MailIcon /><span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></li>
              </ul>
              <Hours />
              <div className="map">
                <iframe title="Клиника «Пульс» на Яндекс Картах" src="https://yandex.by/map-widget/v1/org/puls/184407767232/?z=16" loading="lazy" />
              </div>
              <a className="map-link" href={LINKS.route} target="_blank" rel="noreferrer">Построить маршрут <ArrowIcon size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ft">
        <svg className="ft-ecg" viewBox="0 0 1600 120" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M0 70H730l18-30 22 70 30-110 26 120 20-50h754" /></svg>
        <div className="wrap ft-in">
          <div className="ft-brand">
            <img src="/img/logo.png" alt="" width="56" height="59" />
            <p><b>Ветеринарная клиника «Пульс»</b>С любовью к каждому пациенту. Есть Пульс — есть жизнь!</p>
          </div>
          <nav aria-label="Разделы в подвале">
            {NAV.map(n => <a key={n.t} href={n.href}>{n.t}</a>)}
            <a href={LINKS.articles} target="_blank" rel="noreferrer">Статьи</a>
            <a href={LINKS.vacancies} target="_blank" rel="noreferrer">Вакансии</a>
          </nav>
          <div className="ft-c">
            {PHONES.map(p => <a key={p.tel} href={`tel:${p.tel}`}>{p.value} <small>{p.label}</small></a>)}
            <span>{ADDRESS}</span>
            <span>Пн–пт 9:00–21:00, сб 9:00–18:00, вс — выходной</span>
            <div className="ft-soc">
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href={LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>
        </div>
        <div className="wrap ft-legal">
          <span>© 2026 Ветеринарная клиника «Пульс». Лицензия № 02150\2818 от 19.09.2019.</span>
          <span>Демо-версия главной страницы. Фото — с сайта vetpulse.by.</span>
        </div>
      </footer>

      {/* Телефон: липкая панель действий */}
      <div className="mbar">
        <a href={`tel:${MAIN_PHONE.tel}`}><PhoneIcon size={18} />Позвонить</a>
        <a className="mbar-go" href="#book">Записаться</a>
      </div>
    </>
  );
}
