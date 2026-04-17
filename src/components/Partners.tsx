'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

const PARTNERS = [
  {
    abbr: 'SNU',
    subtitleKo: 'Seoul National University',
    subtitleEn: 'Seoul National University',
    nameKo: '자율로봇지능 연구실',
    nameEn: 'Autonomous Robot Intelligence Lab',
    url: 'https://robot.snu.ac.kr',
    urlLabel: 'robot.snu.ac.kr',
  },
  {
    abbr: 'RISE',
    subtitleKo: 'Seoul National University',
    subtitleEn: 'Seoul National University',
    nameKo: '서울대 RISE 사업단',
    nameEn: 'SNU RISE Project',
    url: 'https://rise.snu.ac.kr/',
    urlLabel: 'rise.snu.ac.kr',
  },
];

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section
      id="partners"
      style={{
        padding: '7rem 3rem',
        background: '#fcf9f8',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>
            06 — {t('지원 기관', 'Supporting Organizations')}
          </p>
          <h2 className="section-title">
            {t('파트너', 'Partners')}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1px',
          background: 'rgba(203, 195, 217, 0.3)',
          border: '1px solid rgba(203, 195, 217, 0.3)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {PARTNERS.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  padding: '2.5rem',
                  background: '#fcf9f8',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.75rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0edec'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fcf9f8'; }}
              >
                {/* Logo block */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #4800b2, #6200ee)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: 16,
                    letterSpacing: '-0.02em',
                  }}>
                    {partner.abbr}
                  </span>
                </div>

                <div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#4800b2',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 6,
                  }}>
                    {t(partner.subtitleKo, partner.subtitleEn)}
                  </span>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1c1b1b',
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}>
                    {t(partner.nameKo, partner.nameEn)}
                  </h3>
                  <p style={{
                    fontSize: 12,
                    color: '#7a7488',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    {partner.urlLabel}
                    <ExternalLink size={11} />
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
