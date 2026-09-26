export type MemberDetail = {
  fullName: string;
  contactNumber: string;
  email?: string;
  college?: string;
  yearOfStudy?: string;
  courseBranch?: string;
};

export type TeamLeader = {
  fullName: string;
  email: string;
  contactNumber: string;
  collegeName: string;
  yearOfStudy: string;
  yearOfStudyOther?: string;
  courseBranch?: string;
};

export type ExperienceDetails = {
  hasNssMjcetMun: boolean;
  munEventDetails?: string;
  strongestAreas: string[]; // 'Public Speaking' | 'Parliamentary Debate' | 'Research' | 'Policy Making' | 'Negotiation / Diplomacy'
  otherExperience?: string;
};

export type RecommendationDetails = {
  hasRecommendation: boolean;
  recommenderName?: string;
};

export type DeclarationsDetails = {
  teamDeclaration: boolean;
  teamLeaderConfirmation: boolean;
};

export type TeamApplicationPayload = {
  applicationId: string; // e.g. YDS26-0001
  temporaryTeamName: string;
  teamLeader: TeamLeader;
  members: [MemberDetail, MemberDetail, MemberDetail, MemberDetail]; // 4 members + leader = 5 total
  experience: ExperienceDetails;
  politicalAgenda: string; // 200-300 words recommended
  recommendation: RecommendationDetails;
  declarations: DeclarationsDetails;
  submittedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'WAITLISTED' | 'DECLINED';
  adminNotes?: string;
  assignedPartyId?: string | null;
  assignedPartyName?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  auditLog: Array<{
    action: string;
    timestamp: string;
    adminEmail?: string;
    details?: string;
  }>;
};

export type SponsorRecord = {
  id: string;
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  description?: string | null;
  category: string; // Title Sponsor, Associate Sponsor, Powered By, Media Partner, etc.
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type FictionalParty = {
  id: string;
  name: string;
  abbreviation?: string | null;
  ideology?: string | null;
  historyDescription?: string | null;
  logoUrl?: string | null;
  sortOrder: number;
  assignedTeamId?: string | null;
  assignedTeamName?: string | null;
};
