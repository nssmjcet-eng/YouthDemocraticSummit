import { o as __toESM } from "../_runtime.mjs";
import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { n as getMongoDb } from "./mongo-client-D7yHtyi2.mjs";
import { requireAdminByToken } from "./auth-BElkgTLa.mjs";
import { n as uploadImageToGridFS } from "./gridfs-BeqS6WzM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-DsfF-BnM.js
var publicDataCache = null;
var CACHE_TTL_MS = 6e4;
function invalidatePublicDataCache() {
	publicDataCache = null;
}
async function fetchPublicData(bypassCache = false) {
	if (!bypassCache && publicDataCache && Date.now() - publicDataCache.cachedAt < CACHE_TTL_MS) return publicDataCache.data;
	const db = await getMongoDb();
	const [settingsDoc, acceptedApps, parties, sponsors, organisers, coOrganisers, developers] = await Promise.all([
		db.collection("settings").findOne({ key: "results" }),
		db.collection("applications").find({ status: "ACCEPTED" }).sort({ temporaryTeamName: 1 }).toArray(),
		db.collection("parties").find({}).sort({ sortOrder: 1 }).toArray(),
		db.collection("sponsors").find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
		db.collection("organisers").find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
		db.collection("coOrganisers").find({ isActive: true }).sort({ displayOrder: 1 }).toArray(),
		db.collection("developers").find({}).sort({ displayOrder: 1 }).toArray()
	]);
	const resultsReleased = settingsDoc?.["released"] === true;
	const publicData = {
		resultsReleased,
		results: resultsReleased ? acceptedApps.map((a) => ({
			id: a._id.toString(),
			teamName: a["temporaryTeamName"] || "Team",
			leaderName: a["teamLeader"]?.fullName || "",
			collegeName: a["teamLeader"]?.collegeName || "",
			assignedPartyName: a["assignedPartyName"] || null
		})) : [],
		parties: parties.map((p) => ({
			id: p._id.toString(),
			name: p["name"],
			abbreviation: p["abbreviation"] || null,
			ideology: p["ideology"] || null,
			logoId: p["logoId"] || null,
			sortOrder: p["sortOrder"] ?? 99,
			classification: p["classification"] || null,
			formationDate: p["formationDate"] || null,
			historyDescription: p["historyDescription"] || null
		})),
		sponsors: sponsors.map((s) => ({
			id: s._id.toString(),
			name: s["name"],
			category: s["category"],
			websiteUrl: s["websiteUrl"] || null,
			logoId: s["logoId"] || null,
			displayOrder: s["displayOrder"] ?? 99
		})),
		organisers: organisers.map((o) => ({
			id: o._id.toString(),
			name: o["name"],
			designation: o["designation"] || "",
			photoId: o["photoId"] || null,
			displayOrder: o["displayOrder"] ?? 99,
			linkedinUrl: o["linkedinUrl"] || null
		})),
		coOrganisers: coOrganisers.map((o) => ({
			id: o._id.toString(),
			name: o["name"],
			designation: o["designation"] || "",
			photoId: o["photoId"] || null,
			displayOrder: o["displayOrder"] ?? 99,
			linkedinUrl: o["linkedinUrl"] || null
		})),
		developers: developers.map((d) => ({
			id: d._id.toString(),
			name: d["name"],
			githubUrl: d["githubUrl"] || null,
			linkedinUrl: d["linkedinUrl"] || null,
			displayOrder: d["displayOrder"] ?? 99
		}))
	};
	publicDataCache = {
		data: publicData,
		cachedAt: Date.now()
	};
	return publicData;
}
async function fetchPartyById(id) {
	const { ObjectId } = await import("../_libs/mongodb.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const db = await getMongoDb();
	let party;
	try {
		party = await db.collection("parties").findOne({ _id: new ObjectId(id) });
	} catch {
		return null;
	}
	if (!party) return null;
	const resultsReleased = (await db.collection("settings").findOne({ key: "results" }))?.["released"] === true;
	let assignedTeam = null;
	if (resultsReleased && party["assignedTeamId"]) {
		const app = await db.collection("applications").findOne({ _id: new ObjectId(party["assignedTeamId"]) });
		if (app) assignedTeam = {
			teamName: app["temporaryTeamName"],
			leaderName: app["teamLeader"]?.fullName || "",
			collegeName: app["teamLeader"]?.collegeName || ""
		};
	}
	return {
		id: party._id.toString(),
		name: party["name"],
		abbreviation: party["abbreviation"] || null,
		ideology: party["ideology"] || null,
		historyDescription: party["historyDescription"] || null,
		logoId: party["logoId"] || null,
		classification: party["classification"] || null,
		formationDate: party["formationDate"] || null,
		assignedTeamName: party["assignedTeamName"] || null,
		resultsReleased,
		assignedTeam
	};
}
async function submitRegistration(data) {
	if (/* @__PURE__ */ new Date() > new Date(YDS_CONFIG.registrationDeadlineDate)) throw new Error("DEADLINE_PASSED: The registration deadline for YDS 2026 has passed (11th October 2026). Submissions are now closed.");
	const db = await getMongoDb();
	const cleanLeaderEmail = data.teamLeader.email.trim();
	if (await db.collection("applications").findOne({ "teamLeader.email": { $regex: new RegExp(`^${cleanLeaderEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } })) throw new Error("DUPLICATE: An application with this team leader email already exists");
	const count = (await db.collection("settings").findOneAndUpdate({ key: "application_counter" }, { $inc: { seq: 1 } }, {
		upsert: true,
		returnDocument: "after"
	}))?.["seq"] ?? await db.collection("applications").countDocuments() + 1;
	const applicationId = `${YDS_CONFIG.applicationPrefix}-${String(count).padStart(4, "0")}`;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const doc = {
		applicationId,
		temporaryTeamName: data.temporaryTeamName.trim(),
		applicationEmail: data.applicationEmail.trim().toLowerCase(),
		teamLeader: {
			fullName: data.teamLeader.fullName || "",
			email: cleanLeaderEmail.toLowerCase(),
			contactNumber: data.teamLeader.contactNumber || "",
			collegeName: data.teamLeader.collegeName || "",
			yearOfStudy: data.teamLeader.yearOfStudy || "",
			yearOfStudyOther: data.teamLeader.yearOfStudyOther || "",
			courseBranch: data.teamLeader.courseBranch || ""
		},
		members: data.members.map((m) => ({
			fullName: m.fullName || "",
			contactNumber: m.contactNumber || "",
			email: m.email || "",
			college: m.college || "",
			yearOfStudy: m.yearOfStudy || "",
			courseBranch: m.courseBranch || ""
		})),
		experience: {
			hasNssMjcetMun: Boolean(data.experience.hasNssMjcetMun),
			munEventDetails: data.experience.munEventDetails || "",
			strongestAreas: data.experience.strongestAreas || [],
			otherExperience: data.experience.otherExperience || ""
		},
		politicalAgenda: data.politicalAgenda.trim(),
		recommendation: {
			hasRecommendation: Boolean(data.recommendation.hasRecommendation),
			recommenderName: data.recommendation.recommenderName || ""
		},
		declarations: data.declarations,
		submittedAt: now,
		status: "PENDING",
		adminNotes: "",
		assignedPartyId: null,
		assignedPartyName: null,
		reviewedAt: null,
		reviewedBy: null,
		auditLog: [{
			action: "Application Submitted",
			timestamp: now,
			details: "Initial submission received via YDS 2026 registration form"
		}]
	};
	await db.collection("applications").insertOne(doc);
	return {
		success: true,
		applicationId
	};
}
async function processImageUpload(idToken, filename, contentType, base64, kind) {
	await requireAdminByToken(idToken);
	const buffer = Buffer.from(base64, "base64");
	const result = await uploadImageToGridFS(buffer, filename, contentType, kind);
	invalidatePublicDataCache();
	return {
		id: result.id,
		url: `/api/images/${result.id}`
	};
}
//#endregion
export { fetchPartyById, fetchPublicData, invalidatePublicDataCache, processImageUpload, submitRegistration };
