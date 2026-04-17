'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: '#fcf9f8',
      borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      padding: '4rem 3rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Main footer content */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(203, 195, 217, 0.25)',
        }}>
          {/* Brand */}
          <div>
            <p style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#1c1b1b',
              marginBottom: '0.75rem',
            }}>
              SHAPE<span style={{ color: '#6200ee' }}>.</span>
            </p>
            <p style={{ color: '#636262', fontSize: 13, maxWidth: 260, lineHeight: 1.7 }}>
              {t(
                'SNU Humanoid Club — 휴머노이드 로봇의 미래를 만들어 갑니다.',
                'SNU Humanoid Club — Shaping the future of humanoid robotics.'
              )}
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              {[
                { Icon: Github, label: 'GitHub' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  style={{
                    width: 38, height: 38,
                    borderRadius: 6,
                    background: '#ebe7e7',
                    border: '1px solid rgba(203, 195, 217, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#636262', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(72, 0, 178, 0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72, 0, 178, 0.25)';
                    (e.currentTarget as HTMLElement).style.color = '#4800b2';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#ebe7e7';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(203, 195, 217, 0.4)';
                    (e.currentTarget as HTMLElement).style.color = '#636262';
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{
                fontSize: 10, fontWeight: 700, color: '#7a7488',
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem',
              }}>
                {t('탐색', 'Navigate')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { href: '#about', ko: '소개', en: 'About' },
                  { href: '#news', ko: '소식', en: 'News' },
                  { href: '#history', ko: '히스토리', en: 'History' },
                  { href: '#team', ko: '팀', en: 'Team' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      color: '#636262', fontSize: 13, textDecoration: 'none',
                      transition: 'color 0.2s', fontWeight: 500,
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1c1b1b')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#636262')}
                  >
                    {t(link.ko, link.en)}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: 10, fontWeight: 700, color: '#7a7488',
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem',
              }}>
                {t('연구', 'Research')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {['Manipulation', 'Navigation', 'Reasoning', 'Perception'].map((r) => (
                  <a
                    key={r}
                    href="#team"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      color: '#636262', fontSize: 13, textDecoration: 'none',
                      transition: 'color 0.2s', fontWeight: 500,
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1c1b1b')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#636262')}
                  >
                    {r}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700,
            color: '#7a7488',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            © 2025 SNU HUMANOID CLUB SHAPE
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href="/admin.html"
              style={{
                fontSize: 10, fontWeight: 700,
                color: '#7a7488',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#4800b2')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#7a7488')}
            >
              Admin
            </a>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: '#4800b2',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              System_Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
