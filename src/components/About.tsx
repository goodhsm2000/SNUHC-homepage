'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const PILLARS = [
  {
    num: '01',
    titleKo: 'Manipulation',
    titleEn: 'Manipulation',
    descKo: '정밀한 로봇 팔 제어와 물체 조작 기술 연구',
    descEn: 'Precision robotic arm control and object manipulation',
    progress: 80,
  },
  {
    num: '02',
    titleKo: 'Navigation',
    titleEn: 'Navigation',
    descKo: '동적 환경에서의 자율 이동 및 경로 계획',
    descEn: 'Autonomous locomotion and path planning in dynamic environments',
    progress: 70,
  },
  {
    num: '03',
    titleKo: 'Reasoning',
    titleEn: 'Reasoning',
    descKo: '고수준 작업 계획 및 논리적 추론 알고리즘',
    descEn: 'High-level task planning and logical reasoning algorithms',
    progress: 65,
  },
  {
    num: '04',
    titleKo: 'Perception',
    titleEn: 'Perception',
    descKo: '컴퓨터 비전 및 환경 인지 시스템 개발',
    descEn: 'Computer vision and environment perception systems',
    progress: 75,
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="blueprint-grid"
      style={{
        padding: '7rem 3rem',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
        background: '#f6f3f2',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '5rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>
            01 — {t('동아리 소개', 'About Us')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-end' }}>
            <h2 className="section-title" style={{ flex: '1 1 300px' }}>
              {t('휴머노이드 로봇의', 'Shaping the Future')}<br />
              {t('미래를 만들다', 'of Humanoid Robotics')}
            </h2>
            <p style={{
              flex: '1 1 300px',
              fontSize: 15,
              color: '#494456',
              lineHeight: 1.8,
              maxWidth: 480,
              fontWeight: 400,
            }}>
              {t(
                'SNU Humanoid Club SHAPE는 서울대학교 자율로봇지능 연구실과 협력하여 휴머노이드 로봇 기술을 연구하는 동아리입니다. 조작, 내비게이션, 추론, 인지의 네 가지 분야에서 인간형 로봇의 자율성과 지능을 높이는 연구를 수행합니다.',
                'SNU Humanoid Club SHAPE is a research club working in collaboration with the SNU Autonomous Robot Intelligence Lab. We conduct research to enhance the autonomy and intelligence of humanoid robots across four key domains.'
              )}
            </p>
          </div>
        </div>

        {/* Research pillars — bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(203, 195, 217, 0.3)',
          border: '1px solid rgba(203, 195, 217, 0.3)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className="border-hover-item"
              style={{
                background: '#fcf9f8',
                padding: '2.5rem 2rem',
                transition: 'background 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#f6f3f2';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#fcf9f8';
              }}
            >
              <span style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 700,
                color: '#4800b2',
                letterSpacing: '0.15em',
                marginBottom: '1.25rem',
              }}>
                {pillar.num}
              </span>
              <h3 style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#1c1b1b',
                marginBottom: '0.75rem',
              }}>
                {t(pillar.titleKo, pillar.titleEn)}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#636262',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}>
                {t(pillar.descKo, pillar.descEn)}
              </p>
              <div className="kinetic-track">
                <div className="kinetic-bar" style={{ width: `${pillar.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '0',
          marginTop: '4rem',
          border: '1px solid rgba(203, 195, 217, 0.3)',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#fcf9f8',
        }}>
          {[
            { num: '2025', labelKo: '창설 연도', labelEn: 'Founded' },
            { num: '40+', labelKo: '현 부원', labelEn: 'Members' },
            { num: '4', labelKo: '연구 분야', labelEn: 'Research Tracks' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '2.5rem 2rem',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(203, 195, 217, 0.3)' : 'none',
              }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#4800b2',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#7a7488',
              }}>
                {t(stat.labelKo, stat.labelEn)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
