import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, AlertCircle, Info, ShieldCheck, Users, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitTeamApplication } from '@/functions/public';
import { YDS_CONFIG } from '@/config/yds';
import type { MemberDetail, TeamLeader } from '@/types/yds';

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate',
  'Others',
] as const;

const STRONGEST_AREAS_OPTIONS = [
  'Public Speaking',
  'Parliamentary Debate',
  'Research',
  'Policy Formulation',
  'Crisis Management & Negotiation',
  'Leadership & Strategy',
] as const;

export function RegistrationForm() {
  // Step 1: Temporary Team & Contact Email
  const [temporaryTeamName, setTemporaryTeamName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  // Step 2: Team Leader
  const [leader, setLeader] = useState<TeamLeader>({
    fullName: '',
    email: '',
    contactNumber: '',
    collegeName: '',
    yearOfStudy: '1st Year',
    yearOfStudyOther: '',
    courseBranch: '',
  });

  // Step 3: Members 2, 3, 4, 5
  const [members, setMembers] = useState<[MemberDetail, MemberDetail, MemberDetail, MemberDetail]>([
    { fullName: '', contactNumber: '', email: '', college: '', yearOfStudy: '1st Year' },
    { fullName: '', contactNumber: '', email: '', college: '', yearOfStudy: '1st Year' },
    { fullName: '', contactNumber: '', email: '', college: '', yearOfStudy: '1st Year' },
    { fullName: '', contactNumber: '', email: '', college: '', yearOfStudy: '1st Year' },
  ]);

  // Step 4: Experience
  const [hasNssMjcetMun, setHasNssMjcetMun] = useState<boolean | null>(null);
  const [munEventDetails, setMunEventDetails] = useState('');
  const [strongestAreas, setStrongestAreas] = useState<string[]>([]);

  // Step 5: Political Agenda
  const [politicalAgenda, setPoliticalAgenda] = useState('');

  // Step 6: Recommendation
  const [hasRecommendation, setHasRecommendation] = useState<boolean | null>(null);
  const [recommenderName, setRecommenderName] = useState('');

  // Step 7: Declarations
  const [teamDeclaration, setTeamDeclaration] = useState(false);
  const [teamLeaderConfirmation, setTeamLeaderConfirmation] = useState(false);

  // States
  const [submitting, setSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [submittedTeamName, setSubmittedTeamName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const updateMember = (index: 0 | 1 | 2 | 3, field: keyof MemberDetail, val: string) => {
    setMembers((prev) => {
      const copy = [...prev] as [MemberDetail, MemberDetail, MemberDetail, MemberDetail];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const toggleStrongestArea = (area: string) => {
    setStrongestAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    // Temp Team Name
    if (!temporaryTeamName.trim()) {
      err.temporaryTeamName = 'Temporary team name is required.';
    }

    // Applicant Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicantEmail.trim() || !emailRegex.test(applicantEmail.trim())) {
      err.applicantEmail = 'A valid application email is required.';
    }

    // Team Leader
    if (!leader.fullName.trim()) err.leaderName = 'Team Leader full name is required.';
    if (!leader.email.trim() || !emailRegex.test(leader.email.trim())) {
      err.leaderEmail = 'A valid Team Leader email is required.';
    }
    if (!leader.contactNumber.trim() || leader.contactNumber.trim().length < 8) {
      err.leaderPhone = 'A valid contact number is required.';
    }
    if (!leader.collegeName.trim()) err.leaderCollege = 'College name is required.';
    if (leader.yearOfStudy === 'Others' && !leader.yearOfStudyOther?.trim()) {
      err.leaderYearOther = 'Please specify your year/category.';
    }

    // Members 2 to 5
    members.forEach((m, idx) => {
      const num = idx + 2;
      if (!m.fullName.trim()) {
        err[`member_${num}_name`] = `Team Member ${num} full name is required.`;
      }
      if (!m.contactNumber.trim() || m.contactNumber.trim().length < 8) {
        err[`member_${num}_phone`] = `Team Member ${num} contact number is required.`;
      }
    });

    // Experience
    if (hasNssMjcetMun === null) {
      err.hasNssMjcetMun = 'Please select Yes or No regarding MUN experience.';
    }
    if (strongestAreas.length === 0) {
      err.strongestAreas = "Please select at least one of your team's strongest areas.";
    }

    // Political agenda
    if (!politicalAgenda.trim()) {
      err.politicalAgenda = "Please provide your team's political agenda.";
    } else {
      const words = politicalAgenda.trim().split(/\s+/).length;
      if (words < 30) {
        err.politicalAgenda = 'Please provide a comprehensive response (at least 30 words, 200–300 recommended).';
      }
    }

    // Recommendation
    if (hasRecommendation === null) {
      err.hasRecommendation = 'Please select Yes or No for the recommendation question.';
    }
    if (hasRecommendation === true && !recommenderName.trim()) {
      err.recommenderName = 'Please provide the recommender’s name.';
    }

    // Declarations
    if (!teamDeclaration) {
      err.teamDeclaration = 'Please confirm the Team Declaration before submitting.';
    }
    if (!teamLeaderConfirmation) {
      err.teamLeaderConfirmation = 'Please confirm Team Leader verification before submitting.';
    }

    setErrors(err);
    if (Object.keys(err).length > 0) {
      const firstKey = Object.keys(err)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const isPastDeadline = new Date() > new Date(YDS_CONFIG.registrationDeadlineDate);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');

    if (isPastDeadline) {
      setServerError('Registration for YDS 2026 has officially closed. Applications are no longer accepted.');
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    try {
      const cleanEmail = (applicantEmail || leader.email).trim().toLowerCase();

      const result = await submitTeamApplication({
        data: {
          temporaryTeamName: temporaryTeamName.trim(),
          applicationEmail: cleanEmail,
          teamLeader: {
            ...leader,
            email: cleanEmail,
            fullName: leader.fullName.trim(),
            contactNumber: leader.contactNumber.trim(),
            collegeName: leader.collegeName.trim(),
          },
          members: members.map((m) => ({
            ...m,
            fullName: m.fullName.trim(),
            contactNumber: m.contactNumber.trim(),
          })),
          experience: {
            hasNssMjcetMun: Boolean(hasNssMjcetMun),
            munEventDetails: munEventDetails.trim(),
            strongestAreas,
          },
          politicalAgenda: politicalAgenda.trim(),
          recommendation: {
            hasRecommendation: Boolean(hasRecommendation),
            recommenderName: hasRecommendation ? recommenderName.trim() : undefined,
          },
          declarations: {
            teamDeclaration,
            teamLeaderConfirmation,
          },
        },
      });

      setSubmittedAppId(result.applicationId);
      setSubmittedTeamName(temporaryTeamName.trim());
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || '';
      if (msg.includes('DUPLICATE')) {
        setServerError('An application has already been submitted with this email address. Each team can register only once.');
      } else if (msg) {
        setServerError(msg);
      } else {
        setServerError(
          'Your application could not be submitted right now. Please check your details and try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedAppId) {
    return (
      <div className="registration-confirmation yds-submission-success" role="status">
        <span className="confirmation-icon">
          <Check size={28} strokeWidth={2} />
        </span>
        <span className="eyebrow light-gold">APPLICATION SUBMITTED SUCCESSFULLY</span>
        <h3>Your application has been received.</h3>
        <div className="app-id-badge">
          <span className="app-id-label">Application ID</span>
          <span className="app-id-number">{submittedAppId}</span>
        </div>
        <div className="submission-details-box">
          <p>
            <strong>Team Name:</strong> {submittedTeamName}
          </p>
          <p>
            <strong>Team Composition:</strong> Exactly 5 Members (1 Leader + 4 Members)
          </p>
          <p className="submission-notice">
            Submission of an application does not guarantee selection. All applications will be reviewed by the{' '}
            <strong>YDS Organising Committee</strong>. Selection results will be declared officially on this website.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSubmittedAppId(null);
            setTemporaryTeamName('');
            setApplicantEmail('');
            setPoliticalAgenda('');
            setTeamDeclaration(false);
            setTeamLeaderConfirmation(false);
          }}
        >
          Submit Another Application <ArrowRight size={16} />
        </Button>
      </div>
    );
  }

  const wordCount = politicalAgenda.trim() ? politicalAgenda.trim().split(/\s+/).length : 0;

  return (
    <form className="registration-form yds-team-form" onSubmit={handleSubmit} noValidate>
      {/* Form Top Title */}
      <div className="form-head">
        <span>TEAM REGISTRATION · EXACTLY 5 MEMBERS</span>
        <span>{YDS_CONFIG.edition}</span>
      </div>

      {isPastDeadline && (
        <div className="p-4 rounded border border-amber-500/40 bg-amber-500/10 text-amber-200 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm text-amber-300">Registration Has Closed</p>
            <p>
              The deadline for submitting team applications was <strong>{YDS_CONFIG.registrationDeadline}</strong>. New submissions are no longer being accepted. Selection results will be announced on <strong>{YDS_CONFIG.resultsDate}</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="yds-form-banner">
        <Users size={18} className="text-gold flex-none" />
        <div>
          <strong>Important Rule:</strong> Each application must consist of <strong>exactly 5 members</strong> (1 Team
          Leader + 4 Members). Only the Team Leader should fill out this form on behalf of the entire team.
        </div>
      </div>

      {/* SECTION 1: TEMPORARY TEAM IDENTIFIER */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">01</span>
          <div>
            <h3>Temporary Team Name / Identifier</h3>
            <p>For application identification purposes only</p>
          </div>
        </div>

        <div className="yds-instruction-box row-layout">
          <Info size={16} className="text-gold flex-none mt-0.5" />
          <div className="text-xs leading-relaxed space-y-1">
            <p>• This is only a temporary team name/identifier for the registration process.</p>
            <p>
              • <strong>This will NOT be your final parliamentary party name.</strong>
            </p>
            <p>• Please do not use the name of any existing political party or organisation.</p>
            <p>
              • The final fictional parliamentary party will be allocated by the YDS Organising Committee after the selection process.
            </p>
          </div>
        </div>

        <div className="form-grid pt-4">
          <div className="form-field form-wide">
            <label htmlFor="field-temporaryTeamName">
              Temporary Team Name / Identifier <span>*</span>
            </label>
            <input
              id="field-temporaryTeamName"
              type="text"
              value={temporaryTeamName}
              onChange={(e) => setTemporaryTeamName(e.target.value)}
              placeholder="e.g. Alliance Phoenix, Deccan Scholars, The Centrists"
              maxLength={120}
              required
            />
            {errors.temporaryTeamName && <small>{errors.temporaryTeamName}</small>}
          </div>

          <div className="form-field form-wide">
            <label htmlFor="field-applicantEmail">
              Application Email Address <span>*</span>
            </label>
            <input
              id="field-applicantEmail"
              type="email"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              placeholder="teamlead@example.com (Official email for this team application)"
              maxLength={200}
              required
            />
            <span className="text-[11px] text-muted-foreground mt-1">
              Only one application per email address will be accepted. All official correspondence will be sent here.
            </span>
            {errors.applicantEmail && <small>{errors.applicantEmail}</small>}
          </div>
        </div>
      </div>

      {/* SECTION 2: TEAM LEADER DETAILS */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">02</span>
          <div>
            <h3>Member 1 — Team Leader Details</h3>
            <p>Primary contact and representative for the team</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="field-leaderName">
              Full Name of Team Leader <span>*</span>
            </label>
            <input
              id="field-leaderName"
              type="text"
              value={leader.fullName}
              onChange={(e) => setLeader({ ...leader, fullName: e.target.value })}
              placeholder="Full name as per college ID"
              maxLength={100}
              required
            />
            {errors.leaderName && <small>{errors.leaderName}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="field-leaderEmail">
              Email Address of Team Leader <span>*</span>
            </label>
            <input
              id="field-leaderEmail"
              type="email"
              value={leader.email}
              onChange={(e) => setLeader({ ...leader, email: e.target.value })}
              placeholder="leader@gmail.com"
              maxLength={150}
              required
            />
            {errors.leaderEmail && <small>{errors.leaderEmail}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="field-leaderPhone">
              Contact Number (WhatsApp) <span>*</span>
            </label>
            <input
              id="field-leaderPhone"
              type="tel"
              value={leader.contactNumber}
              onChange={(e) => setLeader({ ...leader, contactNumber: e.target.value })}
              placeholder="10-digit mobile number"
              maxLength={15}
              required
            />
            {errors.leaderPhone && <small>{errors.leaderPhone}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="field-leaderCollege">
              College / Institution Name <span>*</span>
            </label>
            <input
              id="field-leaderCollege"
              type="text"
              value={leader.collegeName}
              onChange={(e) => setLeader({ ...leader, collegeName: e.target.value })}
              placeholder="e.g. MJCET, Osmania University, CBIT"
              maxLength={150}
              required
            />
            {errors.leaderCollege && <small>{errors.leaderCollege}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="field-leaderBranch">
              Branch / Course <span className="optional">(optional)</span>
            </label>
            <input
              id="field-leaderBranch"
              type="text"
              value={leader.courseBranch || ''}
              onChange={(e) => setLeader({ ...leader, courseBranch: e.target.value })}
              placeholder="e.g. B.E. Computer Science, BA Political Science"
              maxLength={100}
            />
          </div>

          <div className="form-field">
            <label htmlFor="field-leaderYear">
              Year of Study <span>*</span>
            </label>
            <select
              id="field-leaderYear"
              className="yds-select"
              value={leader.yearOfStudy}
              onChange={(e) => setLeader({ ...leader, yearOfStudy: e.target.value })}
            >
              {YEAR_OPTIONS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {leader.yearOfStudy === 'Others' && (
            <div className="form-field form-wide">
              <label htmlFor="field-leaderYearOther">
                Please specify your year / educational category <span>*</span>
              </label>
              <input
                id="field-leaderYearOther"
                type="text"
                value={leader.yearOfStudyOther || ''}
                onChange={(e) => setLeader({ ...leader, yearOfStudyOther: e.target.value })}
                placeholder="e.g. Gap year, Recent Graduate, PhD scholar"
                maxLength={100}
                required
              />
              {errors.leaderYearOther && <small>{errors.leaderYearOther}</small>}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: MEMBERS 2 TO 5 */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">03</span>
          <div>
            <h3>Additional Team Members (Members 2 to 5)</h3>
            <p>Each team must have exactly 5 members total</p>
          </div>
        </div>

        {([0, 1, 2, 3] as const).map((idx) => {
          const memberNum = idx + 2;
          const member = members[idx];
          return (
            <div className="yds-member-box" key={memberNum}>
              <div className="yds-member-header">
                <span className="yds-member-tag">TEAM MEMBER {memberNum}</span>
              </div>
              <div className="form-grid pt-2">
                <div className="form-field">
                  <label htmlFor={`field-member_${memberNum}_name`}>
                    Full Name <span>*</span>
                  </label>
                  <input
                    id={`field-member_${memberNum}_name`}
                    type="text"
                    value={member.fullName}
                    onChange={(e) => updateMember(idx, 'fullName', e.target.value)}
                    placeholder={`Full Name of Member ${memberNum}`}
                    maxLength={100}
                    required
                  />
                  {errors[`member_${memberNum}_name`] && <small>{errors[`member_${memberNum}_name`]}</small>}
                </div>

                <div className="form-field">
                  <label htmlFor={`field-member_${memberNum}_phone`}>
                    Contact Number <span>*</span>
                  </label>
                  <input
                    id={`field-member_${memberNum}_phone`}
                    type="tel"
                    value={member.contactNumber}
                    onChange={(e) => updateMember(idx, 'contactNumber', e.target.value)}
                    placeholder="Mobile / WhatsApp number"
                    maxLength={15}
                    required
                  />
                  {errors[`member_${memberNum}_phone`] && <small>{errors[`member_${memberNum}_phone`]}</small>}
                </div>

                <div className="form-field">
                  <label htmlFor={`field-member_${memberNum}_email`}>
                    Email Address <span className="optional">(optional)</span>
                  </label>
                  <input
                    id={`field-member_${memberNum}_email`}
                    type="email"
                    value={member.email || ''}
                    onChange={(e) => updateMember(idx, 'email', e.target.value)}
                    placeholder="member@example.com"
                    maxLength={150}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor={`field-member_${memberNum}_college`}>
                    College / Course <span className="optional">(optional if same)</span>
                  </label>
                  <input
                    id={`field-member_${memberNum}_college`}
                    type="text"
                    value={member.college || ''}
                    onChange={(e) => updateMember(idx, 'college', e.target.value)}
                    placeholder={leader.collegeName || 'College name'}
                    maxLength={150}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 4: TEAM EXPERIENCE */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">04</span>
          <div>
            <h3>Team Experience & Skills</h3>
            <p>Preserved faithfully from the official YDS 2026 application form</p>
          </div>
        </div>

        <div className="form-field form-wide mb-4">
          <label>
            Has anyone in your team previously participated in an MUN conducted by NSS MJCET? <span>*</span>
          </label>
          <div className="yds-radio-group">
            <label className="yds-radio-label">
              <input
                type="radio"
                name="hasNssMjcetMun"
                checked={hasNssMjcetMun === true}
                onChange={() => setHasNssMjcetMun(true)}
              />
              <span>Yes</span>
            </label>
            <label className="yds-radio-label">
              <input
                type="radio"
                name="hasNssMjcetMun"
                checked={hasNssMjcetMun === false}
                onChange={() => setHasNssMjcetMun(false)}
              />
              <span>No</span>
            </label>
          </div>
          {errors.hasNssMjcetMun && <small>{errors.hasNssMjcetMun}</small>}
        </div>

        {hasNssMjcetMun === true && (
          <div className="form-field form-wide mb-4">
            <label htmlFor="field-munEventDetails">
              Mention the MUN/event name, committee and role, if applicable.
            </label>
            <span className="text-xs text-muted-foreground mb-1">
              Example: MJCET MUN — UNHRC — Delegate
            </span>
            <textarea
              id="field-munEventDetails"
              rows={2}
              value={munEventDetails}
              onChange={(e) => setMunEventDetails(e.target.value)}
              placeholder="List committee, year, role, or awards..."
              maxLength={500}
            />
          </div>
        )}

        <div className="form-field form-wide">
          <label>
            What are your team's strongest areas? <span>*</span>
          </label>
          <div className="yds-checkbox-grid">
            {STRONGEST_AREAS_OPTIONS.map((area) => (
              <label key={area} className="yds-checkbox-card">
                <input
                  type="checkbox"
                  checked={strongestAreas.includes(area)}
                  onChange={() => toggleStrongestArea(area)}
                />
                <span>{area}</span>
              </label>
            ))}
          </div>
          {errors.strongestAreas && <small>{errors.strongestAreas}</small>}
        </div>
      </div>

      {/* SECTION 5: POLITICAL AGENDA */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">05</span>
          <div>
            <h3>Political Agenda / Ideology Question</h3>
            <p className="font-semibold text-gold">Crucial Selection Criteria</p>
          </div>
        </div>

        <div className="yds-instruction-box">
          <p className="font-bold text-sm text-foreground">
            What would be your team's political agenda if you were representing a political party in Parliament? *
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Imagine that your five-member team has been elected to Parliament and is representing a political party.
            Describe the <strong className="text-foreground">core agenda, ideology and priorities</strong> that your team would represent in Parliament.
          </p>
          <div className="bg-background/90 p-3.5 border border-border/70 rounded my-1">
            <span className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-2">
              Suggested Focus Areas (Choose 2–3 or present your own):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-muted-foreground">
              <span>• Education &amp; NEP</span>
              <span>• Employment &amp; Skills</span>
              <span>• Healthcare &amp; Welfare</span>
              <span>• Infrastructure &amp; Urban</span>
              <span>• Tech &amp; AI Regulation</span>
              <span>• Environment &amp; Climate</span>
              <span>• Agriculture &amp; Agritech</span>
              <span>• Economic &amp; Fiscal Policy</span>
              <span>• National Security &amp; Defence</span>
              <span>• Youth &amp; Civic Engagement</span>
              <span>• Federalism &amp; State Rights</span>
              <span>• Judicial &amp; Legal Reforms</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50">
            <span className="text-xs font-semibold text-gold">
              Recommended length: 200–300 words.
            </span>
            <span className="text-[11px] text-muted-foreground italic">
              There is no single correct answer. We assess ideological clarity and parliamentary thinking.
            </span>
          </div>
        </div>

        <div className="form-field form-wide mt-3">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="field-politicalAgenda" className="m-0">
              Your Team's Political Agenda <span>*</span>
            </label>
            <span className={`text-xs ${wordCount >= 200 && wordCount <= 350 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
              Word count: {wordCount} words (Recommended: 200–300)
            </span>
          </div>
          <textarea
            id="field-politicalAgenda"
            value={politicalAgenda}
            onChange={(e) => setPoliticalAgenda(e.target.value)}
            placeholder="Present your team's political agenda, ideology, economic vision, key legislative bills you would introduce, and vision for India's governance..."
            rows={8}
            maxLength={4000}
            required
          />
          {errors.politicalAgenda && <small>{errors.politicalAgenda}</small>}
        </div>
      </div>

      {/* SECTION 6: RECOMMENDATION */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">06</span>
          <div>
            <h3>Recommendation Question</h3>
            <p>NSS MJCET MUN community network</p>
          </div>
        </div>

        <div className="form-field form-wide">
          <label>
            Has your team been recommended by a participant, Chairperson, Secretariat member or organiser from an NSS MJCET MUN? <span>*</span>
          </label>
          <div className="yds-instruction-box my-2">
            <span className="text-xs text-muted-foreground">
              Verified recommendations may receive additional consideration during the selection process. Recommendation does not guarantee selection.
            </span>
          </div>
          <div className="yds-radio-group">
            <label className="yds-radio-label">
              <input
                type="radio"
                name="hasRecommendation"
                checked={hasRecommendation === true}
                onChange={() => setHasRecommendation(true)}
              />
              <span>Yes</span>
            </label>
            <label className="yds-radio-label">
              <input
                type="radio"
                name="hasRecommendation"
                checked={hasRecommendation === false}
                onChange={() => setHasRecommendation(false)}
              />
              <span>No</span>
            </label>
          </div>
          {errors.hasRecommendation && <small>{errors.hasRecommendation}</small>}
        </div>

        {hasRecommendation === true && (
          <div className="form-field form-wide mt-3">
            <label htmlFor="field-recommenderName">
              If yes, please provide their name. <span>*</span>
            </label>
            <input
              id="field-recommenderName"
              type="text"
              value={recommenderName}
              onChange={(e) => setRecommenderName(e.target.value)}
              placeholder="Name of participant, Chairperson, Secretariat member or organiser"
              maxLength={150}
              required
            />
            {errors.recommenderName && <small>{errors.recommenderName}</small>}
          </div>
        )}
      </div>

      {/* SECTION 7: DECLARATIONS */}
      <div className="yds-form-section">
        <div className="yds-section-title">
          <span className="step-num">07</span>
          <div>
            <h3>Declarations & Confirmations</h3>
            <p>Mandatory agreement before submission</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="yds-checkbox-banner" htmlFor="field-teamDeclaration">
            <input
              id="field-teamDeclaration"
              type="checkbox"
              checked={teamDeclaration}
              onChange={(e) => setTeamDeclaration(e.target.checked)}
              required
            />
            <span className="text-xs leading-relaxed">
              <strong>Team Declaration: *</strong> We confirm that all information provided in this application is accurate and complete. We understand that submission of this application does not guarantee selection, and that final team selection and fictional party allocation rests entirely with the YDS Organising Committee.
            </span>
          </label>
          {errors.teamDeclaration && <small className="block text-destructive text-xs">{errors.teamDeclaration}</small>}

          <label className="yds-checkbox-banner" htmlFor="field-teamLeaderConfirmation">
            <input
              id="field-teamLeaderConfirmation"
              type="checkbox"
              checked={teamLeaderConfirmation}
              onChange={(e) => setTeamLeaderConfirmation(e.target.checked)}
              required
            />
            <span className="text-xs leading-relaxed">
              <strong>Team Leader Confirmation: *</strong> I confirm that I have obtained the consent of all five members before submitting this application on their behalf.
            </span>
          </label>
          {errors.teamLeaderConfirmation && (
            <small className="block text-destructive text-xs">{errors.teamLeaderConfirmation}</small>
          )}
        </div>
      </div>

      {/* Server Error Message */}
      {serverError && (
        <div className="yds-error-banner" role="alert">
          <AlertCircle size={18} className="flex-none" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form Footer */}
      <div className="form-footer mt-6">
        <div className="text-xs text-muted-foreground max-w-sm">
          <p className="font-semibold text-foreground">Event: {YDS_CONFIG.dates}</p>
          <p>Venue: {YDS_CONFIG.venue} · Fee: {YDS_CONFIG.registrationFee}</p>
        </div>
        <Button type="submit" disabled={submitting || isPastDeadline} className="min-w-[220px]">
          {isPastDeadline
            ? 'REGISTRATION CLOSED'
            : submitting
            ? 'VALIDATING & SUBMITTING…'
            : 'SUBMIT TEAM APPLICATION'}{' '}
          <ArrowRight size={17} />
        </Button>
      </div>
    </form>
  );
}
