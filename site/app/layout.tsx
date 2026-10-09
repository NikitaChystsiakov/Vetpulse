import type { Metadata, Viewport } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

// Rubik — мягкие углы, кириллица; перекликается с курсивом «ПУЛЬС» в логотипе
const rubik = Rubik({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--f-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ветеринарная клиника «Пульс» в Минске — Левкова, 43',
  description: 'Ветклиника для кошек и собак у метро «Ковальская Слобода»: терапия, дерматология, урология, хирургия, УЗИ и анализы на месте, ветаптека. Пн–пт 9–21, сб 9–18. Приём по записи.',
  robots: { index: false, follow: false },
  icons: { icon: '/img/logo.png' },
};

export const viewport: Viewport = { themeColor: '#1F1B4C', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body>{children}</body>
    </html>
  );
}
