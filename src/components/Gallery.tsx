'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const { t } = useLanguage();
  const { data } = useData();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const items = data.gallery;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const prev = () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : 0));
  const next = () => setLightboxIdx((i) => (i !== null ? Math.min(items.length - 1, i + 1) : 0));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setLightboxIdx(null);
  };

  return (
    <section
      id="gallery"
      style={{
        padding: '7rem 3rem',
        background: '#f6f3f2',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>
            05 — {t('활동 갤러리', 'Gallery')}
          </p>
          <h2 className="section-title">
            {t('우리의 순간들', 'Our Moments')}
          </h2>
        </div>

        {items.length === 0 ? (
          <div style={{
            padding: '4rem',
            textAlign: 'center',
            border: '1px solid rgba(203, 195, 217, 0.3)',
            borderRadius: 12,
            background: '#fcf9f8',
          }}>
            <p style={{ color: '#7a7488', fontSize: 14 }}>
              {t('갤러리 사진이 없습니다.', 'No gallery items available.')}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(203, 195, 217, 0.3)',
            border: '1px solid rgba(203, 195, 217, 0.3)',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                style={{
                  cursor: 'pointer',
                  background: '#fcf9f8',
                  transition: 'background 0.3s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0edec'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fcf9f8'; }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  paddingBottom: '66%',
                  position: 'relative',
                  background: item.imageUrl ? undefined : 'rgba(203, 195, 217, 0.2)',
                  overflow: 'hidden',
                }}>
                  {!item.imageUrl && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 40, color: '#cbc3d9',
                    }}>
                      □
                    </div>
                  )}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={t(item.titleKo, item.titleEn)}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1c1b1b',
                    marginBottom: 4,
                  }}>
                    {t(item.titleKo, item.titleEn)}
                  </h3>
                  <p style={{ fontSize: 12, color: '#636262', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {t(item.descriptionKo, item.descriptionEn)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7a7488', fontSize: 11 }}>
                    <Calendar size={11} />
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && items[lightboxIdx] && (
        <div
          onClick={() => setLightboxIdx(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(28, 27, 27, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            outline: 'none',
          }}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'fixed', top: 20, right: 20,
              background: '#fcf9f8',
              border: '1px solid rgba(203, 195, 217, 0.4)',
              borderRadius: 6, padding: 8,
              color: '#1c1b1b', cursor: 'pointer',
              display: 'flex',
            }}
          >
            <X size={18} />
          </button>

          {lightboxIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
                background: '#fcf9f8',
                border: '1px solid rgba(203, 195, 217, 0.4)',
                borderRadius: 6, padding: 10,
                color: '#1c1b1b', cursor: 'pointer', display: 'flex',
              }}
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {lightboxIdx < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
                background: '#fcf9f8',
                border: '1px solid rgba(203, 195, 217, 0.4)',
                borderRadius: 6, padding: 10,
                color: '#1c1b1b', cursor: 'pointer', display: 'flex',
              }}
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 700, width: '100%',
              background: '#fcf9f8',
              borderRadius: 12,
              border: '1px solid rgba(203, 195, 217, 0.4)',
              overflow: 'hidden',
            }}
          >
            {/* Image */}
            <div style={{
              width: '100%', paddingBottom: '60%',
              position: 'relative',
              background: 'rgba(203, 195, 217, 0.15)',
            }}>
              {items[lightboxIdx].imageUrl ? (
                <img
                  src={items[lightboxIdx].imageUrl}
                  alt={items[lightboxIdx].titleKo}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: '#cbc3d9' }}>
                  □
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <h3 style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#1c1b1b',
                marginBottom: 8,
              }}>
                {t(items[lightboxIdx].titleKo, items[lightboxIdx].titleEn)}
              </h3>
              <p style={{ color: '#636262', lineHeight: 1.7, marginBottom: 12, fontSize: 14 }}>
                {t(items[lightboxIdx].descriptionKo, items[lightboxIdx].descriptionEn)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 12, color: '#7a7488', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={12} />
                  {formatDate(items[lightboxIdx].date)}
                </p>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: '#4800b2', letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>
                  {lightboxIdx + 1} / {items.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
