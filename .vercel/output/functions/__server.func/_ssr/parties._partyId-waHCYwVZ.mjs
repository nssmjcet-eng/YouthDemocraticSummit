import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as getPartyById } from "./public-BiWzt-VM.mjs";
import { M as ArrowLeft, c as Shield, k as Calendar, n as Users, v as Instagram, x as Flag } from "../_libs/lucide-react.mjs";
import { t as nss_logo_default } from "./nss-logo-BtoBkQ3l.mjs";
import { t as Route } from "./parties._partyId-cJp91rVO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parties._partyId-waHCYwVZ.js
var import_jsx_runtime = require_jsx_runtime();
var CLASSIFICATION_COLOURS = {
	"INC": "#138808",
	"NDA": "#FF9933",
	"FEDERAL BLOCK": "#000080",
	"INDEPENDENT": "#6b7280"
};
function PartyDetailPage() {
	const { partyId } = Route.useParams();
	const partyQuery = useQuery({
		queryKey: ["party", partyId],
		queryFn: () => getPartyById({ data: { id: partyId } }),
		staleTime: 12e4
	});
	const party = partyQuery.data;
	if (partyQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "party-detail-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "register-page-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "back-to-yds-btn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BACK TO YDS" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "wordmark",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "brand-logo",
						src: nss_logo_default,
						alt: "NSS MJCET Logo",
						width: 38,
						height: 38
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "wordmark-title hidden sm:inline-block",
						children: [
							"YDS 2026",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"BY NSS MJCET"
						]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "section-inner",
			style: {
				padding: "80px 0",
				textAlign: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					color: "var(--gold)",
					fontSize: 12,
					letterSpacing: "0.15em",
					fontWeight: 700
				},
				children: "LOADING PARTY DATA…"
			})
		})]
	});
	if (!party) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "party-detail-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "register-page-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-inner",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "back-to-yds-btn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BACK TO YDS" })]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "section-inner",
			style: {
				padding: "80px 0",
				textAlign: "center"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Party not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-link",
				style: {
					marginTop: 24,
					display: "inline-block"
				},
				children: "← Return to Homepage"
			})]
		})]
	});
	const classificationColor = party.classification ? CLASSIFICATION_COLOURS[party.classification] ?? "#6b7280" : "#6b7280";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "party-detail-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "register-page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "back-to-yds-btn",
						"aria-label": "Return to YDS Homepage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BACK TO YDS" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "wordmark",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "brand-logo",
							src: nss_logo_default,
							alt: "NSS MJCET Logo",
							width: 38,
							height: 38
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "wordmark-title hidden sm:inline-block",
							children: [
								"YDS 2026",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"BY NSS MJCET"
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "party-detail-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PARLIAMENTARY PARTY · YDS 2026" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FICTION · SIMULATION" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "party-detail-hero-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "party-detail-logo-wrap",
							children: party.logoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `/api/images/${party.logoId}`,
								alt: `${party.name} logo`,
								className: "party-detail-logo-img"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "party-detail-logo-placeholder",
								children: party.abbreviation ?? party.name.slice(0, 2).toUpperCase()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "party-detail-hero-info",
							children: [
								party.classification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "party-classification-badge",
									style: {
										background: classificationColor + "22",
										color: classificationColor,
										borderColor: classificationColor + "55"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { size: 11 }), party.classification]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									style: { marginTop: 12 },
									children: "PARLIAMENTARY PARTY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "party-detail-name",
									children: party.name
								}),
								party.abbreviation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "party-detail-abbr",
									children: party.abbreviation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "party-detail-meta",
									children: [party.formationDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "party-detail-meta-item",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 14 }),
											"Formed: ",
											party.formationDate
										]
									}), party.ideology && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "party-detail-meta-item",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 14 }), party.ideology]
									})]
								})
							]
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "party-detail-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-inner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "party-detail-body-grid",
						children: [party.historyDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "party-detail-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "ABOUT THE PARTY"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "party-detail-text",
								children: party.historyDescription
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "party-detail-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "PARLIAMENTARY TEAM"
							}), party.resultsReleased && party.assignedTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "party-detail-team",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 18,
									className: "text-gold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "party-detail-team-name",
										children: party.assignedTeam.teamName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "party-detail-team-meta",
										children: party.assignedTeam.leaderName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "party-detail-team-meta",
										children: party.assignedTeam.collegeName
									})
								] })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "party-detail-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
									size: 22,
									strokeWidth: 1.5,
									className: "text-gold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: party.resultsReleased ? "No team has been assigned to this party yet." : "Team assignment will be revealed when results are released." })]
							})]
						})]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "site-footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "footer-title footer-brand",
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "brand-logo",
								src: nss_logo_default,
								alt: "NSS MJCET logo",
								width: 40,
								height: 40
							}), "YOUTH DEMOCRATIC SUMMIT 2026 · NSS MJCET"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "footer-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: YDS_CONFIG.instagramUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "footer-instagram",
								"aria-label": "YDS NSS MJCET Instagram",
								title: "Follow YDS on Instagram",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-xs text-gold hover:underline",
								children: "← RETURN TO HOMEPAGE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ENTER THE PARLIAMENT. FIND YOUR VOICE." })
					]
				})
			})
		]
	});
}
//#endregion
export { PartyDetailPage as component };
