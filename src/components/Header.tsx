'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '#about', labelKo: '소개', labelEn: 'About' },
  { href: '#team', labelKo: '팀', labelEn: 'Team' },
  { href: '#news', labelKo: '소식', labelEn: 'News' },
  { href: '#history', labelKo: '히스토리', labelEn: 'History' },
  { href: '#gallery', labelKo: '갤러리', labelEn: 'Gallery' },
  { href: '#partners', labelKo: '파트너', labelEn: 'Partners' },
  { href: '#contact', labelKo: '연락처', labelEn: 'Contact' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: 'rgba(252, 249, 248, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(203, 195, 217, 0.25)' : '1px solid transparent',
        }}
      >
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 2rem',
            height: 64,
            maxWidth: '100%',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              textDecoration: 'none',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#1c1b1b',
            }}
          >
            SHAPE
          </a>

          {/* Desktop Nav */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="nav-link"
              >
                {t(item.labelKo, item.labelEn)}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language toggle */}
            <div style={{
              display: 'flex',
              background: 'rgba(203, 195, 217, 0.25)',
              border: '1px solid rgba(203, 195, 217, 0.4)',
              borderRadius: 999,
              overflow: 'hidden',
            }}>
              {(['ko', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  style={{
                    padding: '5px 14px',
                    background: language === lang
                      ? 'linear-gradient(135deg, #4800b2, #6200ee)'
                      : 'transparent',
                    color: language === lang ? 'white' : '#636262',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 11,
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.1em',
                    fontFamily: 'Space Grotesk, sans-serif',
                    borderRadius: language === lang ? 999 : 0,
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: 'none', border: 'none', color: '#1c1b1b',
                cursor: 'pointer', padding: 4, display: 'none',
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(252, 249, 248, 0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 2rem',
            gap: '0.25rem',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: '1.1rem 0',
                fontSize: 20, fontWeight: 700,
                color: '#636262',
                borderBottom: '1px solid rgba(203, 195, 217, 0.3)',
                transition: 'color 0.2s ease',
                letterSpacing: '-0.02em',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1c1b1b')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#636262')}
            >
              {t(item.labelKo, item.labelEn)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
