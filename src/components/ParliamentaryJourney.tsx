import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Gavel,
  ScrollText,
  FileText,
  ShieldAlert,
  Scale,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Info,
  PenTool,
} from 'lucide-react';
import { PARLIAMENTARY_JOURNEY_CONFIG, DayCard } from '@/config/parliamentaryJourney';

export function ParliamentaryJourney() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedFlowStep, setSelectedFlowStep] = useState<number | null>(null);
  const [selectedRsStep, setSelectedRsStep] = useState<number | null>(null);
  const [activeTimelineStage, setActiveTimelineStage] = useState<string>('intro');

  const {
    sectionTitle,
    subtitle,
    supportingText,
    coreRuleQuote,
    shortOverview,
    threeDays,
    lokSabhaProcedure,
    centralBill,
    rajyaSabhaProcedure,
    jointSitting,
    houseOfficials,
    participantJourney,
  } = PARLIAMENTARY_JOURNEY_CONFIG;

  const currentDay: DayCard = threeDays[activeDayIndex];

  return (
    <>
      {/* =========================================================================
          SECTION 4: THE YDS PARLIAMENTARY JOURNEY (THREE-DAY STRUCTURE)
          ========================================================================= */}
      <section id="journey" className="section journey-overview-section" aria-label="Summit Journey">
        <div className="section-inner">
          <div className="section-topline">
            <span>04 / THE THREE-DAY SIMULATION</span>
            <span>THREE DAYS · TWO HOUSES · ONE JOURNEY</span>
          </div>

          <div className="journey-head">
            <span className="eyebrow">PARLIAMENTARY ARCHITECTURE</span>
            <h2 className="journey-main-title">
              {sectionTitle}
              <br />
              <em>{subtitle}</em>
            </h2>
            <p className="journey-support-text">{supportingText}</p>

            <div className="journey-rule-callout">
              <span className="journey-rule-badge">SIMULATION FRAMEWORK</span>
              <p className="journey-rule-quote">&ldquo;{coreRuleQuote}&rdquo;</p>
            </div>
          </div>

          {/* Quick Concise Overview (For Fast Reading) */}
          <div className="concise-overview-box">
            <div className="concise-header">
              <Sparkles size={16} className="text-gold" />
              <span className="concise-title">{shortOverview.heading}</span>
            </div>
            <div className="concise-grid">
              {shortOverview.days.map((item, idx) => (
                <div key={idx} className="concise-card">
                  <strong className="concise-day">{item.day}</strong>
                  <p className="concise-desc">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Day Navigation Tabs */}
          <div className="day-selector-tabs" role="tablist">
            {threeDays.map((d, idx) => (
              <button
                key={d.dayNumber}
                type="button"
                role="tab"
                aria-selected={activeDayIndex === idx}
                className={`day-tab-btn ${activeDayIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveDayIndex(idx)}
              >
                <span className="tab-day-num">{d.dayNumber}</span>
                <span className="tab-day-title">{d.title.split('&')[0].trim()}</span>
                <span className="tab-day-badge">{d.badge}</span>
              </button>
            ))}
          </div>

          {/* Active Day Detail Display */}
          <div className="day-detail-panel">
            <div className="day-detail-header">
              <div>
                <div className="day-badge-row">
                  <span className="day-hero-badge">{currentDay.badge}</span>
                  <span className="day-mps-badge">
                    <Users size={13} className="inline mr-1" />
                    {currentDay.mpsCount}
                  </span>
                </div>
                <h3 className="day-title-large">{currentDay.title}</h3>
                <p className="day-subtitle">{currentDay.subtitle}</p>
              </div>

              <div className="day-meta-pill-group">
                <div className="day-meta-pill">
                  <Calendar size={14} className="text-gold" />
                  <span>{currentDay.date}</span>
                </div>
                <div className="day-meta-pill">
                  <MapPin size={14} className="text-gold" />
                  <span>{currentDay.venue}</span>
                </div>
                <div className="day-meta-pill">
                  <Clock size={14} className="text-gold" />
                  <span>{currentDay.time}</span>
                </div>
              </div>
            </div>

            <div className="day-body-grid">
              {/* Left Column: Purpose & Significance */}
              <div className="day-text-col">
                <div className="day-purpose-card">
                  <h4 className="day-subheading">SESSION PURPOSE &amp; ROLE</h4>
                  <p className="day-purpose-p">{currentDay.purpose}</p>
                </div>

                <div className="day-significance-card">
                  <h4 className="day-subheading">PARLIAMENTARY SIGNIFICANCE</h4>
                  <p className="day-significance-p">{currentDay.parliamentarySignificance}</p>
                </div>

                <div className="day-takeaways-card">
                  <h4 className="day-subheading">KEY PARTICIPANT FOCUS</h4>
                  <div className="day-takeaway-pills">
                    {currentDay.takeaways.map((item, idx) => (
                      <span key={idx} className="day-takeaway-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Main Activities */}
              <div className="day-activities-col">
                <h4 className="day-subheading">SCHEDULED PROCEEDINGS &amp; ACTIVITIES</h4>
                <ul className="day-activity-list">
                  {currentDay.mainActivities.map((act, idx) => (
                    <li key={idx} className="day-activity-item">
                      <span className="activity-index">{(idx + 1).toString().padStart(2, '0')}</span>
                      <p className="activity-text">{act}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LOK SABHA PARLIAMENTARY STRUCTURE & SITTING FLOW
          ========================================================================= */}
      <section id="lok-sabha" className="section lok-sabha-section" aria-label="Lok Sabha Structure">
        <div className="section-inner">
          <div className="section-topline">
            <span>05 / LOK SABHA PROCEDURE</span>
            <span>75 MPS · POPULAR HOUSE DEBATE</span>
          </div>

          <div className="section-heading">
            <span className="eyebrow" style={{ color: '#8c6b23' }}>CHAMBER ORDER OF BUSINESS</span>
            <h2 style={{ color: '#1a1f2e' }}>
              Lok Sabha Structure
              <br />
              <em style={{ color: '#1a1f2e' }}>&amp; Parliamentary Procedure.</em>
            </h2>
            <p className="public-lede" style={{ color: '#4a5568' }}>
              Structured sequence inspired by Indian parliamentary practice, adapted for the 75 Lok Sabha MPs of YDS 2026.
            </p>
          </div>

          {/* Sequential Order of Business Grid */}
          <div className="procedure-flow-grid">
            {lokSabhaProcedure.flow.map((step, idx) => (
              <div
                key={step.step}
                className={`flow-card ${selectedFlowStep === idx ? 'flow-card-active' : ''}`}
                onClick={() => setSelectedFlowStep(selectedFlowStep === idx ? null : idx)}
              >
                <div className="flow-card-top">
                  <span className="flow-step-num">{step.step}</span>
                  <ChevronRight size={14} className="flow-chevron" />
                </div>
                <h4 className="flow-step-title">{step.title}</h4>
                <p className="flow-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* In-Depth Spotlight: Question Hour & Zero Hour */}
          <div className="parliament-spotlight-grid">
            {/* Question Hour Box */}
            <div className="spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-badge">FIRST HOUR OF THE SITTING</span>
                <h3 className="spotlight-title">Question Hour &amp; Supplementary Questions</h3>
              </div>
              <p className="spotlight-desc">
                MPs hold Government Ministers to account on matters of national importance. Following the primary answer,
                sharp supplementary questions allow members to cross-examine and verify policy commitments.
              </p>

              {/* Supplementary Question Chain */}
              <div className="supp-question-chain">
                <div className="supp-step">
                  <span className="supp-label">01 / PRIMARY QUESTION</span>
                  <p>{lokSabhaProcedure.supplementaryLogic.primary}</p>
                </div>
                <div className="supp-divider">↓</div>
                <div className="supp-step">
                  <span className="supp-label">02 / MINISTERIAL ANSWER</span>
                  <p>{lokSabhaProcedure.supplementaryLogic.answer}</p>
                </div>
                <div className="supp-divider">↓</div>
                <div className="supp-step">
                  <span className="supp-label">03 / SUPPLEMENTARY QUESTION</span>
                  <p>{lokSabhaProcedure.supplementaryLogic.supp}</p>
                </div>
                <div className="supp-divider">↓</div>
                <div className="supp-step">
                  <span className="supp-label">04 / IMMEDIATE RESPONSE</span>
                  <p>{lokSabhaProcedure.supplementaryLogic.response}</p>
                </div>
              </div>

              {/* Question Portfolios */}
              <div className="topics-wrap">
                <span className="topics-label">KEY EXAMINATION PORTFOLIOS:</span>
                <div className="topics-tags">
                  {lokSabhaProcedure.questionHourTopics.map((t, idx) => (
                    <span key={idx} className="topic-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Zero Hour Box */}
            <div className="spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-badge">FOLLOWING QUESTION HOUR</span>
                <h3 className="spotlight-title">Zero Hour &amp; Legislative Transition</h3>
              </div>
              <p className="spotlight-desc">{lokSabhaProcedure.zeroHourExplanation}</p>

              <div className="zero-hour-topics-box">
                <h4 className="zero-hour-subheading">URGENT MATTERS ADMITTED UNDER YDS RULES:</h4>
                <ul className="zero-hour-list">
                  <li>Youth Employment Deficits &amp; Regional Disparities</li>
                  <li>Higher Education Curriculum Relevance &amp; Fees</li>
                  <li>Campus Placements &amp; Apprentice Protections</li>
                  <li>Artificial Intelligence Disruption in Junior Workforce</li>
                  <li>Public Infrastructure &amp; Student Mental Wellbeing</li>
                  <li>Emerging National Challenges &amp; Civic Governance</li>
                </ul>
              </div>

              <div className="bill-transition-notice">
                <span className="transition-label">TRANSITION TO LEGISLATIVE BUSINESS:</span>
                <p>
                  Upon conclusion of Zero Hour, the Speaker directs the House to the listed legislative business:
                  the introduction of the central summit bill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: RAJYA SABHA PARLIAMENTARY STRUCTURE & SITTING FLOW
          ========================================================================= */}
      <section id="rajya-sabha" className="section rajya-sabha-section" aria-label="Rajya Sabha Structure">
        <div className="section-inner">
          <div className="section-topline">
            <span>CHAMBER ORDER OF BUSINESS · ELDER SCRUTINY</span>
            <span>50 MPS · COUNCIL OF STATES</span>
          </div>

          <div className="section-heading">
            <span className="eyebrow" style={{ color: '#8c6b23' }}>SECOND CHAMBER PROCEDURE</span>
            <h2 style={{ color: '#1a1f2e' }}>
              Rajya Sabha Structure
              <br />
              <em style={{ color: '#1a1f2e' }}>&amp; Bicameral Legislative Scrutiny.</em>
            </h2>
            <p className="public-lede" style={{ color: '#4a5568' }}>
              Structured sequence for the 50 Rajya Sabha MPs of YDS 2026, dedicated to federal scrutiny, policy durability, and clause revisions on the same legislation.
            </p>
          </div>

          {/* Continuity Guarantee Callout */}
          <div className="rs-continuity-box">
            <div className="rs-continuity-badge">BICAMERAL CONTINUITY RULE</div>
            <p className="rs-continuity-text">
              &ldquo;{rajyaSabhaProcedure.continuityNote}&rdquo;
            </p>
          </div>

          {/* Sequential Order of Business Grid for Rajya Sabha */}
          <div className="procedure-flow-grid">
            {rajyaSabhaProcedure.flow.map((step, idx) => (
              <div
                key={step.step}
                className={`flow-card ${selectedRsStep === idx ? 'flow-card-active' : ''}`}
                onClick={() => setSelectedRsStep(selectedRsStep === idx ? null : idx)}
              >
                <div className="flow-card-top">
                  <span className="flow-step-num">{step.step}</span>
                  <ChevronRight size={14} className="flow-chevron" />
                </div>
                <h4 className="flow-step-title">{step.title}</h4>
                <p className="flow-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* In-Depth Spotlight: Scrutiny Pillars & 3 Possible Legislative Outcomes */}
          <div className="parliament-spotlight-grid">
            {/* Scrutiny Pillars Card */}
            <div className="spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-badge">ELDER CHAMBER OVERSIGHT</span>
                <h3 className="spotlight-title">Pillars of Rajya Sabha Scrutiny</h3>
              </div>
              <p className="spotlight-desc">
                The Council of States examines legislation through constitutional wisdom, federal balance, and long-term generational viability rather than hasty popular debate.
              </p>

              <div className="rs-pillars-list">
                {rajyaSabhaProcedure.scrutinyPillars.map((p, idx) => (
                  <div key={idx} className="rs-pillar-item">
                    <strong className="rs-pillar-title">0{idx + 1}. {p.title}</strong>
                    <p className="rs-pillar-desc">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="chairperson-spotlight-box">
                <span className="topics-label">PRESIDING DIGNITY:</span>
                <p className="chairperson-desc">{rajyaSabhaProcedure.chairpersonRole.desc}</p>
              </div>
            </div>

            {/* Three Legislative Outcomes & Deadlock Trigger */}
            <div className="spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-badge">DAY THREE OUTCOME</span>
                <h3 className="spotlight-title">Three Possible Legislative Outcomes</h3>
              </div>
              <p className="spotlight-desc">
                Upon concluding debate and voting, the YDS Secretariat officially records one of three statutory determinations:
              </p>

              <div className="rs-outcomes-container">
                {rajyaSabhaProcedure.outcomes.map((out, idx) => (
                  <div key={idx} className={`rs-outcome-card outcome-${out.type}`}>
                    <div className="rs-outcome-header">
                      <span className="rs-outcome-badge">{out.status}</span>
                      <strong className="rs-outcome-label">{out.label}</strong>
                    </div>
                    <p className="rs-outcome-desc">{out.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bill-transition-notice">
                <span className="transition-label">SIMULATED JOINT SITTING TRIGGER:</span>
                <p>
                  If the Rajya Sabha rejects the Bill or the two Houses reach an irreconcilable deadlock on amendments,
                  the simulation qualifies for convening a simulated Joint Sitting under Article 108 model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: THE CENTRAL BILL & LEGISLATIVE JOURNEY (INTERACTIVE TIMELINE)
          ========================================================================= */}
      <section id="legislative-journey" className="section legislative-section" aria-label="Legislative Journey">
        <div className="section-inner">
          <div className="section-topline">
            <span>06 / THE LEGISLATIVE JOURNEY</span>
            <span>THE BILL · BICAMERAL SCRUTINY · JOINT SITTING</span>
          </div>

          <div className="section-heading">
            <span className="eyebrow">CENTRAL LEGISLATION</span>
            <h2>
              The Central Bill
              <br />
              <em>&amp; The Legislative Journey.</em>
            </h2>
            <p className="public-lede">
              The statutory centerpiece of YDS 2026. Follow the passage of the legislation from Lok Sabha debate to Rajya
              Sabha scrutiny and the simulated Joint Sitting contingency.
            </p>
          </div>

          {/* Central Bill Specification Card */}
          <div className="central-bill-card">
            <div className="bill-card-meta">
              <span className="bill-tag">OFFICIAL SIMULATION BILL</span>
              <span className="bill-short-tag">{centralBill.shortTitle}</span>
            </div>

            <h3 className="bill-official-title">{centralBill.officialTitle}</h3>

            <div className="bill-core-question-box">
              <span className="core-q-label">CENTRAL POLICY QUESTION</span>
              <p className="core-q-text">&ldquo;{centralBill.centralQuestion}&rdquo;</p>
            </div>

            {/* Bill Pillars */}
            <div className="bill-pillars-grid">
              {centralBill.pillars.map((p, idx) => (
                <div key={idx} className="bill-pillar-item">
                  <div className="pillar-num">{`0${idx + 1}`}</div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Legal Panel & Amendment Scrutiny */}
            <div className="bill-amendment-strip">
              <div className="legal-panel-callout">
                <div className="legal-panel-header">
                  <Scale size={20} className="text-gold" />
                  <strong>{centralBill.legalPanel.title} ({centralBill.legalPanel.size})</strong>
                </div>
                <p className="legal-panel-desc">{centralBill.legalPanel.description}</p>
              </div>

              <div className="amendment-areas-wrap">
                <span className="amendments-label">PERMISSIBLE AMENDMENT DOMAINS:</span>
                <div className="amendment-tags-cloud">
                  {centralBill.amendmentAreas.map((area, idx) => (
                    <span key={idx} className="amendment-chip">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              INTERACTIVE BICAMERAL TIMELINE (SECTION 33 SPECIFICATION)
              ===================================================================== */}
          <div className="visual-timeline-container">
            <div className="timeline-header-bar">
              <div>
                <span className="eyebrow">BICAMERAL CONTINUITY MAP</span>
                <h3 className="timeline-title">The Legislative Journey: From Introduction to Passage</h3>
              </div>
              <span className="timeline-instruction">
                <Info size={14} className="inline mr-1" />
                Select any stage to inspect parliamentary rules
              </span>
            </div>

            {/* Desktop & Tablet Interactive Diagram */}
            <div className="interactive-journey-diagram">
              {/* STAGE 1: LOK SABHA */}
              <div
                className={`diagram-stage-box stage-ls ${activeTimelineStage === 'ls' ? 'active-stage' : ''}`}
                onClick={() => setActiveTimelineStage('ls')}
              >
                <div className="stage-badge">STAGE 01 · DAY 02</div>
                <h4 className="stage-title">LOK SABHA (75 MPs)</h4>
                <p className="stage-sub">Bill Introduction &amp; Floor Debate</p>
                <ul className="stage-bullets">
                  <li>Formal Introduction by Minister</li>
                  <li>Clause-by-Clause Debate</li>
                  <li>Amendments Vetted by Legal Panel</li>
                  <li>Ministerial Defense</li>
                </ul>
              </div>

              <div className="diagram-connector-arrow">
                <span className="connector-line"></span>
                <span className="connector-text">LOK SABHA VOTE</span>
                <span className="connector-arrowhead">↓</span>
              </div>

              {/* BRANCH 1: PASSED vs NOT PASSED */}
              <div className="diagram-branch-row">
                <div
                  className={`branch-box branch-passed ${activeTimelineStage === 'ls-passed' ? 'active-stage' : ''}`}
                  onClick={() => setActiveTimelineStage('ls-passed')}
                >
                  <div className="branch-status">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <strong>PASSED BY LOK SABHA</strong>
                  </div>
                  <p className="branch-note">Transmitted to Rajya Sabha for Second Chamber Scrutiny</p>
                </div>

                <div
                  className={`branch-box branch-failed ${activeTimelineStage === 'ls-failed' ? 'active-stage' : ''}`}
                  onClick={() => setActiveTimelineStage('ls-failed')}
                >
                  <div className="branch-status">
                    <XCircle size={16} className="text-rose-400" />
                    <strong>NOT PASSED BY LOK SABHA</strong>
                  </div>
                  <p className="branch-note">Legislative journey ends. Bill is not transmitted.</p>
                </div>
              </div>

              <div className="diagram-connector-arrow">
                <span className="connector-line"></span>
                <span className="connector-text">TRANSMITTAL OF SAME BILL</span>
                <span className="connector-arrowhead">↓</span>
              </div>

              {/* STAGE 2: RAJYA SABHA */}
              <div
                className={`diagram-stage-box stage-rs ${activeTimelineStage === 'rs' ? 'active-stage' : ''}`}
                onClick={() => setActiveTimelineStage('rs')}
              >
                <div className="stage-badge">STAGE 02 · DAY 03</div>
                <h4 className="stage-title">RAJYA SABHA (50 MPs)</h4>
                <p className="stage-sub">Same Youth Employment Bill, 2026</p>
                <ul className="stage-bullets">
                  <li>Does NOT start with a new bill</li>
                  <li>Elder House Policy Scrutiny</li>
                  <li>Federal &amp; Long-Term Evaluation</li>
                  <li>Proposed Upper House Amendments</li>
                </ul>
              </div>

              <div className="diagram-connector-arrow">
                <span className="connector-line"></span>
                <span className="connector-text">RAJYA SABHA VOTE</span>
                <span className="connector-arrowhead">↓</span>
              </div>

              {/* BRANCH 2: PASSED BY BOTH vs DEADLOCK TRIGGER */}
              <div className="diagram-branch-row">
                <div
                  className={`branch-box branch-final-passed ${activeTimelineStage === 'both-passed' ? 'active-stage' : ''}`}
                  onClick={() => setActiveTimelineStage('both-passed')}
                >
                  <div className="branch-status">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <strong>BILL PASSED BY BOTH HOUSES</strong>
                  </div>
                  <p className="branch-note">Simulation successfully concludes with enacted policy.</p>
                </div>

                <div
                  className={`branch-box branch-deadlock ${activeTimelineStage === 'deadlock' ? 'active-stage' : ''}`}
                  onClick={() => setActiveTimelineStage('deadlock')}
                >
                  <div className="branch-status">
                    <HelpCircle size={16} className="text-amber-400" />
                    <strong>REJECTED OR DISAGREEMENT ON AMENDMENTS</strong>
                  </div>
                  <p className="branch-note">Qualifying deadlock under YDS simulation rules.</p>
                </div>
              </div>

              <div className="diagram-connector-arrow">
                <span className="connector-line"></span>
                <span className="connector-text">ORGANISING COMMITTEE MAY CONVENE</span>
                <span className="connector-arrowhead">↓</span>
              </div>

              {/* STAGE 3: JOINT SITTING */}
              <div
                className={`diagram-stage-box stage-joint ${activeTimelineStage === 'joint' ? 'active-stage' : ''}`}
                onClick={() => setActiveTimelineStage('joint')}
              >
                <div className="stage-badge">CONTINGENCY STAGE · ARTICLE 108 MODEL</div>
                <h4 className="stage-title">YDS JOINT SITTING (ALL 125 MPs)</h4>
                <p className="stage-sub">75 Lok Sabha MPs + 50 Rajya Sabha MPs Presided by Speaker</p>
                <p className="joint-voting-snippet">{jointSitting.votingRule}</p>
              </div>
            </div>

            {/* Explanation Drawer based on selected stage */}
            <div className="stage-explanation-panel">
              {activeTimelineStage === 'intro' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Explore the Legislative Lifecycle</h4>
                  <p>
                    Indian parliamentary procedure requires ordinary bills to be passed by both Houses. Click any card
                    above to examine procedural requirements, voting mechanisms, and deadlock rules.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'ls' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Day Two: Lok Sabha First &amp; Second Reading</h4>
                  <p>
                    The 75 Lok Sabha MPs debate the Youth Employment Bill. The concerned Minister introduces the text,
                    followed by party-wise interventions, opposition amendments, and legal panel validation.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'ls-passed' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Lok Sabha Approval &amp; Transmittal</h4>
                  <p>
                    Upon receiving majority support in the Lok Sabha, the Speaker certifies the text, and the Secretariat
                    transmits the Bill to the Rajya Sabha for consideration on Day Three.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'ls-failed' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Lok Sabha Rejection Rule</h4>
                  <p>
                    If the Lok Sabha votes against the Bill, the legislative journey for this Bill ends immediately. The
                    website will never transmit a bill to the Rajya Sabha that has failed in the Lok Sabha.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'rs' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Day Three: Rajya Sabha Scrutiny</h4>
                  <p>
                    The 50 Rajya Sabha MPs consider the <em>exact same bill</em> passed by the Lok Sabha. They scrutinise
                    its regional equity, long-term fiscal viability, and propose Upper Chamber amendments.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'both-passed' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Enactment: Passed by Both Houses</h4>
                  <p>
                    When both Lok Sabha and Rajya Sabha pass the text without unresolved amendment disputes, the
                    simulation records the Bill as successfully adopted by the Parliament of YDS 2026.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'deadlock' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Qualifying Legislative Deadlock</h4>
                  <p>
                    A Joint Sitting does not occur automatically for every disagreement. Under YDS rules inspired by
                    Article 108, the Organising Committee may convene a Joint Sitting only if the Rajya Sabha formally
                    rejects the Bill or both Houses reach a final deadlock over amendments.
                  </p>
                </div>
              )}
              {activeTimelineStage === 'joint' && (
                <div className="stage-exp-content">
                  <h4 className="stage-exp-title">Joint Sitting of Both Houses (125 MPs)</h4>
                  <p>
                    All 125 MPs (75 LS + 50 RS) assemble together in Ghulam Ahmed Hall under the presidency of the Speaker
                    of the Lok Sabha. Following final debates, a voice vote and division determine the ultimate passage.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Three Houses Comparison Box */}
          <div className="houses-comparison-grid">
            <div className="house-comp-card">
              <span className="house-comp-badge">LOK SABHA</span>
              <h4 className="house-comp-name">75 YDS MPs</h4>
              <ul className="house-comp-list">
                <li>Direct legislative debate &amp; executive accountability</li>
                <li>Question Hour &amp; Zero Hour proceedings</li>
                <li>Bill introduction, line-by-line debate &amp; amendments</li>
                <li>First decisive legislative voting threshold</li>
              </ul>
            </div>

            <div className="house-comp-card">
              <span className="house-comp-badge">RAJYA SABHA</span>
              <h4 className="house-comp-name">50 YDS MPs</h4>
              <ul className="house-comp-list">
                <li>Scrutiny of the SAME Youth Employment Bill</li>
                <li>Examination of state implications &amp; federal balance</li>
                <li>Proposing Upper Chamber amendments &amp; revisions</li>
                <li>Second Chamber voting: Passed, Rejected, or Deadlocked</li>
              </ul>
            </div>

            <div className="house-comp-card">
              <span className="house-comp-badge">JOINT SITTING</span>
              <h4 className="house-comp-name">125 YDS MPs</h4>
              <ul className="house-comp-list">
                <li>Brings all 75 LS and 50 RS members together</li>
                <li>Presided by Speaker under Article 108 constitutional model</li>
                <li>Resolves qualifying deadlock on disputed clauses</li>
                <li>Final division vote determines statutory outcome</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: THE HOUSE (PRESIDING OFFICERS & SECRETARIAT)
          ========================================================================= */}
      <section id="the-house" className="section the-house-section" aria-label="The House Structure">
        <div className="section-inner">
          <div className="section-topline">
            <span>07 / THE HOUSE</span>
            <span>PRESIDING OFFICERS · TABLE · SECRETARIAT</span>
          </div>

          <div className="section-heading">
            <span className="eyebrow" style={{ color: '#8c6b23' }}>PROCEDURAL LEADERSHIP</span>
            <h2 style={{ color: '#1a1f2e' }}>
              The Front of the Speaker
              <br />
              <em style={{ color: '#1a1f2e' }}>&amp; The House Officers.</em>
            </h2>
            <p className="public-lede" style={{ color: '#4a5568' }}>
              The proceedings of YDS 2026 are conducted with strict adherence to decorum, managed by experienced student
              presiding officers, procedural advisors, and a dedicated 4-member legal panel.
            </p>
          </div>

          <div className="officials-grid">
            {houseOfficials.map((officer, idx) => {
              const iconMap = {
                Gavel: Gavel,
                Award: Award,
                ScrollText: ScrollText,
                FileText: FileText,
                PenTool: PenTool,
                ShieldAlert: ShieldAlert,
                Scale: Scale,
              };
              const OfficerIcon = iconMap[officer.icon as keyof typeof iconMap] || Gavel;

              return (
                <div key={idx} className="officer-card">
                  <div className="officer-icon-box">
                    <OfficerIcon size={22} strokeWidth={1.5} className="officer-icon" />
                  </div>
                  <h4 className="officer-title">{officer.title}</h4>
                  <p className="officer-desc">{officer.roleDescription}</p>
                </div>
              );
            })}
          </div>

          {/* Role of the Speaker Callout */}
          <div className="speaker-role-card">
            <div className="speaker-role-header">
              <Gavel size={26} className="text-gold" />
              <div>
                <span className="eyebrow">PRESIDING AUTHORITY</span>
                <h3 className="speaker-role-title">The Role and Authority of the Speaker</h3>
              </div>
            </div>
            <p className="speaker-role-desc">
              The Speaker of the Lok Sabha presides over the Lower Chamber and any convened Joint Sitting. The Speaker
              maintains order, recognises members, enforces speaking time limits, rules on points of order, determines
              the admissibility of urgent matters, and declares voting results. Under published YDS rules, the Speaker&apos;s
              procedural rulings are final for the conduct of the simulation.
            </p>
          </div>

          {/* Participant Journey Summary Box */}
          <div className="participant-journey-wrap">
            <div className="section-heading pt-10">
              <span className="eyebrow" style={{ color: '#8c6b23' }}>YOUR SUMMIT TRAJECTORY</span>
              <h2 style={{ color: '#1a1f2e' }}>
                Your Journey
                <br />
                <em style={{ color: '#1a1f2e' }}>at YDS 2026.</em>
              </h2>
            </div>

            <div className="trajectory-grid">
              <div className="trajectory-card">
                <span className="trajectory-badge">DAY 1</span>
                <h4 className="trajectory-title">{participantJourney.day1.day}</h4>
                <ul className="trajectory-list">
                  {participantJourney.day1.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>

              <div className="trajectory-card">
                <span className="trajectory-badge">DAY 2</span>
                <h4 className="trajectory-title">{participantJourney.day2.day}</h4>
                <ul className="trajectory-list">
                  {participantJourney.day2.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>

              <div className="trajectory-card">
                <span className="trajectory-badge">DAY 3</span>
                <h4 className="trajectory-title">{participantJourney.day3.day}</h4>
                <ul className="trajectory-list">
                  {participantJourney.day3.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
