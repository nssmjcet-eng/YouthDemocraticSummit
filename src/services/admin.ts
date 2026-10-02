import { ObjectId } from 'mongodb';
import { getMongoDb } from './mongo-client';
import { requireAdminByToken, requireSuperAdminByToken } from './auth';
import { YDS_CONFIG } from '@/config/yds';

import { invalidatePublicDataCache } from './public';

export async function getApplications(
  idToken: string,
  filterOrOptions?: string | {
    statusFilter?: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const options = typeof filterOrOptions === 'string'
    ? { statusFilter: filterOrOptions }
    : filterOrOptions || {};

  const { statusFilter, page, pageSize = 20, searchQuery } = options;

  const filter: Record<string, unknown> = {};
  if (statusFilter && statusFilter !== 'ALL') {
    filter['status'] = statusFilter;
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(q, 'i');
    filter['$or'] = [
      { applicationId: regex },
      { temporaryTeamName: regex },
      { 'teamLeader.fullName': regex },
      { 'teamLeader.email': regex },
      { 'teamLeader.collegeName': regex },
    ];
  }

  if (typeof page === 'number' && page > 0) {
    const skip = (page - 1) * pageSize;
    const totalCount = await db.collection('applications').countDocuments(filter);
    const docs = await db
      .collection('applications')
      .find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return {
      applications: docs.map((d) => ({
        id: d._id.toString(),
        ...d,
        _id: undefined,
      })),
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  const docs = await db
    .collection('applications')
    .find(filter)
    .sort({ submittedAt: -1 })
    .toArray();
  return docs.map((d) => ({
    id: d._id.toString(),
    ...d,
    _id: undefined,
  }));
}

export async function getApplication(idToken: string, id: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const doc = await db.collection('applications').findOne({ _id: new ObjectId(id) });
  if (!doc) throw new Error('Application not found');
  return { id: doc._id.toString(), ...doc, _id: undefined };
}

export async function updateApplicationStatus(
  idToken: string,
  id: string,
  status: 'ACCEPTED' | 'WAITLISTED' | 'DECLINED' | 'PENDING',
  adminNotes?: string,
) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const logEntry = {
    action: `Status changed to ${status}`,
    timestamp: new Date().toISOString(),
    adminEmail: admin.email,
    details: adminNotes || '',
  };

  await db.collection('applications').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        adminNotes: adminNotes || '',
        reviewedAt: new Date().toISOString(),
        reviewedBy: admin.email,
      },
      $push: { auditLog: logEntry } as any,
    },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'applications',
    documentId: id,
    action: logEntry.action,
    adminEmail: admin.email,
    timestamp: logEntry.timestamp,
    details: adminNotes || '',
  });

  invalidatePublicDataCache();
  return { success: true };
}

export async function allocateParty(idToken: string, applicationId: string, partyId: string) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const party = await db.collection('parties').findOne({ _id: new ObjectId(partyId) });
  if (!party) throw new Error('Party not found');
  if (party['assignedTeamId'] && party['assignedTeamId'] !== applicationId) {
    throw new Error('CONFLICT: Party already allocated to another team');
  }

  const app = await db.collection('applications').findOne({ _id: new ObjectId(applicationId) });
  if (!app) throw new Error('Application not found');
  if (app['status'] !== 'ACCEPTED') throw new Error('Only ACCEPTED teams can be allocated a party');

  if (app['assignedPartyId']) {
    await db.collection('parties').updateOne(
      { _id: new ObjectId(app['assignedPartyId'] as string) },
      { $set: { assignedTeamId: null, assignedTeamName: null } },
    );
  }

  const now = new Date().toISOString();
  await db.collection('parties').updateOne(
    { _id: new ObjectId(partyId) },
    { $set: { assignedTeamId: applicationId, assignedTeamName: app['temporaryTeamName'] } },
  );

  await db.collection('applications').updateOne(
    { _id: new ObjectId(applicationId) },
    {
      $set: { assignedPartyId: partyId, assignedPartyName: party['name'] },
      $push: {
        auditLog: {
          action: `Party allocated: ${party['name']}`,
          timestamp: now,
          adminEmail: admin.email,
        },
      } as any,
    },
  );

  invalidatePublicDataCache();
  return { success: true };
}

export async function getParties(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('parties').find({}).sort({ sortOrder: 1 }).toArray();
  return docs.map((d) => ({
    id: d._id.toString(),
    ...d,
    classification: d.classification === 'INC' ? 'I.N.D.I.A' : d.classification,
    _id: undefined,
  }));
}

export async function upsertParty(
  idToken: string,
  partyData: {
    id?: string;
    name: string;
    abbreviation?: string;
    ideology?: string;
    historyDescription?: string;
    logoId?: string;
    sortOrder?: number;
    classification?: string;
    formationDate?: string;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  const payload = {
    name: partyData.name,
    abbreviation: partyData.abbreviation || null,
    ideology: partyData.ideology || null,
    historyDescription: partyData.historyDescription || null,
    logoId: partyData.logoId || null,
    sortOrder: partyData.sortOrder ?? 99,
    classification: partyData.classification || null,
    formationDate: partyData.formationDate || null,
    updatedAt: now,
  };

  if (partyData.id) {
    await db.collection('parties').updateOne({ _id: new ObjectId(partyData.id) }, { $set: payload });
    invalidatePublicDataCache();
    return { id: partyData.id };
  } else {
    const result = await db.collection('parties').insertOne({
      ...payload,
      assignedTeamId: null,
      assignedTeamName: null,
      createdAt: now,
    });
    invalidatePublicDataCache();
    return { id: result.insertedId.toString() };
  }
}

export async function deleteParty(idToken: string, id: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  await db.collection('parties').deleteOne({ _id: new ObjectId(id) });
  invalidatePublicDataCache();
  return { success: true };
}

export async function getSponsors(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('sponsors').find({}).sort({ displayOrder: 1 }).toArray();
  return docs.map((d) => ({ id: d._id.toString(), ...d, _id: undefined }));
}

export async function upsertSponsor(
  idToken: string,
  sponsorData: {
    id?: string;
    name: string;
    category: string;
    websiteUrl?: string;
    description?: string;
    logoId?: string;
    displayOrder?: number;
    isActive?: boolean;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  const payload = {
    name: sponsorData.name,
    category: sponsorData.category,
    websiteUrl: sponsorData.websiteUrl || null,
    description: sponsorData.description || null,
    logoId: sponsorData.logoId || null,
    displayOrder: sponsorData.displayOrder ?? 99,
    isActive: sponsorData.isActive !== false,
    updatedAt: now,
  };

  if (sponsorData.id) {
    await db.collection('sponsors').updateOne({ _id: new ObjectId(sponsorData.id) }, { $set: payload });
    invalidatePublicDataCache();
    return { id: sponsorData.id };
  } else {
    const result = await db.collection('sponsors').insertOne({ ...payload, createdAt: now });
    invalidatePublicDataCache();
    return { id: result.insertedId.toString() };
  }
}

export async function deleteSponsor(idToken: string, id: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  await db.collection('sponsors').deleteOne({ _id: new ObjectId(id) });
  invalidatePublicDataCache();
  return { success: true };
}

export async function getResultsStatus(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const doc = await db.collection('settings').findOne({ key: 'results' });
  return { released: doc?.['released'] === true, updatedAt: (doc?.['updatedAt'] as string) || null };
}

export async function setResultsStatus(idToken: string, released: boolean) {
  const admin = await requireSuperAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();

  await db.collection('settings').updateOne(
    { key: 'results' },
    { $set: { key: 'results', released, updatedAt: now, updatedBy: admin.email } },
    { upsert: true },
  );

  await db.collection('auditLogs').insertOne({
    collection: 'settings',
    documentId: 'results',
    action: released ? 'Results released to public' : 'Results hidden from public',
    adminEmail: admin.email,
    timestamp: now,
  });

  invalidatePublicDataCache();
  return { success: true };
}

export async function getAdminUsers(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('adminUsers').find({}).sort({ addedAt: -1 }).toArray();
  return docs.map((d) => ({
    id: d._id.toString(),
    email: d['email'] as string,
    role: d['role'] as string,
    status: d['status'] as string,
    addedBy: d['addedBy'] as string,
    addedAt: d['addedAt'] as string,
    lastLoginAt: (d['lastLoginAt'] as string) || null,
    _id: undefined,
  }));
}

export async function addAdminUser(idToken: string, email: string, role?: 'ADMIN' | 'SUPER_ADMIN') {
  const superAdmin = await requireSuperAdminByToken(idToken);
  const db = await getMongoDb();

  const cleanEmail = email.trim().toLowerCase();
  
  let finalRole = role || 'ADMIN';
  if (cleanEmail === YDS_CONFIG.SUPER_ADMIN_EMAIL.toLowerCase()) {
    finalRole = 'SUPER_ADMIN';
  }

  const existing = await db.collection('adminUsers').findOne({ email: cleanEmail });

  if (existing) {
    await db.collection('adminUsers').updateOne(
      { email: cleanEmail },
      { $set: { status: 'ACTIVE', role: finalRole, updatedAt: new Date().toISOString(), addedBy: superAdmin.email } },
    );
    return { success: true, created: false };
  }

  await db.collection('adminUsers').insertOne({
    email: cleanEmail,
    role: finalRole,
    status: 'ACTIVE',
    addedBy: superAdmin.email,
    addedAt: new Date().toISOString(),
    firebaseUid: null,
    lastLoginAt: null,
  });

  return { success: true, created: true };
}

export async function removeAdminUser(idToken: string, email: string) {
  const superAdmin = await requireSuperAdminByToken(idToken);
  const cleanEmail = email.trim().toLowerCase();

  if (cleanEmail === YDS_CONFIG.SUPER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error('FORBIDDEN: Cannot remove the super admin account');
  }

  const db = await getMongoDb();
  await db.collection('adminUsers').updateOne(
    { email: cleanEmail },
    { $set: { status: 'INACTIVE', deactivatedBy: superAdmin.email, deactivatedAt: new Date().toISOString() } },
  );

  return { success: true };
}

export async function getAuditLogs(idToken: string, limit = 100) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db
    .collection('auditLogs')
    .find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
  return docs.map((d) => ({ id: d._id.toString(), ...d, _id: undefined }));
}

export async function getStats(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const [total, pending, accepted, waitlisted, declined, partiesWithTeam, totalSponsors] = await Promise.all([
    db.collection('applications').countDocuments(),
    db.collection('applications').countDocuments({ status: 'PENDING' }),
    db.collection('applications').countDocuments({ status: 'ACCEPTED' }),
    db.collection('applications').countDocuments({ status: 'WAITLISTED' }),
    db.collection('applications').countDocuments({ status: 'DECLINED' }),
    db.collection('parties').countDocuments({ assignedTeamId: { $ne: null } }),
    db.collection('sponsors').countDocuments({ isActive: true }),
  ]);

  return {
    total,
    pending,
    accepted,
    waitlisted,
    declined,
    partiesAllocated: partiesWithTeam,
    partiesRemaining: YDS_CONFIG.totalParties - partiesWithTeam,
    activeSponsors: totalSponsors,
  };
}

// ── Organisers ────────────────────────────────────────────────────────────────

export async function getOrganisers(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('organisers').find({}).sort({ displayOrder: 1 }).toArray();
  return docs.map((d) => ({ id: d._id.toString(), ...d, _id: undefined }));
}

export async function upsertOrganiser(
  idToken: string,
  data: {
    id?: string;
    name: string;
    designation: string;
    photoId?: string;
    displayOrder?: number;
    isActive?: boolean;
    linkedinUrl?: string;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();
  const payload = {
    name: data.name,
    designation: data.designation,
    photoId: data.photoId || null,
    displayOrder: data.displayOrder ?? 99,
    isActive: data.isActive !== false,
    linkedinUrl: data.linkedinUrl || null,
    updatedAt: now,
  };
  if (data.id) {
    await db.collection('organisers').updateOne({ _id: new ObjectId(data.id) }, { $set: payload });
    invalidatePublicDataCache();
    return { id: data.id };
  }
  const result = await db.collection('organisers').insertOne({ ...payload, createdAt: now });
  invalidatePublicDataCache();
  return { id: result.insertedId.toString() };
}

export async function deleteOrganiser(idToken: string, id: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  await db.collection('organisers').deleteOne({ _id: new ObjectId(id) });
  invalidatePublicDataCache();
  return { success: true };
}

// ── Co-Organisers ─────────────────────────────────────────────────────────────

export async function getCoOrganisers(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('coOrganisers').find({}).sort({ displayOrder: 1 }).toArray();
  return docs.map((d) => ({ id: d._id.toString(), ...d, _id: undefined }));
}

export async function upsertCoOrganiser(
  idToken: string,
  data: {
    id?: string;
    name: string;
    designation: string;
    photoId?: string;
    displayOrder?: number;
    isActive?: boolean;
    linkedinUrl?: string;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const now = new Date().toISOString();
  const payload = {
    name: data.name,
    designation: data.designation,
    photoId: data.photoId || null,
    displayOrder: data.displayOrder ?? 99,
    isActive: data.isActive !== false,
    linkedinUrl: data.linkedinUrl || null,
    updatedAt: now,
  };
  if (data.id) {
    await db.collection('coOrganisers').updateOne({ _id: new ObjectId(data.id) }, { $set: payload });
    invalidatePublicDataCache();
    return { id: data.id };
  }
  const result = await db.collection('coOrganisers').insertOne({ ...payload, createdAt: now });
  invalidatePublicDataCache();
  return { id: result.insertedId.toString() };
}

export async function deleteCoOrganiser(idToken: string, id: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  await db.collection('coOrganisers').deleteOne({ _id: new ObjectId(id) });
  invalidatePublicDataCache();
  return { success: true };
}

// ── Developers ────────────────────────────────────────────────────────────────

export async function getDevelopers(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  const docs = await db.collection('developers').find({}).sort({ displayOrder: 1 }).toArray();
  return docs.map((d) => ({ id: d._id.toString(), ...d, _id: undefined }));
}

export async function upsertDeveloper(
  idToken: string,
  data: {
    id: string;
    githubUrl?: string;
    linkedinUrl?: string;
  },
) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  await db.collection('developers').updateOne(
    { _id: new ObjectId(data.id) },
    { $set: { githubUrl: data.githubUrl || null, linkedinUrl: data.linkedinUrl || null, updatedAt: new Date().toISOString() } },
  );
  invalidatePublicDataCache();
  return { success: true };
}

// ── DB Stats & Storage Monitoring ─────────────────────────────────────────────

export async function getDbStats(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();
  try {
    const stats = await db.command({ dbStats: 1, scale: 1024 * 1024 });
    const dataSize = Math.round((stats.dataSize as number) || 0);
    const storageSize = Math.round((stats.storageSize as number) || 0);
    const indexSize = Math.round((stats.indexSize as number) || 0);
    const totalMB = Math.round((stats.totalSize as number) || storageSize + indexSize);
    const FREE_TIER_LIMIT_MB = 512;
    const usedPct = Math.round((totalMB / FREE_TIER_LIMIT_MB) * 100);
    const level = usedPct < 70 ? 'normal' : usedPct < 90 ? 'warning' : 'critical';
    return { dataSize, storageSize, indexSize, totalMB, freeTierLimitMB: FREE_TIER_LIMIT_MB, usedPct, level };
  } catch {
    return { dataSize: 0, storageSize: 0, indexSize: 0, totalMB: 0, freeTierLimitMB: 512, usedPct: 0, level: 'normal' as const };
  }
}

// ── Data Export ───────────────────────────────────────────────────────────────

export async function exportAllData(idToken: string) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const serialize = (docs: any[]) =>
    docs.map((d) => ({ ...d, _id: d._id?.toString(), id: d._id?.toString() }));

  const [applications, parties, sponsors, organisers, coOrganisers, developers, adminUsers, auditLogs] =
    await Promise.all([
      db.collection('applications').find({}).toArray(),
      db.collection('parties').find({}).toArray(),
      db.collection('sponsors').find({}).toArray(),
      db.collection('organisers').find({}).toArray(),
      db.collection('coOrganisers').find({}).toArray(),
      db.collection('developers').find({}).toArray(),
      db.collection('adminUsers').find({}).toArray(),
      db.collection('auditLogs').find({}).sort({ timestamp: -1 }).limit(2000).toArray(),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    applications: serialize(applications),
    parties: serialize(parties),
    sponsors: serialize(sponsors),
    organisers: serialize(organisers),
    coOrganisers: serialize(coOrganisers),
    developers: serialize(developers),
    adminUsers: serialize(adminUsers).map((u) => ({ ...u, firebaseUid: '[REDACTED]' })),
    auditLogs: serialize(auditLogs),
  };
}

// ── Master Compendium & Application Export System ─────────────────────────────

export interface CompendiumOptions {
  statusFilter?: string; // 'ALL' | 'ACCEPTED' | 'WAITLISTED' | 'DECLINED' | 'PENDING'
  collegeFilter?: string;
  dateRange?: string; // 'ALL' | 'TODAY' | '7DAYS' | '30DAYS' | 'CUSTOM'
  customDateFrom?: string;
  customDateTo?: string;
  searchQuery?: string;
  sortBy?: 'submittedAt' | 'teamName' | 'leaderName' | 'college' | 'status';
  sortOrder?: 1 | -1;
  page?: number;
  pageSize?: number;
}

function buildCompendiumQuery(options: CompendiumOptions) {
  const filter: Record<string, unknown> = {};

  if (options.statusFilter && options.statusFilter !== 'ALL') {
    filter['status'] = options.statusFilter;
  }

  if (options.collegeFilter && options.collegeFilter !== 'ALL') {
    filter['teamLeader.collegeName'] = options.collegeFilter;
  }

  const now = new Date();
  if (options.dateRange === 'TODAY') {
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    filter['submittedAt'] = { $gte: startOfToday };
  } else if (options.dateRange === '7DAYS') {
    const past7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    filter['submittedAt'] = { $gte: past7 };
  } else if (options.dateRange === '30DAYS') {
    const past30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    filter['submittedAt'] = { $gte: past30 };
  } else if (options.dateRange === 'CUSTOM') {
    const dateCond: Record<string, string> = {};
    if (options.customDateFrom) {
      dateCond['$gte'] = options.customDateFrom.includes('T')
        ? options.customDateFrom
        : `${options.customDateFrom}T00:00:00.000Z`;
    }
    if (options.customDateTo) {
      dateCond['$lte'] = options.customDateTo.includes('T')
        ? options.customDateTo
        : `${options.customDateTo}T23:59:59.999Z`;
    }
    if (Object.keys(dateCond).length > 0) {
      filter['submittedAt'] = dateCond;
    }
  }

  if (options.searchQuery && options.searchQuery.trim()) {
    const q = options.searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(q, 'i');
    filter['$or'] = [
      { applicationId: regex },
      { temporaryTeamName: regex },
      { 'teamLeader.fullName': regex },
      { 'teamLeader.email': regex },
      { 'teamLeader.collegeName': regex },
      { 'teamLeader.contactNumber': regex },
      { 'members.fullName': regex },
      { 'members.email': regex },
      { 'members.contactNumber': regex },
    ];
  }

  return filter;
}

function mapToCompendiumTeam(doc: any, index: number) {
  const leader = doc.teamLeader || {};
  const rawMembers = Array.isArray(doc.members) ? doc.members : [];

  const member1 = {
    memberNumber: 1,
    isLeader: true,
    fullName: leader.fullName || 'N/A',
    email: leader.email || 'N/A',
    contactNumber: leader.contactNumber || 'N/A',
    college: leader.collegeName || 'N/A',
    yearOfStudy: leader.yearOfStudy || '',
    courseBranch: leader.courseBranch || '',
  };

  const otherMembers = rawMembers.slice(0, 4).map((m: any, idx: number) => ({
    memberNumber: idx + 2,
    isLeader: false,
    fullName: m?.fullName || 'N/A',
    email: m?.email || 'N/A',
    contactNumber: m?.contactNumber || 'N/A',
    college: m?.college || leader.collegeName || 'N/A',
    yearOfStudy: m?.yearOfStudy || '',
    courseBranch: m?.courseBranch || '',
  }));

  while (otherMembers.length < 4) {
    otherMembers.push({
      memberNumber: otherMembers.length + 2,
      isLeader: false,
      fullName: 'N/A',
      email: 'N/A',
      contactNumber: 'N/A',
      college: leader.collegeName || 'N/A',
      yearOfStudy: '',
      courseBranch: '',
    });
  }

  const allMembers = [member1, ...otherMembers];

  const isIncomplete =
    !leader.fullName ||
    !leader.email ||
    !leader.contactNumber ||
    rawMembers.length < 4 ||
    rawMembers.some((m: any) => !m?.fullName || !m?.contactNumber);

  const displayStatusMap: Record<string, string> = {
    ACCEPTED: 'SELECTED',
    WAITLISTED: 'WAITLISTED',
    DECLINED: 'NOT SELECTED',
    PENDING: 'PENDING',
  };

  return {
    sNo: index + 1,
    id: doc._id.toString(),
    applicationId: doc.applicationId || 'N/A',
    teamName: doc.temporaryTeamName || 'Unnamed Team',
    teamLeader: {
      fullName: leader.fullName || 'N/A',
      email: leader.email || 'N/A',
      contactNumber: leader.contactNumber || 'N/A',
      collegeName: leader.collegeName || 'N/A',
    },
    college: leader.collegeName || 'N/A',
    members: allMembers,
    totalMembers: 1 + rawMembers.length,
    status: doc.status || 'PENDING',
    displayStatus: displayStatusMap[doc.status] || 'PENDING',
    assignedPartyName: doc.assignedPartyName || null,
    submittedAt: doc.submittedAt || '',
    isIncomplete,
  };
}

export async function getCompendium(idToken: string, options: CompendiumOptions = {}) {
  await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const filter = buildCompendiumQuery(options);
  const { page = 1, pageSize = 50, sortBy = 'submittedAt', sortOrder = -1 } = options;

  let sortStage: Record<string, 1 | -1> = { submittedAt: -1 };
  if (sortBy === 'teamName') sortStage = { temporaryTeamName: sortOrder };
  else if (sortBy === 'leaderName') sortStage = { 'teamLeader.fullName': sortOrder };
  else if (sortBy === 'college') sortStage = { 'teamLeader.collegeName': sortOrder };
  else if (sortBy === 'status') sortStage = { status: sortOrder };
  else if (sortBy === 'submittedAt') sortStage = { submittedAt: sortOrder };

  const projection = {
    _id: 1,
    applicationId: 1,
    temporaryTeamName: 1,
    teamLeader: 1,
    members: 1,
    status: 1,
    assignedPartyName: 1,
    submittedAt: 1,
  };

  const skip = (page - 1) * pageSize;

  const [
    totalApplications,
    selectedTeams,
    waitlistedTeams,
    notSelectedTeams,
    pendingTeams,
    participantStats,
    distinctColleges,
    filteredCount,
    docs,
  ] = await Promise.all([
    db.collection('applications').countDocuments({}),
    db.collection('applications').countDocuments({ status: 'ACCEPTED' }),
    db.collection('applications').countDocuments({ status: 'WAITLISTED' }),
    db.collection('applications').countDocuments({ status: 'DECLINED' }),
    db.collection('applications').countDocuments({ status: 'PENDING' }),
    db.collection('applications').aggregate([
      {
        $project: {
          leaderCount: { $cond: [{ $ifNull: ['$teamLeader.fullName', false] }, 1, 0] },
          membersCount: { $size: { $ifNull: ['$members', []] } },
        },
      },
      {
        $group: {
          _id: null,
          totalParticipants: { $sum: { $add: ['$leaderCount', '$membersCount'] } },
          incompleteCount: {
            $sum: {
              $cond: [
                { $or: [{ $eq: ['$leaderCount', 0] }, { $lt: ['$membersCount', 4] }] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]).toArray(),
    db.collection('applications').distinct('teamLeader.collegeName'),
    db.collection('applications').countDocuments(filter),
    db.collection('applications')
      .find(filter, { projection })
      .sort(sortStage)
      .skip(skip)
      .limit(pageSize)
      .toArray(),
  ]);

  const statsDoc = participantStats[0] || { totalParticipants: 0, incompleteCount: 0 };
  const colleges = (distinctColleges as string[])
    .filter((c) => Boolean(c && typeof c === 'string' && c.trim()))
    .sort();

  const teams = docs.map((doc, idx) => mapToCompendiumTeam(doc, skip + idx));

  return {
    summary: {
      totalApplications,
      totalTeamsRegistered: totalApplications,
      selectedTeams,
      waitlistedTeams,
      notSelectedTeams,
      pendingTeams,
      totalParticipants: statsDoc.totalParticipants,
      incompleteCount: statsDoc.incompleteCount,
    },
    colleges,
    teams,
    totalCount: filteredCount,
    page,
    pageSize,
    totalPages: Math.ceil(filteredCount / pageSize) || 1,
  };
}

export async function exportCompendium(
  idToken: string,
  options: {
    statusFilter?: string;
    collegeFilter?: string;
    dateRange?: string;
    customDateFrom?: string;
    customDateTo?: string;
    searchQuery?: string;
    format: 'CSV' | 'PDF';
    includePartyAllocation?: boolean;
  },
) {
  const admin = await requireAdminByToken(idToken);
  const db = await getMongoDb();

  const filter = buildCompendiumQuery(options);

  const projection = {
    _id: 1,
    applicationId: 1,
    temporaryTeamName: 1,
    teamLeader: 1,
    members: 1,
    status: 1,
    assignedPartyName: 1,
    submittedAt: 1,
  };

  const docs = await db
    .collection('applications')
    .find(filter, { projection })
    .sort({ submittedAt: -1 })
    .toArray();

  const teams = docs.map((doc, idx) => mapToCompendiumTeam(doc, idx));

  const selectedTeams = teams.filter((t) => t.status === 'ACCEPTED').length;
  const waitlistedTeams = teams.filter((t) => t.status === 'WAITLISTED').length;
  const notSelectedTeams = teams.filter((t) => t.status === 'DECLINED').length;
  const pendingTeams = teams.filter((t) => t.status === 'PENDING').length;
  const totalParticipants = teams.reduce((acc, t) => acc + t.totalMembers, 0);

  await db.collection('auditLogs').insertOne({
    collection: 'applications',
    action: 'MASTER_COMPENDIUM_EXPORT',
    adminEmail: admin.email,
    timestamp: new Date().toISOString(),
    details: `Exported ${teams.length} records in ${options.format} format (Filter: ${options.statusFilter || 'ALL'})`,
    format: options.format,
    recordCount: teams.length,
    statusFilter: options.statusFilter || 'ALL',
  });

  return {
    exportedAt: new Date().toISOString(),
    format: options.format,
    recordCount: teams.length,
    includePartyAllocation: Boolean(options.includePartyAllocation),
    statusFilter: options.statusFilter || 'ALL',
    summary: {
      totalApplications: teams.length,
      selectedTeams,
      waitlistedTeams,
      notSelectedTeams,
      pendingTeams,
      totalParticipants,
    },
    teams,
  };
}

// ── Clear All Applications (Super Admin only) ─────────────────────────────────
export async function clearAllApplications(idToken: string): Promise<{ deletedCount: number }> {
  const admin = await requireSuperAdminByToken(idToken);
  const db = await getMongoDb();
  const result = await db.collection('applications').deleteMany({});
  await db.collection('auditLogs').insertOne({
    collection: 'applications',
    action: 'CLEAR_ALL_APPLICATIONS',
    adminEmail: admin.email,
    timestamp: new Date().toISOString(),
    details: `Deleted all ${result.deletedCount} application documents from the database.`,
  });
  return { deletedCount: result.deletedCount ?? 0 };
}
