import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Shield, Github, Linkedin, Users } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getPublicData } from '@/functions/public';
import { YDS_CONFIG } from '@/config/yds';

type PublicDataResult = {
  resultsReleased: boolean;
  results: Array<{
    id: string;
    teamName: string;
    leaderName: string;
    collegeName: string;
    assignedPartyName: string | null;
  }>;
  parties: Array<{
    id: string;
    name: string;
    abbreviation: string | null;
    ideology: string | null;
    logoId: string | null;
    sortOrder: number;
    classification: string | null;
    formationDate: string | null;
    historyDescription: string | null;
  }>;
  sponsors: Array<{
    id: string;
    name: string;
    category: string;
    websiteUrl: string | null;
    logoId: string | null;
    displayOrder: number;
  }>;
  organisers: Array<{
    id: string;
    name: string;
    designation: string;
    photoId: string | null;
    displayOrder: number;
    linkedinUrl: string | null;
  }>;
  coOrganisers: Array<{
    id: string;
    name: string;
    designation: string;
    photoId: string | null;
    displayOrder: number;
    linkedinUrl: string | null;
  }>;
  developers: Array<{
    id: string;
    name: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    displayOrder: number;
  }>;
};

function Heading({
  n,
  tag,
  eyebrow,
  title,
  em,
  lede,
}: {
  n: string;
  tag: string;
  eyebrow: string;
  title: string;
  em: string;
  lede: string;
}) {
  return (
    <>
      <div className="section-topline">
        <span>{n}</span>
        <span>{tag}</span>
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {title}
        <br />
        <em>{em}</em>
      </h2>
      <p className="public-lede">{lede}</p>
    </>
  );
}

/** Helper to build GridFS image URL from image ID */
function gridfsImageUrl(id: string | null | undefined): string | null {
  if (!id) return null;
  return `/api/images/${id}`;
}

export function PublicSections() {
  const publicData = useQuery<PublicDataResult>({
    queryKey: ['public-data'],
    queryFn: () => getPublicData(),
    staleTime: 60_000, // 1 minute
    gcTime: 300_000,
  });

  const data = publicData.data;
  const isReleased = data?.resultsReleased ?? false;
  const results = data?.results ?? [];
  const partyList = data?.parties ?? [];
  const activeSponsors = data?.sponsors ?? [];
  const organisers = data?.organisers ?? [];
  const coOrganisers = data?.coOrganisers ?? [];
  const developers = data?.developers ?? [];
  const partySlots = Array.from({ length: Math.max(25, partyList.length) }, (_, i) => partyList[i] ?? null);

  return (
    <>
      {/* SECTION 04: RESULTS (Gated by Admin Release) */}
      <section id="results" className="section public-section">
        <div className="section-inner">
          <Heading
            n="08 / RESULTS"
            tag="OFFICIAL SELECTION"
            eyebrow="THE RESULTS"
            title="Selected Teams"
            em="& Parliamentary Parties."
            lede={`Teams selected by the YDS Organising Committee. Results announced on ${YDS_CONFIG.resultsDate}.`}
          />

          {!isReleased ? (
            <div className="results-gated-box">
              <Shield className="text-gold mb-4 inline-block" size={36} strokeWidth={1.5} />
              <h3 className="font-serif text-2xl mb-3 text-foreground">Results will be announced soon.</h3>
              <p className="text-sm text-muted-foreground">
                The YDS 2026 selection committee is currently reviewing submitted team applications.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                The official results will be published here on <strong>{YDS_CONFIG.resultsDate}</strong>. Please check back then.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="public-grid">
              {results.map((r) => (
                <article className="result-item" key={r.id}>
                  <span className="result-item-party">{r.assignedPartyName ?? 'PARTY ALLOCATION IN PROGRESS'}</span>
                  <h3 className="result-item-team">{r.teamName}</h3>
                  <p className="result-item-meta">{r.leaderName}</p>
                  <p className="result-item-college">{r.collegeName}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="public-empty">
              <p>Selection results have been released. No teams are currently published.</p>
            </div>
          )}
        </div>
      </section>


      {/* SECTION 09: PARTIES */}
      <section id="parties" className="section public-section alt">
        <div className="section-inner">
          <Heading
            n="09 / PARTIES"
            tag="25 PARLIAMENTARY PARTIES"
            eyebrow="THE HOUSE"
            title="The 25 Parties"
            em="of the Summit."
            lede="Every selected 5-member team represents one of the Summit's 25 fictional parliamentary parties. Click a party to learn more."
          />
          <div className="public-grid">
            {partySlots.map((p, i) => {
              const card = (
                <article className={`party-item${p?.id ? ' party-card-clickable' : ''}`} key={p?.id ?? i}>
                  <div className="party-item-logo">
                    {p?.logoId ? (
                      <img src={gridfsImageUrl(p.logoId)!} alt={`${p.name} logo`} loading="lazy" />
                    ) : (
                      p?.abbreviation ?? String(i + 1).padStart(2, '0')
                    )}
                  </div>
                  <h3>{p?.name ?? `Party ${String(i + 1).padStart(2, '0')}`}</h3>
                  <p>{p?.ideology ?? (p ? '' : 'Fictional Party — To be allocated')}</p>
                  {p?.classification && (
                    <span className="party-card-classification">{p.classification}</span>
                  )}
                </article>
              );

              if (p?.id) {
                return (
                  <Link to="/parties/$partyId" params={{ partyId: p.id }} key={p.id} style={{ display: 'contents' }}>
                    {card}
                  </Link>
                );
              }
              return card;
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: SPONSORS */}
      <section id="sponsors" className="section public-section">
        <div className="section-inner">
          <Heading
            n="10 / SPONSORS & PARTNERS"
            tag="COLLABORATION"
            eyebrow="SUPPORTED BY"
            title="Our Sponsors"
            em="& Institutional Partners."
            lede="The partners and patron institutions who make the Youth Democratic Summit possible."
          />

          {activeSponsors.length > 0 ? (
            <div className="sponsors-grid">
              {activeSponsors.map((s) => (
                <a
                  className="sponsor-card"
                  key={s.id}
                  href={s.websiteUrl ?? undefined}
                  target={s.websiteUrl ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div className="sponsor-card-header">
                    <span className="sponsor-card-badge">{s.category?.toUpperCase() || 'OFFICIAL SPONSOR'}</span>
                    {s.websiteUrl && <span className="sponsor-card-external"><ExternalLink size={13} /></span>}
                  </div>
                  <div className="sponsor-card-logo-box">
                    {s.logoId ? (
                      <img
                        src={gridfsImageUrl(s.logoId)!}
                        alt={`${s.name} logo`}
                        className="sponsor-card-logo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="sponsor-card-text-fallback">{s.name}</div>
                    )}
                  </div>
                  <div className="sponsor-card-footer">
                    <h3 className="sponsor-card-name">{s.name}</h3>
                    {s.websiteUrl ? (
                      <span className="sponsor-card-action">Visit Website ↗</span>
                    ) : (
                      <span className="sponsor-card-partner-label">Official Summit Partner</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="sponsors-grid">
              {[
                { name: 'MJCET Hyderabad', tier: 'Host Institution' },
                { name: 'NSS MJCET Chapter', tier: 'Organising Unit' },
                { name: 'Patrons & Partners', tier: 'Associate Partner' },
                { name: 'Community Media', tier: 'Outreach Partner' },
              ].map((item, idx) => (
                <article className="sponsor-card" key={idx}>
                  <div className="sponsor-card-header">
                    <span className="sponsor-card-badge">{item.tier.toUpperCase()}</span>
                  </div>
                  <div className="sponsor-card-logo-box">
                    <div className="sponsor-card-text-fallback">{item.name}</div>
                  </div>
                  <div className="sponsor-card-footer">
                    <h3 className="sponsor-card-name">{item.name}</h3>
                    <span className="sponsor-card-partner-label">Official Partner for YDS 2026</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function CommunitySections() {
  const publicData = useQuery<PublicDataResult>({
    queryKey: ['public-data'],
    queryFn: () => getPublicData(),
    staleTime: 60_000,
    gcTime: 300_000,
  });

  const data = publicData.data;
  const organisers = data?.organisers ?? [];
  const coOrganisers = data?.coOrganisers ?? [];

  return (
    <>
      {/* SECTION 12: ORGANISERS */}
      {organisers.length > 0 && (
        <section id="organisers" className="section public-section alt">
          <div className="section-inner">
            <Heading
              n="12 / ORGANISERS"
              tag="NSS MJCET · YDS 2026"
              eyebrow="ORGANISING COMMITTEE"
              title="The Organisers"
              em="behind the Summit."
              lede="The dedicated team behind Youth Democratic Summit 2026, organised under the National Service Scheme at MJCET, Hyderabad."
            />
            <div className="people-grid">
              {organisers.map((o) => (
                <div className="people-card" key={o.id}>
                  <div className="people-card-photo-wrap">
                    {o.photoId ? (
                      <img
                        src={gridfsImageUrl(o.photoId)!}
                        alt={o.name}
                        className="people-card-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="people-card-photo-placeholder">
                        <Users size={36} strokeWidth={1} />
                      </div>
                    )}
                    <div className="people-card-overlay">
                      <p className="people-card-role">{o.designation}</p>
                      <h3 className="people-card-name">{o.name}</h3>
                    </div>
                    {o.linkedinUrl && (
                      <a
                        href={o.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="people-card-linkedin"
                        aria-label={`${o.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={16} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 13: CO-ORGANISERS */}
      {coOrganisers.length > 0 && (
        <section id="co-organisers" className="section public-section">
          <div className="section-inner">
            <Heading
              n="13 / CO-ORGANISERS"
              tag="NSS MJCET · YDS 2026"
              eyebrow="CO-ORGANISING COMMITTEE"
              title="The Co-Organisers"
              em="& Support Team."
              lede="The co-organisers and support committee members who make Youth Democratic Summit 2026 a reality."
            />
            <div className="people-grid">
              {coOrganisers.map((o) => (
                <div className="people-card" key={o.id}>
                  <div className="people-card-photo-wrap">
                    {o.photoId ? (
                      <img
                        src={gridfsImageUrl(o.photoId)!}
                        alt={o.name}
                        className="people-card-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="people-card-photo-placeholder">
                        <Users size={36} strokeWidth={1} />
                      </div>
                    )}
                    <div className="people-card-overlay">
                      <p className="people-card-role">{o.designation}</p>
                      <h3 className="people-card-name">{o.name}</h3>
                    </div>
                    {o.linkedinUrl && (
                      <a
                        href={o.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="people-card-linkedin"
                        aria-label={`${o.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={16} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function DevelopersSection() {
  const publicData = useQuery<PublicDataResult>({
    queryKey: ['public-data'],
    queryFn: () => getPublicData(),
    staleTime: 60_000,
    gcTime: 300_000,
  });

  const developers = publicData.data?.developers ?? [];

  if (developers.length === 0) return null;

  return (
    <section id="developers" className="section public-section alt">
      <div className="section-inner">
        <div className="section-topline">
          <span>14 / DEVELOPERS</span>
          <span>BUILT WITH CARE</span>
        </div>
        <span className="eyebrow">DEVELOPED BY</span>
        <h2>The Developers<br /><em>of YDS 2026.</em></h2>
        <div className="developers-grid">
          {developers.map((dev) => (
            <div className="developer-card" key={dev.id}>
              <h3 className="developer-name">{dev.name}</h3>
              <div className="developer-links">
                {dev.githubUrl ? (
                  <a href={dev.githubUrl} target="_blank" rel="noreferrer" className="developer-link">
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <span className="developer-link-placeholder"><Github size={16} /> GitHub</span>
                )}
                {dev.linkedinUrl ? (
                  <a href={dev.linkedinUrl} target="_blank" rel="noreferrer" className="developer-link">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                ) : (
                  <span className="developer-link-placeholder"><Linkedin size={16} /> LinkedIn</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
