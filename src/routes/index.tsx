import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Menu, X, Users, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import exterior from '@/assets/parliament-exterior.jpg';
import entranceFrame from '@/assets/parliament-entrance-frame.webp';
import leftDoor from '@/assets/door-left.webp';
import rightDoor from '@/assets/door-right.webp';
import chamber from '@/assets/parliament-chamber.jpg';
import vestibule from '@/assets/parliament-vestibule.jpg';
import logo from '@/assets/nss-logo.png';
import { PublicSections, CommunitySections, DevelopersSection } from '@/components/PublicSections';
import { YDS_CONFIG } from '@/config/yds';
import { NssSection } from '@/components/NssSection';
import { ParliamentaryJourney } from '@/components/ParliamentaryJourney';
import { PostponementBanner, AnnouncementLoadError, RegistrationNoticeModal } from '@/components/PostponementBanner';
import { useQuery } from '@tanstack/react-query';
import { getPublicAnnouncement } from '@/functions/announcement';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Youth Democratic Summit (YDS 2026) | NSS MJCET Hyderabad' },
      {
        name: 'description',
        content:
          'Official portal for Youth Democratic Summit (YDS 2026) organised by NSS MJCET, Hyderabad. Experience dynamic parliamentary simulation, policy debates, and youth democratic governance. Register your 5-member team now.',
      },
      { property: 'og:title', content: 'Youth Democratic Summit (YDS 2026) | NSS MJCET Hyderabad' },
      {
        property: 'og:description',
        content:
          'Experience dynamic parliamentary simulation, policy debates, and democratic discourse at YDS 2026 by NSS MJCET. Exactly 5 members per team.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.ydsnssmjcet.in/' },
      { property: 'og:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Youth Democratic Summit (YDS 2026) | NSS MJCET' },
      {
        name: 'twitter:description',
        content:
          'Official team registration and event portal for YDS 2026 organised by NSS MJCET, Hyderabad.',
      },
      { name: 'twitter:image', content: 'https://www.ydsnssmjcet.in/yds-logo.png' },
    ],
    links: [
      { rel: 'canonical', href: 'https://www.ydsnssmjcet.in/' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://www.ydsnssmjcet.in/#website',
              url: 'https://www.ydsnssmjcet.in/',
              name: 'Youth Democratic Summit (YDS 2026)',
              alternateName: ['YDS 2026', 'YDS NSS MJCET', 'Youth Democratic Summit'],
              description: 'Official portal for Youth Democratic Summit (YDS 2026) organised by NSS MJCET, Hyderabad.',
              publisher: {
                '@type': 'Organization',
                name: 'NSS MJCET',
                url: 'https://www.ydsnssmjcet.in',
                logo: 'https://www.ydsnssmjcet.in/yds-logo.png',
              },
            },
            {
              '@type': 'SiteNavigationElement',
              '@id': 'https://www.ydsnssmjcet.in/#sitenav',
              name: [
                'Team Registration',
                'About the Summit',
                'Parliamentary Proceedings',
                'Schedule & Venue',
                'Political Parties',
                'Organising Committee',
                'Summit Sponsors',
                'Election Results',
              ],
              url: [
                'https://www.ydsnssmjcet.in/register',
                'https://www.ydsnssmjcet.in/#about',
                'https://www.ydsnssmjcet.in/#experience',
                'https://www.ydsnssmjcet.in/#schedule',
                'https://www.ydsnssmjcet.in/#parties',
                'https://www.ydsnssmjcet.in/#organisers',
                'https://www.ydsnssmjcet.in/#sponsors',
                'https://www.ydsnssmjcet.in/#results',
              ],
            },
            {
              '@type': 'ItemList',
              name: 'YDS 2026 Summit Sections',
              itemListElement: [
                {
                  '@type': 'SiteNavigationElement',
                  position: 1,
                  name: 'Team Registration',
                  description: 'Official 5-member team registration portal for YDS 2026. Free registration.',
                  url: 'https://www.ydsnssmjcet.in/register',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 2,
                  name: 'About the Summit',
                  description: 'Vision, legislative format, and core ethos of the Youth Democratic Summit by NSS MJCET.',
                  url: 'https://www.ydsnssmjcet.in/#about',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 3,
                  name: 'Parliamentary Proceedings',
                  description: 'Lok Sabha, Rajya Sabha, Question Hour, Bills, Motions, and Coalition floor strategy.',
                  url: 'https://www.ydsnssmjcet.in/#experience',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 4,
                  name: 'Schedule & Venue',
                  description: 'Confirmed event dates, timings, and MJCET Banjara Hills campus venue.',
                  url: 'https://www.ydsnssmjcet.in/#schedule',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 5,
                  name: 'Political Parties',
                  description: '25 fictional parliamentary parties, ideological coalitions, and party manifestos.',
                  url: 'https://www.ydsnssmjcet.in/#parties',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 6,
                  name: 'Organising Committee',
                  description: 'NSS MJCET leadership, student convenors, and organizing committee.',
                  url: 'https://www.ydsnssmjcet.in/#organisers',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 7,
                  name: 'Summit Sponsors',
                  description: 'Official partners and sponsors backing the Youth Democratic Summit 2026.',
                  url: 'https://www.ydsnssmjcet.in/#sponsors',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 8,
                  name: 'Election Results',
                  description: 'Official team acceptance and party allocation results for YDS 2026.',
                  url: 'https://www.ydsnssmjcet.in/#results',
                },
              ],
            },
            {
              '@type': 'Event',
              name: 'Youth Democratic Summit 2026 (YDS 2026)',
              description:
                'A premier parliamentary simulation and youth democracy summit organized by NSS MJCET in Hyderabad.',
              startDate: '2026-10-15T09:00:00+05:30',
              endDate: '2026-10-16T18:00:00+05:30',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              location: {
                '@type': 'Place',
                name: 'Muffakham Jah College of Engineering and Technology (MJCET)',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Mount Pleasant, 8-2-249 to 267, Road No. 3, Banjara Hills',
                  addressLocality: 'Hyderabad',
                  addressRegion: 'Telangana',
                  postalCode: '500034',
                  addressCountry: 'IN',
                },
              },
              image: ['https://www.ydsnssmjcet.in/yds-logo.png'],
              organizer: {
                '@type': 'Organization',
                name: 'NSS MJCET',
                url: 'https://www.ydsnssmjcet.in',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url: 'https://www.ydsnssmjcet.in/register',
                validFrom: '2026-09-01T00:00:00+05:30',
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const span = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const smooth = (value: number, start: number, end: number) => { const n = span(value,start,end); return n*n*(3-2*n); };
const mix = (a: number, b: number, t: number) => a + (b-a)*t;

function Journey() {
  const journey = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = journey.current;
      const layer = scene.current;
      if (!section || !layer) return;
      const progress = clamp(-section.getBoundingClientRect().top / (section.offsetHeight - window.innerHeight));
      const set = (key: string, value: string | number) => layer.style.setProperty(key, String(value));
      const approach = smooth(progress, .04, .37);
      const exteriorOut = smooth(progress, .27, .42);
      const doorwayApproach = smooth(progress, .35, .51);
      const opening = smooth(progress, .51, .74);
      const crossing = smooth(progress, .72, .89);
      const interiorArrival = smooth(progress, .78, .96);
      set('--exterior-scale', mix(1, 3.55, approach).toFixed(3));
      set('--exterior-opacity', (1-exteriorOut).toFixed(3));
      set('--entrance-opacity', smooth(progress,.27,.42) * (1-smooth(progress,.78,.94)));
      set('--entrance-scale', mix(1, 1.24, doorwayApproach) * mix(1, 4.25, crossing));
      set('--door-angle', `${Math.round(112 * opening)}deg`);
      set('--door-shade', (opening*.28).toFixed(3));
      set('--vestibule-scale', mix(1, 1.85, crossing).toFixed(3));
      set('--vestibule-opacity', (smooth(progress,.51,.64) * (1-interiorArrival)).toFixed(3));
      set('--chamber-scale', mix(1.1, 1, interiorArrival).toFixed(3));
      set('--chamber-opacity', interiorArrival.toFixed(3));
      set('--intro-opacity', (1-smooth(progress,.10,.27)).toFixed(3));
      set('--entrance-copy-opacity', (smooth(progress,.43,.50)*(1-smooth(progress,.55,.64))).toFixed(3));
      set('--arrival-opacity', smooth(progress,.89,.98).toFixed(3));
      set('--light-opacity', (opening * (1-crossing) * .1).toFixed(3));
      set('--journey-progress', `${(progress*100).toFixed(1)}%`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return () => { window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <section className="journey" ref={journey} aria-label="Enter the Youth Democratic Summit">
    <div className="scene" ref={scene}>
      <div className="chamber-layer"><img src={chamber} alt="Illustrative parliamentary chamber with tiered seating and central dais" width={1920} height={1088} loading="lazy" /></div>
      <div className="vestibule-layer"><img src={vestibule} alt="" width={1280} height={1536} loading="lazy" /></div>
      <div className="entrance-layer" aria-hidden="true">
        <div className="doorway-depth"><img src={vestibule} alt="" width={1280} height={1536} loading="lazy" /></div>
        <div className="doors">
          <div className="door-half door-left"><img src={leftDoor} alt="" width={208} height={731} /></div>
          <div className="door-half door-right"><img src={rightDoor} alt="" width={209} height={731} /></div>
        </div>
        <img className="entrance-frame" src={entranceFrame} alt="" width={1920} height={1088} loading="lazy" />
        <div className="threshold-light" />
      </div>
      <div className="exterior-layer"><img src={exterior} alt="Parliament of India seen from a long ceremonial approach" width={1920} height={1088} fetchPriority="high" /></div>
      <div className="scene-shade" />
      <div className="intro-copy">
        <span className="eyebrow light-eyebrow">YDS · PRESENTED BY NSS MJCET</span>
        <h1>YOUTH DEMOCRATIC<br/><em>SUMMIT</em></h1>
        <p>Your Voice. Your Parliament. Your Future.</p>
        <span className="scroll-cue">SCROLL TO ENTER <ArrowDown size={17} strokeWidth={1.5}/></span>
      </div>
      <div className="entrance-copy" aria-hidden="true"><span className="eyebrow light-eyebrow">THE ENTRANCE</span><p>Every voice begins<br/>with a first step.</p><span className="scroll-cue">SCROLL TO ENTER <ArrowDown size={17} strokeWidth={1.5}/></span></div>
      <div className="arrival-copy"><span className="eyebrow light-eyebrow">WELCOME INSIDE</span><h2>Enter the parliament.<br/><em>Find your voice.</em></h2><a href="#schedule" className="arrival-link">DISCOVER THE SUMMIT <ArrowRight size={17}/></a></div>
      <div className="journey-counter" aria-hidden="true"><span>01</span><span className="counter-track"><i/></span><span>06</span></div>
      <span className="journey-side" aria-hidden="true">ENTER THE PARLIAMENT · FIND YOUR VOICE</span>
    </div>
  </section>;
}

const parliamentaryProceedings = [
  ['01', 'Lok Sabha Proceedings', '75 Members of Parliament representing collegiate constituents in fierce legislative debate.'],
  ['02', 'Rajya Sabha Proceedings', '50 Members of Parliament scrutinising bills with elder statesman perspective.'],
  ['03', 'Question Hour & Zero Hour', 'Hold the Treasury Benches accountable with sharp, unyielding parliamentary inquiry.'],
  ['04', 'Bills, Motions & Amendments', 'Draft, move, debate and vote on transformative national legislative policy.'],
  ['05', 'Coalition Politics & Floor Strategy', 'Build tactical alliances across the floor to secure parliamentary majority.'],
  ['06', 'Parliamentary Awards & Recognitions', 'Distinguished Parliamentarian, Best Leader of Opposition, and Best Orator accolades.'],
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  // Fetch the persistent announcement from the backend
  const announcementQuery = useQuery({
    queryKey: ['public-announcement'],
    queryFn: () => getPublicAnnouncement(),
    staleTime: 60_000,
    retry: 2,
  });

  const announcementData = announcementQuery.data;
  const announcementError = announcementQuery.isError;
  const isRegOpen = announcementData?.freshRegistrationStatus === 'OPEN';

  const links: [string, string][] = [
    ['NSS MJCET', '#nss'],
    ['Details', '#schedule'],
    ['YDS Structure', '/structure'],
    ['Parties', '#parties'],
    ['Results', '#results'],
    ['Sponsors', '#sponsors'],
    ['Organisers', '#organisers'],
    ['Register', isRegOpen ? '/register' : '#notice'],
  ];

  return <>
    <main id="top"><Journey/>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Youth Democratic Summit, back to top"><img className="brand-logo" src={logo} alt="YDS NSS MJCET logo" width={44} height={44}/><span className="wordmark-title">YDS<br/>BY NSS MJCET</span></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
          {links.map(([label, href]) => {
            if (label === 'Register' && !isRegOpen) {
              return (
                <button
                  key={label}
                  type="button"
                  className="text-xs text-[var(--ivory)] opacity-75 hover:opacity-100 bg-transparent border-0 cursor-pointer p-0"
                  onClick={() => {
                    setMenuOpen(false);
                    setShowNoticeModal(true);
                  }}
                >
                  <span>{label}</span>
                </button>
              );
            }
            return href.startsWith('/') ? (
              <Link to={href} key={label} onClick={() => setMenuOpen(false)}>
                <span>{label}</span>
              </Link>
            ) : (
              <a href={href} key={label} itemProp="url" onClick={() => setMenuOpen(false)}>
                <span itemProp="name">{label}</span>
              </a>
            );
          })}
        </nav>
        {isRegOpen ? (
          <Button asChild variant="outline" className="header-cta">
            <Link to="/register">REGISTER TEAM <ArrowRight size={15}/></Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="header-cta"
            onClick={() => setShowNoticeModal(true)}
          >
            REGISTER NOW <ArrowRight size={15}/>
          </Button>
        )}
        <Button className="mobile-toggle" variant="ghost" size="icon" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25}/> : <Menu size={25}/>}</Button>
      </header>

      {/* Postponement announcement banner — directly below navigation */}
      {announcementError && <AnnouncementLoadError />}
      {!announcementError && announcementData && (
        <PostponementBanner data={announcementData} />
      )}

      <NssSection />

      {/* 2. KEY SUMMIT DETAILS */}
      <section id="schedule" className="section details-section"><div className="section-inner"><div className="section-topline"><span>02 / OFFICIAL EVENT DETAILS</span><span>OCTOBER 2026 · HYDERABAD</span></div><div className="details-layout"><div className="section-heading"><span className="eyebrow">OFFICIAL NOTICE</span><h2>Key Summit<br/><em>details.</em></h2><p>Official venue, dates and structure confirmed by the YDS 2026 Organising Committee.</p></div><div className="detail-list"><article><span>01 / DATES & TIMING</span><h3>{YDS_CONFIG.dates}</h3><p>{YDS_CONFIG.timing} daily. Three intense days of plenary debates and committee sessions.</p></article><article><span>02 / VENUE</span><h3>{YDS_CONFIG.venue}</h3><p>Mount Pleasant, 8-2-249 to 267, Road No. 3, Banjara Hills, Hyderabad, Telangana 500034.</p></article><article><span>03 / REGISTRATION FEE</span><h3>{YDS_CONFIG.registrationFee}</h3><p>Registration for YDS 2026 is completely free of charge. Participation is awarded strictly through competitive selection.</p></article><article><span>04 / STRUCTURE</span><h3>125 MPs across 25 Parties</h3><p>75 Lok Sabha MPs + 50 Rajya Sabha MPs. Each accepted team consists of exactly 5 members (3 Lok Sabha + 2 Rajya Sabha).</p></article></div></div></div></section>

      {/* 3. YDS STRUCTURE PREVIEW SHOWCASE */}
      <section id="structure" className="section structure-preview-section">
        <div className="section-inner">
          <div className="section-topline">
            <span>03 / YDS PARLIAMENTARY STRUCTURE</span>
            <span>THREE DAYS · TWO HOUSES · ONE LEGISLATIVE JOURNEY</span>
          </div>

          <div className="structure-preview-card">
            <div className="structure-preview-content">
              <span className="eyebrow">SUMMIT ARCHITECTURE</span>
              <h2 className="structure-preview-title">
                YDS Structure<br />
                <em>Three Days. Two Houses. One Journey.</em>
              </h2>
              <p className="structure-preview-desc">
                Youth Democratic Summit 2026 is structured as a bicameral parliamentary simulation adapted from Indian
                parliamentary practice. Experience the complete journey of representation — from taking the oath and
                forming the government to Lok Sabha legislative debates, Rajya Sabha scrutiny on the same Bill, and a
                simulated Joint Sitting of all 125 MPs.
              </p>

              <div className="structure-preview-features">
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>125 MPs across 25 Political Parties</span>
                </div>
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>Day 1: Oath &amp; Government Formation</span>
                </div>
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>Day 2: Lok Sabha (75 MPs) Sitting</span>
                </div>
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>Day 3: Rajya Sabha (50 MPs) Scrutiny</span>
                </div>
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>Youth Employment &amp; Skills Bill, 2026</span>
                </div>
                <div className="struct-feature-item">
                  <span className="text-gold">▪</span>
                  <span>Simulated Joint Sitting (Article 108)</span>
                </div>
              </div>

              <Link to="/structure" className="structure-preview-cta-btn">
                EXPLORE COMPLETE YDS STRUCTURE &amp; PROCEDURE <ArrowRight size={16} />
              </Link>
            </div>

            <div className="structure-preview-sidebar">
              <div className="struct-day-pill-card">
                <span className="struct-day-tag">DAY 01 · 15 OCT 2026</span>
                <strong className="struct-day-name">Oath &amp; Government Formation</strong>
                <span className="struct-day-mps">All 125 MPs · Seminar Hall, Block 4</span>
              </div>
              <div className="struct-day-pill-card">
                <span className="struct-day-tag">DAY 02 · 16 OCT 2026</span>
                <strong className="struct-day-name">Lok Sabha Legislative Sitting</strong>
                <span className="struct-day-mps">75 MPs · Question Hour, Bill Debate &amp; Voting</span>
              </div>
              <div className="struct-day-pill-card">
                <span className="struct-day-tag">DAY 03 · 17 OCT 2026</span>
                <strong className="struct-day-name">Rajya Sabha &amp; Joint Sitting</strong>
                <span className="struct-day-mps">50 MPs · Same Bill Scrutiny &amp; 125-MP Joint House</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARTIES, SPONSORS & RESULTS */}
      <PublicSections/>

      <CommunitySections/>
      <section id="register" className="section register-section">
        <div className="section-inner">
          <div className="section-topline">
            <span>11 / REGISTER FOR YDS 2026</span>
            <span>SELECTION-BASED APPLICATION</span>
          </div>
          <div className="register-landing-cta">
            <div className="register-landing-content">
              <span className="eyebrow">REGISTER FOR YDS 2026</span>
              <h2>Youth Democratic<br/><em>Summit.</em></h2>
              <p className="register-landing-desc">
                YDS 2026 follows a selection-based team registration process. Form a team of exactly five members and submit your application for consideration by the YDS Organising Committee.
              </p>
              <div className="register-key-badge">
                <Users size={18} className="text-gold flex-none" />
                <span>Teams must consist of exactly 5 members.</span>
              </div>
              <div className="register-details-grid">
                <div className="register-detail-card">
                  <span className="detail-card-label">DATES</span>
                  <strong>{YDS_CONFIG.dates}</strong>
                </div>
                <div className="register-detail-card">
                  <span className="detail-card-label">VENUE</span>
                  <strong>{YDS_CONFIG.venue}</strong>
                </div>
                <div className="register-detail-card">
                  <span className="detail-card-label">TIMING</span>
                  <strong>{YDS_CONFIG.timing}</strong>
                </div>
                <div className="register-detail-card">
                  <span className="detail-card-label">REGISTRATION</span>
                  <strong className="text-gold font-bold">{YDS_CONFIG.registrationFee}</strong>
                </div>
                <div className="register-detail-card border-gold/40">
                  <span className="detail-card-label text-gold font-semibold">REGISTRATION DEADLINE</span>
                  <strong className="text-gold font-bold">{YDS_CONFIG.registrationDeadline}</strong>
                </div>
                <div className="register-detail-card">
                  <span className="detail-card-label">RESULTS ANNOUNCED</span>
                  <strong>{YDS_CONFIG.resultsDate}</strong>
                </div>
              </div>
              <div className="pt-2">
                {isRegOpen ? (
                  <Button asChild size="lg" className="register-main-btn">
                    <Link to="/register">
                      REGISTER YOUR TEAM <ArrowRight size={18} />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="register-main-btn"
                    onClick={() => setShowNoticeModal(true)}
                  >
                    REGISTER NOW <ArrowRight size={18} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <DevelopersSection/>
    </main>

    {/* Official Announcement / Notice Modal — opens when clicking Register while paused */}
    <RegistrationNoticeModal
      open={showNoticeModal}
      onOpenChange={setShowNoticeModal}
      data={announcementData}
    />

    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div className="footer-col brand-col">
          <a className="footer-title footer-brand" href="#top">
            <img className="brand-logo" src={logo} alt="YDS NSS MJCET logo" width={44} height={44}/>
            YDS 2026 · NSS MJCET
          </a>
          <p className="footer-tagline">
            National Youth Parliament Simulation organised by NSS MJCET, Hyderabad.
          </p>
          <div className="footer-social-wrap">
            <a
              href={YDS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-instagram"
              aria-label="YDS NSS MJCET Instagram"
              title="Follow YDS on Instagram"
            >
              <Instagram size={20} />
            </a>
            <span className="text-xs text-muted-foreground">@yds_nssmjcet</span>
          </div>
        </div>

        <nav className="footer-col" aria-label="Summit Navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
          <h4 className="footer-heading">SUMMIT SECTIONS</h4>
          <ul className="footer-links">
            <li><a href="#nss" itemProp="url"><span itemProp="name">NSS MJCET</span></a></li>
            <li><a href="#about" itemProp="url"><span itemProp="name">About YDS</span></a></li>
            <li><a href="#schedule" itemProp="url"><span itemProp="name">Schedule &amp; Venue</span></a></li>
            <li><a href="#journey" itemProp="url"><span itemProp="name">Parliamentary Journey</span></a></li>
            <li><a href="#lok-sabha" itemProp="url"><span itemProp="name">Lok Sabha Procedure</span></a></li>
            <li><a href="#legislative-journey" itemProp="url"><span itemProp="name">Youth Employment Bill</span></a></li>
            <li><a href="#the-house" itemProp="url"><span itemProp="name">The House Structure</span></a></li>
            <li><a href="#parties" itemProp="url"><span itemProp="name">Political Parties</span></a></li>
            <li><a href="#results" itemProp="url"><span itemProp="name">Election Results</span></a></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Participation and Leadership" itemScope itemType="https://schema.org/SiteNavigationElement">
          <h4 className="footer-heading">PARTICIPATION</h4>
          <ul className="footer-links">
            <li>
              {isRegOpen ? (
                <Link to="/register" itemProp="url"><span itemProp="name">Register Your Team</span></Link>
              ) : (
                <button
                  type="button"
                  className="bg-transparent border-0 p-0 text-inherit font-inherit cursor-pointer hover:underline text-left text-xs"
                  onClick={() => setShowNoticeModal(true)}
                >
                  <span itemProp="name">Register Your Team (Notice)</span>
                </button>
              )}
            </li>
            <li><a href="#organisers" itemProp="url"><span itemProp="name">Organising Committee</span></a></li>
            <li><a href="#sponsors" itemProp="url"><span itemProp="name">Summit Sponsors</span></a></li>
            <li><a href="#developers" itemProp="url"><span itemProp="name">Developers</span></a></li>
          </ul>
        </nav>

        <div className="footer-col">
          <h4 className="footer-heading">VENUE &amp; CONTACT</h4>
          <p className="footer-address">
            Muffakham Jah College of Engineering &amp; Technology<br/>
            Mount Pleasant, Road No. 3, Banjara Hills<br/>
            Hyderabad, Telangana 500034<br/>
            <span className="block mt-2 text-gold">nssmjcet@mjcollege.ac.in</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="section-inner footer-bottom-inner">
          <span>© 2026 YOUTH DEMOCRATIC SUMMIT · NSS MJCET</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  </>;
}
