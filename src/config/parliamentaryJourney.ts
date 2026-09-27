export interface DayCard {
  dayNumber: string;
  dayLabel: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  time: string;
  mpsCount: string;
  badge: string;
  purpose: string;
  mainActivities: string[];
  parliamentarySignificance: string;
  takeaways: string[];
}

export interface HouseOfficial {
  title: string;
  roleDescription: string;
  icon: string;
}

export const PARLIAMENTARY_JOURNEY_CONFIG = {
  sectionTitle: 'THE YDS PARLIAMENTARY JOURNEY',
  subtitle: 'Three Days. Two Houses. One Legislative Journey.',
  supportingText:
    'Youth Democratic Summit 2026 is structured as a three-day parliamentary simulation designed to take participants through the complete journey of democratic representation — from taking the oath and forming the government to parliamentary debate, legislation, voting and, where required, a joint sitting of the Houses.',
  coreRuleQuote:
    'YDS 2026 is a three-day parliamentary simulation, with each day representing a distinct stage of the democratic and legislative process.',
  proceduralDisclaimer:
    'This is a simulation inspired by parliamentary practice, adapted according to published YDS rules, not an actual sitting of the Parliament of India.',

  shortOverview: {
    heading: 'THREE DAYS. ONE PARLIAMENTARY JOURNEY.',
    days: [
      {
        day: '15 OCTOBER — OATH & GOVERNMENT FORMATION',
        summary:
          'The summit begins at the Seminar Hall, Block 4, MJCET, with the oath-taking ceremony. Participants formally assume their parliamentary roles, receive their fictional parties, and take part in the formation of the Government, including the election/selection of the Prime Minister and allocation of Cabinet portfolios.',
      },
      {
        day: '16 OCTOBER — LOK SABHA',
        summary:
          'The 75 Lok Sabha MPs assemble for the first legislative session. Proceedings move through Question Hour, Supplementary Questions, Zero Hour and legislative business. The Youth Employment, Skills & Opportunities Bill, 2026 is introduced, debated, amended and put to vote.',
      },
      {
        day: '17 OCTOBER — RAJYA SABHA',
        summary:
          'The 50 Rajya Sabha MPs consider the same Bill passed by the Lok Sabha. The House debates the legislation, considers amendments and votes on it. If the Houses reach a qualifying disagreement under the YDS rules, a Joint Sitting of all 125 MPs may be convened for final deliberation and voting.',
      },
    ],
  },

  threeDays: [
    {
      dayNumber: 'DAY 01',
      dayLabel: 'DAY 01',
      title: 'OATH-TAKING & GOVERNMENT FORMATION',
      subtitle: 'Constitutional & Political Formation Stage',
      date: '15 October 2026',
      venue: 'Seminar Hall, Block 4, MJCET',
      time: '9:00 AM onwards',
      mpsCount: 'All 125 MPs (25 Fictional Parties)',
      badge: 'FORMATION STAGE',
      purpose:
        'Day One is the formal commencement of the Youth Democratic Summit. Participants first assume their roles as Members of Parliament and formally begin the YDS parliamentary simulation. The day is NOT the Lok Sabha session; it is the constitutional and political formation stage.',
      mainActivities: [
        'Solemn Oath-Taking & Affirmation Ceremony for all 125 selected MPs',
        'Official Party Allocation: 25 Fictional Political Parties (5 Members each)',
        'Government Formation Negotiations & Floor Coalitions',
        'Election / Selection of the Prime Minister under YDS simulation rules',
        'Council of Ministers & Cabinet Portfolio Announcements (Education, Finance, Defence, Home Affairs, Health, Environment, Foreign Affairs)',
        'Pre-session legislative briefing and motion preparation',
      ],
      parliamentarySignificance:
        'Constitutes the House and vests executive authority, grounding every parliamentarian in their party manifesto, constituency role, and parliamentary allegiance before the gavels drop on legislation.',
      takeaways: [
        'Who they represent',
        'Which party they belong to',
        'Their parliamentary role',
        'Their government / opposition position',
        'What they will debate',
      ],
    },
    {
      dayNumber: 'DAY 02',
      dayLabel: 'DAY 02',
      title: 'LOK SABHA SESSION',
      subtitle: 'Direct Legislative Debate & Popular House',
      date: '16 October 2026',
      venue: 'Ghulam Ahmed Hall, MJCET',
      time: '9:00 AM – 5:00 PM',
      mpsCount: '75 Lok Sabha MPs',
      badge: 'HOUSE OF THE PEOPLE',
      purpose:
        'Day Two is dedicated entirely to the Lok Sabha simulation. Day Two brings the 75 Lok Sabha MPs together for the first legislative session of YDS 2026. Only the 75 designated Lok Sabha MPs participate in the floor debate and voting.',
      mainActivities: [
        'House Assembly & Call to Order by the Speaker',
        'Question Hour: Ministers cross-examined on youth portfolios',
        'Supplementary Questions: Clarification and executive accountability',
        'Zero Hour: Urgent matters of public and student importance raised',
        'Introduction of The Youth Employment, Skills & Opportunities Bill, 2026',
        'First & Second Reading: Clause-by-clause legislative debate',
        'Admissibility check of proposed amendments by the Legal Panel',
        'Ministerial reply & Lok Sabha Division / Voice Vote',
      ],
      parliamentarySignificance:
        'Tests the Government’s floor discipline and tests bills against fierce multi-party scrutiny. The Bill must either be PASSED (advancing to Rajya Sabha) or NOT PASSED (legislative journey terminates).',
      takeaways: [
        'Direct legislative accountability',
        'Holding the Treasury Benches responsible',
        'Substantive clause amendments',
        'High-stakes parliamentary voting',
      ],
    },
    {
      dayNumber: 'DAY 03',
      dayLabel: 'DAY 03',
      title: 'RAJYA SABHA & JOINT SITTING CONTINGENCY',
      subtitle: 'Second Chamber Scrutiny & Deadlock Resolution',
      date: '17 October 2026',
      venue: 'Ghulam Ahmed Hall, MJCET',
      time: '9:00 AM – 5:00 PM',
      mpsCount: '50 Rajya Sabha MPs (125 in Joint Sitting)',
      badge: 'COUNCIL OF STATES',
      purpose:
        'Day Three is dedicated to the Rajya Sabha simulation. The 50 Rajya Sabha MPs consider the SAME Youth Employment Bill passed by Lok Sabha. If a qualifying disagreement occurs under YDS rules, all 125 MPs assemble in a Joint Sitting.',
      mainActivities: [
        'Rajya Sabha Assembly & Call to Order by the Chairperson',
        'Transmittal of the Lok Sabha Passed Bill into the Second Chamber',
        'Review of statutory implications, state impact, and fiscal longevity',
        'Moving of Elder Chamber amendments and reservations',
        'Rajya Sabha Vote (Passed / Rejected / Disagreement on Amendments)',
        'Contingency trigger: Convening of the Joint Sitting if deadlocked',
        'Joint Sitting presided by Lok Sabha Speaker with all 125 MPs',
        'Final division vote and determination of legislative outcome',
      ],
      parliamentarySignificance:
        'Demonstrates bicameral wisdom, checks rash legislation, and provides the constitutional mechanism of Article 108 adaptation for bicameral reconciliation.',
      takeaways: [
        'Bicameral legislative continuity',
        'State & long-term policy perspective',
        'Deadlock resolution mechanics',
        'Unified 125-MP Joint House vote',
      ],
    },
  ],

  lokSabhaProcedure: {
    title: 'LOK SABHA PARLIAMENTARY STRUCTURE',
    subtitle: 'Order of Business Inspired by Parliamentary Practice',
    flow: [
      { step: '01', title: 'House Assembly', desc: 'Members take designated party benches.' },
      { step: '02', title: 'Call to Order', desc: '“Honourable Members, the House is now in session.”' },
      { step: '03', title: 'Opening by Speaker', desc: 'Speaker sets decorum and confirms order of business.' },
      { step: '04', title: 'Question Hour', desc: 'First hour: MPs interrogate ministers on public affairs.' },
      { step: '05', title: 'Supplementary Questions', desc: 'Follow-up queries challenging ministerial replies.' },
      { step: '06', title: 'Zero Hour', desc: 'Members raise urgent matters of pressing public concern.' },
      { step: '07', title: 'Papers / Procedural Business', desc: 'Secretariat records motions and papers laid on table.' },
      { step: '08', title: 'Bill Introduction', desc: 'Minister formally introduces the Youth Employment Bill.' },
      { step: '09', title: 'Bill Debate', desc: 'Treasury arguments, Opposition response & party floor speeches.' },
      { step: '10', title: 'Amendments', desc: 'Members move clause changes; 4-Member Legal Panel reviews.' },
      { step: '11', title: 'Minister’s Response', desc: 'Concerned Minister defends bill against objections.' },
      { step: '12', title: 'Voting', desc: 'Voice vote (“Aye / No”) or division counting if challenged.' },
      { step: '13', title: 'Result Declared', desc: 'Speaker confirms if Bill is PASSED or NOT PASSED.' },
      { step: '14', title: 'Adjournment', desc: 'House concludes its formal sitting.' },
    ],
    questionHourTopics: [
      'Employment & Job Creation',
      'Education & Curriculum Reform',
      'Skill Development Ecosystem',
      'Healthcare & Wellbeing',
      'Infrastructure & Digital Access',
      'Technology, AI & Automation',
      'Economic Growth & Taxation',
      'Youth & Student Development',
      'Agriculture & Rural Economy',
      'Environment & Clean Energy',
      'National Security & Border Tech',
      'Regional Development & Equal Access',
    ],
    supplementaryLogic: {
      primary: 'Primary Question tabled by MP',
      answer: 'Concerned Minister replies with official policy data',
      supp: 'Eligible Member poses sharp follow-up Supplementary Question',
      response: 'Minister provides immediate clarification and accountability',
    },
    zeroHourExplanation:
      'Zero Hour is the period immediately following Question Hour and preceding listed business. While participants may raise urgent matters without formal 10-day notice, the Speaker retains absolute authority to admit topics based on national and student relevance.',
  },

  centralBill: {
    officialTitle: 'THE YOUTH EMPLOYMENT, SKILLS & OPPORTUNITIES BILL, 2026',
    shortTitle: 'Youth Employment Bill, 2026',
    coreAgenda: 'NATIONAL YOUTH EMPLOYMENT & SKILLS FRAMEWORK',
    centralQuestion:
      'How can the Government create a sustainable, inclusive and future-ready employment ecosystem that enables India’s youth to obtain meaningful work, develop relevant skills and contribute effectively to the country’s economic and social development?',
    pillars: [
      {
        title: 'Youth Employment & Employability',
        desc: 'Establishing statutory guarantees, placement mandates, and national hiring incentives.',
      },
      {
        title: 'Future-Ready Skill Development',
        desc: 'Modernising vocational training with AI, semiconductors, robotics, and digital commerce.',
      },
      {
        title: 'Apprenticeships & Paid Internships',
        desc: 'Bridging higher education and enterprise through structured stipends and certified tenures.',
      },
      {
        title: 'Startups & Student Entrepreneurship',
        desc: 'Incubation seed capital, collateral-free credit, and streamlined regulatory sandbox compliance.',
      },
      {
        title: 'Rural & Urban Equitable Horizons',
        desc: 'Bridging tier-2/tier-3 regional disparities with decentralized economic opportunities.',
      },
      {
        title: 'Education-to-Employment Transition',
        desc: 'Mandatory industry-aligned university curriculums and national talent credit exchanges.',
      },
    ],
    amendmentAreas: [
      'Definitions & Eligibility Criteria',
      'Mandatory Annual Employment Targets',
      'Vocational Skill Certification Standards',
      'Corporate Apprenticeship Quotas',
      'Public Funding & Budget Allocations',
      'Rural Employment Special Safeguards',
      'Private Sector Tax Incentives',
      'Student Startup Seed Grants',
      'Implementation Timelines & Rollout',
      'Independent Parliamentary Monitoring Body',
    ],
    legalPanel: {
      size: '4 Members',
      title: 'YDS Legal Panel',
      description:
        'A dedicated 4-member legal and procedural scrutiny committee that assists the Secretariat and Chair by evaluating proposed clause amendments for drafting coherence, procedural validity, and constitutional alignment within YDS simulation rules.',
    },
    lokSabhaRule: {
      ruleText:
        'The Youth Employment Bill is the principal legislative business of Day Two. The Lok Sabha records either PASSED or NOT PASSED. If passed, it advances to Rajya Sabha; if not passed, the legislative journey terminates immediately.',
    },
  },

  rajyaSabhaProcedure: {
    title: 'RAJYA SABHA PARLIAMENTARY STRUCTURE',
    subtitle: 'Second Chamber Scrutiny & Bicameral Revision',
    continuityNote:
      'The Rajya Sabha does NOT draft or begin with a new bill. It receives the EXACT SAME Youth Employment, Skills & Opportunities Bill, 2026 passed by the Lok Sabha on Day Two, fulfilling bicameral scrutiny.',
    mpsCount: '50 Rajya Sabha MPs',
    date: '17 October 2026',
    venue: 'Ghulam Ahmed Hall, MJCET',
    time: '9:00 AM – 5:00 PM',
    flow: [
      { step: '01', title: 'House Assembly', desc: '50 Rajya Sabha MPs take designated seats in Ghulam Ahmed Hall.' },
      { step: '02', title: 'Call to Order', desc: '“Honourable Members of the Council of States, the House is called to order.”' },
      { step: '03', title: 'Opening by Chairperson', desc: 'Chairperson outlines business and sets decorum for elder chamber review.' },
      { step: '04', title: 'Question Hour', desc: 'MPs question Ministers on statutory feasibility, executive execution, and state impact.' },
      { step: '05', title: 'Supplementary Questions', desc: 'Probing follow-ups on federal funds, institutional capacity, and student rights.' },
      { step: '06', title: 'Zero Hour in Upper House', desc: 'Members raise regional youth disparities and pressing university concerns.' },
      { step: '07', title: 'Receipt of Lok Sabha Bill', desc: 'Table Officers lay the Bill passed by the Lok Sabha on the Table of the House.' },
      { step: '08', title: 'Second Chamber Debate', desc: 'Senior parliamentarians dissect provisions with long-term and federal vision.' },
      { step: '09', title: 'Upper House Amendments', desc: 'Members move clause amendments vetted by the 4-Member Legal Panel.' },
      { step: '10', title: 'Minister’s Clarification', desc: 'Government Ministers address reservations raised by elder parliamentarians.' },
      { step: '11', title: 'Rajya Sabha Voting', desc: 'Voice vote or formal division on clauses and final passage of the text.' },
      { step: '12', title: 'Determination of Result', desc: 'Chair records: Passed by Both Houses OR Qualifying Deadlock.' },
    ],
    scrutinyPillars: [
      {
        title: 'Federal Impact & Regional Balance',
        desc: 'Ensuring youth employment guarantees, startup grants, and skill programs adapt equitably across states and non-metro hubs.',
      },
      {
        title: 'Long-Term Fiscal Sustainability',
        desc: 'Scrutinising corporate tax subsidies, apprentice stipend models, and sustained allocations beyond short-term fiscal cycles.',
      },
      {
        title: 'Constructive Upper House Amendments',
        desc: 'Strengthening grievance redressal mechanisms, independent monitoring bodies, and student worker workplace safeguards.',
      },
      {
        title: 'Check on Legislative Haste',
        desc: 'Providing reflective elder deliberation to refine statutory ambiguities without partisan posturing.',
      },
    ],
    outcomes: [
      {
        status: 'PASSED BY RAJYA SABHA',
        type: 'success',
        label: 'Approved by Both Houses',
        desc: 'If Rajya Sabha approves the Bill without unresolved amendments, the legislation is enacted as official YDS policy.',
      },
      {
        status: 'DISAGREEMENT ON AMENDMENTS',
        type: 'warning',
        label: 'Amendment Deadlock',
        desc: 'If Rajya Sabha passes amendments not accepted by Lok Sabha, a qualifying deadlock occurs under published YDS rules.',
      },
      {
        status: 'REJECTED BY RAJYA SABHA',
        type: 'danger',
        label: 'Full House Rejection',
        desc: 'If the Upper Chamber rejects the text entirely, the Organising Committee may convene a simulated Joint Sitting of all 125 MPs.',
      },
    ],
    chairpersonRole: {
      title: 'The Chairperson of the Rajya Sabha',
      desc: 'Presides over the Upper Chamber simulation, regulates debate decorum, ensures respectful bicameral examination, rules on procedural admissibility, and oversees division counts.',
    },
  },

  jointSitting: {
    title: 'THE JOINT SITTING OF THE HOUSES',
    triggerRule:
      'If the Rajya Sabha rejects the Bill or the two Houses reach a final disagreement on amendments, the Organising Committee may convene a simulated Joint Sitting under the YDS rules.',
    constitutionalContext:
      'Inspired by Article 108 of the Constitution of India, which provides for a joint sitting of both Houses to resolve legislative deadlocks on ordinary bills.',
    composition: '125 MPs (75 Lok Sabha MPs + 50 Rajya Sabha MPs)',
    presidingOfficer: 'Speaker of the Lok Sabha',
    sequence: [
      'Joint Sitting summoned by the Organising Secretariat',
      'Speaker of the Lok Sabha assumes the Chair',
      'Secretary-General reads out the order of business & disputed clauses',
      'Bill is formally placed before the Joint Assembly of 125 MPs',
      'Government presents justification for the Bill in its current form',
      'Opposition & Rajya Sabha leaders present objections and compromises',
      'Moderated joint floor debate across all 25 parties',
      'Deliberation on permitted compromise amendments',
      'Final responses by Leader of Opposition and Prime Minister',
      'YDS Voting Procedure: Voice vote followed by division count if claimed',
      'Declaration of final legislative outcome by the Speaker',
    ],
    votingRule:
      'The Joint Sitting will use the YDS voting procedure. A voice vote will be attempted first. If the result is challenged, the Chair may order a division/counting procedure. The Bill is considered passed if it receives the required majority under the published YDS rules.',
  },

  houseOfficials: [
    {
      title: 'Speaker of the Lok Sabha',
      roleDescription:
        'Presides over the Lok Sabha simulation and any Joint Sitting. Maintains decorum, recognises speakers, rules on points of order, and administers voting.',
      icon: 'Gavel',
    },
    {
      title: 'Chairperson of the Rajya Sabha',
      roleDescription:
        'Presides over the Upper Chamber proceedings, directing elder scrutiny, regulating debate decorum, and overseeing Rajya Sabha divisions.',
      icon: 'Award',
    },
    {
      title: 'Secretary-General',
      roleDescription:
        'Chief administrative and procedural advisor to the Chair. Manages the official Table, certifies papers laid, and records official votes and proceedings.',
      icon: 'ScrollText',
    },
    {
      title: 'Table & Legislative Officers',
      roleDescription:
        'Handle bills, notices, amendment registries, and floor documentation, ensuring accurate transcription of legislative texts.',
      icon: 'FileText',
    },
    {
      title: 'Rapporteurs',
      roleDescription:
        'Maintain verbatim accounts, synthesize debate highlights, and publish daily parliamentary summary bulletins for the summit.',
      icon: 'PenTool',
    },
    {
      title: 'Marshals',
      roleDescription:
        'Assist the Speaker and Chair with House discipline, floor movement, division counting logistics, and ceremonial assembly order.',
      icon: 'ShieldAlert',
    },
    {
      title: 'Legal Panel (4 Members)',
      roleDescription:
        'Independent legal advisors examining proposed amendments for procedural validity, textual consistency, and conformity with YDS simulation guidelines.',
      icon: 'Scale',
    },
  ],

  participantJourney: {
    day1: {
      day: 'Day 1 — Become the Parliament',
      steps: [
        'Arrive at Seminar Hall, Block 4, MJCET',
        'Take the solemn parliamentary oath/affirmation',
        'Receive your 5-member team’s fictional political party',
        'Engage in government-formation floor consultations',
        'Elect / Select the Prime Minister & appoint Cabinet Ministers',
        'Receive portfolio briefings and prepare legislative strategies',
      ],
    },
    day2: {
      day: 'Day 2 — Lok Sabha Floor Battle',
      steps: [
        '75 Lok Sabha MPs take seats in Ghulam Ahmed Hall',
        'Question Hour: Interrogate ministers or defend government policies',
        'Raise urgent student & national priorities during Zero Hour',
        'Witness introduction of the Youth Employment Bill, 2026',
        'Engage in spirited second reading clause debates',
        'Draft and move amendments verified by the Legal Panel',
        'Cast your vote: Voice vote / division to determine Bill passage',
      ],
    },
    day3: {
      day: 'Day 3 — Rajya Sabha & Joint Sitting',
      steps: [
        '50 Rajya Sabha MPs assemble to scrutinise the passed legislation',
        'Debate state-level and long-term implications of the Bill',
        'Propose Upper Chamber amendments and vote on the text',
        'In case of qualifying deadlock: Summoning of all 125 MPs to Joint Sitting',
        'Speaker takes the Chair for historic unified House deliberation',
        'Cast decisive final division vote on the future of the Bill',
        'Closing parliamentary valedictory & distinguished awards',
      ],
    },
  },
} as const;
