import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-abpDoRnx.js
var verifyAdminSession_createServerFn_handler = createServerRpc({
	id: "0969795b4f52d92aeec6a1a95565da2f98261bc711605de2373c8bd2727e2997",
	name: "verifyAdminSession",
	filename: "src/functions/auth.ts"
}, (opts) => verifyAdminSession.__executeServer(opts));
var verifyAdminSession = createServerFn({ method: "POST" }).validator((data) => data).handler(verifyAdminSession_createServerFn_handler, async ({ data }) => {
	const { requireAdminByToken } = await import("./auth-BElkgTLa.mjs");
	const admin = await requireAdminByToken(data.idToken);
	return {
		email: admin.email,
		role: admin.role,
		isSuperAdmin: admin.isSuperAdmin
	};
});
var checkAdminSession_createServerFn_handler = createServerRpc({
	id: "86cc4e6ddecd7a66ccf406d4be90d72bc0f07745f824f8b5098cce06bfd39907",
	name: "checkAdminSession",
	filename: "src/functions/auth.ts"
}, (opts) => checkAdminSession.__executeServer(opts));
var checkAdminSession = createServerFn({ method: "POST" }).validator((data) => data).handler(checkAdminSession_createServerFn_handler, async ({ data }) => {
	try {
		const { requireAdminByToken } = await import("./auth-BElkgTLa.mjs");
		const admin = await requireAdminByToken(data.idToken);
		return {
			authorized: true,
			email: admin.email,
			role: admin.role,
			isSuperAdmin: admin.isSuperAdmin
		};
	} catch (err) {
		console.error("[checkAdminSession] error:", err);
		return {
			authorized: false,
			email: null,
			role: null,
			isSuperAdmin: false
		};
	}
});
//#endregion
export { checkAdminSession_createServerFn_handler, verifyAdminSession_createServerFn_handler };
