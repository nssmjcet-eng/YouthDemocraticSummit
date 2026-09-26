import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-7QVL4Xte.js
var getPublicData_createServerFn_handler = createServerRpc({
	id: "3eed05d5dffbf3d8407c92afc687ac06f2924a199c757a03935c8b5000842a80",
	name: "getPublicData",
	filename: "src/functions/public.ts"
}, (opts) => getPublicData.__executeServer(opts));
var getPublicData = createServerFn({ method: "GET" }).handler(getPublicData_createServerFn_handler, async () => {
	const { fetchPublicData } = await import("./public-DsfF-BnM.mjs");
	return fetchPublicData();
});
var submitTeamApplication_createServerFn_handler = createServerRpc({
	id: "a781dbc60c07e9ef618b6e086a0b524fb64e1328f434656273b002213d73c699",
	name: "submitTeamApplication",
	filename: "src/functions/public.ts"
}, (opts) => submitTeamApplication.__executeServer(opts));
var submitTeamApplication = createServerFn({ method: "POST" }).validator((data) => data).handler(submitTeamApplication_createServerFn_handler, async ({ data }) => {
	const { submitRegistration } = await import("./public-DsfF-BnM.mjs");
	return submitRegistration(data);
});
var uploadImage_createServerFn_handler = createServerRpc({
	id: "a449e74ba9a6ed20da80f965fcf4f4a6428a5ac7950cb75cd3a81a6656074c16",
	name: "uploadImage",
	filename: "src/functions/public.ts"
}, (opts) => uploadImage.__executeServer(opts));
var uploadImage = createServerFn({ method: "POST" }).validator((data) => data).handler(uploadImage_createServerFn_handler, async ({ data }) => {
	const { processImageUpload } = await import("./public-DsfF-BnM.mjs");
	return processImageUpload(data.idToken, data.filename, data.contentType, data.base64, data.kind);
});
var getPartyById_createServerFn_handler = createServerRpc({
	id: "7c0994198e081cf8417d76f451fb45090dffdf66497505579c75a087e7e711d3",
	name: "getPartyById",
	filename: "src/functions/public.ts"
}, (opts) => getPartyById.__executeServer(opts));
var getPartyById = createServerFn({ method: "GET" }).validator((data) => data).handler(getPartyById_createServerFn_handler, async ({ data }) => {
	const { fetchPartyById } = await import("./public-DsfF-BnM.mjs");
	return fetchPartyById(data.id);
});
//#endregion
export { getPartyById_createServerFn_handler, getPublicData_createServerFn_handler, submitTeamApplication_createServerFn_handler, uploadImage_createServerFn_handler };
