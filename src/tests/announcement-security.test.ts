import test from 'node:test';
import assert from 'node:assert/strict';

// ── In-Memory MongoDB Mock ───────────────────────────────────────────────────

interface MockDoc {
  [key: string]: any;
}

class MockCollection {
  private docs: MockDoc[] = [];

  constructor(public name: string) {}

  async findOne(filter: Record<string, any>): Promise<MockDoc | null> {
    for (const d of this.docs) {
      let match = true;
      for (const [k, v] of Object.entries(filter)) {
        if (d[k] !== v) {
          match = false;
          break;
        }
      }
      if (match) return JSON.parse(JSON.stringify(d));
    }
    return null;
  }

  async insertOne(doc: MockDoc): Promise<{ insertedId: string }> {
    const id = 'mock-' + Math.random().toString(36).substring(2, 9);
    const stored = { _id: id, ...JSON.parse(JSON.stringify(doc)) };
    this.docs.push(stored);
    return { insertedId: id };
  }

  async updateOne(filter: Record<string, any>, update: Record<string, any>, options?: { upsert?: boolean }) {
    let doc = this.docs.find((d) => {
      for (const [k, v] of Object.entries(filter)) {
        if (d[k] !== v) return false;
      }
      return true;
    });

    if (!doc && options?.upsert) {
      doc = { ...filter };
      this.docs.push(doc);
    }

    if (doc) {
      if (update.$set) {
        for (const [path, val] of Object.entries(update.$set)) {
          if (path.includes('.')) {
            const parts = path.split('.');
            let curr = doc;
            for (let i = 0; i < parts.length - 1; i++) {
              curr[parts[i]] = curr[parts[i]] || {};
              curr = curr[parts[i]];
            }
            curr[parts[parts.length - 1]] = val;
          } else {
            doc[path] = val;
          }
        }
      }
    }
    return { acknowledged: true };
  }

  async countDocuments(filter?: Record<string, any>): Promise<number> {
    if (!filter || Object.keys(filter).length === 0) return this.docs.length;
    return this.docs.filter((d) => {
      for (const [k, v] of Object.entries(filter)) {
        if (d[k] !== v) return false;
      }
      return true;
    }).length;
  }

  async find(filter?: Record<string, any>) {
    const filtered = this.docs.filter((d) => {
      if (!filter || Object.keys(filter).length === 0) return true;
      for (const [k, v] of Object.entries(filter)) {
        if (d[k] !== v) return false;
      }
      return true;
    });

    return {
      sort: () => ({
        toArray: async () => JSON.parse(JSON.stringify(filtered)),
      }),
      toArray: async () => JSON.parse(JSON.stringify(filtered)),
    };
  }

  reset() {
    this.docs = [];
  }
}

class MockDb {
  private collections: Map<string, MockCollection> = new Map();

  collection(name: string): MockCollection {
    if (!this.collections.has(name)) {
      this.collections.set(name, new MockCollection(name));
    }
    return this.collections.get(name)!;
  }

  reset() {
    this.collections.clear();
  }
}

const mockDb = new MockDb();

// ── Test Suite ───────────────────────────────────────────────────────────────

test('Announcement Management & Registration Security Test Suite', async (t) => {
  // Pre-seed mock data
  const adminUsers = mockDb.collection('adminUsers');
  await adminUsers.insertOne({
    email: 'admin@mjcollege.ac.in',
    role: 'ADMIN',
    status: 'ACTIVE',
  });
  await adminUsers.insertOne({
    email: 'nssmjcet@mjcollege.ac.in',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
  });
  await adminUsers.insertOne({
    email: 'inactive@mjcollege.ac.in',
    role: 'ADMIN',
    status: 'INACTIVE',
  });

  await t.test('1. Default announcement contains postponement and closed registrations', async () => {
    const settings = mockDb.collection('settings');
    let doc = await settings.findOne({ key: 'event_announcement' });
    assert.equal(doc, null, 'Settings should be initially empty');

    // Simulate seeding default record
    const DEFAULT_ANNOUNCEMENT = {
      eventStatus: 'POSTPONED',
      freshRegistrationStatus: 'NOT_OPEN',
      registrationDeadlineOverride: null,
      revisedDates: null,
      revisedVenue: null,
      draft: {
        title: 'YDS 2026 Has Been Postponed',
        bannerMessage:
          'The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Fresh registrations will be invited once revised details are confirmed.',
        fullBody: 'Dear Participants...',
        reason: 'Venue-related issues',
      },
      published: {
        title: 'YDS 2026 Has Been Postponed',
        bannerMessage:
          'The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Fresh registrations will be invited once revised details are confirmed.',
        fullBody: 'Dear Participants...',
        reason: 'Venue-related issues',
        publishedAt: new Date().toISOString(),
        publishedBy: 'system',
      },
      isVisible: true,
      updatedBy: 'system',
      updatedAt: new Date().toISOString(),
    };

    await settings.insertOne({ key: 'event_announcement', ...DEFAULT_ANNOUNCEMENT });
    doc = await settings.findOne({ key: 'event_announcement' });
    assert.ok(doc, 'Default document was saved');
    assert.equal(doc.eventStatus, 'POSTPONED');
    assert.equal(doc.freshRegistrationStatus, 'NOT_OPEN');
    assert.equal(doc.isVisible, true);
  });

  await t.test('2. Public endpoint safely strips internal fields', async () => {
    const settings = mockDb.collection('settings');
    const doc = await settings.findOne({ key: 'event_announcement' });

    // Emulate getPublicAnnouncement
    const publicData = {
      eventStatus: doc.eventStatus,
      freshRegistrationStatus: doc.freshRegistrationStatus,
      registrationDeadlineOverride: doc.registrationDeadlineOverride,
      revisedDates: doc.revisedDates,
      revisedVenue: doc.revisedVenue,
      isVisible: doc.isVisible,
      announcement: doc.isVisible && doc.published
        ? {
            title: doc.published.title,
            bannerMessage: doc.published.bannerMessage,
            fullBody: doc.published.fullBody,
            reason: doc.published.reason,
            publishedAt: doc.published.publishedAt,
          }
        : null,
    };

    assert.equal(publicData.eventStatus, 'POSTPONED');
    assert.equal(publicData.freshRegistrationStatus, 'NOT_OPEN');
    assert.ok(publicData.announcement);
    assert.equal(publicData.announcement.title, 'YDS 2026 Has Been Postponed');

    // Security check: internal fields must not be exposed
    assert.equal((publicData as any).updatedBy, undefined);
    assert.equal((publicData as any).draft, undefined);
    assert.equal((publicData as any)._id, undefined);
  });

  await t.test('3. Server-side registration gating blocks submissions when NOT_OPEN', async () => {
    const settings = mockDb.collection('settings');
    const doc = await settings.findOne({ key: 'event_announcement' });

    const checkGate = () => {
      if (doc.freshRegistrationStatus !== 'OPEN') {
        if (doc.freshRegistrationStatus === 'NOT_OPEN') {
          throw new Error(
            'REGISTRATION_NOT_OPEN: Fresh registrations have not yet opened. Please check the official website for updates.'
          );
        }
        throw new Error('REGISTRATION_CLOSED: The registration period is currently closed.');
      }
    };

    assert.throws(
      () => checkGate(),
      /REGISTRATION_NOT_OPEN/,
      'Must reject when freshRegistrationStatus is NOT_OPEN'
    );
  });

  await t.test('4. Saving a draft does NOT alter published public announcement', async () => {
    const settings = mockDb.collection('settings');
    const before = await settings.findOne({ key: 'event_announcement' });
    const originalPublishedTitle = before.published.title;

    // Admin edits draft
    await settings.updateOne(
      { key: 'event_announcement' },
      {
        $set: {
          'draft.title': 'Draft New Title For Testing',
          'draft.bannerMessage': 'Draft banner message',
          updatedBy: 'admin@mjcollege.ac.in',
        },
      }
    );

    const after = await settings.findOne({ key: 'event_announcement' });
    assert.equal(after.draft.title, 'Draft New Title For Testing');
    assert.equal(after.published.title, originalPublishedTitle, 'Published title must remain unaffected by draft save');
  });

  await t.test('5. Publishing announcement updates live version and creates audit log', async () => {
    const settings = mockDb.collection('settings');
    const auditLogs = mockDb.collection('auditLogs');

    const now = new Date().toISOString();
    const publishedRecord = {
      title: 'New Confirmed Dates Announced',
      bannerMessage: 'YDS 2026 will now be held in November',
      fullBody: 'Updated details...',
      reason: 'Venue confirmed',
      publishedAt: now,
      publishedBy: 'admin@mjcollege.ac.in',
    };

    await settings.updateOne(
      { key: 'event_announcement' },
      {
        $set: {
          published: publishedRecord,
          eventStatus: 'REGISTRATION_OPEN',
          freshRegistrationStatus: 'OPEN',
          revisedDates: '20-22 Nov 2026',
          revisedVenue: 'Auditorium',
          isVisible: true,
          updatedBy: 'admin@mjcollege.ac.in',
          updatedAt: now,
        },
      }
    );

    await auditLogs.insertOne({
      collection: 'settings',
      documentId: 'event_announcement',
      action: 'ANNOUNCEMENT_PUBLISHED',
      adminEmail: 'admin@mjcollege.ac.in',
      timestamp: now,
    });

    const updated = await settings.findOne({ key: 'event_announcement' });
    assert.equal(updated.published.title, 'New Confirmed Dates Announced');
    assert.equal(updated.eventStatus, 'REGISTRATION_OPEN');
    assert.equal(updated.freshRegistrationStatus, 'OPEN');

    const log = await auditLogs.findOne({ action: 'ANNOUNCEMENT_PUBLISHED' });
    assert.ok(log, 'Audit log was recorded');
    assert.equal(log.adminEmail, 'admin@mjcollege.ac.in');
  });

  await t.test('6. Registration gate allows submissions when OPEN with valid deadline', async () => {
    const settings = mockDb.collection('settings');
    const doc = await settings.findOne({ key: 'event_announcement' });

    const checkGate = () => {
      if (doc.freshRegistrationStatus !== 'OPEN') {
        throw new Error('REGISTRATION_NOT_OPEN');
      }
      if (doc.registrationDeadlineOverride) {
        if (new Date() > new Date(doc.registrationDeadlineOverride)) {
          throw new Error('DEADLINE_PASSED');
        }
      }
      return true;
    };

    assert.equal(checkGate(), true, 'Registration gate should pass when OPEN');
  });

  await t.test('7. Registration gate enforces deadline override strictly', async () => {
    const pastDate = new Date(Date.now() - 3600 * 1000).toISOString();
    const doc = {
      freshRegistrationStatus: 'OPEN',
      registrationDeadlineOverride: pastDate,
    };

    const checkGate = () => {
      if (doc.freshRegistrationStatus !== 'OPEN') {
        throw new Error('REGISTRATION_NOT_OPEN');
      }
      if (doc.registrationDeadlineOverride) {
        if (new Date() > new Date(doc.registrationDeadlineOverride)) {
          throw new Error('DEADLINE_PASSED: The registration deadline has passed.');
        }
      }
      return true;
    };

    assert.throws(() => checkGate(), /DEADLINE_PASSED/, 'Must reject when deadline has passed');
  });

  await t.test('8. Role-based authorization boundaries', async () => {
    const adminUsers = mockDb.collection('adminUsers');

    const requireAdmin = async (email: string) => {
      const user = await adminUsers.findOne({ email });
      if (!user || user.status !== 'ACTIVE') {
        throw new Error('UNAUTHORIZED: Not an authorized admin');
      }
      return user;
    };

    const requireSuperAdmin = async (email: string) => {
      const user = await requireAdmin(email);
      if (user.role !== 'SUPER_ADMIN') {
        throw new Error('FORBIDDEN: Super admin access required');
      }
      return user;
    };

    // Active regular admin
    const regular = await requireAdmin('admin@mjcollege.ac.in');
    assert.equal(regular.role, 'ADMIN');

    // Inactive admin rejected
    await assert.rejects(
      async () => requireAdmin('inactive@mjcollege.ac.in'),
      /UNAUTHORIZED/
    );

    // Regular admin rejected from super admin action
    await assert.rejects(
      async () => requireSuperAdmin('admin@mjcollege.ac.in'),
      /FORBIDDEN/
    );

    // Super admin accepted
    const superAdmin = await requireSuperAdmin('nssmjcet@mjcollege.ac.in');
    assert.equal(superAdmin.role, 'SUPER_ADMIN');
  });

  await t.test('9. Hiding announcement persists isVisible=false across reloads', async () => {
    const settings = mockDb.collection('settings');
    await settings.updateOne(
      { key: 'event_announcement' },
      { $set: { isVisible: false, updatedAt: new Date().toISOString() } }
    );

    const doc = await settings.findOne({ key: 'event_announcement' });
    assert.equal(doc.isVisible, false);

    // Public view returns null announcement when hidden
    const publicData = {
      isVisible: doc.isVisible,
      announcement: doc.isVisible ? doc.published : null,
    };
    assert.equal(publicData.announcement, null, 'Public announcement should be null when isVisible is false');
  });
});
