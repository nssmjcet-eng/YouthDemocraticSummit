import { n as getMongoDb } from "./mongo-client-D7yHtyi2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BElkgTLa.js
async function verifyFirebaseIdToken(idToken) {
	const apiKey = process.env.VITE_FIREBASE_API_KEY;
	if (!apiKey) throw new Error("Server configuration error: VITE_FIREBASE_API_KEY is missing");
	const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ idToken })
	});
	if (!resp.ok) {
		const errText = await resp.text();
		console.error("[verifyFirebaseIdToken] Identity Toolkit Error:", errText);
		throw new Error(`Firebase token verification failed: ${resp.statusText}`);
	}
	const data = await resp.json();
	if (!data.users || data.users.length === 0) throw new Error("Invalid Firebase token: no user found");
	const user = data.users[0];
	if (!user.localId || !user.email) throw new Error("Firebase token missing uid or email");
	return {
		uid: user.localId,
		email: user.email
	};
}
async function requireAdminByToken(idToken) {
	const { uid, email } = await verifyFirebaseIdToken(idToken);
	const cleanEmail = email.trim().toLowerCase();
	const db = await getMongoDb();
	const adminDoc = await db.collection("adminUsers").findOne({ email: cleanEmail });
	if (!adminDoc || adminDoc.status !== "ACTIVE") throw new Error("UNAUTHORIZED: Not an authorized admin");
	if (!adminDoc.firebaseUid) await db.collection("adminUsers").updateOne({ email: cleanEmail }, { $set: {
		firebaseUid: uid,
		lastLoginAt: (/* @__PURE__ */ new Date()).toISOString()
	} });
	else await db.collection("adminUsers").updateOne({ email: cleanEmail }, { $set: { lastLoginAt: (/* @__PURE__ */ new Date()).toISOString() } });
	return {
		uid,
		email: cleanEmail,
		role: adminDoc.role,
		isSuperAdmin: adminDoc.role === "SUPER_ADMIN"
	};
}
async function requireSuperAdminByToken(idToken) {
	const admin = await requireAdminByToken(idToken);
	if (!admin.isSuperAdmin) throw new Error("FORBIDDEN: Super admin access required");
	return admin;
}
//#endregion
export { requireAdminByToken, requireSuperAdminByToken };
