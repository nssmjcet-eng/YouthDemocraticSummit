import { MongoClient, Db, GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yds2026';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'yds2026';
const SUPER_ADMIN_EMAIL = 'nssmjcet@mjcollege.ac.in';

declare global {
  // eslint-disable-next-line no-var
  var _ydsMongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _ydsMongoDb: Db | undefined;
  // eslint-disable-next-line no-var
  var _ydsGridFsBucket: GridFSBucket | undefined;
  // eslint-disable-next-line no-var
  var _ydsInitialized: boolean | undefined;
}

export async function getMongoDb(): Promise<Db> {
  if (globalThis._ydsMongoDb && globalThis._ydsInitialized) {
    return globalThis._ydsMongoDb;
  }

  if (!globalThis._ydsMongoClient) {
    const newClient = new MongoClient(MONGODB_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    try {
      await newClient.connect();
      globalThis._ydsMongoClient = newClient;
      console.log('[MongoDB] Connected to database successfully (connection cached on globalThis)');
    } catch (err: any) {
      globalThis._ydsMongoClient = undefined;
      console.error('[MongoDB] Connection error:', err?.message || err);
      if (MONGODB_URI.includes('127.0.0.1') || MONGODB_URI.includes('localhost')) {
        throw new Error(
          'MongoDB is not reachable at 127.0.0.1:27017. Please ensure your local MongoDB service is running, or set MONGODB_URI in your .env file to a MongoDB Atlas cluster URI (mongodb+srv://...).'
        );
      }
      throw new Error(`Database connection failed: ${err?.message || 'Unknown error'}`);
    }
  }

  const db = globalThis._ydsMongoClient.db(MONGODB_DB_NAME);
  globalThis._ydsMongoDb = db;
  globalThis._ydsGridFsBucket = new GridFSBucket(db, { bucketName: 'images' });

  if (!globalThis._ydsInitialized) {
    globalThis._ydsInitialized = true;
    await ensureIndexes(db);
    await seedSuperAdmin(db);
    await seedDevelopers(db);
  }

  return db;
}

export async function getGridFsBucket(): Promise<GridFSBucket> {
  await getMongoDb();
  if (!globalThis._ydsGridFsBucket) throw new Error('GridFS bucket not initialized');
  return globalThis._ydsGridFsBucket;
}

async function ensureIndexes(database: Db): Promise<void> {
  try {
    const col = database.collection('adminUsers');
    await col.createIndex({ email: 1 }, { unique: true });

    const apps = database.collection('applications');
    await apps.createIndex({ applicationId: 1 }, { unique: true });
    await apps.createIndex({ status: 1 });
    await apps.createIndex({ submittedAt: -1 });
    await apps.createIndex({ 'teamLeader.email': 1 });
    await apps.createIndex({ temporaryTeamName: 1 });
    await apps.createIndex({ 'teamLeader.collegeName': 1 });
    await apps.createIndex({ 'teamLeader.fullName': 1 });
    await apps.createIndex({ 'teamLeader.contactNumber': 1 });
    await apps.createIndex({ 'members.fullName': 1 });
    await apps.createIndex({ 'members.email': 1 });
    await apps.createIndex({ 'members.contactNumber': 1 });

    const parties = database.collection('parties');
    await parties.createIndex({ sortOrder: 1 });

    const sponsors = database.collection('sponsors');
    await sponsors.createIndex({ displayOrder: 1 });

    await database.collection('organisers').createIndex({ displayOrder: 1 });
    await database.collection('coOrganisers').createIndex({ displayOrder: 1 });
    await database.collection('developers').createIndex({ displayOrder: 1 });
    await database.collection('auditLogs').createIndex({ timestamp: -1 });
    await database.collection('images.files').createIndex({ 'metadata.sha256': 1 });
  } catch (err) {
    console.warn('[MongoDB] Index creation warning:', err);
  }
}

async function seedSuperAdmin(database: Db): Promise<void> {
  try {
    const col = database.collection('adminUsers');
    const existing = await col.findOne({ email: SUPER_ADMIN_EMAIL });
    if (!existing) {
      await col.insertOne({
        email: SUPER_ADMIN_EMAIL,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        addedBy: 'system',
        addedAt: new Date().toISOString(),
        firebaseUid: null,
        lastLoginAt: null,
      });
      console.log('[MongoDB] Seeded default super admin:', SUPER_ADMIN_EMAIL);
    }
  } catch (err) {
    console.warn('[MongoDB] Super admin seeding warning:', err);
  }
}

async function seedDevelopers(database: Db): Promise<void> {
  try {
    const col = database.collection('developers');
    const count = await col.countDocuments();
    if (count === 0) {
      const now = new Date().toISOString();
      await col.insertMany([
        {
          name: 'Shaik Adnan Hyder',
          githubUrl: null,
          linkedinUrl: null,
          displayOrder: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Mirza Zohair Ali Baig',
          githubUrl: null,
          linkedinUrl: null,
          displayOrder: 2,
          createdAt: now,
          updatedAt: now,
        },
      ]);
      console.log('[MongoDB] Seeded developer records');
    }
  } catch (err) {
    console.warn('[MongoDB] Developer seeding warning:', err);
  }
}
