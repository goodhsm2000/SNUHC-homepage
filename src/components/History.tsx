'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

const MONTHS_KO = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function History() {
  const { t, language } = useLanguage();
  const { data } = useData();

  return (
    <section
      id="history"
      style={{
        padding: '7rem 3rem',
        background: '#fcf9f8',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '5rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>
            04 — {t('연혁', 'History')}
          </p>
          <h2 className="section-title">
            {t('우리의 발자취', 'Our Journey')}
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 760 }}>
          {data.history.length === 0 ? (
            <div style={{
              padding: '3rem',
              border: '1px solid rgba(203, 195, 217, 0.3)',
              borderRadius: 12,
              textAlign: 'center',
            }}>
              <p style={{ color: '#7a7488', fontSize: 14 }}>
                {t('히스토리가 없습니다.', 'No history available.')}
              </p>
            </div>
          ) : (
            data.history.map((item, i) => (
              <div
                key={item.id}
                className="border-hover-item"
                style={{
                  display: 'flex',
                  gap: '2.5rem',
                  paddingBottom: i < data.history.length - 1 ? '3rem' : 0,
                  marginBottom: i < data.history.length - 1 ? '1px' : 0,
                  borderBottom: i < data.history.length - 1
                    ? '1px solid rgba(203, 195, 217, 0.25)'
                    : 'none',
                }}
              >
                {/* Year column */}
                <div style={{ flexShrink: 0, width: 100, paddingTop: '0.2rem' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#4800b2',
                    textTransform: 'uppercase',
                  }}>
                    {item.year}
                    {item.month
                      ? `.${language === 'ko' ? MONTHS_KO[item.month - 1] : MONTHS_EN[item.month - 1]}`
                      : ''}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1c1b1b',
                    marginBottom: '0.5rem',
                  }}>
                    {t(item.titleKo, item.titleEn)}
                  </h3>
                  <p style={{ color: '#636262', fontSize: 14, lineHeight: 1.7 }}>
                    {t(item.descriptionKo, item.descriptionEn)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
