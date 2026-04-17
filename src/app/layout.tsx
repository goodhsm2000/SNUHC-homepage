import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { DataProvider } from '@/contexts/DataContext';

export const metadata: Metadata = {
  title: 'SHAPE — SNU Humanoid Club',
  description:
    'SNU Humanoid Club SHAPE | 서울대학교 휴머노이드 동아리 SHAPE. Research in manipulation, navigation, reasoning, and perception.',
  openGraph: {
    title: 'SHAPE — SNU Humanoid Club',
    description: 'SNU Humanoid Club SHAPE | 서울대학교 휴머노이드 동아리',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
