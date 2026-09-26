import type { TeamApplicationPayload } from '@/types/yds';

/**
 * Parse a MongoDB document into TeamApplicationPayload.
 */
export function parseMongoRegistration(id: string, data: any): TeamApplicationPayload {
  return {
    applicationId: data.applicationId || `YDS26-${id.slice(0, 4).toUpperCase()}`,
    temporaryTeamName: data.temporaryTeamName || 'Team',
    teamLeader: data.teamLeader || {
      fullName: '',
      email: '',
      contactNumber: '',
      collegeName: '',
      yearOfStudy: '1st Year',
    },
    members: data.members || [],
    experience: data.experience || { hasNssMjcetMun: false, strongestAreas: [] },
    politicalAgenda: data.politicalAgenda || '',
    recommendation: data.recommendation || { hasRecommendation: false },
    declarations: data.declarations || { teamDeclaration: true, teamLeaderConfirmation: true },
    submittedAt: data.submittedAt || new Date().toISOString(),
    status: data.status || 'PENDING',
    adminNotes: data.adminNotes || '',
    assignedPartyId: data.assignedPartyId || null,
    assignedPartyName: data.assignedPartyName || null,
    reviewedAt: data.reviewedAt || null,
    reviewedBy: data.reviewedBy || null,
    auditLog: data.auditLog || [
      {
        action: 'Application Submitted',
        timestamp: data.submittedAt || new Date().toISOString(),
        details: 'Initial submission received',
      },
    ],
  };
}

/** Legacy alias kept for backward compatibility */
export function parseFirestoreRegistration(id: string, data: any): TeamApplicationPayload {
  return parseMongoRegistration(id, data);
}

/** Legacy alias kept for backward compatibility */
export function parseTeamApplication(rawRow: any): TeamApplicationPayload {
  return parseMongoRegistration(rawRow.id || '', rawRow);
}
