import { createServerFn } from '@tanstack/react-start';

export const adminGetApplications = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    statusFilter?: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { getApplications } = await import('@/services/admin');
    return getApplications(data.idToken, data);
  });

export const adminGetApplication = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { getApplication } = await import('@/services/admin');
    return getApplication(data.idToken, data.id);
  });

export const adminUpdateApplicationStatus = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    id: string;
    status: 'ACCEPTED' | 'WAITLISTED' | 'DECLINED' | 'PENDING';
    adminNotes?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { updateApplicationStatus } = await import('@/services/admin');
    return updateApplicationStatus(data.idToken, data.id, data.status, data.adminNotes);
  });

export const adminAllocateParty = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; applicationId: string; partyId: string }) => data)
  .handler(async ({ data }) => {
    const { allocateParty } = await import('@/services/admin');
    return allocateParty(data.idToken, data.applicationId, data.partyId);
  });

export const adminGetParties = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getParties } = await import('@/services/admin');
    return getParties(data.idToken);
  });

export const adminUpsertParty = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    id?: string;
    name: string;
    abbreviation?: string;
    ideology?: string;
    historyDescription?: string;
    logoId?: string;
    sortOrder?: number;
    classification?: string;
    formationDate?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { upsertParty } = await import('@/services/admin');
    return upsertParty(data.idToken, data);
  });

export const adminDeleteParty = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { deleteParty } = await import('@/services/admin');
    return deleteParty(data.idToken, data.id);
  });

export const adminGetSponsors = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getSponsors } = await import('@/services/admin');
    return getSponsors(data.idToken);
  });

export const adminUpsertSponsor = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    id?: string;
    name: string;
    category: string;
    websiteUrl?: string;
    description?: string;
    logoId?: string;
    displayOrder?: number;
    isActive?: boolean;
  }) => data)
  .handler(async ({ data }) => {
    const { upsertSponsor } = await import('@/services/admin');
    return upsertSponsor(data.idToken, data);
  });

export const adminDeleteSponsor = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { deleteSponsor } = await import('@/services/admin');
    return deleteSponsor(data.idToken, data.id);
  });

export const adminGetResultsStatus = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getResultsStatus } = await import('@/services/admin');
    return getResultsStatus(data.idToken);
  });

export const adminSetResultsStatus = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; released: boolean }) => data)
  .handler(async ({ data }) => {
    const { setResultsStatus } = await import('@/services/admin');
    return setResultsStatus(data.idToken, data.released);
  });

export const adminGetAdminUsers = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getAdminUsers } = await import('@/services/admin');
    return getAdminUsers(data.idToken);
  });

export const adminAddAdminUser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; email: string; role?: 'ADMIN' | 'SUPER_ADMIN' }) => data)
  .handler(async ({ data }) => {
    const { addAdminUser } = await import('@/services/admin');
    return addAdminUser(data.idToken, data.email, data.role);
  });

export const adminRemoveAdminUser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; email: string }) => data)
  .handler(async ({ data }) => {
    const { removeAdminUser } = await import('@/services/admin');
    return removeAdminUser(data.idToken, data.email);
  });

export const adminGetAuditLogs = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; limit?: number }) => data)
  .handler(async ({ data }) => {
    const { getAuditLogs } = await import('@/services/admin');
    return getAuditLogs(data.idToken, data.limit);
  });

export const adminGetStats = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getStats } = await import('@/services/admin');
    return getStats(data.idToken);
  });

export const adminUpsertPartyFull = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    id?: string;
    name: string;
    abbreviation?: string;
    ideology?: string;
    historyDescription?: string;
    logoId?: string;
    sortOrder?: number;
    classification?: string;
    formationDate?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { upsertParty } = await import('@/services/admin');
    return upsertParty(data.idToken, data);
  });

// ── Organisers ────────────────────────────────────────────────────────────────

export const adminGetOrganisers = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getOrganisers } = await import('@/services/admin');
    return getOrganisers(data.idToken);
  });

export const adminUpsertOrganiser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id?: string; name: string; designation: string; photoId?: string; displayOrder?: number; isActive?: boolean; linkedinUrl?: string }) => data)
  .handler(async ({ data }) => {
    const { upsertOrganiser } = await import('@/services/admin');
    return upsertOrganiser(data.idToken, data);
  });

export const adminDeleteOrganiser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { deleteOrganiser } = await import('@/services/admin');
    return deleteOrganiser(data.idToken, data.id);
  });

// ── Co-Organisers ─────────────────────────────────────────────────────────────

export const adminGetCoOrganisers = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getCoOrganisers } = await import('@/services/admin');
    return getCoOrganisers(data.idToken);
  });

export const adminUpsertCoOrganiser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id?: string; name: string; designation: string; photoId?: string; displayOrder?: number; isActive?: boolean; linkedinUrl?: string }) => data)
  .handler(async ({ data }) => {
    const { upsertCoOrganiser } = await import('@/services/admin');
    return upsertCoOrganiser(data.idToken, data);
  });

export const adminDeleteCoOrganiser = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { deleteCoOrganiser } = await import('@/services/admin');
    return deleteCoOrganiser(data.idToken, data.id);
  });

// ── Developers ────────────────────────────────────────────────────────────────

export const adminGetDevelopers = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getDevelopers } = await import('@/services/admin');
    return getDevelopers(data.idToken);
  });

export const adminUpsertDeveloper = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; id: string; githubUrl?: string; linkedinUrl?: string }) => data)
  .handler(async ({ data }) => {
    const { upsertDeveloper } = await import('@/services/admin');
    return upsertDeveloper(data.idToken, data);
  });

// ── DB Stats & Export ─────────────────────────────────────────────────────────

export const adminGetDbStats = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getDbStats } = await import('@/services/admin');
    return getDbStats(data.idToken);
  });

export const adminExportData = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { exportAllData } = await import('@/services/admin');
    return exportAllData(data.idToken);
  });

