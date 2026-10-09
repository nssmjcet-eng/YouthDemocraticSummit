import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Award, Instagram } from 'lucide-react';
import { RegistrationForm } from '@/components/RegistrationForm';
import { YDS_CONFIG } from '@/config/yds';
import logo from '@/assets/nss-logo.png';
import { useQuery } from '@tanstack/react-query';
import { getPublicAnnouncement } from '@/functions/announcement';
import { RegistrationClosedNotice } from '@/components/PostponementBanner';

export const Route = createFileRoute('/register')({
  head: () => ({
    meta: [
      { title: 'Register Your Team — Youth Democratic Summit 2026 | NSS MJCET' },
      {
        name: 'description',
        content:
          'Official 5-member team registration portal for the Youth Democratic Summit (YDS 2026) organised by NSS MJCET, Hyderabad. Free registration. Limited seats.',
      },
      { property: 'og:title', content: 'Register Your Team — Youth Democratic Summit 2026 | NSS MJCET' },
      {
        property: 'og:description',
        content:
          'Official team application portal for YDS 2026. Exactly 5 members per team. Free registration.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.ydsnssmjcet.in/register' },
      { property: 'og:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Register Your Team — YDS 2026 | NSS MJCET' },
      {
        name: 'twitter:description',
        content: 'Form your 5-member team and register for the Youth Democratic Summit 2026.',
      },
      { name: 'twitter:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
    ],
    links: [
      { rel: 'canonical', href: 'https://www.ydsnssmjcet.in/register' },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  // Fetch registration status from the backend
  const announcementQuery = useQuery({
    queryKey: ['public-announcement'],
    queryFn: () => getPublicAnnouncement(),
    staleTime: 60_000,
    retry: 2,
  });

  const freshStatus = announcementQuery.data?.freshRegistrationStatus ?? 'NOT_OPEN';
  const isRegistrationOpen = freshStatus === 'OPEN';

  return (
    <div className="register-page-wrapper">
      {/* Top Bar with Back to YDS Button */}
      <header className="register-page-header">
        <div className="section-inner">
          <Link to="/" className="back-to-yds-btn" aria-label="Return to Youth Democratic Summit Homepage">
            <ArrowLeft size={16} />
            <span>BACK TO YDS</span>
          </Link>

          <Link to="/" className="wordmark" aria-label="YDS Homepage">
            <img className="brand-logo" src={logo} alt="NSS MJCET Logo" width={38} height={38} />
            <span className="wordmark-title hidden sm:inline-block">
              YDS 2026<br />
              BY NSS MJCET
            </span>
          </Link>
        </div>
      </header>

      {/* Page Hero Introduction */}
      <section className="register-hero-section">
        <div className="section-inner">
          <div className="section-topline">
            <span>OFFICIAL APPLICATION · YDS 2026</span>
            <span>NATIONAL YOUTH PARLIAMENT SIMULATION</span>
          </div>

          <div className="py-6">
            <span className="eyebrow">YOUTH DEMOCRATIC SUMMIT</span>
            <h1 className="register-hero-title">
              Team Registration<br />
              <em>&amp; Parliamentary Selection.</em>
            </h1>

            {isRegistrationOpen && (
              <div className="register-hero-meta">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={15} className="text-gold" />
                  {announcementQuery.data?.revisedDates || YDS_CONFIG.dates}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-gold" />
                  {announcementQuery.data?.revisedVenue || YDS_CONFIG.venue}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} className="text-gold" />
                  {YDS_CONFIG.timing}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-gold">
                  <Award size={15} />
                  Fee: {YDS_CONFIG.registrationFee}
                </span>
              </div>
            )}

            {isRegistrationOpen && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="register-key-badge">
                  <Users size={18} className="text-gold flex-none" />
                  <span>Teams must consist of exactly 5 members (1 Team Leader + 4 Members).</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Registration Form Container — only shown when registration is open */}
      <main className="register-form-container">
        <div className="section-inner flex justify-center">
          <div className="register-form-surface">
            {announcementQuery.isLoading ? (
              <div className="registration-closed-notice">
                <p className="registration-closed-message">Checking registration status…</p>
              </div>
            ) : isRegistrationOpen ? (
              <RegistrationForm />
            ) : (
              <RegistrationClosedNotice
                freshStatus={freshStatus}
                announcement={announcementQuery.data?.announcement}
                revisedDates={announcementQuery.data?.revisedDates}
                revisedVenue={announcementQuery.data?.revisedVenue}
              />
            )}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="site-footer">
        <div className="section-inner">
          <Link className="footer-title footer-brand" to="/">
            <img className="brand-logo" src={logo} alt="NSS MJCET logo" width={40} height={40} />
            YOUTH DEMOCRATIC SUMMIT 2026 · NSS MJCET
          </Link>
          <div className="footer-right">
            <a
              href={YDS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-instagram"
              aria-label="YDS NSS MJCET Instagram"
              title="Follow YDS on Instagram"
            >
              <Instagram size={21} />
            </a>
            <Link to="/" className="text-xs text-gold hover:underline">
              ← RETURN TO HOMEPAGE
            </Link>
          </div>
          <span>ENTER THE PARLIAMENT. FIND YOUR VOICE.</span>
        </div>
      </footer>
    </div>
  );
}
