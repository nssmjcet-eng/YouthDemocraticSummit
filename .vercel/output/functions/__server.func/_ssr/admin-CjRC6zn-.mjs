import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CjRC6zn-.js
var adminGetApplications_createServerFn_handler = createServerRpc({
	id: "0402141ab8a85f507d9dd3b612b7441ac7f723cbc3988f5563be33cdd8dfd31d",
	name: "adminGetApplications",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetApplications.__executeServer(opts));
var adminGetApplications = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetApplications_createServerFn_handler, async ({ data }) => {
	const { getApplications } = await import("./admin-BvONChP4.mjs");
	return getApplications(data.idToken, data);
});
var adminGetApplication_createServerFn_handler = createServerRpc({
	id: "ee1a11f5c444c3bc13aaed12a0f2eaaadabc112c9e0b551975a699636a0d501f",
	name: "adminGetApplication",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetApplication.__executeServer(opts));
var adminGetApplication = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetApplication_createServerFn_handler, async ({ data }) => {
	const { getApplication } = await import("./admin-BvONChP4.mjs");
	return getApplication(data.idToken, data.id);
});
var adminUpdateApplicationStatus_createServerFn_handler = createServerRpc({
	id: "8365323318b46fb0f603bc4fabadf2571289261aa635def3f54815ca8b611912",
	name: "adminUpdateApplicationStatus",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpdateApplicationStatus.__executeServer(opts));
var adminUpdateApplicationStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpdateApplicationStatus_createServerFn_handler, async ({ data }) => {
	const { updateApplicationStatus } = await import("./admin-BvONChP4.mjs");
	return updateApplicationStatus(data.idToken, data.id, data.status, data.adminNotes);
});
var adminAllocateParty_createServerFn_handler = createServerRpc({
	id: "c74d7b2aac43818810471b40b9e73af9ff45e6e17f26299344a1a1a31a6a0898",
	name: "adminAllocateParty",
	filename: "src/functions/admin.ts"
}, (opts) => adminAllocateParty.__executeServer(opts));
var adminAllocateParty = createServerFn({ method: "POST" }).validator((data) => data).handler(adminAllocateParty_createServerFn_handler, async ({ data }) => {
	const { allocateParty } = await import("./admin-BvONChP4.mjs");
	return allocateParty(data.idToken, data.applicationId, data.partyId);
});
var adminGetParties_createServerFn_handler = createServerRpc({
	id: "849cf1250382bde3412289226d171206b378dfc3606a320a24a177f7fbab3e33",
	name: "adminGetParties",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetParties.__executeServer(opts));
var adminGetParties = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetParties_createServerFn_handler, async ({ data }) => {
	const { getParties } = await import("./admin-BvONChP4.mjs");
	return getParties(data.idToken);
});
var adminUpsertParty_createServerFn_handler = createServerRpc({
	id: "cbec18b569cf4b4d0493bde31e655ddb1bf22ea767890396b47a6f3cfd7bc92c",
	name: "adminUpsertParty",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertParty.__executeServer(opts));
var adminUpsertParty = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertParty_createServerFn_handler, async ({ data }) => {
	const { upsertParty } = await import("./admin-BvONChP4.mjs");
	return upsertParty(data.idToken, data);
});
var adminDeleteParty_createServerFn_handler = createServerRpc({
	id: "ceb44e0cd13ab522ca8c98ad14331f0bfa20e19646650e8f91705977194af0a3",
	name: "adminDeleteParty",
	filename: "src/functions/admin.ts"
}, (opts) => adminDeleteParty.__executeServer(opts));
var adminDeleteParty = createServerFn({ method: "POST" }).validator((data) => data).handler(adminDeleteParty_createServerFn_handler, async ({ data }) => {
	const { deleteParty } = await import("./admin-BvONChP4.mjs");
	return deleteParty(data.idToken, data.id);
});
var adminGetSponsors_createServerFn_handler = createServerRpc({
	id: "708f6694abff07136f1ad71df9f9bebca1e26033285d132f2bca071223177830",
	name: "adminGetSponsors",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetSponsors.__executeServer(opts));
var adminGetSponsors = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetSponsors_createServerFn_handler, async ({ data }) => {
	const { getSponsors } = await import("./admin-BvONChP4.mjs");
	return getSponsors(data.idToken);
});
var adminUpsertSponsor_createServerFn_handler = createServerRpc({
	id: "0bc23f95026926d6a13e04a963794c9896e1c678bccff49512f0ba6dd4328e98",
	name: "adminUpsertSponsor",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertSponsor.__executeServer(opts));
var adminUpsertSponsor = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertSponsor_createServerFn_handler, async ({ data }) => {
	const { upsertSponsor } = await import("./admin-BvONChP4.mjs");
	return upsertSponsor(data.idToken, data);
});
var adminDeleteSponsor_createServerFn_handler = createServerRpc({
	id: "7cfb4ede6875fc53245ecfaabf5d9b6c75b812ff57835e8f82fd0693c18519be",
	name: "adminDeleteSponsor",
	filename: "src/functions/admin.ts"
}, (opts) => adminDeleteSponsor.__executeServer(opts));
var adminDeleteSponsor = createServerFn({ method: "POST" }).validator((data) => data).handler(adminDeleteSponsor_createServerFn_handler, async ({ data }) => {
	const { deleteSponsor } = await import("./admin-BvONChP4.mjs");
	return deleteSponsor(data.idToken, data.id);
});
var adminGetResultsStatus_createServerFn_handler = createServerRpc({
	id: "8367f2e2916792b275560538e4338757d3b6dda97b789569f90b61bb607ff20b",
	name: "adminGetResultsStatus",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetResultsStatus.__executeServer(opts));
var adminGetResultsStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetResultsStatus_createServerFn_handler, async ({ data }) => {
	const { getResultsStatus } = await import("./admin-BvONChP4.mjs");
	return getResultsStatus(data.idToken);
});
var adminSetResultsStatus_createServerFn_handler = createServerRpc({
	id: "ef3d22c53f85a1372fb0d0d0037315ba7c3688a1ce5533fc1477427c501f9950",
	name: "adminSetResultsStatus",
	filename: "src/functions/admin.ts"
}, (opts) => adminSetResultsStatus.__executeServer(opts));
var adminSetResultsStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(adminSetResultsStatus_createServerFn_handler, async ({ data }) => {
	const { setResultsStatus } = await import("./admin-BvONChP4.mjs");
	return setResultsStatus(data.idToken, data.released);
});
var adminGetAdminUsers_createServerFn_handler = createServerRpc({
	id: "3dfc4bf7effb86626b52bd0e263bbc937d20007b1ee735d0b569da2849794b26",
	name: "adminGetAdminUsers",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetAdminUsers.__executeServer(opts));
var adminGetAdminUsers = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetAdminUsers_createServerFn_handler, async ({ data }) => {
	const { getAdminUsers } = await import("./admin-BvONChP4.mjs");
	return getAdminUsers(data.idToken);
});
var adminAddAdminUser_createServerFn_handler = createServerRpc({
	id: "5f41b43bcf49a46f5d7705ee18c77d3725fd0df87c7ea6097033d3f03febfdc3",
	name: "adminAddAdminUser",
	filename: "src/functions/admin.ts"
}, (opts) => adminAddAdminUser.__executeServer(opts));
var adminAddAdminUser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminAddAdminUser_createServerFn_handler, async ({ data }) => {
	const { addAdminUser } = await import("./admin-BvONChP4.mjs");
	return addAdminUser(data.idToken, data.email, data.role);
});
var adminRemoveAdminUser_createServerFn_handler = createServerRpc({
	id: "1d24e4022276e906267a01ecaad134325165756de7a640bca7b61ea462e0155c",
	name: "adminRemoveAdminUser",
	filename: "src/functions/admin.ts"
}, (opts) => adminRemoveAdminUser.__executeServer(opts));
var adminRemoveAdminUser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminRemoveAdminUser_createServerFn_handler, async ({ data }) => {
	const { removeAdminUser } = await import("./admin-BvONChP4.mjs");
	return removeAdminUser(data.idToken, data.email);
});
var adminGetAuditLogs_createServerFn_handler = createServerRpc({
	id: "c747df24d4bacb74af38b745014e20f681351c7fd9f3b1ee5cf7fc1ad50ee7e1",
	name: "adminGetAuditLogs",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetAuditLogs.__executeServer(opts));
var adminGetAuditLogs = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetAuditLogs_createServerFn_handler, async ({ data }) => {
	const { getAuditLogs } = await import("./admin-BvONChP4.mjs");
	return getAuditLogs(data.idToken, data.limit);
});
var adminGetStats_createServerFn_handler = createServerRpc({
	id: "18497bf14b04a55e4b1329f2f1f53f20b0a9d897d47fd350024d8adf46d9fc69",
	name: "adminGetStats",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetStats.__executeServer(opts));
var adminGetStats = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetStats_createServerFn_handler, async ({ data }) => {
	const { getStats } = await import("./admin-BvONChP4.mjs");
	return getStats(data.idToken);
});
var adminUpsertPartyFull_createServerFn_handler = createServerRpc({
	id: "eded31aa4a1cba81d2504eb6894fb8751ca6ed4009e4678991756c7778fc33bb",
	name: "adminUpsertPartyFull",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertPartyFull.__executeServer(opts));
var adminUpsertPartyFull = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertPartyFull_createServerFn_handler, async ({ data }) => {
	const { upsertParty } = await import("./admin-BvONChP4.mjs");
	return upsertParty(data.idToken, data);
});
var adminGetOrganisers_createServerFn_handler = createServerRpc({
	id: "0ad377263b340b31b743c1fae5db5594d4c579478534a2f6a34cc527e683f3c8",
	name: "adminGetOrganisers",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetOrganisers.__executeServer(opts));
var adminGetOrganisers = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetOrganisers_createServerFn_handler, async ({ data }) => {
	const { getOrganisers } = await import("./admin-BvONChP4.mjs");
	return getOrganisers(data.idToken);
});
var adminUpsertOrganiser_createServerFn_handler = createServerRpc({
	id: "5b79f95196391185f4f16f130c6a96ea2b5f99a3a5798ee00cc0d9de1575bef5",
	name: "adminUpsertOrganiser",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertOrganiser.__executeServer(opts));
var adminUpsertOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertOrganiser_createServerFn_handler, async ({ data }) => {
	const { upsertOrganiser } = await import("./admin-BvONChP4.mjs");
	return upsertOrganiser(data.idToken, data);
});
var adminDeleteOrganiser_createServerFn_handler = createServerRpc({
	id: "6f00376f4364b0d2308959feee757754970a8624c11cd673e7c74a265de4c63c",
	name: "adminDeleteOrganiser",
	filename: "src/functions/admin.ts"
}, (opts) => adminDeleteOrganiser.__executeServer(opts));
var adminDeleteOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminDeleteOrganiser_createServerFn_handler, async ({ data }) => {
	const { deleteOrganiser } = await import("./admin-BvONChP4.mjs");
	return deleteOrganiser(data.idToken, data.id);
});
var adminGetCoOrganisers_createServerFn_handler = createServerRpc({
	id: "d2631c98fccc47f8c9683481261e526ed87528eefcf4e476f4afb17b0138a42c",
	name: "adminGetCoOrganisers",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetCoOrganisers.__executeServer(opts));
var adminGetCoOrganisers = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetCoOrganisers_createServerFn_handler, async ({ data }) => {
	const { getCoOrganisers } = await import("./admin-BvONChP4.mjs");
	return getCoOrganisers(data.idToken);
});
var adminUpsertCoOrganiser_createServerFn_handler = createServerRpc({
	id: "23eea6877b1588f27aba53c827f5ba7bf0479ebf93788ee2db705dbab7b25ddc",
	name: "adminUpsertCoOrganiser",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertCoOrganiser.__executeServer(opts));
var adminUpsertCoOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertCoOrganiser_createServerFn_handler, async ({ data }) => {
	const { upsertCoOrganiser } = await import("./admin-BvONChP4.mjs");
	return upsertCoOrganiser(data.idToken, data);
});
var adminDeleteCoOrganiser_createServerFn_handler = createServerRpc({
	id: "9b81ff618437ddf806165ebab9215849f98114c5dfe5aec7bf61020541e183c3",
	name: "adminDeleteCoOrganiser",
	filename: "src/functions/admin.ts"
}, (opts) => adminDeleteCoOrganiser.__executeServer(opts));
var adminDeleteCoOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(adminDeleteCoOrganiser_createServerFn_handler, async ({ data }) => {
	const { deleteCoOrganiser } = await import("./admin-BvONChP4.mjs");
	return deleteCoOrganiser(data.idToken, data.id);
});
var adminGetDevelopers_createServerFn_handler = createServerRpc({
	id: "28230c55f2e6a554890124dcec316c579f9eca709f6e3706c1c6de3546c17cc6",
	name: "adminGetDevelopers",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetDevelopers.__executeServer(opts));
var adminGetDevelopers = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetDevelopers_createServerFn_handler, async ({ data }) => {
	const { getDevelopers } = await import("./admin-BvONChP4.mjs");
	return getDevelopers(data.idToken);
});
var adminUpsertDeveloper_createServerFn_handler = createServerRpc({
	id: "6ffd8f5208ee7cc3402e5b83e24b2dc9ba0596e001d83440ca0f66049a8f86a0",
	name: "adminUpsertDeveloper",
	filename: "src/functions/admin.ts"
}, (opts) => adminUpsertDeveloper.__executeServer(opts));
var adminUpsertDeveloper = createServerFn({ method: "POST" }).validator((data) => data).handler(adminUpsertDeveloper_createServerFn_handler, async ({ data }) => {
	const { upsertDeveloper } = await import("./admin-BvONChP4.mjs");
	return upsertDeveloper(data.idToken, data);
});
var adminGetDbStats_createServerFn_handler = createServerRpc({
	id: "59fbb021e550373ae7d1fa71104e5a2cdf9601abde29aab6b7227f8592fa483c",
	name: "adminGetDbStats",
	filename: "src/functions/admin.ts"
}, (opts) => adminGetDbStats.__executeServer(opts));
var adminGetDbStats = createServerFn({ method: "POST" }).validator((data) => data).handler(adminGetDbStats_createServerFn_handler, async ({ data }) => {
	const { getDbStats } = await import("./admin-BvONChP4.mjs");
	return getDbStats(data.idToken);
});
var adminExportData_createServerFn_handler = createServerRpc({
	id: "dc92ba21f3d4289e30fe44baf14d91f36ab15b1721846e0d20aa4c062564f6ee",
	name: "adminExportData",
	filename: "src/functions/admin.ts"
}, (opts) => adminExportData.__executeServer(opts));
var adminExportData = createServerFn({ method: "POST" }).validator((data) => data).handler(adminExportData_createServerFn_handler, async ({ data }) => {
	const { exportAllData } = await import("./admin-BvONChP4.mjs");
	return exportAllData(data.idToken);
});
//#endregion
export { adminAddAdminUser_createServerFn_handler, adminAllocateParty_createServerFn_handler, adminDeleteCoOrganiser_createServerFn_handler, adminDeleteOrganiser_createServerFn_handler, adminDeleteParty_createServerFn_handler, adminDeleteSponsor_createServerFn_handler, adminExportData_createServerFn_handler, adminGetAdminUsers_createServerFn_handler, adminGetApplication_createServerFn_handler, adminGetApplications_createServerFn_handler, adminGetAuditLogs_createServerFn_handler, adminGetCoOrganisers_createServerFn_handler, adminGetDbStats_createServerFn_handler, adminGetDevelopers_createServerFn_handler, adminGetOrganisers_createServerFn_handler, adminGetParties_createServerFn_handler, adminGetResultsStatus_createServerFn_handler, adminGetSponsors_createServerFn_handler, adminGetStats_createServerFn_handler, adminRemoveAdminUser_createServerFn_handler, adminSetResultsStatus_createServerFn_handler, adminUpdateApplicationStatus_createServerFn_handler, adminUpsertCoOrganiser_createServerFn_handler, adminUpsertDeveloper_createServerFn_handler, adminUpsertOrganiser_createServerFn_handler, adminUpsertPartyFull_createServerFn_handler, adminUpsertParty_createServerFn_handler, adminUpsertSponsor_createServerFn_handler };
