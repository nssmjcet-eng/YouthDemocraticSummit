import { getMongoDb } from './mongo-client';
import { uploadImageToGridFS } from './gridfs';
import { requireAdminByToken } from './auth';
import { YDS_CONFIG } from '@/config/yds';

let publicDataCache: {
  data: any;
  cachedAt: number;
} | null = null;
const CACHE_TTL_MS = 60 * 1000;

export function invalidatePublicDataCache() {
  publicDataCache = null;
}

export async function fetchPublicData(bypassCache = false) {
  if (!bypassCache && publicDataCache && Date.now() - publicDataCache.cachedAt < CACHE_TTL_MS) {
    return publicDataCache.data;
  }

  const db = await getMongoDb();

  const [settingsDoc, acceptedApps, parties, sponsors, organisers, coOrganisers, developers] = await Promise.all([
    db.collection('settings').findOne({ key: 'results' }),
    db.collection('applications').find({ status: 'ACCEPTED' }).sort({ temporaryTeamName: 1 }).toArray(),
    db.collection('parties').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('sponsors').find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
    db.collection('organisers').find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
    db.collection('coOrganisers').find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
    db.collection('developers').find({}).sort({ displayOrder: 1 }).toArray(),
  ]);

  const resultsReleased = settingsDoc?.['released'] === true;

  const results = resultsReleased
    ? acceptedApps.map((a) => ({
        id: a._id.toString(),
        teamName: (a['temporaryTeamName'] as string) || 'Team',
        leaderName: ((a['teamLeader'] as any)?.fullName as string) || '',
        collegeName: ((a['teamLeader'] as any)?.collegeName as string) || '',
        assignedPartyName: (a['assignedPartyName'] as string) || null,
      }))
    : [];

  const publicData = {
    resultsReleased,
    results,
    parties: parties.map((p) => ({
      id: p._id.toString(),
      name: p['name'] as string,
      abbreviation: (p['abbreviation'] as string) || null,
      ideology: (p['ideology'] as string) || null,
      logoId: (p['logoId'] as string) || null,
      sortOrder: (p['sortOrder'] as number) ?? 99,
      classification:
        ((p['classification'] as string) === 'INC' ? 'I.N.D.I.A' : (p['classification'] as string)) || null,
      formationDate: (p['formationDate'] as string) || null,
      historyDescription: (p['historyDescription'] as string) || null,
    })),
    sponsors: sponsors.map((s) => ({
      id: s._id.toString(),
      name: s['name'] as string,
      category: s['category'] as string,
      websiteUrl: (s['websiteUrl'] as string) || null,
      logoId: (s['logoId'] as string) || null,
      displayOrder: (s['displayOrder'] as number) ?? 99,
    })),
    organisers: organisers.map((o) => ({
      id: o._id.toString(),
      name: o['name'] as string,
      designation: (o['designation'] as string) || '',
      photoId: (o['photoId'] as string) || null,
      displayOrder: (o['displayOrder'] as number) ?? 99,
      linkedinUrl: (o['linkedinUrl'] as string) || null,
    })),
    coOrganisers: coOrganisers.map((o) => ({
      id: o._id.toString(),
      name: o['name'] as string,
      designation: (o['designation'] as string) || '',
      photoId: (o['photoId'] as string) || null,
      displayOrder: (o['displayOrder'] as number) ?? 99,
      linkedinUrl: (o['linkedinUrl'] as string) || null,
    })),
    developers: developers.map((d) => ({
      id: d._id.toString(),
      name: d['name'] as string,
      githubUrl: (d['githubUrl'] as string) || null,
      linkedinUrl: (d['linkedinUrl'] as string) || null,
      displayOrder: (d['displayOrder'] as number) ?? 99,
    })),
  };

  publicDataCache = { data: publicData, cachedAt: Date.now() };
  return publicData;
}

export async function fetchPartyById(id: string) {
  const { ObjectId } = await import('mongodb');
  const db = await getMongoDb();
  let party;
  try {
    party = await db.collection('parties').findOne({ _id: new ObjectId(id) });
  } catch {
    return null;
  }
  if (!party) return null;

  // If results are released, also return assigned team info
  const settings = await db.collection('settings').findOne({ key: 'results' });
  const resultsReleased = settings?.['released'] === true;
  let assignedTeam = null;
  if (resultsReleased && party['assignedTeamId']) {
    const app = await db.collection('applications').findOne({ _id: new ObjectId(party['assignedTeamId'] as string) });
    if (app) {
      assignedTeam = {
        teamName: app['temporaryTeamName'] as string,
        leaderName: (app['teamLeader'] as any)?.fullName || '',
        collegeName: (app['teamLeader'] as any)?.collegeName || '',
      };
    }
  }

  return {
    id: party._id.toString(),
    name: party['name'] as string,
    abbreviation: (party['abbreviation'] as string) || null,
    ideology: (party['ideology'] as string) || null,
    historyDescription: (party['historyDescription'] as string) || null,
    logoId: (party['logoId'] as string) || null,
    classification:
      ((party['classification'] as string) === 'INC' ? 'I.N.D.I.A' : (party['classification'] as string)) || null,
    formationDate: (party['formationDate'] as string) || null,
    assignedTeamName: (party['assignedTeamName'] as string) || null,
    resultsReleased,
    assignedTeam,
  };
}


export async function submitRegistration(data: {
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
}) {
  if (new Date() > new Date(YDS_CONFIG.registrationDeadlineDate)) {
    throw new Error('DEADLINE_PASSED: The registration deadline for YDS 2026 has passed (11th October 2026). Submissions are now closed.');
  }

  const db = await getMongoDb();

  const cleanLeaderEmail = data.teamLeader.email.trim();
  const duplicate = await db.collection('applications').findOne({
    'teamLeader.email': { $regex: new RegExp(`^${cleanLeaderEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
  });
  if (duplicate) {
    throw new Error('DUPLICATE: An application with this team leader email already exists');
  }

  // Atomic counter for unique sequential application IDs
  const counterDoc = await db.collection('settings').findOneAndUpdate(
    { key: 'application_counter' },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' },
  );
  const count = counterDoc?.['seq'] ?? ((await db.collection('applications').countDocuments()) + 1);
  const applicationId = `${YDS_CONFIG.applicationPrefix}-${String(count).padStart(4, '0')}`;
  const now = new Date().toISOString();

  const doc = {
    applicationId,
    temporaryTeamName: data.temporaryTeamName.trim(),
    applicationEmail: data.applicationEmail.trim().toLowerCase(),
    teamLeader: {
      fullName: data.teamLeader.fullName || '',
      email: cleanLeaderEmail.toLowerCase(),
      contactNumber: data.teamLeader.contactNumber || '',
      collegeName: data.teamLeader.collegeName || '',
      yearOfStudy: data.teamLeader.yearOfStudy || '',
      yearOfStudyOther: data.teamLeader.yearOfStudyOther || '',
      courseBranch: data.teamLeader.courseBranch || '',
    },
    members: data.members.map((m) => ({
      fullName: m.fullName || '',
      contactNumber: m.contactNumber || '',
      email: m.email || '',
      college: m.college || '',
      yearOfStudy: m.yearOfStudy || '',
      courseBranch: m.courseBranch || '',
    })),
    experience: {
      hasNssMjcetMun: Boolean(data.experience.hasNssMjcetMun),
      munEventDetails: data.experience.munEventDetails || '',
      strongestAreas: data.experience.strongestAreas || [],
      otherExperience: data.experience.otherExperience || '',
    },
    politicalAgenda: data.politicalAgenda.trim(),
    recommendation: {
      hasRecommendation: Boolean(data.recommendation.hasRecommendation),
      recommenderName: data.recommendation.recommenderName || '',
    },
    declarations: data.declarations,
    submittedAt: now,
    status: 'PENDING',
    adminNotes: '',
    assignedPartyId: null,
    assignedPartyName: null,
    reviewedAt: null,
    reviewedBy: null,
    auditLog: [
      {
        action: 'Application Submitted',
        timestamp: now,
        details: 'Initial submission received via YDS 2026 registration form',
      },
    ],
  };

  await db.collection('applications').insertOne(doc);
  return { success: true, applicationId };
}

export async function processImageUpload(
  idToken: string,
  filename: string,
  contentType: string,
  base64: string,
  kind?: 'logo' | 'portrait',
) {
  await requireAdminByToken(idToken);
  const buffer = Buffer.from(base64, 'base64');
  const result = await uploadImageToGridFS(buffer, filename, contentType, kind);
  invalidatePublicDataCache();
  return { id: result.id, url: `/api/images/${result.id}` };
}
