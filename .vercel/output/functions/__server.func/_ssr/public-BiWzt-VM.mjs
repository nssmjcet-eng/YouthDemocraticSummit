import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Bs59JZy6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-BiWzt-VM.js
var getPublicData = createServerFn({ method: "GET" }).handler(createSsrRpc("3eed05d5dffbf3d8407c92afc687ac06f2924a199c757a03935c8b5000842a80"));
var submitTeamApplication = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a781dbc60c07e9ef618b6e086a0b524fb64e1328f434656273b002213d73c699"));
var uploadImage = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a449e74ba9a6ed20da80f965fcf4f4a6428a5ac7950cb75cd3a81a6656074c16"));
var getPartyById = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("7c0994198e081cf8417d76f451fb45090dffdf66497505579c75a087e7e711d3"));
//#endregion
export { uploadImage as i, getPublicData as n, submitTeamApplication as r, getPartyById as t };
