'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { MemberRole } from '@/lib/types';
import { User } from 'lucide-react';

const ROLE_CONFIG: Record<MemberRole, { labelKo: string; labelEn: string; color: string; bg: string }> = {
  executive:    { labelKo: '임원진',          labelEn: 'Executive',          color: '#4800b2', bg: 'rgba(72,0,178,0.08)' },
  management:   { labelKo: 'Management',      labelEn: 'Management',         color: '#6200ee', bg: 'rgba(98,0,238,0.08)' },
  manipulation: { labelKo: 'Manipulation',    labelEn: 'Manipulation',       color: '#963200', bg: 'rgba(150,50,0,0.08)' },
  navigation:   { labelKo: 'Navigation',      labelEn: 'Navigation',         color: '#2a6b2a', bg: 'rgba(42,107,42,0.08)' },
  reasoning:    { labelKo: 'Reasoning',       labelEn: 'Reasoning',          color: '#005f73', bg: 'rgba(0,95,115,0.08)' },
  perception:   { labelKo: 'Perception',      labelEn: 'Perception',         color: '#7a3900', bg: 'rgba(122,57,0,0.08)' },
  director:     { labelKo: '지도교수',         labelEn: 'Advisory Professor', color: '#5f5e5e', bg: 'rgba(95,94,94,0.08)' },
  mentor:       { labelKo: '멘토',             labelEn: 'Mentor',             color: '#494456', bg: 'rgba(73,68,86,0.08)' },
  alumni:       { labelKo: '졸업생',           labelEn: 'Alumni',             color: '#7a7488', bg: 'rgba(122,116,136,0.08)' },
};

const ROLE_ORDER: Record<MemberRole, number> = {
  executive: 1, management: 2, manipulation: 3, navigation: 4,
  reasoning: 5, perception: 6, director: 7, mentor: 8, alumni: 9,
};

const TABS: { key: MemberRole | 'all'; labelKo: string; labelEn: string }[] = [
  { key: 'all',          labelKo: '전체',         labelEn: 'All' },
  { key: 'executive',    labelKo: '임원진',        labelEn: 'Executives' },
  { key: 'management',   labelKo: 'Management',   labelEn: 'Management' },
  { key: 'manipulation', labelKo: 'Manipulation', labelEn: 'Manipulation' },
  { key: 'navigation',   labelKo: 'Navigation',   labelEn: 'Navigation' },
  { key: 'reasoning',    labelKo: 'Reasoning',    labelEn: 'Reasoning' },
  { key: 'perception',   labelKo: 'Perception',   labelEn: 'Perception' },
  { key: 'director',     labelKo: '지도교수',      labelEn: 'Advisory Professor' },
  { key: 'mentor',       labelKo: '멘토',          labelEn: 'Mentors' },
  { key: 'alumni',       labelKo: '졸업생',        labelEn: 'Alumni' },
];

export default function Team() {
  const { t } = useLanguage();
  const { data } = useData();
  const [activeTab, setActiveTab] = useState<MemberRole | 'all'>('management');

  const filtered = activeTab === 'all'
    ? [...data.members].sort(
        (a, b) =>
          (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99) ||
          (a.order ?? 0) - (b.order ?? 0)
      )
    : data.members.filter((m) => m.role === activeTab);

  return (
    <section
      id="team"
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
            02 — {t('팀원', 'Team Members')}
          </p>
          <h2 className="section-title">
            {t('우리 팀', 'Meet the Team')}
          </h2>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '3rem',
        }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 999,
                  border: isActive
                    ? '1px solid rgba(72, 0, 178, 0.4)'
                    : '1px solid rgba(203, 195, 217, 0.5)',
                  background: isActive
                    ? 'linear-gradient(135deg, #4800b2, #6200ee)'
                    : '#fcf9f8',
                  color: isActive ? '#ffffff' : '#636262',
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {t(tab.labelKo, tab.labelEn)}
              </button>
            );
          })}
        </div>

        {/* Member grid */}
        {filtered.length === 0 ? (
          <p style={{ color: '#7a7488', fontSize: 14 }}>
            {t('멤버가 없습니다.', 'No members available.')}
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {filtered.map((member) => {
              const conf = ROLE_CONFIG[member.role];
              const initials = member.nameKo.slice(0, 1) + (member.nameKo.length > 1 ? member.nameKo.slice(-1) : '');

              return (
                <div
                  key={member.id}
                  className="member-card"
                  style={{ padding: '1.5rem 1.25rem', textAlign: 'center' }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: member.imageUrl
                      ? `url(${member.imageUrl}) center/cover`
                      : `linear-gradient(135deg, ${conf.color}22, ${conf.color}44)`,
                    border: `1px solid ${conf.color}30`,
                    margin: '0 auto 1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    color: conf.color,
                    overflow: 'hidden',
                  }}>
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.nameKo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      initials || <User size={28} />
                    )}
                  </div>

                  {/* Role badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '2px 10px', borderRadius: 999,
                    background: conf.bg,
                    fontSize: 9, fontWeight: 700,
                    color: conf.color, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}>
                    {t(conf.labelKo, conf.labelEn)}
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1c1b1b',
                    marginBottom: 3,
                  }}>
                    {t(member.nameKo, member.nameEn)}
                  </h3>

                  {/* Title */}
                  <p style={{ fontSize: 12, color: '#4800b2', fontWeight: 600, marginBottom: 3 }}>
                    {t(member.titleKo, member.titleEn)}
                  </p>

                  {/* Affiliation */}
                  <p style={{ fontSize: 11, color: '#7a7488', lineHeight: 1.5 }}>
                    {t(member.affiliationKo, member.affiliationEn)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
