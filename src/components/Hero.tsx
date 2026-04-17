'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const SHAPE_ACRONYM = [
  { letter: 'S', meaning: 'Science' },
  { letter: 'H', meaning: 'Humanoid' },
  { letter: 'A', meaning: 'Autonomous' },
  { letter: 'P', meaning: 'Platform' },
  { letter: 'E', meaning: 'Engineering' },
];

export default function Hero() {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="blueprint-grid"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 3rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial highlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(98, 0, 238, 0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, paddingTop: '4rem' }}>

        {/* Technical metadata tags */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <span className="meta-pill" style={{ background: '#e2dfde', color: '#636262' }}>
            SNU Humanoid Club
          </span>
          <span className="meta-pill" style={{ background: '#ebe7e7', color: '#4800b2' }}>
            Est. 2025
          </span>
        </div>

        {/* Subtitle label */}
        <p className="section-label" style={{ marginBottom: '1rem' }}>
          {t('서울대학교 휴머노이드 로봇 연구 동아리', 'SNU Humanoid Robotics Research Club')}
        </p>

        {/* Hero title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: 'clamp(5rem, 16vw, 12rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: '#1c1b1b',
              display: 'inline-block',
            }}
          >
            SHAPE<span style={{ color: '#6200ee' }}>.</span>
          </h1>
        </div>

        {/* SHAPE acronym */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          paddingLeft: '0.25rem',
        }}>
          {SHAPE_ACRONYM.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#4800b2',
                letterSpacing: '-0.01em',
              }}>
                {item.letter}
              </span>
              <span style={{ fontSize: 11, color: '#7a7488', letterSpacing: '0.05em' }}>
                {item.meaning}
              </span>
            </div>
          ))}
        </div>

        {/* Divider + subtitle */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div style={{ width: 1, height: 64, background: '#cbc3d9', opacity: 0.4, flexShrink: 0 }} />
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            color: '#494456',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
            maxWidth: 480,
          }}>
            {t(
              '인간을 닮은 로봇의 미래를 만들어갑니다 — 조작, 내비게이션, 추론, 인지',
              'Shaping the future of humanoid robots — Manipulation, Navigation, Reasoning, Perception'
            )}
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={scrollToAbout}>
            {t('동아리 소개 보기', 'Explore Club')}
            <ChevronDown size={16} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('연락하기', 'Contact Us')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ height: 2, width: 40, background: '#6200ee' }} />
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#636262',
            }}>
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Decorative kinetic meter bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '3rem',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7a7488',
          }}>
            {t('연구 진행도', 'Research Progress')}
          </span>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#4800b2',
          }}>
            ACTIVE
          </span>
        </div>
        <div className="kinetic-track">
          <div className="kinetic-bar" style={{ width: '72%' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          color: '#7a7488',
        }}
        onClick={scrollToAbout}
      >
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          SCROLL
        </span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
