import { HeartHandshake, Compass, Eye, Scale, Sparkles, ExternalLink } from 'lucide-react';
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

        {/* Two-Column Intro */}
        <div className="nss-hero-grid">
          {/* Left Column: Logo & Badges */}
          <div className="nss-logo-col">
            <div className="nss-logo-card">
              <img
                src={nssLogo}
                alt="NSS MJCET — National Service Scheme Logo"
                className="nss-logo-img"
                width={160}
                height={160}
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

          {/* Right Column: Titles, Taglines & Narrative */}
          <div className="nss-content-col">
            <span className="eyebrow">{NSS_CONFIG.subtitle.toUpperCase()}</span>
            <h2 className="nss-title">
              {NSS_CONFIG.title}
              <span className="nss-title-sub">{NSS_CONFIG.subtitle}</span>
            </h2>

            <div className="nss-tagline-box">
              <p className="nss-tagline">{NSS_CONFIG.tagline}</p>
              <span className="nss-motto">{NSS_CONFIG.motto}</span>
            </div>

            <div className="nss-desc-paragraphs">
              {NSS_CONFIG.description.map((para, index) => (
                <p key={index} className="nss-desc-para">
                  {para}
                </p>
              ))}
            </div>

            <div className="nss-action-row">
              <a
                href={NSS_CONFIG.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nss-action-link"
              >
                VISIT OFFICIAL NSS MJCET PORTAL <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Vision Subsection */}
        <div className="nss-vision-banner">
          <div className="nss-vision-inner">
            <span className="nss-vision-eyebrow">{NSS_CONFIG.vision.title.toUpperCase()}</span>
            <blockquote className="nss-vision-quote">
              &ldquo;{NSS_CONFIG.vision.statement}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* What NSS MJCET Stands For (5 Core Values) */}
        <div className="nss-values-wrapper">
          <div className="nss-values-header">
            <span className="eyebrow">OUR PILLARS</span>
            <h3 className="nss-values-heading">What NSS MJCET Stands For</h3>
          </div>

          <div className="nss-values-grid">
            {NSS_CONFIG.values.map((v) => {
              const IconComp = valueIcons[v.id as keyof typeof valueIcons] || Sparkles;
              return (
                <article key={v.id} className="nss-value-card">
                  <div className="nss-value-icon-box">
                    <IconComp size={22} strokeWidth={1.5} className="nss-value-icon" />
                  </div>
                  <h4 className="nss-value-title">{v.title}</h4>
                  <p className="nss-value-desc">{v.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Core Statement Banner */}
        <div className="nss-closing-banner">
          <div className="nss-closing-triad">
            {NSS_CONFIG.closingStatement.lines.map((line, idx) => (
              <span key={idx} className="nss-closing-line">
                {line}
              </span>
            ))}
          </div>
          <div className="nss-closing-subline">
            <span>{NSS_CONFIG.closingStatement.subline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
