import { getMongoDb } from './mongo-client';
import { requireAdminByToken, requireSuperAdminByToken } from './auth';
import { invalidatePublicDataCache } from './public';

// ── Types ─────────────────────────────────────────────────────────────────────

export type EventStatus =
  | 'SCHEDULED'
  | 'POSTPONED'
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'CANCELLED'
  | 'COMPLETED';

export type FreshRegistrationStatus = 'NOT_OPEN' | 'OPEN' | 'CLOSED';

export interface AnnouncementRecord {
  eventStatus: EventStatus;
  freshRegistrationStatus: FreshRegistrationStatus;
  registrationDeadlineOverride: string | null; // ISO string or null
  revisedDates: string | null;
  revisedVenue: string | null;
  draft: {
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
  };
  published: {
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    publishedAt: string | null;
    publishedBy: string | null;
  } | null;
  isVisible: boolean;
  updatedBy: string | null;
  updatedAt: string | null;
}

const ANNOUNCEMENT_KEY = 'event_announcement';

// ── Default record seeded on first access ────────────────────────────────────
const DEFAULT_ANNOUNCEMENT: AnnouncementRecord = {
  eventStatus: 'POSTPONED',
  freshRegistrationStatus: 'NOT_OPEN',
  registrationDeadlineOverride: null,
  revisedDates: null,
  revisedVenue: null,
  draft: {
    title: 'YDS 2026 Has Been Postponed',
    bannerMessage:
      'The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Fresh registrations will be invited once revised details are confirmed.',
    fullBody: `Dear Participants,

The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Our vision is to provide every participant with a meaningful and authentic parliamentary experience, and we need additional time to ensure that the venue and arrangements meet the standards envisioned for this event.

We sincerely regret any inconvenience caused and appreciate your patience and understanding.

Fresh registrations will be invited. The revised event dates, venue details, registration deadline, and fresh registration instructions will be announced through our official website once they are finalised.

Thank you for your continued interest in YDS 2026. We look forward to welcoming you to a more engaging and memorable parliamentary experience.

— Organising Team
Youth Democratic Summit 2026 | NSS MJCET`,
    reason: 'Venue-related issues requiring additional time for arrangements.',
  },
  published: {
    title: 'YDS 2026 Has Been Postponed',
    bannerMessage:
      'The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Fresh registrations will be invited once revised details are confirmed.',
    fullBody: `Dear Participants,

The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Our vision is to provide every participant with a meaningful and authentic parliamentary experience, and we need additional time to ensure that the venue and arrangements meet the standards envisioned for this event.

We sincerely regret any inconvenience caused and appreciate your patience and understanding.

Fresh registrations will be invited. The revised event dates, venue details, registration deadline, and fresh registration instructions will be announced through our official website once they are finalised.

Thank you for your continued interest in YDS 2026. We look forward to welcoming you to a more engaging and memorable parliamentary experience.

— Organising Team
Youth Democratic Summit 2026 | NSS MJCET`,
    reason: 'Venue-related issues requiring additional time for arrangements.',
    publishedAt: new Date().toISOString(),
    publishedBy: 'system',
  },
  isVisible: true,
  updatedBy: 'system',
  updatedAt: new Date().toISOString(),
};

// ── Internal helpers ──────────────────────────────────────────────────────────

async function getAnnouncementDoc(): Promise<AnnouncementRecord> {
  const db = await getMongoDb();
  let doc = await db.collection('settings').findOne({ key: ANNOUNCEMENT_KEY });
  if (!doc) {
    // Seed the default postponement announcement on first access
    await db.collection('settings').insertOne({
      key: ANNOUNCEMENT_KEY,
      ...DEFAULT_ANNOUNCEMENT,
    });
    doc = await db.collection('settings').findOne({ key: ANNOUNCEMENT_KEY });
  }

  const d = doc || {};
  const draftObj = (d['draft'] as any) || {};
  const pubObj = (d['published'] as any) || null;

  return {
    eventStatus: (d['eventStatus'] as any) || DEFAULT_ANNOUNCEMENT.eventStatus,
    freshRegistrationStatus: (d['freshRegistrationStatus'] as any) || DEFAULT_ANNOUNCEMENT.freshRegistrationStatus,
    registrationDeadlineOverride: (d['registrationDeadlineOverride'] as any) ?? null,
    revisedDates: (d['revisedDates'] as any) ?? null,
    revisedVenue: (d['revisedVenue'] as any) ?? null,
    draft: {
      title: draftObj['title'] ?? DEFAULT_ANNOUNCEMENT.draft.title,
      bannerMessage: draftObj['bannerMessage'] ?? DEFAULT_ANNOUNCEMENT.draft.bannerMessage,
      fullBody: draftObj['fullBody'] ?? DEFAULT_ANNOUNCEMENT.draft.fullBody,
      reason: draftObj['reason'] ?? DEFAULT_ANNOUNCEMENT.draft.reason,
    },
    published: pubObj
      ? {
          title: pubObj['title'] ?? DEFAULT_ANNOUNCEMENT.draft.title,
          bannerMessage: pubObj['bannerMessage'] ?? DEFAULT_ANNOUNCEMENT.draft.bannerMessage,
          fullBody: pubObj['fullBody'] ?? DEFAULT_ANNOUNCEMENT.draft.fullBody,
          reason: pubObj['reason'] ?? DEFAULT_ANNOUNCEMENT.draft.reason,
          publishedAt: (pubObj['publishedAt'] as string) || null,
          publishedBy: (pubObj['publishedBy'] as string) || null,
        }
      : null,
    isVisible: d['isVisible'] !== false,
    updatedBy: (d['updatedBy'] as string) || null,
    updatedAt: (d['updatedAt'] as string) || null,
  };
}

// ── Public read (no auth required) ───────────────────────────────────────────

/**
 * Returns only the fields needed by the public homepage.
 * Never exposes admin-only or applicant data.
 */
export async function getPublicAnnouncement() {
  const rec = await getAnnouncementDoc();

  return {
    eventStatus: rec.eventStatus,
    freshRegistrationStatus: rec.freshRegistrationStatus,
    registrationDeadlineOverride: rec.registrationDeadlineOverride,
    revisedDates: rec.revisedDates,
    revisedVenue: rec.revisedVenue,
    isVisible: rec.isVisible,
    announcement: rec.isVisible && rec.published
      ? {
          title: rec.published.title,
          bannerMessage: rec.published.bannerMessage,
          fullBody: rec.published.fullBody,
          reason: rec.published.reason,
          publishedAt: rec.published.publishedAt,
        }
      : null,
  };
}

// ── Admin reads ───────────────────────────────────────────────────────────────

export async function getAnnouncementAdmin(idToken: string) {
  await requireAdminByToken(idToken);
  return getAnnouncementDoc();
}

// ── Admin writes ──────────────────────────────────────────────────────────────

export async function saveDraftAnnouncement(
  idToken: string,
  draft: {
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    eventStatus: EventStatus;
    freshRegistrationStatus: FreshRegistrationStatus;
    registrationDeadlineOverride?: string | null;
    revisedDates?: string | null;
    revisedVenue?: string | null;
  },
) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  await db.collection('settings').updateOne(
    { key: ANNOUNCEMENT_KEY },
    {
      $set: {
        key: ANNOUNCEMENT_KEY,
        'draft.title': draft.title,
        'draft.bannerMessage': draft.bannerMessage,
        'draft.fullBody': draft.fullBody,
        'draft.reason': draft.reason,
        eventStatus: draft.eventStatus,
        freshRegistrationStatus: draft.freshRegistrationStatus,
        registrationDeadlineOverride: draft.registrationDeadlineOverride ?? null,
        revisedDates: draft.revisedDates ?? null,
        revisedVenue: draft.revisedVenue ?? null,
        updatedBy: admin.email,
        updatedAt: now,
      },
    },
    { upsert: true },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'settings',
    documentId: ANNOUNCEMENT_KEY,
    action: 'ANNOUNCEMENT_DRAFT_SAVED',
    adminEmail: admin.email,
    timestamp: now,
    details: `Draft saved. Status: ${draft.eventStatus}, Registration: ${draft.freshRegistrationStatus}`,
  });

  // Invalidate public cache so the next public fetch is fresh
  invalidatePublicDataCache();
  return { success: true };
}

export async function publishAnnouncement(
  idToken: string,
  draft: {
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    eventStatus: EventStatus;
    freshRegistrationStatus: FreshRegistrationStatus;
    registrationDeadlineOverride?: string | null;
    revisedDates?: string | null;
    revisedVenue?: string | null;
  },
) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  const publishedRecord = {
    title: draft.title,
    bannerMessage: draft.bannerMessage,
    fullBody: draft.fullBody,
    reason: draft.reason,
    publishedAt: now,
    publishedBy: admin.email,
  };

  await db.collection('settings').updateOne(
    { key: ANNOUNCEMENT_KEY },
    {
      $set: {
        key: ANNOUNCEMENT_KEY,
        'draft.title': draft.title,
        'draft.bannerMessage': draft.bannerMessage,
        'draft.fullBody': draft.fullBody,
        'draft.reason': draft.reason,
        published: publishedRecord,
        eventStatus: draft.eventStatus,
        freshRegistrationStatus: draft.freshRegistrationStatus,
        registrationDeadlineOverride: draft.registrationDeadlineOverride ?? null,
        revisedDates: draft.revisedDates ?? null,
        revisedVenue: draft.revisedVenue ?? null,
        isVisible: true,
        updatedBy: admin.email,
        updatedAt: now,
      },
    },
    { upsert: true },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'settings',
    documentId: ANNOUNCEMENT_KEY,
    action: 'ANNOUNCEMENT_PUBLISHED',
    adminEmail: admin.email,
    timestamp: now,
    details: `Announcement published. Status: ${draft.eventStatus}, Registration: ${draft.freshRegistrationStatus}, Title: "${draft.title}"`,
  });

  invalidatePublicDataCache();
  return { success: true, publishedAt: now };
}

export async function hideAnnouncement(idToken: string) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  await db.collection('settings').updateOne(
    { key: ANNOUNCEMENT_KEY },
    { $set: { isVisible: false, updatedBy: admin.email, updatedAt: now } },
    { upsert: true },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'settings',
    documentId: ANNOUNCEMENT_KEY,
    action: 'ANNOUNCEMENT_HIDDEN',
    adminEmail: admin.email,
    timestamp: now,
    details: 'Public announcement hidden by administrator.',
  });

  invalidatePublicDataCache();
  return { success: true };
}

export async function showAnnouncement(idToken: string) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  await db.collection('settings').updateOne(
    { key: ANNOUNCEMENT_KEY },
    { $set: { isVisible: true, updatedBy: admin.email, updatedAt: now } },
    { upsert: true },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'settings',
    documentId: ANNOUNCEMENT_KEY,
    action: 'ANNOUNCEMENT_SHOWN',
    adminEmail: admin.email,
    timestamp: now,
    details: 'Public announcement made visible by administrator.',
  });

  invalidatePublicDataCache();
  return { success: true };
}

// ── Registration status enforcement (server-side) ─────────────────────────────

/**
 * Checks whether registration is currently open according to the persisted
 * announcement settings. Throws if registration is not open.
 */
export async function enforceRegistrationOpen() {
  const rec = await getAnnouncementDoc();

  if (rec.freshRegistrationStatus !== 'OPEN') {
    if (rec.freshRegistrationStatus === 'NOT_OPEN') {
      throw new Error(
        'REGISTRATION_NOT_OPEN: Fresh registrations have not yet opened. Please check the official website for updates.',
      );
    }
    throw new Error(
      'REGISTRATION_CLOSED: The registration period is currently closed.',
    );
  }

  // Check deadline override if set
  if (rec.registrationDeadlineOverride) {
    const deadline = new Date(rec.registrationDeadlineOverride);
    if (new Date() > deadline) {
      throw new Error(
        'DEADLINE_PASSED: The registration deadline has passed. Submissions are now closed.',
      );
    }
  }
}
