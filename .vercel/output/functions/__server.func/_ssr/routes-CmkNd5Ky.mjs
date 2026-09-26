import { o as __toESM } from "../_runtime.mjs";
import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { n as getPublicData } from "./public-BiWzt-VM.mjs";
import { C as ExternalLink, N as ArrowDown, _ as Linkedin, b as Github, c as Shield, d as Menu, j as ArrowRight, n as Users, t as X, v as Instagram } from "../_libs/lucide-react.mjs";
import { t as nss_logo_default } from "./nss-logo-BtoBkQ3l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CmkNd5Ky.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var parliament_exterior_default = "/assets/parliament-exterior-VLRL49ny.jpg";
var parliament_entrance_frame_default = "/assets/parliament-entrance-frame-C8pvfUPY.webp";
var door_left_default = "/assets/door-left-B2-E6mjj.webp";
var door_right_default = "/assets/door-right-D489C4Qd.webp";
var parliament_chamber_default = "/assets/parliament-chamber-DfHJjw_W.jpg";
var parliament_vestibule_default = "/assets/parliament-vestibule-CBGAisoN.jpg";
function Heading({ n, tag, eyebrow, title, em, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-topline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tag })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: eyebrow
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
			title,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: em })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "public-lede",
			children: lede
		})
	] });
}
/** Helper to build GridFS image URL from image ID */
function gridfsImageUrl(id) {
	if (!id) return null;
	return `/api/images/${id}`;
}
function PublicSections() {
	const data = useQuery({
		queryKey: ["public-data"],
		queryFn: () => getPublicData(),
		staleTime: 6e4,
		gcTime: 3e5
	}).data;
	const isReleased = data?.resultsReleased ?? false;
	const results = data?.results ?? [];
	const partyList = data?.parties ?? [];
	const activeSponsors = data?.sponsors ?? [];
	data?.organisers;
	data?.coOrganisers;
	data?.developers;
	const partySlots = Array.from({ length: Math.max(25, partyList.length) }, (_, i) => partyList[i] ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "results",
			className: "section public-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					n: "04 / RESULTS",
					tag: "OFFICIAL SELECTION",
					eyebrow: "THE RESULTS",
					title: "Selected Teams",
					em: "& Parliamentary Parties.",
					lede: `Teams selected by the YDS Organising Committee. Results announced on ${YDS_CONFIG.resultsDate}.`
				}), !isReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "public-empty yds-gated-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							className: "text-gold mb-3 inline-block",
							size: 32,
							strokeWidth: 1.5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl mb-2 text-foreground",
							children: "Results will be announced soon."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground max-w-lg",
							children: [
								"The YDS 2026 selection committee is currently reviewing submitted team applications. Please stay tuned for the official announcement on this website on ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.resultsDate }),
								"."
							]
						})
					]
				}) : results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "public-grid",
					children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "result-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "result-item-party",
								children: r.assignedPartyName ?? "PARTY ALLOCATION IN PROGRESS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "result-item-team",
								children: r.teamName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "result-item-meta",
								children: r.leaderName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "result-item-college",
								children: r.collegeName
							})
						]
					}, r.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "public-empty",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Selection results have been released. No teams are currently published." })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "parties",
			className: "section public-section alt",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					n: "05 / PARTIES",
					tag: "25 PARLIAMENTARY PARTIES",
					eyebrow: "THE HOUSE",
					title: "The 25 Parties",
					em: "of the Summit.",
					lede: "Every selected 5-member team represents one of the Summit's 25 fictional parliamentary parties. Click a party to learn more."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "public-grid",
					children: partySlots.map((p, i) => {
						const card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `party-item${p?.id ? " party-card-clickable" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "party-item-logo",
									children: p?.logoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: gridfsImageUrl(p.logoId),
										alt: `${p.name} logo`,
										loading: "lazy"
									}) : p?.abbreviation ?? String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p?.name ?? `Party ${String(i + 1).padStart(2, "0")}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p?.ideology ?? (p ? "" : "Fictional Party — To be allocated") }),
								p?.classification && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "party-card-classification",
									children: p.classification
								})
							]
						}, p?.id ?? i);
						if (p?.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/parties/$partyId",
							params: { partyId: p.id },
							style: { display: "contents" },
							children: card
						}, p.id);
						return card;
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "sponsors",
			className: "section public-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					n: "06 / SPONSORS & PARTNERS",
					tag: "COLLABORATION",
					eyebrow: "SUPPORTED BY",
					title: "Our Sponsors",
					em: "& Institutional Partners.",
					lede: "The partners and patron institutions who make the Youth Democratic Summit possible."
				}), activeSponsors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sponsors-grid",
					children: activeSponsors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "sponsor-card",
						href: s.websiteUrl ?? void 0,
						target: s.websiteUrl ? "_blank" : void 0,
						rel: "noreferrer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sponsor-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-badge",
									children: s.category?.toUpperCase() || "OFFICIAL SPONSOR"
								}), s.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-external",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sponsor-card-logo-box",
								children: s.logoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: gridfsImageUrl(s.logoId),
									alt: `${s.name} logo`,
									className: "sponsor-card-logo",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sponsor-card-text-fallback",
									children: s.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sponsor-card-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "sponsor-card-name",
									children: s.name
								}), s.websiteUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-action",
									children: "Visit Website ↗"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-partner-label",
									children: "Official Summit Partner"
								})]
							})
						]
					}, s.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sponsors-grid",
					children: [
						{
							name: "MJCET Hyderabad",
							tier: "Host Institution"
						},
						{
							name: "NSS MJCET Chapter",
							tier: "Organising Unit"
						},
						{
							name: "Patrons & Partners",
							tier: "Associate Partner"
						},
						{
							name: "Community Media",
							tier: "Outreach Partner"
						}
					].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "sponsor-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sponsor-card-header",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-badge",
									children: item.tier.toUpperCase()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sponsor-card-logo-box",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sponsor-card-text-fallback",
									children: item.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sponsor-card-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "sponsor-card-name",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sponsor-card-partner-label",
									children: "Official Partner for YDS 2026"
								})]
							})
						]
					}, idx))
				})]
			})
		})
	] });
}
function CommunitySections() {
	const data = useQuery({
		queryKey: ["public-data"],
		queryFn: () => getPublicData(),
		staleTime: 6e4,
		gcTime: 3e5
	}).data;
	const organisers = data?.organisers ?? [];
	const coOrganisers = data?.coOrganisers ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [organisers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "organisers",
		className: "section public-section alt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				n: "07 / ORGANISERS",
				tag: "NSS MJCET · YDS 2026",
				eyebrow: "ORGANISING COMMITTEE",
				title: "The Organisers",
				em: "behind the Summit.",
				lede: "The dedicated team behind Youth Democratic Summit 2026, organised under the National Service Scheme at MJCET, Hyderabad."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "people-grid",
				children: organisers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "people-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "people-card-photo-wrap",
						children: [
							o.photoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: gridfsImageUrl(o.photoId),
								alt: o.name,
								className: "people-card-photo",
								loading: "lazy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "people-card-photo-placeholder",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 36,
									strokeWidth: 1
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "people-card-overlay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "people-card-role",
									children: o.designation
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "people-card-name",
									children: o.name
								})]
							}),
							o.linkedinUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: o.linkedinUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "people-card-linkedin",
								"aria-label": `${o.name} on LinkedIn`,
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
									size: 16,
									strokeWidth: 2
								})
							})
						]
					})
				}, o.id))
			})]
		})
	}), coOrganisers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "co-organisers",
		className: "section public-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				n: "08 / CO-ORGANISERS",
				tag: "NSS MJCET · YDS 2026",
				eyebrow: "CO-ORGANISING COMMITTEE",
				title: "The Co-Organisers",
				em: "& Support Team.",
				lede: "The co-organisers and support committee members who make Youth Democratic Summit 2026 a reality."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "people-grid",
				children: coOrganisers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "people-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "people-card-photo-wrap",
						children: [
							o.photoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: gridfsImageUrl(o.photoId),
								alt: o.name,
								className: "people-card-photo",
								loading: "lazy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "people-card-photo-placeholder",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 36,
									strokeWidth: 1
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "people-card-overlay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "people-card-role",
									children: o.designation
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "people-card-name",
									children: o.name
								})]
							}),
							o.linkedinUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: o.linkedinUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "people-card-linkedin",
								"aria-label": `${o.name} on LinkedIn`,
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
									size: 16,
									strokeWidth: 2
								})
							})
						]
					})
				}, o.id))
			})]
		})
	})] });
}
function DevelopersSection() {
	const developers = useQuery({
		queryKey: ["public-data"],
		queryFn: () => getPublicData(),
		staleTime: 6e4,
		gcTime: 3e5
	}).data?.developers ?? [];
	if (developers.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "developers",
		className: "section public-section alt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-topline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10 / DEVELOPERS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BUILT WITH CARE" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "DEVELOPED BY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"The Developers",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "of YDS 2026." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "developers-grid",
					children: developers.map((dev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "developer-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "developer-name",
							children: dev.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "developer-links",
							children: [dev.githubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: dev.githubUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "developer-link",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GitHub" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "developer-link-placeholder",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 16 }), " GitHub"]
							}), dev.linkedinUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: dev.linkedinUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "developer-link",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LinkedIn" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "developer-link-placeholder",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { size: 16 }), " LinkedIn"]
							})]
						})]
					}, dev.id))
				})
			]
		})
	});
}
var clamp = (value) => Math.max(0, Math.min(1, value));
var span = (value, start, end) => clamp((value - start) / (end - start));
var smooth = (value, start, end) => {
	const n = span(value, start, end);
	return n * n * (3 - 2 * n);
};
var mix = (a, b, t) => a + (b - a) * t;
function Journey() {
	const journey = (0, import_react.useRef)(null);
	const scene = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const update = () => {
			raf = 0;
			const section = journey.current;
			const layer = scene.current;
			if (!section || !layer) return;
			const progress = clamp(-section.getBoundingClientRect().top / (section.offsetHeight - window.innerHeight));
			const set = (key, value) => layer.style.setProperty(key, String(value));
			const approach = smooth(progress, .04, .37);
			const exteriorOut = smooth(progress, .27, .42);
			const doorwayApproach = smooth(progress, .35, .51);
			const opening = smooth(progress, .51, .74);
			const crossing = smooth(progress, .72, .89);
			const interiorArrival = smooth(progress, .78, .96);
			set("--exterior-scale", mix(1, 3.55, approach).toFixed(3));
			set("--exterior-opacity", (1 - exteriorOut).toFixed(3));
			set("--entrance-opacity", smooth(progress, .27, .42) * (1 - smooth(progress, .78, .94)));
			set("--entrance-scale", mix(1, 1.24, doorwayApproach) * mix(1, 4.25, crossing));
			set("--door-angle", `${Math.round(112 * opening)}deg`);
			set("--door-shade", (opening * .28).toFixed(3));
			set("--vestibule-scale", mix(1, 1.85, crossing).toFixed(3));
			set("--vestibule-opacity", (smooth(progress, .51, .64) * (1 - interiorArrival)).toFixed(3));
			set("--chamber-scale", mix(1.1, 1, interiorArrival).toFixed(3));
			set("--chamber-opacity", interiorArrival.toFixed(3));
			set("--intro-opacity", (1 - smooth(progress, .1, .27)).toFixed(3));
			set("--entrance-copy-opacity", (smooth(progress, .43, .5) * (1 - smooth(progress, .55, .64))).toFixed(3));
			set("--arrival-opacity", smooth(progress, .89, .98).toFixed(3));
			set("--light-opacity", (opening * (1 - crossing) * .1).toFixed(3));
			set("--journey-progress", `${(progress * 100).toFixed(1)}%`);
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "journey",
		ref: journey,
		"aria-label": "Enter the Youth Democratic Summit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scene",
			ref: scene,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chamber-layer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: parliament_chamber_default,
						alt: "Illustrative parliamentary chamber with tiered seating and central dais",
						width: 1920,
						height: 1088,
						loading: "lazy"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vestibule-layer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: parliament_vestibule_default,
						alt: "",
						width: 1280,
						height: 1536,
						loading: "lazy"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "entrance-layer",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "doorway-depth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: parliament_vestibule_default,
								alt: "",
								width: 1280,
								height: 1536,
								loading: "lazy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "doors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "door-half door-left",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: door_left_default,
									alt: "",
									width: 208,
									height: 731
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "door-half door-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: door_right_default,
									alt: "",
									width: 209,
									height: 731
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "entrance-frame",
							src: parliament_entrance_frame_default,
							alt: "",
							width: 1920,
							height: 1088,
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "threshold-light" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "exterior-layer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: parliament_exterior_default,
						alt: "Parliament of India seen from a long ceremonial approach",
						width: 1920,
						height: 1088,
						fetchPriority: "high"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scene-shade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "intro-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow light-eyebrow",
							children: "YDS · PRESENTED BY NSS MJCET"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"YOUTH DEMOCRATIC",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "SUMMIT" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your Voice. Your Parliament. Your Future." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "scroll-cue",
							children: ["SCROLL TO ENTER ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
								size: 17,
								strokeWidth: 1.5
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "entrance-copy",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow light-eyebrow",
							children: "THE ENTRANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Every voice begins",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"with a first step."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "scroll-cue",
							children: ["SCROLL TO ENTER ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
								size: 17,
								strokeWidth: 1.5
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "arrival-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow light-eyebrow",
							children: "WELCOME INSIDE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"Enter the parliament.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Find your voice." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#about",
							className: "arrival-link",
							children: ["DISCOVER THE EXPERIENCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "journey-counter",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "counter-track",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "06" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "journey-side",
					"aria-hidden": "true",
					children: "ENTER THE PARLIAMENT · FIND YOUR VOICE"
				})
			]
		})
	});
}
var parliamentaryProceedings = [
	[
		"01",
		"Lok Sabha Proceedings",
		"75 Members of Parliament representing collegiate constituents in fierce legislative debate."
	],
	[
		"02",
		"Rajya Sabha Proceedings",
		"50 Members of Parliament scrutinising bills with elder statesman perspective."
	],
	[
		"03",
		"Question Hour & Zero Hour",
		"Hold the Treasury Benches accountable with sharp, unyielding parliamentary inquiry."
	],
	[
		"04",
		"Bills, Motions & Amendments",
		"Draft, move, debate and vote on transformative national legislative policy."
	],
	[
		"05",
		"Coalition Politics & Floor Strategy",
		"Build tactical alliances across the floor to secure parliamentary majority."
	],
	[
		"06",
		"Parliamentary Awards & Recognitions",
		"Distinguished Parliamentarian, Best Leader of Opposition, and Best Orator accolades."
	]
];
function Home() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "wordmark",
						href: "#top",
						"aria-label": "Youth Democratic Summit, back to top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "brand-logo",
							src: nss_logo_default,
							alt: "YDS NSS MJCET logo",
							width: 44,
							height: 44
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "wordmark-title",
							children: [
								"YDS",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"BY NSS MJCET"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: menuOpen ? "main-nav open" : "main-nav",
						"aria-label": "Main navigation",
						children: [
							["About", "#about"],
							["Experience", "#experience"],
							["Details", "#schedule"],
							["Results", "#results"],
							["Parties", "#parties"],
							["Sponsors", "#sponsors"],
							["Organisers", "#organisers"],
							["Register", "#register"]
						].map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							onClick: () => setMenuOpen(false),
							children: label
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "header-cta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/register",
							children: ["REGISTER TEAM ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mobile-toggle",
						variant: "ghost",
						size: "icon",
						type: "button",
						"aria-label": menuOpen ? "Close menu" : "Open menu",
						"aria-expanded": menuOpen,
						onClick: () => setMenuOpen(!menuOpen),
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 25 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 25 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "about",
				className: "section about-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01 / THE IDEA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "YDS 2026 · NSS MJCET" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "ABOUT THE SUMMIT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"A seat at the table.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A voice in the room." })
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "about-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "lead",
									children: "The next generation deserves more than a lesson in democracy. It deserves a chance to practise it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Youth Democratic Summit (YDS 2026), organised by the National Service Scheme (NSS), Muffakham Jah College of Engineering & Technology (MJCET), Hyderabad, is a premier National Youth Parliament Simulation designed to recreate the sacred halls of Indian democracy." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3",
									children: "Across 125 selected Members of Parliament divided into 25 fictional parliamentary parties, participants will engage in parliamentary debate, introduce bills, and debate the future of the republic."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "text-link",
									href: "#experience",
									children: ["EXPLORE THE EXPERIENCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "experience",
				className: "section experience-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-topline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02 / WHAT AWAITS YOU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LOK SABHA · RAJYA SABHA · DEBATE" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "PARLIAMENTARY PROCEEDINGS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Inside the chamber.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Democracy in motion." })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "benefits",
							children: parliamentaryProceedings.map(([number, title, description]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "benefit",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "benefit-number",
										children: number
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										className: "benefit-arrow",
										size: 18,
										strokeWidth: 1.5
									})
								]
							}, number))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "schedule",
				className: "section details-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03 / OFFICIAL EVENT DETAILS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OCTOBER 2026 · HYDERABAD" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "details-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-heading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "OFFICIAL NOTICE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"Key Summit",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "details." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Official venue, dates and structure confirmed by the YDS 2026 Organising Committee." })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "detail-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01 / DATES & TIMING" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: YDS_CONFIG.dates }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [YDS_CONFIG.timing, " daily. Three intense days of plenary debates and committee sessions."] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02 / VENUE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: YDS_CONFIG.venue }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mount Pleasant, 8-2-249 to 267, Road No. 3, Banjara Hills, Hyderabad, Telangana 500034." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03 / REGISTRATION FEE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: YDS_CONFIG.registrationFee }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Registration for YDS 2026 is completely free of charge. Participation is awarded strictly through competitive selection." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04 / STRUCTURE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "125 MPs across 25 Parties" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "75 Lok Sabha MPs + 50 Rajya Sabha MPs. Each accepted team consists of exactly 5 members (3 Lok Sabha + 2 Rajya Sabha)." })
								] })
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicSections, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunitySections, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "register",
				className: "section register-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "09 / REGISTER FOR YDS 2026" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SELECTION-BASED APPLICATION" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "register-landing-cta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "register-landing-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "REGISTER FOR YDS 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"Youth Democratic",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Summit." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "register-landing-desc",
									children: "YDS 2026 follows a selection-based team registration process. Form a team of exactly five members and submit your application for consideration by the YDS Organising Committee."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "register-key-badge",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										size: 18,
										className: "text-gold flex-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Teams must consist of exactly 5 members." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "register-details-grid",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label",
												children: "DATES"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.dates })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label",
												children: "VENUE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.venue })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label",
												children: "TIMING"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.timing })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label",
												children: "REGISTRATION"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-gold font-bold",
												children: YDS_CONFIG.registrationFee
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card border-gold/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label text-gold font-semibold",
												children: "REGISTRATION DEADLINE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-gold font-bold",
												children: YDS_CONFIG.registrationDeadline
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "register-detail-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "detail-card-label",
												children: "RESULTS ANNOUNCED"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.resultsDate })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "register-main-btn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/register",
											children: ["REGISTER YOUR TEAM ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
										})
									})
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopersSection, {})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "site-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "footer-title footer-brand",
					href: "#top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "brand-logo",
						src: nss_logo_default,
						alt: "YDS NSS MJCET logo",
						width: 44,
						height: 44
					}), "YOUTH DEMOCRATIC SUMMIT 2026 · NSS MJCET"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ENTER THE PARLIAMENT. FIND YOUR VOICE." }),
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#top",
						children: "BACK TO TOP ↑"
					})]
				})
			]
		})
	})] });
}
//#endregion
export { Home as component };
