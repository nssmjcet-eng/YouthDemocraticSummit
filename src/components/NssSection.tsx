import { ExternalLink, HeartHandshake, Compass, Eye, Scale, Sparkles } from 'lucide-react';
import nssLogo from '@/assets/nss-mjcet-official.png';
import { NSS_CONFIG } from '@/config/nss';

export function NssSection() {
  const valueIcons = {
    service: HeartHandshake,
    leadership: Compass,
    awareness: Eye,
    'civic-responsibility': Scale,
    empowerment: Sparkles,
  };

  return (
    <section id="nss" className="section nss-section" aria-label="NSS MJCET Institutional Overview">
      <div className="section-inner">
        {/* Topline Bar */}
        <div className="section-topline">
          <span>01 / ORGANISING INSTITUTION</span>
          <span>{NSS_CONFIG.sectionTopline}</span>
        </div>

        {/* Compact Hero Grid */}
        <div className="nss-hero-grid">
          {/* Left Column: Official Logo Card */}
          <div className="nss-logo-col">
            <div className="nss-logo-card">
              <img
                src={nssLogo}
                alt="NSS MJCET — National Service Scheme Logo"
                className="nss-logo-img"
                width={120}
                height={120}
                loading="eager"
              />
              <div className="nss-badge-wrap">
                <span className="nss-sublabel">{NSS_CONFIG.label}</span>
                <span className="nss-inst-tag">{NSS_CONFIG.institution}</span>
                <a
                  href={NSS_CONFIG.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nss-portal-badge-link"
                  aria-label="Visit NSS MJCET Official Website"
                >
                  <span>www.nssmjcet.in</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="nss-content-col">
            <span className="eyebrow">{NSS_CONFIG.subtitle.toUpperCase()}</span>
            <h2 className="nss-title">
              {NSS_CONFIG.title}
              <span className="nss-title-sub">{NSS_CONFIG.institution}</span>
            </h2>

            <div className="nss-tagline-box">
              <p className="nss-tagline">{NSS_CONFIG.tagline}</p>
              <span className="nss-motto">{NSS_CONFIG.motto}</span>
            </div>

            <p className="nss-desc-para">
              NSS MJCET is the premier student-led community service and civic leadership chapter at Muffakham Jah College of Engineering &amp; Technology, fostering active democratic participation, social responsibility, and youth empowerment.
            </p>

            {/* Compact Values Badges */}
            <div className="nss-compact-values">
              {NSS_CONFIG.values.map((v) => {
                const IconComp = valueIcons[v.id as keyof typeof valueIcons] || Sparkles;
                return (
                  <span key={v.id} className="nss-value-pill">
                    <IconComp size={13} className="text-gold flex-shrink-0" />
                    <span>{v.title}</span>
                  </span>
                );
              })}
            </div>

            <div className="nss-action-row">
              <a
                href={NSS_CONFIG.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nss-action-link"
              >
                VISIT OFFICIAL NSS MJCET PORTAL <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
