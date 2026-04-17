'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const contacts = [
    {
      icon: MapPin,
      labelKo: '주소',
      labelEn: 'Address',
      valueKo: '서울특별시 관악구 관악로 1, 서울대학교 301동',
      valueEn: '1 Gwanak-ro, Gwanak-gu, Seoul, SNU Building 301',
    },
    {
      icon: Phone,
      labelKo: '전화',
      labelEn: 'Phone',
      valueKo: '+82 10-9276-4775',
      valueEn: '+82 10-9276-4775',
    },
    {
      icon: Mail,
      labelKo: '이메일',
      labelEn: 'Email',
      valueKo: 'snuhumanoid@gmail.com',
      valueEn: 'snuhumanoid@gmail.com',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '7rem 3rem',
        background: '#f6f3f2',
        borderTop: '1px solid rgba(203, 195, 217, 0.3)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '5rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>
            07 — {t('연락처', 'Contact')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-end' }}>
            <h2 className="section-title" style={{ flex: '1 1 300px' }}>
              {t('함께 만들어', 'Get in')}<br />{t('갑시다', 'Touch')}
            </h2>
            <p style={{
              flex: '1 1 300px',
              fontSize: 15,
              color: '#494456',
              lineHeight: 1.8,
              maxWidth: 400,
            }}>
              {t(
                '동아리 가입, 협업, 질문 등 무엇이든 편하게 연락해 주세요.',
                'Feel free to reach out for club membership, collaboration, or any inquiries.'
              )}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Contact info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2rem',
              background: 'rgba(203, 195, 217, 0.3)',
              border: '1px solid rgba(203, 195, 217, 0.3)',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              {contacts.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    style={{
                      padding: '1.5rem',
                      background: '#fcf9f8',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: 6,
                      background: 'rgba(72, 0, 178, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon size={18} color="#4800b2" />
                    </div>
                    <div>
                      <p style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#7a7488',
                        letterSpacing: '0.15em',
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}>
                        {t(item.labelKo, item.labelEn)}
                      </p>
                      <p style={{ color: '#1c1b1b', fontWeight: 600, fontSize: 14 }}>
                        {t(item.valueKo, item.valueEn)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(203, 195, 217, 0.3)',
              background: 'rgba(72, 0, 178, 0.04)',
              padding: '3rem',
              textAlign: 'center',
            }}>
              <MapPin size={32} color="#4800b2" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ color: '#494456', fontSize: 14, fontWeight: 600 }}>
                {t('서울대학교 관악캠퍼스', 'SNU Gwanak Campus')}
              </p>
              <p style={{ color: '#7a7488', fontSize: 11, marginTop: 4, letterSpacing: '0.05em' }}>
                Seoul National University
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div style={{
            background: '#fcf9f8',
            border: '1px solid rgba(203, 195, 217, 0.3)',
            borderRadius: 12,
            padding: '2.5rem',
          }}>
            <h3 style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#1c1b1b',
              marginBottom: '0.4rem',
            }}>
              {t('메시지 보내기', 'Send a Message')}
            </h3>
            <p style={{ color: '#7a7488', fontSize: 13, marginBottom: '2rem' }}>
              {t('24시간 내에 답변 드립니다', "We'll reply within 24 hours")}
            </p>

            <div className="kinetic-track" style={{ marginBottom: '2rem' }}>
              <div className="kinetic-bar" style={{ width: '100%' }} />
            </div>

            {sent ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '1rem', padding: '3rem 0',
                textAlign: 'center',
              }}>
                <CheckCircle size={48} color="#4800b2" />
                <p style={{ color: '#1c1b1b', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
                  {t('메시지가 전송되었습니다!', 'Message sent!')}
                </p>
                <p style={{ color: '#7a7488', fontSize: 13 }}>
                  {t('빠른 시일 내에 연락드리겠습니다.', "We'll get back to you soon.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 700,
                    color: '#7a7488', marginBottom: 6,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {t('이름', 'Name')}
                  </label>
                  <input
                    className="form-input"
                    placeholder={t('홍길동', 'Your name')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 700,
                    color: '#7a7488', marginBottom: 6,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {t('이메일', 'Email')}
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 700,
                    color: '#7a7488', marginBottom: 6,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {t('메시지', 'Message')}
                  </label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder={t(
                      '안녕하세요. 동아리에 관심이 있어서 연락드립니다...',
                      "Hello, I'm interested in joining the club..."
                    )}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <Send size={14} />
                  {t('메시지 보내기', 'Send Message')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
