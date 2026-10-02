import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Flag, Calendar, Users, Shield, Instagram } from 'lucide-react';
import { getPartyById } from '@/functions/public';
import { YDS_CONFIG } from '@/config/yds';
import logo from '@/assets/nss-logo.png';

export const Route = createFileRoute('/parties/$partyId')({
  head: () => ({
    meta: [
      { title: 'Parliamentary Party Dossier — Youth Democratic Summit 2026 | NSS MJCET' },
      {
        name: 'description',
        content:
          'Official parliamentary party details, manifesto, ideology, and seat allocation for the Youth Democratic Summit (YDS 2026) organised by NSS MJCET, Hyderabad.',
      },
      { property: 'og:title', content: 'Parliamentary Party Dossier — YDS 2026 | NSS MJCET' },
      {
        property: 'og:description',
        content: 'Official party details and manifesto for the Youth Democratic Summit 2026.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
    ],
  }),
  component: PartyDetailPage,
});

const CLASSIFICATION_COLOURS: Record<string, string> = {
  'I.N.D.I.A': '#138808',
  'INC': '#138808', // legacy fallback
  'NDA': '#FF9933',
  'FEDERAL BLOCK': '#000080',
  'INDEPENDENT': '#6b7280',
};

function PartyDetailPage() {
  const { partyId } = Route.useParams();
  const navigate = useNavigate();

  function handleBackToYds() {
    const saved = sessionStorage.getItem('yds-scroll');
    navigate({ to: '/' }).then(() => {
      if (saved) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
        });
      }
    });
  }

  const partyQuery = useQuery({
    queryKey: ['party', partyId],
    queryFn: () => getPartyById({ data: { id: partyId } }),
    staleTime: 120_000,
  });

  const party = partyQuery.data;

  if (partyQuery.isLoading) {
    return (
      <div className="party-detail-page">
        <header className="register-page-header">
          <div className="section-inner">
            <button onClick={handleBackToYds} className="back-to-yds-btn">
              <ArrowLeft size={16} />
              <span>BACK TO YDS</span>
            </button>
            <Link to="/" className="wordmark">
              <img className="brand-logo" src={logo} alt="NSS MJCET Logo" width={38} height={38} />
              <span className="wordmark-title hidden sm:inline-block">YDS 2026<br />BY NSS MJCET</span>
            </Link>
          </div>
        </header>
        <main className="section-inner" style={{ padding: '80px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.15em', fontWeight: 700 }}>LOADING PARTY DATA…</p>
        </main>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="party-detail-page">
        <header className="register-page-header">
          <div className="section-inner">
            <button onClick={handleBackToYds} className="back-to-yds-btn">
              <ArrowLeft size={16} />
              <span>BACK TO YDS</span>
            </button>
          </div>
        </header>
        <main className="section-inner" style={{ padding: '80px 0', textAlign: 'center' }}>
          <p>Party not found.</p>
          <Link to="/" className="text-link" style={{ marginTop: 24, display: 'inline-block' }}>← Return to Homepage</Link>
        </main>
      </div>
    );
  }

  const classificationColor = party.classification ? (CLASSIFICATION_COLOURS[party.classification] ?? '#6b7280') : '#6b7280';

  return (
    <div className="party-detail-page">
      {/* Header */}
      <header className="register-page-header">
        <div className="section-inner">
          <button onClick={handleBackToYds} className="back-to-yds-btn" aria-label="Return to YDS Homepage">
            <ArrowLeft size={16} />
            <span>BACK TO YDS</span>
          </button>
          <Link to="/" className="wordmark">
            <img className="brand-logo" src={logo} alt="NSS MJCET Logo" width={38} height={38} />
            <span className="wordmark-title hidden sm:inline-block">YDS 2026<br />BY NSS MJCET</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="party-detail-hero">
          <div className="section-inner">
            <div className="section-topline">
              <span>PARLIAMENTARY PARTY · YDS 2026</span>
              <span>FICTION · SIMULATION</span>
            </div>
            <div className="party-detail-hero-layout">
              {/* Logo */}
              <div className="party-detail-logo-wrap">
                {party.logoId ? (
                  <img
                    src={`/api/images/${party.logoId}`}
                    alt={`${party.name} logo`}
                    className="party-detail-logo-img"
                  />
                ) : (
                  <div className="party-detail-logo-placeholder">
                    {party.abbreviation ?? party.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="party-detail-hero-info">
                {party.classification && (
                  <span
                    className="party-classification-badge"
                    style={{ background: classificationColor + '22', color: classificationColor, borderColor: classificationColor + '55' }}
                  >
                    <Flag size={11} />
                    {party.classification}
                  </span>
                )}
                <span className="eyebrow" style={{ marginTop: 12 }}>PARLIAMENTARY PARTY</span>
                <h1 className="party-detail-name">{party.name}</h1>
                {party.abbreviation && (
                  <p className="party-detail-abbr">{party.abbreviation}</p>
                )}
                <div className="party-detail-meta">
                  {party.formationDate && (
                    <span className="party-detail-meta-item">
                      <Calendar size={14} />
                      Formed: {party.formationDate}
                    </span>
                  )}
                  {party.ideology && (
                    <span className="party-detail-meta-item">
                      <Shield size={14} />
                      {party.ideology}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="party-detail-body">
          <div className="section-inner">
            <div className="party-detail-body-grid">
              {/* Description */}
              {party.historyDescription && (
                <div className="party-detail-card">
                  <span className="eyebrow">ABOUT THE PARTY</span>
                  <p className="party-detail-text">
                    {party.historyDescription.replace(/\r?\n/g, ' ').replace(/\s{2,}/g, ' ').trim()}
                  </p>
                </div>
              )}

              {/* Assignment */}
              <div className="party-detail-card">
                <span className="eyebrow">PARLIAMENTARY TEAM</span>
                {party.resultsReleased && party.assignedTeam ? (
                  <div className="party-detail-team">
                    <Users size={18} className="text-gold" />
                    <div>
                      <p className="party-detail-team-name">{party.assignedTeam.teamName}</p>
                      <p className="party-detail-team-meta">{party.assignedTeam.leaderName}</p>
                      <p className="party-detail-team-meta">{party.assignedTeam.collegeName}</p>
                    </div>
                  </div>
                ) : (
                  <div className="party-detail-pending">
                    <div className="party-detail-pending-icon">
                      <Shield size={28} strokeWidth={1.2} />
                    </div>
                    <p className="party-detail-pending-title">
                      {party.resultsReleased ? 'No Team Assigned' : 'Pending Allocation'}
                    </p>
                    <p className="party-detail-pending-sub">
                      {party.resultsReleased
                        ? 'No team has been assigned to this party yet.'
                        : 'Team allocation will be revealed when results are officially released.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section-inner">
          <button
            onClick={handleBackToYds}
            className="footer-title footer-brand"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 12 }}
          >
            <img className="brand-logo" src={logo} alt="NSS MJCET logo" width={40} height={40} />
            YOUTH DEMOCRATIC SUMMIT 2026 · NSS MJCET
          </button>
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
            <button
              onClick={handleBackToYds}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.05em' }}
            >
              ← RETURN TO HOMEPAGE
            </button>
          </div>
          <span>ENTER THE PARLIAMENT. FIND YOUR VOICE.</span>
        </div>
      </footer>
    </div>
  );
}
