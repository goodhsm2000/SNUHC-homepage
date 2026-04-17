'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { Calendar, ArrowRight, X } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  Recruitment: '#4800b2',
  Research: '#6200ee',
  Award: '#963200',
  Event: '#2a6b2a',
  Default: '#5f5e5e',
};

export default function News() {
  const { t } = useLanguage();
  const { data } = useData();
  const [selected, setSelected] = useState<string | null>(null);

  const sorted = [...data.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const selectedItem = sorted.find((n) => n.id === selected);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section
      id="news"
      style={{
        padding: '7rem 3rem',
        background: '#f6f3f2',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '1.25rem' }}>
              03 — {t('최근 소식', 'News & Updates')}
            </p>
            <h2 className="section-title">
              {t('최신 소식', 'Latest News')}
            </h2>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div style={{
            padding: '4rem',
            textAlign: 'center',
            border: '1px solid rgba(203, 195, 217, 0.3)',
            borderRadius: 12,
            background: '#fcf9f8',
          }}>
            <p style={{ color: '#7a7488', fontSize: 14, letterSpacing: '0.05em' }}>
              {t('소식이 없습니다.', 'No news available.')}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
          }}>
            {sorted.map((item) => {
              const color = CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.Default;
              return (
                <div
                  key={item.id}
                  className="news-card"
                  onClick={() => setSelected(item.id)}
                  style={{ padding: '2rem', background: '#fcf9f8' }}
                >
                  {/* Category badge */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span className="meta-pill" style={{
                      background: `${color}12`,
                      color,
                    }}>
                      {item.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1c1b1b',
                    lineHeight: 1.4,
                    marginBottom: '0.75rem',
                  }}>
                    {t(item.titleKo, item.titleEn)}
                  </h3>

                  <p style={{
                    fontSize: 13,
                    color: '#636262',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {t(item.contentKo, item.contentEn)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      color: '#7a7488', fontSize: 12,
                    }}>
                      <Calendar size={12} />
                      {formatDate(item.date)}
                    </div>
                    <div style={{
                      color: '#4800b2',
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 12, fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}>
                      {t('더 보기', 'Read more')} <ArrowRight size={12} />
                    </div>
                  </div>

                  {/* Bottom kinetic bar */}
                  <div className="kinetic-track" style={{ marginTop: '1.25rem' }}>
                    <div className="kinetic-bar" style={{ width: '100%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(28, 27, 27, 0.5)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fcf9f8',
              border: '1px solid rgba(203, 195, 217, 0.4)',
              borderRadius: 12,
              padding: '2.5rem',
              maxWidth: 620,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(72, 0, 178, 0.12)',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: '#ebe7e7',
                border: '1px solid rgba(203, 195, 217, 0.4)',
                borderRadius: 6, padding: 6,
                color: '#636262', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ marginBottom: '1rem' }}>
              <span className="meta-pill" style={{
                background: `${CATEGORY_COLORS[selectedItem.category] ?? CATEGORY_COLORS.Default}12`,
                color: CATEGORY_COLORS[selectedItem.category] ?? CATEGORY_COLORS.Default,
              }}>
                {selectedItem.category}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#1c1b1b',
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}>
              {t(selectedItem.titleKo, selectedItem.titleEn)}
            </h2>

            <p style={{
              fontSize: 12,
              color: '#7a7488',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: 5,
              letterSpacing: '0.05em',
            }}>
              <Calendar size={12} />
              {formatDate(selectedItem.date)}
            </p>

            <div className="kinetic-track" style={{ marginBottom: '1.5rem' }}>
              <div className="kinetic-bar" style={{ width: '100%' }} />
            </div>

            <p style={{ color: '#494456', lineHeight: 1.9, fontSize: 15 }}>
              {t(selectedItem.contentKo, selectedItem.contentEn)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
