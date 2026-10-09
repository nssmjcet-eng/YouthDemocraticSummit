import { createServerFn } from '@tanstack/react-start';

// ── Public endpoint (no auth) ─────────────────────────────────────────────────

export const getPublicAnnouncement = createServerFn({ method: 'GET' }).handler(async () => {
  const { getPublicAnnouncement: fetchPublicAnnouncement } = await import('@/services/announcement');
  return fetchPublicAnnouncement();
});

// ── Admin endpoints (require authenticated admin) ─────────────────────────────

export const adminGetAnnouncement = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { getAnnouncementAdmin } = await import('@/services/announcement');
    return getAnnouncementAdmin(data.idToken);
  });

export const adminSaveDraftAnnouncement = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    eventStatus: 'SCHEDULED' | 'POSTPONED' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'CANCELLED' | 'COMPLETED';
    freshRegistrationStatus: 'NOT_OPEN' | 'OPEN' | 'CLOSED';
    registrationDeadlineOverride?: string | null;
    revisedDates?: string | null;
    revisedVenue?: string | null;
  }) => data)
  .handler(async ({ data }) => {
    const { saveDraftAnnouncement } = await import('@/services/announcement');
    const { idToken, ...rest } = data;
    return saveDraftAnnouncement(idToken, rest);
  });

export const adminPublishAnnouncement = createServerFn({ method: 'POST' })
  .validator((data: {
    idToken: string;
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    eventStatus: 'SCHEDULED' | 'POSTPONED' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'CANCELLED' | 'COMPLETED';
    freshRegistrationStatus: 'NOT_OPEN' | 'OPEN' | 'CLOSED';
    registrationDeadlineOverride?: string | null;
    revisedDates?: string | null;
    revisedVenue?: string | null;
  }) => data)
  .handler(async ({ data }) => {
    const { publishAnnouncement } = await import('@/services/announcement');
    const { idToken, ...rest } = data;
    return publishAnnouncement(idToken, rest);
  });

export const adminHideAnnouncement = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { hideAnnouncement } = await import('@/services/announcement');
    return hideAnnouncement(data.idToken);
  });

export const adminShowAnnouncement = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { showAnnouncement } = await import('@/services/announcement');
    return showAnnouncement(data.idToken);
  });

export const adminQuickToggleRegistration = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string; allow: boolean }) => data)
  .handler(async ({ data }) => {
    const { quickToggleRegistration } = await import('@/services/announcement');
    return quickToggleRegistration(data.idToken, data.allow);
  });
