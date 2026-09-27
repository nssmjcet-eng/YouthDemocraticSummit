import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Users, Scale, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParliamentaryJourney } from '@/components/ParliamentaryJourney';
import logo from '@/assets/nss-logo.png';
import { YDS_CONFIG } from '@/config/yds';

export const Route = createFileRoute('/structure')({
  head: () => ({
    meta: [
      { title: 'YDS Structure — Parliamentary Journey & Procedure | YDS 2026' },
      {
        name: 'description',
        content:
          'Complete parliamentary architecture and 3-day legislative structure of Youth Democratic Summit 2026 by NSS MJCET. Explore Lok Sabha and Rajya Sabha sitting flows, the Central Youth Employment Bill, and the simulated Joint Sitting.',
      },
      { property: 'og:title', content: 'YDS Structure — Parliamentary Journey & Procedure | YDS 2026' },
      {
        property: 'og:description',
        content:
          'Three Days. Two Houses. One Legislative Journey. Detailed parliamentary order of business for 125 MPs across 25 political parties at YDS 2026.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.ydsnssmjcet.in/structure' },
      { property: 'og:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'YDS Structure — Parliamentary Journey & Procedure' },
      {
        name: 'twitter:description',
        content: 'Official bicameral parliamentary simulation architecture of YDS 2026 organised by NSS MJCET.',
      },
      { name: 'twitter:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
    ],
    links: [{ rel: 'canonical', href: 'https://www.ydsnssmjcet.in/structure' }],
  }),
  component: StructurePage,
});

function StructurePage() {
  const quickLinks = [
    { label: '3-Day Overview', href: '#journey' },
    { label: 'Lok Sabha', href: '#lok-sabha' },
    { label: 'Rajya Sabha', href: '#rajya-sabha' },
    { label: 'The Central Bill', href: '#legislative-journey' },
    { label: 'The House Officers', href: '#the-house' },
  ];

  return (
    <div className="structure-page-wrapper">
      {/* Top Header with Back to YDS Navigation */}
      <header className="structure-page-header">
        <div className="section-inner structure-header-inner">
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

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="header-cta">
              <Link to="/register">
                REGISTER TEAM <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner for YDS Structure */}
      <section className="structure-hero-section">
        <div className="section-inner">
          <div className="section-topline">
            <span>OFFICIAL ARCHITECTURE · YDS 2026</span>
            <span>THREE DAYS · TWO HOUSES · ONE LEGISLATIVE JOURNEY</span>
          </div>

          <div className="structure-hero-body">
            <span className="eyebrow">PARLIAMENTARY FRAMEWORK</span>
            <h1 className="structure-hero-title">
              YDS Structure
              <br />
              <em>&amp; Parliamentary Procedure.</em>
            </h1>
            <p className="structure-hero-desc">
              Youth Democratic Summit 2026 is structured as a bicameral parliamentary simulation adapted from Indian
              parliamentary practice. From Day 1 Oath and Government Formation to Lok Sabha debates, Rajya Sabha scrutiny,
              and a qualifying Joint Sitting, experience democratic representation in action.
            </p>

            {/* Quick Metrics Badges */}
            <div className="structure-metrics-pills">
              <span className="struct-metric-badge">
                <Users size={14} className="text-gold" />
                125 Members of Parliament
              </span>
              <span className="struct-metric-badge">
                <Landmark size={14} className="text-gold" />
                25 Fictional Parties
              </span>
              <span className="struct-metric-badge">
                <Scale size={14} className="text-gold" />
                75 Lok Sabha + 50 Rajya Sabha MPs
              </span>
              <span className="struct-metric-badge">
                <FileText size={14} className="text-gold" />
                1 Central Youth Employment Bill
              </span>
              <span className="struct-metric-badge">
                <CheckCircle2 size={14} className="text-gold" />
                Joint Sitting Contingency
              </span>
            </div>
          </div>

          {/* In-page Sticky Quick Navigation */}
          <nav className="structure-quick-nav" aria-label="Page Sections Navigation">
            {quickLinks.map((item) => (
              <a key={item.label} href={item.href} className="struct-nav-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* The Complete Parliamentary Journey & Procedure Components */}
      <main>
        <ParliamentaryJourney />
      </main>

      {/* Bottom CTA Card */}
      <section className="structure-bottom-cta">
        <div className="section-inner text-center">
          <span className="eyebrow">JOIN THE PARLIAMENT</span>
          <h2 className="structure-cta-heading">
            Step onto the floor of the House.<br />
            <em>Register your 5-member delegation.</em>
          </h2>
          <p className="structure-cta-sub">
            Participation is free and awarded strictly through competitive team selection.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="header-cta bg-gold text-deep hover:bg-gold/90 font-bold px-8 py-3">
              <Link to="/register">
                REGISTER YOUR TEAM <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold/40 text-ivory hover:bg-white/5 px-6">
              <Link to="/">
                RETURN TO HOMEPAGE
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section-inner footer-bottom-inner">
          <span>© 2026 YOUTH DEMOCRATIC SUMMIT · NSS MJCET</span>
          <Link to="/" className="text-gold text-xs font-bold tracking-widest hover:underline">
            RETURN TO HOMEPAGE ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}
