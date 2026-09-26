import { o as __toESM } from "../_runtime.mjs";
import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import "../_libs/firebase.mjs";
import { a as signOut } from "../_libs/firebase__auth.mjs";
import { t as firebaseAuth } from "./client-B071U5fB.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Bs59JZy6.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./admin-69-yoVc3.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { i as uploadImage } from "./public-BiWzt-VM.mjs";
import { C as ExternalLink, E as CircleCheck, O as Check, S as Eye, T as Clock, a as TriangleAlert, c as Shield, g as LockOpen, h as Lock, i as Upload, l as Search, m as LogOut, n as Users, o as Trash2, p as Mail, r as UserPlus, s as SquarePen, t as X, u as Plus, w as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CJpSyajG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageInput({ label, onImageSelect, currentImageUrl, className = "", required, value, onChange }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [previewUrl, setPreviewUrl] = (0, import_react.useState)(currentImageUrl ?? null);
	const handleFile = async (file) => {
		setError("");
		setLoading(true);
		try {
			if (file.size > 5242880) throw new Error("Image must be smaller than 5 MB");
			if (file.type === "image/svg+xml") {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				await new Promise((resolve, reject) => {
					reader.onload = () => resolve();
					reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read file"));
				});
				const dataUrl = reader.result;
				const base64 = dataUrl.split(",")[1] || "";
				setPreviewUrl(dataUrl);
				onImageSelect(base64, file.name, file.type);
				if (onChange) onChange(dataUrl);
				return;
			}
			const compressed = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read file"));
				reader.onload = () => {
					const img = new Image();
					img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to parse image data"));
					img.onload = () => {
						const MAX_DIM = 1e3;
						let width = img.naturalWidth || img.width;
						let height = img.naturalHeight || img.height;
						if (width > MAX_DIM || height > MAX_DIM) if (width > height) {
							height = Math.round(height * MAX_DIM / width);
							width = MAX_DIM;
						} else {
							width = Math.round(width * MAX_DIM / height);
							height = MAX_DIM;
						}
						const canvas = document.createElement("canvas");
						canvas.width = width;
						canvas.height = height;
						const ctx = canvas.getContext("2d");
						if (!ctx) {
							const raw = reader.result;
							return resolve({
								dataUrl: raw,
								base64: raw.split(",")[1] || "",
								mimeType: file.type
							});
						}
						ctx.drawImage(img, 0, 0, width, height);
						let outUrl = "";
						try {
							outUrl = canvas.toDataURL("image/webp", .85);
						} catch {
							outUrl = canvas.toDataURL("image/jpeg", .85);
						}
						const b64 = outUrl.split(",")[1] || "";
						const mime = outUrl.substring(outUrl.indexOf(":") + 1, outUrl.indexOf(";")) || "image/webp";
						resolve({
							dataUrl: outUrl,
							base64: b64,
							mimeType: mime
						});
					};
					img.src = reader.result;
				};
				reader.readAsDataURL(file);
			});
			setPreviewUrl(compressed.dataUrl);
			onImageSelect(compressed.base64, file.name, compressed.mimeType);
			if (onChange) onChange(compressed.dataUrl);
		} catch (err) {
			setError(err?.message || "Failed to process image");
		} finally {
			setLoading(false);
		}
	};
	const onFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};
	const onDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};
	const displayUrl = previewUrl ?? value ?? currentImageUrl ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-1.5 ${className}`,
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "font-semibold block text-xs",
				children: [
					label,
					" ",
					required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-destructive",
						children: "*"
					})
				]
			}),
			displayUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 p-3 border rounded-lg bg-card/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-14 w-14 rounded-md border bg-background flex items-center justify-center overflow-hidden flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: displayUrl,
							alt: "Uploaded logo preview",
							className: "max-h-full max-w-full object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-foreground truncate",
							children: "Image selected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Will be uploaded to MongoDB GridFS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs px-2.5 py-1 rounded border hover:bg-muted font-medium transition-colors",
							onClick: () => fileInputRef.current?.click(),
							children: "Change"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs p-1 rounded hover:bg-destructive/10 text-destructive transition-colors",
							title: "Remove image",
							onClick: () => {
								setPreviewUrl(null);
								onImageSelect("", "", "");
								if (onChange) onChange("");
								if (fileInputRef.current) fileInputRef.current.value = "";
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setIsDragging(true);
				},
				onDragLeave: () => setIsDragging(false),
				onDrop,
				onClick: () => fileInputRef.current?.click(),
				className: `cursor-pointer border-2 border-dashed rounded-lg p-4 text-center transition-all ${isDragging ? "border-gold bg-gold/5" : "border-border/80 hover:border-gold hover:bg-muted/40"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 rounded-full bg-muted text-muted-foreground",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin h-5 w-5 border-2 border-gold border-t-transparent rounded-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground",
							children: loading ? "Processing image…" : "Click to upload logo or drag & drop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "PNG, JPG, SVG, WebP — max 5 MB"
						})
					]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileInputRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/svg+xml",
				className: "hidden",
				onChange: onFileChange
			})
		]
	});
}
/**
* Parse a MongoDB document into TeamApplicationPayload.
*/
function parseMongoRegistration(id, data) {
	return {
		applicationId: data.applicationId || `YDS26-${id.slice(0, 4).toUpperCase()}`,
		temporaryTeamName: data.temporaryTeamName || "Team",
		teamLeader: data.teamLeader || {
			fullName: "",
			email: "",
			contactNumber: "",
			collegeName: "",
			yearOfStudy: "1st Year"
		},
		members: data.members || [],
		experience: data.experience || {
			hasNssMjcetMun: false,
			strongestAreas: []
		},
		politicalAgenda: data.politicalAgenda || "",
		recommendation: data.recommendation || { hasRecommendation: false },
		declarations: data.declarations || {
			teamDeclaration: true,
			teamLeaderConfirmation: true
		},
		submittedAt: data.submittedAt || (/* @__PURE__ */ new Date()).toISOString(),
		status: data.status || "PENDING",
		adminNotes: data.adminNotes || "",
		assignedPartyId: data.assignedPartyId || null,
		assignedPartyName: data.assignedPartyName || null,
		reviewedAt: data.reviewedAt || null,
		reviewedBy: data.reviewedBy || null,
		auditLog: data.auditLog || [{
			action: "Application Submitted",
			timestamp: data.submittedAt || (/* @__PURE__ */ new Date()).toISOString(),
			details: "Initial submission received"
		}]
	};
}
var adminGetApplications = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0402141ab8a85f507d9dd3b612b7441ac7f723cbc3988f5563be33cdd8dfd31d"));
var adminGetApplication = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ee1a11f5c444c3bc13aaed12a0f2eaaadabc112c9e0b551975a699636a0d501f"));
var adminUpdateApplicationStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("8365323318b46fb0f603bc4fabadf2571289261aa635def3f54815ca8b611912"));
var adminAllocateParty = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c74d7b2aac43818810471b40b9e73af9ff45e6e17f26299344a1a1a31a6a0898"));
var adminGetParties = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("849cf1250382bde3412289226d171206b378dfc3606a320a24a177f7fbab3e33"));
var adminUpsertParty = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("cbec18b569cf4b4d0493bde31e655ddb1bf22ea767890396b47a6f3cfd7bc92c"));
var adminDeleteParty = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ceb44e0cd13ab522ca8c98ad14331f0bfa20e19646650e8f91705977194af0a3"));
var adminGetSponsors = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("708f6694abff07136f1ad71df9f9bebca1e26033285d132f2bca071223177830"));
var adminUpsertSponsor = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0bc23f95026926d6a13e04a963794c9896e1c678bccff49512f0ba6dd4328e98"));
var adminDeleteSponsor = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("7cfb4ede6875fc53245ecfaabf5d9b6c75b812ff57835e8f82fd0693c18519be"));
var adminGetResultsStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("8367f2e2916792b275560538e4338757d3b6dda97b789569f90b61bb607ff20b"));
var adminSetResultsStatus = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ef3d22c53f85a1372fb0d0d0037315ba7c3688a1ce5533fc1477427c501f9950"));
var adminGetAdminUsers = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3dfc4bf7effb86626b52bd0e263bbc937d20007b1ee735d0b569da2849794b26"));
var adminAddAdminUser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5f41b43bcf49a46f5d7705ee18c77d3725fd0df87c7ea6097033d3f03febfdc3"));
var adminRemoveAdminUser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("1d24e4022276e906267a01ecaad134325165756de7a640bca7b61ea462e0155c"));
var adminGetAuditLogs = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c747df24d4bacb74af38b745014e20f681351c7fd9f3b1ee5cf7fc1ad50ee7e1"));
var adminGetStats = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("18497bf14b04a55e4b1329f2f1f53f20b0a9d897d47fd350024d8adf46d9fc69"));
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("eded31aa4a1cba81d2504eb6894fb8751ca6ed4009e4678991756c7778fc33bb"));
var adminGetOrganisers = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0ad377263b340b31b743c1fae5db5594d4c579478534a2f6a34cc527e683f3c8"));
var adminUpsertOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5b79f95196391185f4f16f130c6a96ea2b5f99a3a5798ee00cc0d9de1575bef5"));
var adminDeleteOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6f00376f4364b0d2308959feee757754970a8624c11cd673e7c74a265de4c63c"));
var adminGetCoOrganisers = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d2631c98fccc47f8c9683481261e526ed87528eefcf4e476f4afb17b0138a42c"));
var adminUpsertCoOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("23eea6877b1588f27aba53c827f5ba7bf0479ebf93788ee2db705dbab7b25ddc"));
var adminDeleteCoOrganiser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9b81ff618437ddf806165ebab9215849f98114c5dfe5aec7bf61020541e183c3"));
var adminGetDevelopers = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("28230c55f2e6a554890124dcec316c579f9eca709f6e3706c1c6de3546c17cc6"));
var adminUpsertDeveloper = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6ffd8f5208ee7cc3402e5b83e24b2dc9ba0596e001d83440ca0f66049a8f86a0"));
var adminGetDbStats = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("59fbb021e550373ae7d1fa71104e5a2cdf9601abde29aab6b7227f8592fa483c"));
var adminExportData = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("dc92ba21f3d4289e30fe44baf14d91f36ab15b1721846e0d20aa4c062564f6ee"));
function getIdToken() {
	const user = firebaseAuth.currentUser;
	if (!user) return Promise.resolve(null);
	return user.getIdToken();
}
function AdminPanel() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const routeCtx = Route.useRouteContext();
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [appFilter, setAppFilter] = (0, import_react.useState)("ALL");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [appPage, setAppPage] = (0, import_react.useState)(1);
	const [selectedAppId, setSelectedAppId] = (0, import_react.useState)(null);
	const [selectedAppNotes, setSelectedAppNotes] = (0, import_react.useState)("");
	const [newAdminEmail, setNewAdminEmail] = (0, import_react.useState)("");
	const [adminError, setAdminError] = (0, import_react.useState)("");
	const [adminSuccess, setAdminSuccess] = (0, import_react.useState)("");
	const [isAddingAdmin, setIsAddingAdmin] = (0, import_react.useState)(false);
	const [showReleaseModal, setShowReleaseModal] = (0, import_react.useState)(false);
	const [showAddSponsorModal, setShowAddSponsorModal] = (0, import_react.useState)(false);
	const [editSponsorId, setEditSponsorId] = (0, import_react.useState)(null);
	const [sponsorForm, setSponsorForm] = (0, import_react.useState)({
		name: "",
		category: "Title Sponsor",
		websiteUrl: "",
		description: "",
		displayOrder: 99,
		isActive: true
	});
	const [sponsorLogoBase64, setSponsorLogoBase64] = (0, import_react.useState)(null);
	const [sponsorLogoName, setSponsorLogoName] = (0, import_react.useState)("");
	const [sponsorLogoType, setSponsorLogoType] = (0, import_react.useState)("");
	const [showAddPartyModal, setShowAddPartyModal] = (0, import_react.useState)(false);
	const [editPartyId, setEditPartyId] = (0, import_react.useState)(null);
	const [partyForm, setPartyForm] = (0, import_react.useState)({
		name: "",
		abbreviation: "",
		ideology: "",
		historyDescription: "",
		sortOrder: 99,
		classification: "INDEPENDENT",
		formationDate: ""
	});
	const [partyLogoBase64, setPartyLogoBase64] = (0, import_react.useState)(null);
	const [partyLogoName, setPartyLogoName] = (0, import_react.useState)("");
	const [partyLogoType, setPartyLogoType] = (0, import_react.useState)("");
	const [showAddOrganiserModal, setShowAddOrganiserModal] = (0, import_react.useState)(false);
	const [editOrganiserId, setEditOrganiserId] = (0, import_react.useState)(null);
	const [organiserForm, setOrganiserForm] = (0, import_react.useState)({
		name: "",
		designation: "",
		displayOrder: 1,
		isActive: true,
		linkedinUrl: ""
	});
	const [organiserPhotoBase64, setOrganiserPhotoBase64] = (0, import_react.useState)(null);
	const [organiserPhotoName, setOrganiserPhotoName] = (0, import_react.useState)("");
	const [organiserPhotoType, setOrganiserPhotoType] = (0, import_react.useState)("");
	const [showAddCoOrganiserModal, setShowAddCoOrganiserModal] = (0, import_react.useState)(false);
	const [editCoOrganiserId, setEditCoOrganiserId] = (0, import_react.useState)(null);
	const [coOrganiserForm, setCoOrganiserForm] = (0, import_react.useState)({
		name: "",
		designation: "",
		displayOrder: 1,
		isActive: true,
		linkedinUrl: ""
	});
	const [coOrganiserPhotoBase64, setCoOrganiserPhotoBase64] = (0, import_react.useState)(null);
	const [coOrganiserPhotoName, setCoOrganiserPhotoName] = (0, import_react.useState)("");
	const [coOrganiserPhotoType, setCoOrganiserPhotoType] = (0, import_react.useState)("");
	const [showEditDevModal, setShowEditDevModal] = (0, import_react.useState)(false);
	const [devForm, setDevForm] = (0, import_react.useState)({
		id: "",
		name: "",
		githubUrl: "",
		linkedinUrl: ""
	});
	const [isExporting, setIsExporting] = (0, import_react.useState)(false);
	const adminUserEmail = routeCtx?.user?.email ?? firebaseAuth.currentUser?.email ?? "";
	const isSuperAdmin = routeCtx?.isSuperAdmin ?? false;
	const idTokenFromCtx = routeCtx?.idToken ?? "";
	const statsQuery = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			return adminGetStats({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		},
		refetchInterval: 3e4
	});
	const registrationsQuery = useQuery({
		queryKey: [
			"admin-registrations",
			appFilter,
			searchQuery,
			appPage
		],
		queryFn: async () => {
			const res = await adminGetApplications({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				statusFilter: appFilter,
				searchQuery,
				page: appPage,
				pageSize: 20
			} });
			if (Array.isArray(res)) return {
				applications: res.map((d) => ({
					id: d.id,
					parsed: parseMongoRegistration(d.id, d)
				})),
				totalCount: res.length,
				page: 1,
				pageSize: res.length,
				totalPages: 1
			};
			return {
				applications: (res.applications || []).map((d) => ({
					id: d.id,
					parsed: parseMongoRegistration(d.id, d)
				})),
				totalCount: res.totalCount || 0,
				page: res.page || 1,
				pageSize: res.pageSize || 20,
				totalPages: res.totalPages || 1
			};
		}
	});
	const acceptedAppsQuery = useQuery({
		queryKey: ["admin-accepted-apps"],
		queryFn: async () => {
			const res = await adminGetApplications({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				statusFilter: "ACCEPTED"
			} });
			return (Array.isArray(res) ? res : res.applications || []).map((d) => ({
				id: d.id,
				parsed: parseMongoRegistration(d.id, d)
			}));
		}
	});
	const applicationDetailQuery = useQuery({
		queryKey: ["admin-app-detail", selectedAppId],
		enabled: Boolean(selectedAppId),
		queryFn: async () => {
			if (!selectedAppId) return null;
			const doc = await adminGetApplication({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id: selectedAppId
			} });
			return {
				id: doc.id,
				parsed: parseMongoRegistration(doc.id, doc)
			};
		}
	});
	const partiesQuery = useQuery({
		queryKey: ["admin-parties"],
		queryFn: async () => {
			return adminGetParties({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const sponsorsQuery = useQuery({
		queryKey: ["admin-sponsors"],
		queryFn: async () => {
			return adminGetSponsors({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const resultsStatusQuery = useQuery({
		queryKey: ["admin-results-status"],
		queryFn: async () => {
			return adminGetResultsStatus({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const adminUsersQuery = useQuery({
		queryKey: ["admin-users"],
		enabled: isSuperAdmin,
		queryFn: async () => {
			return adminGetAdminUsers({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const auditLogsQuery = useQuery({
		queryKey: ["admin-audit-logs"],
		enabled: activeTab === "audit",
		queryFn: async () => {
			return adminGetAuditLogs({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				limit: 100
			} });
		}
	});
	const organisersQuery = useQuery({
		queryKey: ["admin-organisers"],
		queryFn: async () => {
			return adminGetOrganisers({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const coOrganisersQuery = useQuery({
		queryKey: ["admin-co-organisers"],
		queryFn: async () => {
			return adminGetCoOrganisers({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const developersQuery = useQuery({
		queryKey: ["admin-developers"],
		queryFn: async () => {
			return adminGetDevelopers({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const dbStatsQuery = useQuery({
		queryKey: ["admin-db-stats"],
		enabled: activeTab === "storage",
		queryFn: async () => {
			return adminGetDbStats({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
		}
	});
	const updateStatusMutation = useMutation({
		mutationFn: async ({ rowId, newStatus, adminNotes }) => {
			await adminUpdateApplicationStatus({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id: rowId,
				status: newStatus,
				adminNotes: adminNotes ?? ""
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
			queryClient.invalidateQueries({ queryKey: ["admin-accepted-apps"] });
			queryClient.invalidateQueries({ queryKey: ["admin-app-detail"] });
			queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
		}
	});
	const allocatePartyMutation = useMutation({
		mutationFn: async ({ applicationId, partyId }) => {
			await adminAllocateParty({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				applicationId,
				partyId
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
			queryClient.invalidateQueries({ queryKey: ["admin-accepted-apps"] });
			queryClient.invalidateQueries({ queryKey: ["admin-app-detail"] });
			queryClient.invalidateQueries({ queryKey: ["admin-parties"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
		}
	});
	const toggleResultsMutation = useMutation({
		mutationFn: async (released) => {
			await adminSetResultsStatus({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				released
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-results-status"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowReleaseModal(false);
		}
	});
	const upsertSponsorMutation = useMutation({
		mutationFn: async () => {
			const tok = idTokenFromCtx || await getIdToken() || "";
			let logoId = void 0;
			if (sponsorLogoBase64) logoId = (await uploadImage({ data: {
				idToken: tok,
				filename: sponsorLogoName,
				contentType: sponsorLogoType,
				base64: sponsorLogoBase64
			} })).id;
			const sponsorData = {
				idToken: tok,
				...sponsorForm
			};
			if (editSponsorId) sponsorData.id = editSponsorId;
			if (logoId) sponsorData.logoId = logoId;
			await adminUpsertSponsor({ data: sponsorData });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-sponsors"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowAddSponsorModal(false);
			setSponsorLogoBase64(null);
			setEditSponsorId(null);
			setSponsorForm({
				name: "",
				category: "Title Sponsor",
				websiteUrl: "",
				description: "",
				displayOrder: 99,
				isActive: true
			});
		}
	});
	const deleteSponsorMutation = useMutation({
		mutationFn: async (id) => {
			await adminDeleteSponsor({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-sponsors"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
		}
	});
	const upsertPartyMutation = useMutation({
		mutationFn: async () => {
			const tok = idTokenFromCtx || await getIdToken() || "";
			let logoId = void 0;
			if (partyLogoBase64) logoId = (await uploadImage({ data: {
				idToken: tok,
				filename: partyLogoName,
				contentType: partyLogoType,
				base64: partyLogoBase64
			} })).id;
			const partyData = {
				idToken: tok,
				...partyForm
			};
			if (editPartyId) partyData.id = editPartyId;
			if (logoId) partyData.logoId = logoId;
			await adminUpsertParty({ data: partyData });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-parties"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowAddPartyModal(false);
			setPartyLogoBase64(null);
			setEditPartyId(null);
			setPartyForm({
				name: "",
				abbreviation: "",
				ideology: "",
				historyDescription: "",
				sortOrder: 99,
				classification: "INDEPENDENT",
				formationDate: ""
			});
		}
	});
	const deletePartyMutation = useMutation({
		mutationFn: async (id) => {
			await adminDeleteParty({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id
			} });
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-parties"] })
	});
	const upsertOrganiserMutation = useMutation({
		mutationFn: async () => {
			const tok = idTokenFromCtx || await getIdToken() || "";
			let photoId = void 0;
			if (organiserPhotoBase64) photoId = (await uploadImage({ data: {
				idToken: tok,
				filename: organiserPhotoName,
				contentType: organiserPhotoType,
				base64: organiserPhotoBase64
			} })).id;
			const payload = {
				idToken: tok,
				...organiserForm
			};
			if (editOrganiserId) payload.id = editOrganiserId;
			if (photoId) payload.photoId = photoId;
			await adminUpsertOrganiser({ data: payload });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-organisers"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowAddOrganiserModal(false);
			setOrganiserPhotoBase64(null);
			setEditOrganiserId(null);
			setOrganiserForm({
				name: "",
				designation: "",
				displayOrder: 1,
				isActive: true,
				linkedinUrl: ""
			});
		}
	});
	const deleteOrganiserMutation = useMutation({
		mutationFn: async (id) => {
			await adminDeleteOrganiser({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-organisers"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
		}
	});
	const upsertCoOrganiserMutation = useMutation({
		mutationFn: async () => {
			const tok = idTokenFromCtx || await getIdToken() || "";
			let photoId = void 0;
			if (coOrganiserPhotoBase64) photoId = (await uploadImage({ data: {
				idToken: tok,
				filename: coOrganiserPhotoName,
				contentType: coOrganiserPhotoType,
				base64: coOrganiserPhotoBase64
			} })).id;
			const payload = {
				idToken: tok,
				...coOrganiserForm
			};
			if (editCoOrganiserId) payload.id = editCoOrganiserId;
			if (photoId) payload.photoId = photoId;
			await adminUpsertCoOrganiser({ data: payload });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-co-organisers"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowAddCoOrganiserModal(false);
			setCoOrganiserPhotoBase64(null);
			setEditCoOrganiserId(null);
			setCoOrganiserForm({
				name: "",
				designation: "",
				displayOrder: 1,
				isActive: true,
				linkedinUrl: ""
			});
		}
	});
	const deleteCoOrganiserMutation = useMutation({
		mutationFn: async (id) => {
			await adminDeleteCoOrganiser({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				id
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-co-organisers"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
		}
	});
	const upsertDeveloperMutation = useMutation({
		mutationFn: async () => {
			await adminUpsertDeveloper({ data: {
				idToken: idTokenFromCtx || await getIdToken() || "",
				...devForm
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-developers"] });
			queryClient.invalidateQueries({ queryKey: ["public-data"] });
			setShowEditDevModal(false);
		}
	});
	const handleExportData = async () => {
		setIsExporting(true);
		try {
			const backup = await adminExportData({ data: { idToken: idTokenFromCtx || await getIdToken() || "" } });
			const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `yds-2026-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (err) {
			alert(`Export failed: ${err?.message || err}`);
		} finally {
			setIsExporting(false);
		}
	};
	const signOut$1 = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await signOut(firebaseAuth);
		navigate({
			to: "/auth",
			replace: true
		});
	};
	const applications = registrationsQuery.data?.applications ?? [];
	const totalPages = registrationsQuery.data?.totalPages ?? 1;
	const totalCount = registrationsQuery.data?.totalCount ?? 0;
	const acceptedApps = acceptedAppsQuery.data ?? [];
	const parties = partiesQuery.data ?? [];
	const sponsors = sponsorsQuery.data ?? [];
	const organisers = organisersQuery.data ?? [];
	const coOrganisers = coOrganisersQuery.data ?? [];
	const developers = developersQuery.data ?? [];
	const dbStats = dbStatsQuery.data;
	const resultsReleased = resultsStatusQuery.data?.released ?? false;
	const stats = statsQuery.data ?? {
		total: 0,
		pending: 0,
		accepted: 0,
		waitlisted: 0,
		declined: 0,
		partiesAllocated: 0,
		partiesRemaining: YDS_CONFIG.totalParties,
		activeSponsors: 0
	};
	const filteredApps = (0, import_react.useMemo)(() => {
		return applications.filter(({ parsed }) => {
			if (appFilter !== "ALL" && parsed.status !== appFilter) return false;
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				return parsed.temporaryTeamName.toLowerCase().includes(q) || parsed.applicationId.toLowerCase().includes(q) || parsed.teamLeader.fullName.toLowerCase().includes(q) || parsed.teamLeader.email.toLowerCase().includes(q) || parsed.teamLeader.collegeName.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		applications,
		appFilter,
		searchQuery
	]);
	const activeDetailApp = (0, import_react.useMemo)(() => {
		if (!selectedAppId) return null;
		return applicationDetailQuery.data ?? applications.find((a) => a.id === selectedAppId) ?? null;
	}, [
		selectedAppId,
		applicationDetailQuery.data,
		applications
	]);
	const allocatedPartyIds = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		acceptedApps.forEach((a) => {
			if (a.parsed.assignedPartyId && a.parsed.status === "ACCEPTED") set.add(a.parsed.assignedPartyId);
		});
		return set;
	}, [acceptedApps]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "admin-page yds-admin-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "admin-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "NSS MJCET · ORGANISING COMMITTEE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Youth Democratic ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Summit 2026" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: [
							"Logged in as: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminUserEmail }),
							isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 inline-flex items-center gap-1 text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 10 }), " SUPER ADMIN"]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							target: "_blank",
							children: ["View Website ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: signOut$1,
						children: ["Sign out ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "yds-admin-nav",
				children: [[
					[
						"overview",
						"Overview",
						null
					],
					[
						"applications",
						"Applications",
						stats.total
					],
					[
						"party-allocation",
						"Party Allocation",
						stats.accepted
					],
					[
						"parties-config",
						"Parties Master",
						parties.length
					],
					[
						"results",
						"Results",
						null
					],
					[
						"sponsors",
						"Sponsors",
						sponsors.length
					],
					[
						"organisers",
						"Organisers",
						organisers.length
					],
					[
						"co-organisers",
						"Co-Organisers",
						coOrganisers.length
					],
					[
						"developers",
						"Developers",
						null
					],
					[
						"storage",
						"Storage & Backup",
						null
					],
					[
						"audit",
						"Audit Log",
						null
					]
				].map(([tab, label, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: activeTab === tab ? "yds-nav-btn active" : "yds-nav-btn",
					onClick: () => {
						setActiveTab(tab);
						setSelectedAppId(null);
					},
					children: [
						label,
						count !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "yds-badge",
							children: count
						}),
						tab === "results" && resultsReleased && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "yds-badge-green",
							children: "LIVE"
						})
					]
				}, tab)), isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: activeTab === "admins" ? "yds-nav-btn active" : "yds-nav-btn",
					onClick: () => {
						setActiveTab("admins");
						setSelectedAppId(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 13 }), " Admins"]
				})]
			}),
			activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label",
										children: "TOTAL APPLICATIONS"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-val",
										children: stats.total
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: "5 members per team"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box border-gold/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label text-gold",
										children: "PENDING REVIEW"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-val",
										children: stats.pending
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: "Awaiting decision"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box border-green-500/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label text-green-600",
										children: "ACCEPTED"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-val text-green-600",
										children: stats.accepted
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: "Target: 25 teams"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label text-amber-600",
										children: "WAITLISTED"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-val text-amber-600",
										children: stats.waitlisted
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: "Kept on standby"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label text-destructive",
										children: "DECLINED"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-val text-destructive",
										children: stats.declined
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: "Preserved in system"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label",
										children: "PARTIES ALLOCATED"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "stat-val",
										children: [
											stats.partiesAllocated,
											" / ",
											YDS_CONFIG.totalParties
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "stat-sub",
										children: [stats.partiesRemaining, " remaining"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-stat-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-label",
										children: "PUBLIC RESULTS"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `stat-val ${resultsReleased ? "text-green-600" : "text-muted-foreground"}`,
										children: resultsReleased ? "RELEASED" : "HIDDEN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stat-sub",
										children: resultsReleased ? "Visible to public" : "Hidden from public"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl",
							children: "Quick Actions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => {
										setAppFilter("PENDING");
										setActiveTab("applications");
									},
									children: [
										"Review Pending (",
										stats.pending,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => setActiveTab("party-allocation"),
									children: [
										"Party Allocation (",
										stats.accepted,
										" Accepted)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: resultsReleased ? "outline" : "default",
									onClick: () => setActiveTab("results"),
									children: resultsReleased ? "Manage Published Results" : "Preview & Release Results"
								})
							]
						})]
					})
				]
			}),
			activeTab === "applications" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: !selectedAppId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"ALL",
							"PENDING",
							"ACCEPTED",
							"WAITLISTED",
							"DECLINED"
						].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `yds-filter-tab ${appFilter === st ? "active" : ""}`,
							onClick: () => {
								setAppFilter(st);
								setAppPage(1);
							},
							children: [
								st,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-60 text-xs",
									children: st === "ALL" ? stats.total : st === "PENDING" ? stats.pending : st === "ACCEPTED" ? stats.accepted : st === "WAITLISTED" ? stats.waitlisted : stats.declined
								})
							]
						}, st))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[260px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 15,
							className: "absolute left-3 top-3 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "yds-search-input pl-9",
							placeholder: "Search by ID, team, leader...",
							value: searchQuery,
							onChange: (e) => {
								setSearchQuery(e.target.value);
								setAppPage(1);
							}
						})]
					})]
				}), registrationsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "admin-note",
					children: "Loading applications from MongoDB…"
				}) : filteredApps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "yds-card p-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No applications match your current filter."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [filteredApps.map(({ id, parsed }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "yds-app-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "yds-app-id",
												children: parsed.applicationId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `yds-status-badge status-${parsed.status.toLowerCase()}`,
												children: parsed.status
											}),
											parsed.recommendation.hasRecommendation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-semibold",
												children: "RECOMMENDED"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-xl font-medium",
										children: parsed.temporaryTeamName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Leader:" }),
												" ",
												parsed.teamLeader.fullName
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "College:" }),
												" ",
												parsed.teamLeader.collegeName
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Submitted:" }),
												" ",
												new Date(parsed.submittedAt).toLocaleDateString()
											] })
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${parsed.teamLeader.email}?subject=YDS 2026 Application Update - ${encodeURIComponent(parsed.temporaryTeamName)}`,
									className: "yds-action-link",
									title: "Email Team Leader",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: parsed.teamLeader.email })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setSelectedAppId(id);
										setSelectedAppNotes(parsed.adminNotes || "");
									},
									className: "gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 14 }), " Full Review"]
								})]
							})]
						})
					}, id)), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 bg-card/60 border rounded-lg mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"Page ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: appPage }),
								" of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: totalPages }),
								" (",
								totalCount,
								" total applications)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								disabled: appPage <= 1 || registrationsQuery.isFetching,
								onClick: () => setAppPage((p) => Math.max(1, p - 1)),
								children: "Previous"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								disabled: appPage >= totalPages || registrationsQuery.isFetching,
								onClick: () => setAppPage((p) => Math.min(totalPages, p + 1)),
								children: "Next"
							})]
						})]
					})]
				})] }) : activeDetailApp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 sm:p-8 space-y-6 animate-in slide-in-from-right-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setSelectedAppId(null),
								children: "← Back to List"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Application:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm text-gold",
										children: activeDetailApp.parsed.applicationId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `yds-status-badge status-${activeDetailApp.parsed.status.toLowerCase()}`,
										children: activeDetailApp.parsed.status
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 border rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "TEMPORARY TEAM IDENTIFIER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl font-bold",
									children: activeDetailApp.parsed.temporaryTeamName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: ["Submitted: ", new Date(activeDetailApp.parsed.submittedAt).toLocaleString()]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${activeDetailApp.parsed.teamLeader.email}?subject=YDS 2026 Selection Notification - ${encodeURIComponent(activeDetailApp.parsed.temporaryTeamName)}`,
								className: "yds-email-btn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 15 }), " Send Selection Mail"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-card-sub p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-gold",
										children: "MEMBER 1 — TEAM LEADER"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-serif text-lg font-semibold",
										children: activeDetailApp.parsed.teamLeader.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs space-y-1.5 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Email:" }),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `mailto:${activeDetailApp.parsed.teamLeader.email}`,
													className: "text-primary underline",
													children: activeDetailApp.parsed.teamLeader.email
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Phone:" }),
												" ",
												activeDetailApp.parsed.teamLeader.contactNumber
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "College:" }),
												" ",
												activeDetailApp.parsed.teamLeader.collegeName
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Year:" }),
												" ",
												activeDetailApp.parsed.teamLeader.yearOfStudy
											] })
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-card-sub p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow",
										children: "RECOMMENDATION"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Recommended?" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: activeDetailApp.parsed.recommendation.hasRecommendation ? "text-green-600 font-bold" : "",
												children: activeDetailApp.parsed.recommendation.hasRecommendation ? "YES" : "NO"
											})
										]
									}),
									activeDetailApp.parsed.recommendation.hasRecommendation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Recommender:" }),
											" ",
											activeDetailApp.parsed.recommendation.recommenderName
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "ALL FIVE TEAM MEMBERS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
								children: activeDetailApp.parsed.members.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "yds-card-sub p-3 space-y-1 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-gold",
											children: ["MEMBER ", idx + 2]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm",
											children: m.fullName || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: ["Phone: ", m.contactNumber || "—"]
										}),
										m.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: ["Email: ", m.email]
										}),
										m.college && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: ["College: ", m.college]
										})
									]
								}, idx))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "yds-card-sub p-5 space-y-2 border-l-4 border-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow text-gold",
									children: "POLITICAL AGENDA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										"~",
										activeDetailApp.parsed.politicalAgenda.split(/\s+/).length,
										" words"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm leading-relaxed whitespace-pre-wrap bg-background p-4 border rounded font-serif text-foreground/90",
									children: activeDetailApp.parsed.politicalAgenda || "No agenda submitted."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "yds-card-sub p-4 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "EXPERIENCE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "NSS MJCET MUN prior participation:" }),
										" ",
										activeDetailApp.parsed.experience.hasNssMjcetMun ? "Yes" : "No"
									]
								}),
								activeDetailApp.parsed.experience.munEventDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }),
										" ",
										activeDetailApp.parsed.experience.munEventDetails
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 pt-1",
									children: activeDetailApp.parsed.experience.strongestAreas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] bg-muted px-2 py-0.5 rounded border",
										children: area
									}, area))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "yds-card-sub p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "ADMIN NOTES (PRIVATE)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "yds-search-input w-full min-h-[80px] resize-y text-xs",
								placeholder: "Internal notes visible only to admins...",
								value: selectedAppNotes,
								onChange: (e) => setSelectedAppNotes(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-muted/40 border rounded space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "ADMIN DECISION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											className: "bg-green-700 hover:bg-green-800 text-white gap-1.5",
											disabled: updateStatusMutation.isPending,
											onClick: () => updateStatusMutation.mutate({
												rowId: activeDetailApp.id,
												newStatus: "ACCEPTED",
												adminNotes: selectedAppNotes
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), " ACCEPT TEAM"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											className: "text-amber-700 border-amber-600 hover:bg-amber-50",
											disabled: updateStatusMutation.isPending,
											onClick: () => updateStatusMutation.mutate({
												rowId: activeDetailApp.id,
												newStatus: "WAITLISTED",
												adminNotes: selectedAppNotes
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 }), " WAITLIST TEAM"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "destructive",
											disabled: updateStatusMutation.isPending,
											onClick: () => updateStatusMutation.mutate({
												rowId: activeDetailApp.id,
												newStatus: "DECLINED",
												adminNotes: selectedAppNotes
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 }), " DECLINE"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											disabled: updateStatusMutation.isPending,
											onClick: () => updateStatusMutation.mutate({
												rowId: activeDetailApp.id,
												newStatus: "PENDING",
												adminNotes: selectedAppNotes
											}),
											children: "Reset to Pending"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "Declining an application never deletes it. It remains stored with full audit history."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "yds-card-sub p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "APPLICATION AUDIT LOG"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: [...activeDetailApp.parsed.auditLog ?? []].reverse().map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs border-l-2 border-muted pl-3 space-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: entry.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: [new Date(entry.timestamp).toLocaleString(), entry.adminEmail ? ` · ${entry.adminEmail}` : ""]
										}),
										entry.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground italic",
											children: entry.details
										})
									]
								}, i))
							})]
						})
					]
				})
			}),
			activeTab === "party-allocation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "PARLIAMENTARY ASSIGNMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Allocate Fictional Parliamentary Parties"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-2xl",
							children: "Only accepted teams can be assigned a party. Each party is unique and cannot be allocated to more than one team. Backend enforces atomicity."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: acceptedApps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "yds-card p-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "No teams have been marked as ACCEPTED yet."
						})
					}) : acceptedApps.map(({ id, parsed }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "yds-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "yds-app-id",
										children: parsed.applicationId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "yds-status-badge status-accepted",
										children: "ACCEPTED"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-xl",
									children: parsed.temporaryTeamName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Leader: ",
										parsed.teamLeader.fullName,
										" (",
										parsed.teamLeader.collegeName,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 min-w-[220px]",
							children: [parsed.assignedPartyName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-semibold text-green-700 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }),
									" ",
									parsed.assignedPartyName
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground italic",
								children: "No party assigned"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "yds-search-input text-xs w-full",
								value: parsed.assignedPartyId ?? "",
								disabled: allocatePartyMutation.isPending,
								onChange: (e) => {
									if (!e.target.value) return;
									allocatePartyMutation.mutate({
										applicationId: id,
										partyId: e.target.value
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select Party —"
								}), parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.id,
									disabled: allocatedPartyIds.has(p.id) && p.id !== parsed.assignedPartyId,
									children: [p.name, allocatedPartyIds.has(p.id) && p.id !== parsed.assignedPartyId ? " (assigned)" : ""]
								}, p.id))]
							})]
						})]
					}, id))
				})]
			}),
			activeTab === "parties-config" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "25 FICTIONAL PARLIAMENTARY PARTIES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Party Configuration"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditPartyId(null);
							setPartyForm({
								name: "",
								abbreviation: "",
								ideology: "",
								historyDescription: "",
								sortOrder: 99,
								classification: "INDEPENDENT",
								formationDate: ""
							});
							setPartyLogoBase64(null);
							setShowAddPartyModal(true);
						},
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Party"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [p.logoId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `/api/images/${p.logoId}`,
										alt: p.name,
										className: "w-8 h-8 rounded object-contain"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm",
											children: p.name
										}), p.classification && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] bg-gold/10 text-gold border border-gold/30 px-1 py-0.5 rounded font-bold",
											children: p.classification
										})]
									}), p.abbreviation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: p.abbreviation
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => {
											setEditPartyId(p.id);
											setPartyForm({
												name: p.name,
												abbreviation: p.abbreviation || "",
												ideology: p.ideology || "",
												historyDescription: p.historyDescription || "",
												sortOrder: p.sortOrder ?? 99,
												classification: p.classification || "INDEPENDENT",
												formationDate: p.formationDate || ""
											});
											setPartyLogoBase64(null);
											setShowAddPartyModal(true);
										},
										children: "Edit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										className: "text-destructive hover:text-destructive",
										onClick: () => {
											if (confirm(`Delete party "${p.name}"?`)) deletePartyMutation.mutate(p.id);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
									})]
								})]
							}),
							p.formationDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Formed: ", p.formationDate]
							}),
							p.ideology && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: p.ideology
							}),
							p.assignedTeamName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-green-600 font-medium",
								children: ["Assigned: ", p.assignedTeamName]
							})
						]
					}, p.id))
				})]
			}),
			activeTab === "results" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "RESULTS MANAGEMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Public Results Gate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `inline-flex items-center gap-2 px-4 py-2 rounded border ${resultsReleased ? "bg-green-50 border-green-300 text-green-700" : "bg-muted border-border text-muted-foreground"}`,
							children: resultsReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), " Results are LIVE — visible to the public"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }), " Results are HIDDEN — not yet visible to the public"] })
						}),
						isSuperAdmin ? resultsReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							onClick: () => setShowReleaseModal(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }), " Hide Results from Public"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-green-700 hover:bg-green-800 text-white",
							onClick: () => setShowReleaseModal(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { size: 16 }), " Release Results to Public"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Only the Super Admin can release or hide results."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "ADMIN PREVIEW — ACCEPTED TEAMS"
					}), applications.filter((a) => a.parsed.status === "ACCEPTED").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "No accepted teams yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: applications.filter((a) => a.parsed.status === "ACCEPTED").map(({ id, parsed }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm flex items-center justify-between border rounded p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: parsed.temporaryTeamName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-muted-foreground",
								children: parsed.teamLeader.collegeName
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: parsed.assignedPartyName ? "text-xs text-green-700 font-medium" : "text-xs text-muted-foreground italic",
								children: parsed.assignedPartyName ?? "No party assigned"
							})]
						}, id))
					})]
				})]
			}),
			activeTab === "sponsors" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "SPONSORS & PARTNERS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Sponsor Management"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditSponsorId(null);
							setSponsorForm({
								name: "",
								category: "Title Sponsor",
								websiteUrl: "",
								description: "",
								displayOrder: 99,
								isActive: true
							});
							setSponsorLogoBase64(null);
							setShowAddSponsorModal(true);
						},
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Sponsor"]
					})]
				}), sponsors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "yds-card p-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No sponsors added yet."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: sponsors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [s.logoId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/api/images/${s.logoId}`,
									alt: s.name,
									className: "w-12 h-12 object-contain rounded"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: s.category
									}),
									s.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: s.websiteUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "text-xs text-primary underline",
										children: "Website"
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setEditSponsorId(s.id);
										setSponsorForm({
											name: s.name,
											category: s.category,
											websiteUrl: s.websiteUrl || "",
											description: s.description || "",
											displayOrder: s.displayOrder ?? 99,
											isActive: s.isActive !== false
										});
										setSponsorLogoBase64(null);
										setShowAddSponsorModal(true);
									},
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive hover:text-destructive",
									onClick: () => {
										if (confirm(`Delete sponsor "${s.name}"?`)) deleteSponsorMutation.mutate(s.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
								})]
							})]
						}), !s.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-amber-600 font-medium",
							children: "INACTIVE (hidden from public)"
						})]
					}, s.id))
				})]
			}),
			activeTab === "organisers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "SUMMIT ORGANISING COMMITTEE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Organisers Management"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Manage official YDS organisers. Photos and designations are stored dynamically in MongoDB."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditOrganiserId(null);
							setOrganiserForm({
								name: "",
								designation: "",
								displayOrder: organisers.length + 1,
								isActive: true,
								linkedinUrl: ""
							});
							setOrganiserPhotoBase64(null);
							setShowAddOrganiserModal(true);
						},
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Organiser"]
					})]
				}), organisers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "yds-card p-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No organisers added yet. Click \"Add Organiser\" to add committee members."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: organisers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-16 rounded bg-muted/40 border overflow-hidden flex-shrink-0 flex items-center justify-center",
								children: o.photoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/api/images/${o.photoId}`,
									alt: o.name,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 20,
									className: "text-muted-foreground"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-sm truncate",
										children: o.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gold font-medium",
										children: o.designation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: ["Order: ", o.displayOrder ?? 99]
									}),
									o.linkedinUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: o.linkedinUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "text-[11px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5",
										children: "LinkedIn ↗"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-1 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2 py-0.5 rounded ${o.isActive !== false ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`,
								children: o.isActive !== false ? "ACTIVE" : "INACTIVE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setEditOrganiserId(o.id);
										setOrganiserForm({
											name: o.name,
											designation: o.designation,
											displayOrder: o.displayOrder ?? 99,
											isActive: o.isActive !== false,
											linkedinUrl: o.linkedinUrl || ""
										});
										setOrganiserPhotoBase64(null);
										setShowAddOrganiserModal(true);
									},
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive hover:text-destructive",
									onClick: () => {
										if (confirm(`Delete organiser "${o.name}"?`)) deleteOrganiserMutation.mutate(o.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
								})]
							})]
						})]
					}, o.id))
				})]
			}),
			activeTab === "co-organisers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "CO-ORGANISING COMMITTEE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Co-Organisers Management"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Manage co-organisers and support committee members dynamically."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditCoOrganiserId(null);
							setCoOrganiserForm({
								name: "",
								designation: "",
								displayOrder: coOrganisers.length + 1,
								isActive: true,
								linkedinUrl: ""
							});
							setCoOrganiserPhotoBase64(null);
							setShowAddCoOrganiserModal(true);
						},
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Co-Organiser"]
					})]
				}), coOrganisers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "yds-card p-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No co-organisers added yet."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: coOrganisers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-16 rounded bg-muted/40 border overflow-hidden flex-shrink-0 flex items-center justify-center",
								children: o.photoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/api/images/${o.photoId}`,
									alt: o.name,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 20,
									className: "text-muted-foreground"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-sm truncate",
										children: o.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gold font-medium",
										children: o.designation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: ["Order: ", o.displayOrder ?? 99]
									}),
									o.linkedinUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: o.linkedinUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "text-[11px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5",
										children: "LinkedIn ↗"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-1 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2 py-0.5 rounded ${o.isActive !== false ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`,
								children: o.isActive !== false ? "ACTIVE" : "INACTIVE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setEditCoOrganiserId(o.id);
										setCoOrganiserForm({
											name: o.name,
											designation: o.designation,
											displayOrder: o.displayOrder ?? 99,
											isActive: o.isActive !== false,
											linkedinUrl: o.linkedinUrl || ""
										});
										setCoOrganiserPhotoBase64(null);
										setShowAddCoOrganiserModal(true);
									},
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive hover:text-destructive",
									onClick: () => {
										if (confirm(`Delete co-organiser "${o.name}"?`)) deleteCoOrganiserMutation.mutate(o.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
								})]
							})]
						})]
					}, o.id))
				})]
			}),
			activeTab === "developers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "SYSTEM AUTHORS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Developers Configuration"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-2xl",
							children: "Configure GitHub and LinkedIn profile links for the two official developers. Only professional links are displayed publicly."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: developers.map((dev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-5 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-lg font-bold",
								children: dev.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "gap-1.5",
								onClick: () => {
									setDevForm({
										id: dev.id,
										name: dev.name,
										githubUrl: dev.githubUrl || "",
										linkedinUrl: dev.linkedinUrl || ""
									});
									setShowEditDevModal(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { size: 13 }), " Edit Links"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs space-y-1.5 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "GitHub:" }),
								" ",
								dev.githubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: dev.githubUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "text-primary underline",
									children: dev.githubUrl
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: "Not configured"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "LinkedIn:" }),
								" ",
								dev.linkedinUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: dev.linkedinUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "text-primary underline",
									children: dev.linkedinUrl
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: "Not configured"
								})
							] })]
						})]
					}, dev.id))
				})]
			}),
			activeTab === "storage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "FREE TIER STORAGE MONITORING"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: "Database Storage & Backup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1 max-w-xl",
									children: [
										"MongoDB Atlas Free tier provides a ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "512 MB total storage limit" }),
										" without built-in automated backups. Use the export tool below to safely archive summit data."
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								disabled: isExporting,
								onClick: handleExportData,
								className: "gap-2 self-start bg-gold text-deep hover:bg-gold/90 font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }),
									" ",
									isExporting ? "Exporting…" : "Export All Data (JSON)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 bg-muted/20 border rounded-lg space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
										children: "Storage Usage"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs font-bold px-2 py-0.5 rounded border uppercase ${dbStats?.level === "critical" ? "bg-destructive/10 text-destructive border-destructive/40" : dbStats?.level === "warning" ? "bg-amber-500/10 text-amber-600 border-amber-500/40" : "bg-green-500/10 text-green-600 border-green-500/40"}`,
										children: dbStats?.level ?? "normal"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-muted rounded-full h-3 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all duration-500 ${dbStats?.level === "critical" ? "bg-destructive" : dbStats?.level === "warning" ? "bg-amber-500" : "bg-gold"}`,
										style: { width: `${Math.min(100, Math.max(2, dbStats?.usedPct ?? 1))}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-muted-foreground font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [dbStats?.totalMB ?? 0, " MB used"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										dbStats?.freeTierLimitMB ?? 512,
										" MB total budget (",
										dbStats?.usedPct ?? 0,
										"%)"
									] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-muted/10 border rounded text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Data Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-base mt-0.5",
										children: [dbStats?.dataSize ?? 0, " MB"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-muted/10 border rounded text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Storage Allocated"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-base mt-0.5",
										children: [dbStats?.storageSize ?? 0, " MB"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-muted/10 border rounded text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Indexes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-base mt-0.5",
										children: [dbStats?.indexSize ?? 0, " MB"]
									})]
								})
							]
						})
					]
				})
			}),
			activeTab === "admins" && isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "ADMIN USER MANAGEMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Authorized Organizers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pre-authorize team members by email. They log in with Google OAuth and are verified against this list server-side."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								className: "yds-search-input flex-1",
								placeholder: "admin@example.com",
								value: newAdminEmail,
								onChange: (e) => {
									setNewAdminEmail(e.target.value);
									setAdminError("");
									setAdminSuccess("");
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								disabled: isAddingAdmin || !newAdminEmail.trim(),
								onClick: async () => {
									setIsAddingAdmin(true);
									setAdminError("");
									setAdminSuccess("");
									try {
										await adminAddAdminUser({ data: {
											idToken: idTokenFromCtx || await getIdToken() || "",
											email: newAdminEmail.trim()
										} });
										setAdminSuccess(`${newAdminEmail.trim()} has been authorized as an admin.`);
										setNewAdminEmail("");
										queryClient.invalidateQueries({ queryKey: ["admin-users"] });
									} catch (err) {
										setAdminError(err?.message || "Failed to add admin.");
									} finally {
										setIsAddingAdmin(false);
									}
								},
								className: "gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 16 }), " Add Admin"]
							})]
						}),
						adminError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: adminError
						}),
						adminSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-green-600",
							children: adminSuccess
						})
					]
				}), adminUsersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "admin-note",
					children: "Loading admin users…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: (adminUsersQuery.data ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-4 flex items-center justify-between gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-sm",
												children: a.email
											}),
											a.role === "SUPER_ADMIN" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-bold",
												children: "SUPER ADMIN"
											}),
											a.status === "INACTIVE" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded font-bold",
												children: "INACTIVE"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Added by ",
											a.addedBy,
											" · ",
											a.addedAt ? new Date(a.addedAt).toLocaleDateString() : ""
										]
									}),
									a.lastLoginAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Last login: ", new Date(a.lastLoginAt).toLocaleString()]
									})
								]
							}),
							a.role !== "SUPER_ADMIN" && a.status === "ACTIVE" && a.email.toLowerCase() !== "nssmjcet@mjcollege.ac.in" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "text-destructive border-destructive/50 hover:bg-destructive/5",
								onClick: async () => {
									if (!confirm(`Deactivate ${a.email}?`)) return;
									await adminRemoveAdminUser({ data: {
										idToken: idTokenFromCtx || await getIdToken() || "",
										email: a.email
									} });
									queryClient.invalidateQueries({ queryKey: ["admin-users"] });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), " Deactivate"]
							}),
							a.email.toLowerCase() === "nssmjcet@mjcollege.ac.in" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground italic px-2",
								children: "Permanent Admin"
							})
						]
					}, a.email))
				})]
			}),
			activeTab === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 animate-in fade-in-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "SYSTEM ACTIVITY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "Audit Log"
				})] }), auditLogsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "admin-note",
					children: "Loading audit logs…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: (auditLogsQuery.data ?? []).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-card p-3 flex items-start gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground min-w-[140px]",
							children: new Date(log.timestamp).toLocaleString()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: log.action
								}),
								log.adminEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-muted-foreground",
									children: ["by ", log.adminEmail]
								}),
								log.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-0.5",
									children: log.details
								})
							]
						})]
					}, log.id))
				})]
			}),
			showReleaseModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								size: 24,
								className: "text-amber-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl",
								children: resultsReleased ? "Hide Results?" : "Release Results?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: resultsReleased ? "This will immediately hide the results from the public website. You can re-release them at any time." : "This will immediately publish the selected team results and party allocations to the public website. Make sure all party assignments are final before releasing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowReleaseModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: resultsReleased ? "bg-destructive hover:bg-destructive/90 text-white" : "bg-green-700 hover:bg-green-800 text-white",
								disabled: toggleResultsMutation.isPending,
								onClick: () => toggleResultsMutation.mutate(!resultsReleased),
								children: toggleResultsMutation.isPending ? "Processing…" : resultsReleased ? "Hide Results" : "Release Results"
							})]
						})
					]
				})
			}),
			showAddSponsorModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl",
							children: editSponsorId ? "Edit Sponsor" : "Add New Sponsor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: sponsorForm.name,
									onChange: (e) => setSponsorForm((f) => ({
										...f,
										name: e.target.value
									})),
									placeholder: "Sponsor name"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Category *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "yds-search-input w-full mt-1",
									value: sponsorForm.category,
									onChange: (e) => setSponsorForm((f) => ({
										...f,
										category: e.target.value
									})),
									children: [
										"Title Sponsor",
										"Co-Sponsor",
										"Associate Sponsor",
										"Powered By",
										"Knowledge Partner",
										"Media Partner",
										"Community Partner",
										"Outreach Partner"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Website URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: sponsorForm.websiteUrl,
									onChange: (e) => setSponsorForm((f) => ({
										...f,
										websiteUrl: e.target.value
									})),
									placeholder: "https://..."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Logo (Image Upload)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
										onImageSelect: (b64, name, type) => {
											setSponsorLogoBase64(b64);
											setSponsorLogoName(name);
											setSponsorLogoType(type);
										},
										currentImageUrl: null,
										className: "mt-1"
									}),
									sponsorLogoBase64 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `data:${sponsorLogoType};base64,${sponsorLogoBase64}`,
										alt: "preview",
										className: "mt-2 h-12 object-contain rounded border"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-muted-foreground uppercase",
											children: "Display Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											className: "yds-search-input w-full mt-1",
											value: sponsorForm.displayOrder,
											onChange: (e) => setSponsorForm((f) => ({
												...f,
												displayOrder: parseInt(e.target.value) || 99
											}))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-end pb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: sponsorForm.isActive,
												onChange: (e) => setSponsorForm((f) => ({
													...f,
													isActive: e.target.checked
												}))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Active (show on website)"
											})]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowAddSponsorModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: upsertSponsorMutation.isPending || !sponsorForm.name.trim(),
								onClick: () => upsertSponsorMutation.mutate(),
								children: upsertSponsorMutation.isPending ? "Saving…" : editSponsorId ? "Save Changes" : "Add Sponsor"
							})]
						})
					]
				})
			}),
			showAddPartyModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl",
							children: editPartyId ? "Edit Party" : "Add New Party"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Party Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: partyForm.name,
									onChange: (e) => setPartyForm((f) => ({
										...f,
										name: e.target.value
									})),
									placeholder: "Party name"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Abbreviation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "yds-search-input w-full mt-1",
										value: partyForm.abbreviation,
										onChange: (e) => setPartyForm((f) => ({
											...f,
											abbreviation: e.target.value
										})),
										placeholder: "e.g. NDF, PPF"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Classification *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "yds-search-input w-full mt-1",
										value: partyForm.classification,
										onChange: (e) => setPartyForm((f) => ({
											...f,
											classification: e.target.value
										})),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "INC",
												children: "INC"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "NDA",
												children: "NDA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "FEDERAL BLOCK",
												children: "FEDERAL BLOCK"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "INDEPENDENT",
												children: "INDEPENDENT"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Ideology"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "yds-search-input w-full mt-1",
										value: partyForm.ideology,
										onChange: (e) => setPartyForm((f) => ({
											...f,
											ideology: e.target.value
										})),
										placeholder: "e.g. Social Democracy"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Formation Date / Year"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "yds-search-input w-full mt-1",
										value: partyForm.formationDate,
										onChange: (e) => setPartyForm((f) => ({
											...f,
											formationDate: e.target.value
										})),
										placeholder: "e.g. 1985 or 15 Aug 2002"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "History / Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "yds-search-input w-full mt-1 min-h-[80px] resize-y",
									value: partyForm.historyDescription,
									onChange: (e) => setPartyForm((f) => ({
										...f,
										historyDescription: e.target.value
									})),
									placeholder: "Brief party history and political agenda..."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Logo (Image Upload)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
										onImageSelect: (b64, name, type) => {
											setPartyLogoBase64(b64);
											setPartyLogoName(name);
											setPartyLogoType(type);
										},
										currentImageUrl: null,
										className: "mt-1"
									}),
									partyLogoBase64 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `data:${partyLogoType};base64,${partyLogoBase64}`,
										alt: "preview",
										className: "mt-2 h-12 object-contain rounded border"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Sort Order"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									className: "yds-search-input w-full mt-1",
									value: partyForm.sortOrder,
									onChange: (e) => setPartyForm((f) => ({
										...f,
										sortOrder: parseInt(e.target.value) || 99
									}))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowAddPartyModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: upsertPartyMutation.isPending || !partyForm.name.trim(),
								onClick: () => upsertPartyMutation.mutate(),
								children: upsertPartyMutation.isPending ? "Saving…" : editPartyId ? "Save Changes" : "Add Party"
							})]
						})
					]
				})
			}),
			showAddOrganiserModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl",
							children: editOrganiserId ? "Edit Organiser" : "Add New Organiser"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: organiserForm.name,
									onChange: (e) => setOrganiserForm((f) => ({
										...f,
										name: e.target.value
									})),
									placeholder: "e.g. John Doe"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Designation / Role *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: organiserForm.designation,
									onChange: (e) => setOrganiserForm((f) => ({
										...f,
										designation: e.target.value
									})),
									placeholder: "e.g. Convener, Secretary General"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "LinkedIn Profile URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: organiserForm.linkedinUrl,
									onChange: (e) => setOrganiserForm((f) => ({
										...f,
										linkedinUrl: e.target.value
									})),
									placeholder: "https://linkedin.com/in/username"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Photograph (Portrait)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
										onImageSelect: (b64, name, type) => {
											setOrganiserPhotoBase64(b64);
											setOrganiserPhotoName(name);
											setOrganiserPhotoType(type);
										},
										currentImageUrl: null,
										className: "mt-1"
									}),
									organiserPhotoBase64 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `data:${organiserPhotoType};base64,${organiserPhotoBase64}`,
										alt: "preview",
										className: "mt-2 h-16 w-14 object-cover rounded border"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-muted-foreground uppercase",
											children: "Display Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											className: "yds-search-input w-full mt-1",
											value: organiserForm.displayOrder,
											onChange: (e) => setOrganiserForm((f) => ({
												...f,
												displayOrder: parseInt(e.target.value) || 1
											}))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-end pb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: organiserForm.isActive,
												onChange: (e) => setOrganiserForm((f) => ({
													...f,
													isActive: e.target.checked
												}))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Active (show on website)"
											})]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowAddOrganiserModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: upsertOrganiserMutation.isPending || !organiserForm.name.trim() || !organiserForm.designation.trim(),
								onClick: () => upsertOrganiserMutation.mutate(),
								children: upsertOrganiserMutation.isPending ? "Saving…" : editOrganiserId ? "Save Changes" : "Add Organiser"
							})]
						})
					]
				})
			}),
			showAddCoOrganiserModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl",
							children: editCoOrganiserId ? "Edit Co-Organiser" : "Add New Co-Organiser"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: coOrganiserForm.name,
									onChange: (e) => setCoOrganiserForm((f) => ({
										...f,
										name: e.target.value
									})),
									placeholder: "e.g. Jane Smith"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "Designation / Role *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: coOrganiserForm.designation,
									onChange: (e) => setCoOrganiserForm((f) => ({
										...f,
										designation: e.target.value
									})),
									placeholder: "e.g. Logistics Lead, Media Head"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase",
									children: "LinkedIn Profile URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "yds-search-input w-full mt-1",
									value: coOrganiserForm.linkedinUrl,
									onChange: (e) => setCoOrganiserForm((f) => ({
										...f,
										linkedinUrl: e.target.value
									})),
									placeholder: "https://linkedin.com/in/username"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase",
										children: "Photograph (Portrait)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
										onImageSelect: (b64, name, type) => {
											setCoOrganiserPhotoBase64(b64);
											setCoOrganiserPhotoName(name);
											setCoOrganiserPhotoType(type);
										},
										currentImageUrl: null,
										className: "mt-1"
									}),
									coOrganiserPhotoBase64 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `data:${coOrganiserPhotoType};base64,${coOrganiserPhotoBase64}`,
										alt: "preview",
										className: "mt-2 h-16 w-14 object-cover rounded border"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-muted-foreground uppercase",
											children: "Display Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											className: "yds-search-input w-full mt-1",
											value: coOrganiserForm.displayOrder,
											onChange: (e) => setCoOrganiserForm((f) => ({
												...f,
												displayOrder: parseInt(e.target.value) || 1
											}))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-end pb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: coOrganiserForm.isActive,
												onChange: (e) => setCoOrganiserForm((f) => ({
													...f,
													isActive: e.target.checked
												}))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Active (show on website)"
											})]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowAddCoOrganiserModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: upsertCoOrganiserMutation.isPending || !coOrganiserForm.name.trim() || !coOrganiserForm.designation.trim(),
								onClick: () => upsertCoOrganiserMutation.mutate(),
								children: upsertCoOrganiserMutation.isPending ? "Saving…" : editCoOrganiserId ? "Save Changes" : "Add Co-Organiser"
							})]
						})
					]
				})
			}),
			showEditDevModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-serif text-xl",
							children: ["Edit Developer Links — ", devForm.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Only professional GitHub and LinkedIn profile links are allowed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase",
								children: "GitHub Profile URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "yds-search-input w-full mt-1",
								value: devForm.githubUrl,
								onChange: (e) => setDevForm((f) => ({
									...f,
									githubUrl: e.target.value
								})),
								placeholder: "https://github.com/username"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase",
								children: "LinkedIn Profile URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "yds-search-input w-full mt-1",
								value: devForm.linkedinUrl,
								onChange: (e) => setDevForm((f) => ({
									...f,
									linkedinUrl: e.target.value
								})),
								placeholder: "https://linkedin.com/in/username"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowEditDevModal(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: upsertDeveloperMutation.isPending,
								onClick: () => upsertDeveloperMutation.mutate(),
								children: upsertDeveloperMutation.isPending ? "Saving…" : "Save Links"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminPanel as component };
