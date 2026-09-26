import { createServerFn } from '@tanstack/react-start';

export const getPublicData = createServerFn({ method: 'GET' }).handler(async () => {
  const { fetchPublicData } = await import('@/services/public');
  return fetchPublicData();
});

export const submitTeamApplication = createServerFn({ method: 'POST' })
  .validator((data: {
    temporaryTeamName: string;
    applicationEmail: string;
    teamLeader: {
      fullName: string;
      email: string;
      contactNumber: string;
      collegeName: string;
      yearOfStudy: string;
      yearOfStudyOther?: string;
      courseBranch?: string;
    };
    members: Array<{
      fullName: string;
      contactNumber: string;
      email?: string;
      college?: string;
      yearOfStudy?: string;
      courseBranch?: string;
    }>;
    experience: {
      hasNssMjcetMun: boolean;
      munEventDetails?: string;
      strongestAreas: string[];
      otherExperience?: string;
    };
    politicalAgenda: string;
    recommendation: {
      hasRecommendation: boolean;
      recommenderName?: string;
    };
    declarations: {
      teamDeclaration: boolean;
      teamLeaderConfirmation: boolean;
    };
  }) => data)
  .handler(async ({ data }) => {
    const { submitRegistration } = await import('@/services/public');
    return submitRegistration(data);
  });

export const uploadImage = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; filename: string; contentType: string; base64: string; kind?: 'logo' | 'portrait' }) => data)
  .handler(async ({ data }) => {
    const { processImageUpload } = await import('@/services/public');
    return processImageUpload(data.idToken, data.filename, data.contentType, data.base64, data.kind);
  });

export const getPartyById = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { fetchPartyById } = await import('@/services/public');
    return fetchPartyById(data.id);
  });

