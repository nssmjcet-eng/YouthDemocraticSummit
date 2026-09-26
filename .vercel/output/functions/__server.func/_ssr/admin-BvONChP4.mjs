import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { t as require_lib } from "../_libs/mongodb.mjs";
import { n as getMongoDb } from "./mongo-client-D7yHtyi2.mjs";
import { requireAdminByToken, requireSuperAdminByToken } from "./auth-BElkgTLa.mjs";
import { invalidatePublicDataCache } from "./public-DsfF-BnM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BvONChP4.js
var import_lib = require_lib();
async function getApplications(idToken, filterOrOptions) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const { statusFilter, page, pageSize = 20, searchQuery } = typeof filterOrOptions === "string" ? { statusFilter: filterOrOptions } : filterOrOptions || {};
	const filter = {};
	if (statusFilter && statusFilter !== "ALL") filter["status"] = statusFilter;
	if (searchQuery && searchQuery.trim()) {
		const q = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(q, "i");
		filter["$or"] = [
			{ applicationId: regex },
			{ temporaryTeamName: regex },
			{ "teamLeader.fullName": regex },
			{ "teamLeader.email": regex },
			{ "teamLeader.collegeName": regex }
		];
	}
	if (typeof page === "number" && page > 0) {
		const skip = (page - 1) * pageSize;
		const totalCount = await db.collection("applications").countDocuments(filter);
		return {
			applications: (await db.collection("applications").find(filter).sort({ submittedAt: -1 }).skip(skip).limit(pageSize).toArray()).map((d) => ({
				id: d._id.toString(),
				...d,
				_id: void 0
			})),
			totalCount,
			page,
			pageSize,
			totalPages: Math.ceil(totalCount / pageSize)
		};
	}
	return (await db.collection("applications").find(filter).sort({ submittedAt: -1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function getApplication(idToken, id) {
	await requireAdminByToken(idToken);
	const doc = await (await getMongoDb()).collection("applications").findOne({ _id: new import_lib.ObjectId(id) });
	if (!doc) throw new Error("Application not found");
	return {
		id: doc._id.toString(),
		...doc,
		_id: void 0
	};
}
async function updateApplicationStatus(idToken, id, status, adminNotes) {
	const admin = await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const logEntry = {
		action: `Status changed to ${status}`,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		adminEmail: admin.email,
		details: adminNotes || ""
	};
	await db.collection("applications").updateOne({ _id: new import_lib.ObjectId(id) }, {
		$set: {
			status,
			adminNotes: adminNotes || "",
			reviewedAt: (/* @__PURE__ */ new Date()).toISOString(),
			reviewedBy: admin.email
		},
		$push: { auditLog: logEntry }
	});
	await db.collection("auditLogs").insertOne({
		collection: "applications",
		documentId: id,
		action: logEntry.action,
		adminEmail: admin.email,
		timestamp: logEntry.timestamp,
		details: adminNotes || ""
	});
	invalidatePublicDataCache();
	return { success: true };
}
async function allocateParty(idToken, applicationId, partyId) {
	const admin = await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const party = await db.collection("parties").findOne({ _id: new import_lib.ObjectId(partyId) });
	if (!party) throw new Error("Party not found");
	if (party["assignedTeamId"] && party["assignedTeamId"] !== applicationId) throw new Error("CONFLICT: Party already allocated to another team");
	const app = await db.collection("applications").findOne({ _id: new import_lib.ObjectId(applicationId) });
	if (!app) throw new Error("Application not found");
	if (app["status"] !== "ACCEPTED") throw new Error("Only ACCEPTED teams can be allocated a party");
	if (app["assignedPartyId"]) await db.collection("parties").updateOne({ _id: new import_lib.ObjectId(app["assignedPartyId"]) }, { $set: {
		assignedTeamId: null,
		assignedTeamName: null
	} });
	const now = (/* @__PURE__ */ new Date()).toISOString();
	await db.collection("parties").updateOne({ _id: new import_lib.ObjectId(partyId) }, { $set: {
		assignedTeamId: applicationId,
		assignedTeamName: app["temporaryTeamName"]
	} });
	await db.collection("applications").updateOne({ _id: new import_lib.ObjectId(applicationId) }, {
		$set: {
			assignedPartyId: partyId,
			assignedPartyName: party["name"]
		},
		$push: { auditLog: {
			action: `Party allocated: ${party["name"]}`,
			timestamp: now,
			adminEmail: admin.email
		} }
	});
	invalidatePublicDataCache();
	return { success: true };
}
async function getParties(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("parties").find({}).sort({ sortOrder: 1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function upsertParty(idToken, partyData) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const payload = {
		name: partyData.name,
		abbreviation: partyData.abbreviation || null,
		ideology: partyData.ideology || null,
		historyDescription: partyData.historyDescription || null,
		logoId: partyData.logoId || null,
		sortOrder: partyData.sortOrder ?? 99,
		classification: partyData.classification || null,
		formationDate: partyData.formationDate || null,
		updatedAt: now
	};
	if (partyData.id) {
		await db.collection("parties").updateOne({ _id: new import_lib.ObjectId(partyData.id) }, { $set: payload });
		invalidatePublicDataCache();
		return { id: partyData.id };
	} else {
		const result = await db.collection("parties").insertOne({
			...payload,
			assignedTeamId: null,
			assignedTeamName: null,
			createdAt: now
		});
		invalidatePublicDataCache();
		return { id: result.insertedId.toString() };
	}
}
async function deleteParty(idToken, id) {
	await requireAdminByToken(idToken);
	await (await getMongoDb()).collection("parties").deleteOne({ _id: new import_lib.ObjectId(id) });
	invalidatePublicDataCache();
	return { success: true };
}
async function getSponsors(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("sponsors").find({}).sort({ displayOrder: 1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function upsertSponsor(idToken, sponsorData) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const payload = {
		name: sponsorData.name,
		category: sponsorData.category,
		websiteUrl: sponsorData.websiteUrl || null,
		description: sponsorData.description || null,
		logoId: sponsorData.logoId || null,
		displayOrder: sponsorData.displayOrder ?? 99,
		isActive: sponsorData.isActive !== false,
		updatedAt: now
	};
	if (sponsorData.id) {
		await db.collection("sponsors").updateOne({ _id: new import_lib.ObjectId(sponsorData.id) }, { $set: payload });
		invalidatePublicDataCache();
		return { id: sponsorData.id };
	} else {
		const result = await db.collection("sponsors").insertOne({
			...payload,
			createdAt: now
		});
		invalidatePublicDataCache();
		return { id: result.insertedId.toString() };
	}
}
async function deleteSponsor(idToken, id) {
	await requireAdminByToken(idToken);
	await (await getMongoDb()).collection("sponsors").deleteOne({ _id: new import_lib.ObjectId(id) });
	invalidatePublicDataCache();
	return { success: true };
}
async function getResultsStatus(idToken) {
	await requireAdminByToken(idToken);
	const doc = await (await getMongoDb()).collection("settings").findOne({ key: "results" });
	return {
		released: doc?.["released"] === true,
		updatedAt: doc?.["updatedAt"] || null
	};
}
async function setResultsStatus(idToken, released) {
	const admin = await requireSuperAdminByToken(idToken);
	const db = await getMongoDb();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	await db.collection("settings").updateOne({ key: "results" }, { $set: {
		key: "results",
		released,
		updatedAt: now,
		updatedBy: admin.email
	} }, { upsert: true });
	await db.collection("auditLogs").insertOne({
		collection: "settings",
		documentId: "results",
		action: released ? "Results released to public" : "Results hidden from public",
		adminEmail: admin.email,
		timestamp: now
	});
	invalidatePublicDataCache();
	return { success: true };
}
async function getAdminUsers(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("adminUsers").find({}).sort({ addedAt: -1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		email: d["email"],
		role: d["role"],
		status: d["status"],
		addedBy: d["addedBy"],
		addedAt: d["addedAt"],
		lastLoginAt: d["lastLoginAt"] || null,
		_id: void 0
	}));
}
async function addAdminUser(idToken, email, role) {
	const superAdmin = await requireSuperAdminByToken(idToken);
	const db = await getMongoDb();
	const cleanEmail = email.trim().toLowerCase();
	let finalRole = role || "ADMIN";
	if (cleanEmail === YDS_CONFIG.SUPER_ADMIN_EMAIL.toLowerCase()) finalRole = "SUPER_ADMIN";
	if (await db.collection("adminUsers").findOne({ email: cleanEmail })) {
		await db.collection("adminUsers").updateOne({ email: cleanEmail }, { $set: {
			status: "ACTIVE",
			role: finalRole,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			addedBy: superAdmin.email
		} });
		return {
			success: true,
			created: false
		};
	}
	await db.collection("adminUsers").insertOne({
		email: cleanEmail,
		role: finalRole,
		status: "ACTIVE",
		addedBy: superAdmin.email,
		addedAt: (/* @__PURE__ */ new Date()).toISOString(),
		firebaseUid: null,
		lastLoginAt: null
	});
	return {
		success: true,
		created: true
	};
}
async function removeAdminUser(idToken, email) {
	const superAdmin = await requireSuperAdminByToken(idToken);
	const cleanEmail = email.trim().toLowerCase();
	if (cleanEmail === YDS_CONFIG.SUPER_ADMIN_EMAIL.toLowerCase()) throw new Error("FORBIDDEN: Cannot remove the super admin account");
	await (await getMongoDb()).collection("adminUsers").updateOne({ email: cleanEmail }, { $set: {
		status: "INACTIVE",
		deactivatedBy: superAdmin.email,
		deactivatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} });
	return { success: true };
}
async function getAuditLogs(idToken, limit = 100) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("auditLogs").find({}).sort({ timestamp: -1 }).limit(limit).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function getStats(idToken) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const [total, pending, accepted, waitlisted, declined, partiesWithTeam, totalSponsors] = await Promise.all([
		db.collection("applications").countDocuments(),
		db.collection("applications").countDocuments({ status: "PENDING" }),
		db.collection("applications").countDocuments({ status: "ACCEPTED" }),
		db.collection("applications").countDocuments({ status: "WAITLISTED" }),
		db.collection("applications").countDocuments({ status: "DECLINED" }),
		db.collection("parties").countDocuments({ assignedTeamId: { $ne: null } }),
		db.collection("sponsors").countDocuments({ isActive: true })
	]);
	return {
		total,
		pending,
		accepted,
		waitlisted,
		declined,
		partiesAllocated: partiesWithTeam,
		partiesRemaining: YDS_CONFIG.totalParties - partiesWithTeam,
		activeSponsors: totalSponsors
	};
}
async function getOrganisers(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("organisers").find({}).sort({ displayOrder: 1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function upsertOrganiser(idToken, data) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const payload = {
		name: data.name,
		designation: data.designation,
		photoId: data.photoId || null,
		displayOrder: data.displayOrder ?? 99,
		isActive: data.isActive !== false,
		linkedinUrl: data.linkedinUrl || null,
		updatedAt: now
	};
	if (data.id) {
		await db.collection("organisers").updateOne({ _id: new import_lib.ObjectId(data.id) }, { $set: payload });
		invalidatePublicDataCache();
		return { id: data.id };
	}
	const result = await db.collection("organisers").insertOne({
		...payload,
		createdAt: now
	});
	invalidatePublicDataCache();
	return { id: result.insertedId.toString() };
}
async function deleteOrganiser(idToken, id) {
	await requireAdminByToken(idToken);
	await (await getMongoDb()).collection("organisers").deleteOne({ _id: new import_lib.ObjectId(id) });
	invalidatePublicDataCache();
	return { success: true };
}
async function getCoOrganisers(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("coOrganisers").find({}).sort({ displayOrder: 1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function upsertCoOrganiser(idToken, data) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const payload = {
		name: data.name,
		designation: data.designation,
		photoId: data.photoId || null,
		displayOrder: data.displayOrder ?? 99,
		isActive: data.isActive !== false,
		linkedinUrl: data.linkedinUrl || null,
		updatedAt: now
	};
	if (data.id) {
		await db.collection("coOrganisers").updateOne({ _id: new import_lib.ObjectId(data.id) }, { $set: payload });
		invalidatePublicDataCache();
		return { id: data.id };
	}
	const result = await db.collection("coOrganisers").insertOne({
		...payload,
		createdAt: now
	});
	invalidatePublicDataCache();
	return { id: result.insertedId.toString() };
}
async function deleteCoOrganiser(idToken, id) {
	await requireAdminByToken(idToken);
	await (await getMongoDb()).collection("coOrganisers").deleteOne({ _id: new import_lib.ObjectId(id) });
	invalidatePublicDataCache();
	return { success: true };
}
async function getDevelopers(idToken) {
	await requireAdminByToken(idToken);
	return (await (await getMongoDb()).collection("developers").find({}).sort({ displayOrder: 1 }).toArray()).map((d) => ({
		id: d._id.toString(),
		...d,
		_id: void 0
	}));
}
async function upsertDeveloper(idToken, data) {
	await requireAdminByToken(idToken);
	await (await getMongoDb()).collection("developers").updateOne({ _id: new import_lib.ObjectId(data.id) }, { $set: {
		githubUrl: data.githubUrl || null,
		linkedinUrl: data.linkedinUrl || null,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} });
	invalidatePublicDataCache();
	return { success: true };
}
async function getDbStats(idToken) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	try {
		const stats = await db.command({
			dbStats: 1,
			scale: 1048576
		});
		const dataSize = Math.round(stats.dataSize || 0);
		const storageSize = Math.round(stats.storageSize || 0);
		const indexSize = Math.round(stats.indexSize || 0);
		const totalMB = Math.round(stats.totalSize || storageSize + indexSize);
		const FREE_TIER_LIMIT_MB = 512;
		const usedPct = Math.round(totalMB / FREE_TIER_LIMIT_MB * 100);
		return {
			dataSize,
			storageSize,
			indexSize,
			totalMB,
			freeTierLimitMB: FREE_TIER_LIMIT_MB,
			usedPct,
			level: usedPct < 70 ? "normal" : usedPct < 90 ? "warning" : "critical"
		};
	} catch {
		return {
			dataSize: 0,
			storageSize: 0,
			indexSize: 0,
			totalMB: 0,
			freeTierLimitMB: 512,
			usedPct: 0,
			level: "normal"
		};
	}
}
async function exportAllData(idToken) {
	await requireAdminByToken(idToken);
	const db = await getMongoDb();
	const serialize = (docs) => docs.map((d) => ({
		...d,
		_id: d._id?.toString(),
		id: d._id?.toString()
	}));
	const [applications, parties, sponsors, organisers, coOrganisers, developers, adminUsers, auditLogs] = await Promise.all([
		db.collection("applications").find({}).toArray(),
		db.collection("parties").find({}).toArray(),
		db.collection("sponsors").find({}).toArray(),
		db.collection("organisers").find({}).toArray(),
		db.collection("coOrganisers").find({}).toArray(),
		db.collection("developers").find({}).toArray(),
		db.collection("adminUsers").find({}).toArray(),
		db.collection("auditLogs").find({}).sort({ timestamp: -1 }).limit(2e3).toArray()
	]);
	return {
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		applications: serialize(applications),
		parties: serialize(parties),
		sponsors: serialize(sponsors),
		organisers: serialize(organisers),
		coOrganisers: serialize(coOrganisers),
		developers: serialize(developers),
		adminUsers: serialize(adminUsers).map((u) => ({
			...u,
			firebaseUid: "[REDACTED]"
		})),
		auditLogs: serialize(auditLogs)
	};
}
//#endregion
export { addAdminUser, allocateParty, deleteCoOrganiser, deleteOrganiser, deleteParty, deleteSponsor, exportAllData, getAdminUsers, getApplication, getApplications, getAuditLogs, getCoOrganisers, getDbStats, getDevelopers, getOrganisers, getParties, getResultsStatus, getSponsors, getStats, removeAdminUser, setResultsStatus, updateApplicationStatus, upsertCoOrganiser, upsertDeveloper, upsertOrganiser, upsertParty, upsertSponsor };
