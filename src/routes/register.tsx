import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Award, Instagram } from 'lucide-react';
import { RegistrationForm } from '@/components/RegistrationForm';
import { YDS_CONFIG } from '@/config/yds';
import logo from '@/assets/nss-logo.png';

export const Route = createFileRoute('/register')({
  head: () => ({
    meta: [
      { title: 'Register Your Team — Youth Democratic Summit 2026' },
      {
        name: 'description',
        content:
          'Official 5-member team registration for the Youth Democratic Summit (YDS 2026) organised by NSS MJCET, Hyderabad.',
      },
      { property: 'og:title', content: 'Register Your Team — Youth Democratic Summit 2026' },
      {
        property: 'og:description',
        content:
          'Official team application portal for YDS 2026. Exactly 5 members per team. Free registration.',
      },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
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

            <div className="register-hero-meta">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} className="text-gold" />
                {YDS_CONFIG.dates}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-gold" />
                {YDS_CONFIG.venue}
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

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="register-key-badge">
                <Users size={18} className="text-gold flex-none" />
                <span>Teams must consist of exactly 5 members (1 Team Leader + 4 Members).</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Registration Form Container */}
      <main className="register-form-container">
        <div className="section-inner flex justify-center">
          <div className="register-form-surface">
            <RegistrationForm />
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
