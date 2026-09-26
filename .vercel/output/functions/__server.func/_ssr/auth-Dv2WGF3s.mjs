import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import "../_libs/firebase.mjs";
import { a as signOut, i as signInWithPopup, r as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import { n as googleProvider, t as firebaseAuth } from "./client-B071U5fB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as checkAdminSession } from "./auth-DJMD3cBt.mjs";
import { t as nss_logo_default } from "./nss-logo-BtoBkQ3l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Dv2WGF3s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function isAuthorisedAdmin(idToken) {
	try {
		return (await checkAdminSession({ data: { idToken } })).authorized === true;
	} catch {
		return false;
	}
}
/** Ashoka Chakra — 24-spoke dharma wheel watermark */
function AshokaChakra({ size = 480 }) {
	const cx = size / 2;
	const cy = size / 2;
	const outerR = size * .43;
	const hubR = size * .055;
	const spokes = Array.from({ length: 24 }, (_, i) => {
		const angle = i * Math.PI * 2 / 24;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx + hubR * Math.cos(angle),
			y1: cy + hubR * Math.sin(angle),
			x2: cx + outerR * Math.cos(angle),
			y2: cy + outerR * Math.sin(angle),
			stroke: "currentColor",
			strokeWidth: size * .016,
			strokeLinecap: "round"
		}, i);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: outerR + size * .03,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: size * .03
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: outerR,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: size * .012
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: hubR,
				fill: "currentColor"
			}),
			spokes
		]
	});
}
var GOOGLE_BTN = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.6rem",
	width: "100%",
	padding: "0.65rem 1.25rem",
	background: "#fff",
	border: "1.5px solid #dadce0",
	borderRadius: "6px",
	fontSize: "0.875rem",
	fontFamily: "DM Sans, sans-serif",
	fontWeight: 500,
	color: "#3c4043",
	cursor: "pointer",
	transition: "box-shadow 0.15s, background 0.15s",
	boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
};
var ORANGE_BTN = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.6rem",
	width: "100%",
	padding: "0.7rem 1.25rem",
	background: "#FF9933",
	border: "none",
	borderRadius: "6px",
	fontSize: "0.875rem",
	fontFamily: "DM Sans, sans-serif",
	fontWeight: 600,
	color: "#fff",
	cursor: "pointer",
	transition: "opacity 0.15s"
};
function GoogleG() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: 18,
		height: 18,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
			})
		]
	});
}
function AuthPage() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [denied, setDenied] = (0, import_react.useState)(false);
	const [deniedEmail, setDeniedEmail] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) try {
				if (await isAuthorisedAdmin(await user.getIdToken())) navigate({
					to: "/admin",
					replace: true
				});
			} catch {}
		});
		return () => unsub();
	}, [navigate]);
	const doSignIn = async () => {
		setBusy(true);
		setDenied(false);
		try {
			const result = await signInWithPopup(firebaseAuth, googleProvider);
			if (await isAuthorisedAdmin(await result.user.getIdToken())) navigate({
				to: "/admin",
				replace: true
			});
			else {
				await signOut(firebaseAuth);
				setDeniedEmail(result.user.email ?? "");
				setDenied(true);
			}
		} catch (err) {
			if (!["auth/popup-closed-by-user", "auth/cancelled-popup-request"].includes(err?.code)) console.error("Google sign-in error:", err);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			overflow: "hidden",
			background: "#f5f5f0",
			fontFamily: "DM Sans, sans-serif"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				style: {
					position: "absolute",
					inset: 0,
					background: "linear-gradient(105deg, rgba(255,153,51,0.55) 0%, rgba(255,200,120,0.25) 30%, rgba(255,255,255,0) 50%, rgba(160,220,160,0.25) 70%, rgba(19,136,8,0.45) 100%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				style: {
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					color: "rgba(0,0,100,0.055)",
					pointerEvents: "none",
					userSelect: "none"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AshokaChakra, { size: 520 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					zIndex: 10,
					background: "#fff",
					borderRadius: "14px",
					width: "100%",
					maxWidth: "400px",
					margin: "1.5rem",
					overflow: "hidden",
					boxShadow: "0 8px 40px rgba(0,0,0,0.12)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						height: "5px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						background: "#FF9933"
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						background: "#138808"
					} })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { padding: "2rem 2rem 1.75rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							textAlign: "center",
							marginBottom: "1.25rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: nss_logo_default,
							alt: "NSS MJCET",
							width: 64,
							height: 64,
							style: {
								borderRadius: "50%",
								objectFit: "contain"
							}
						})
					}), denied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								textAlign: "center",
								marginBottom: "0.75rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "0.35rem",
									background: "#fff0f0",
									border: "1px solid #fca5a5",
									borderRadius: "999px",
									padding: "0.25rem 0.75rem",
									fontSize: "0.7rem",
									fontWeight: 700,
									color: "#dc2626",
									textTransform: "uppercase",
									letterSpacing: "0.04em"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									width: 7,
									height: 7,
									borderRadius: "50%",
									background: "#dc2626",
									display: "inline-block"
								} }), "Access Restricted"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								textAlign: "center",
								fontSize: "1.35rem",
								fontWeight: 700,
								color: "#111",
								margin: "0 0 0.5rem",
								fontFamily: "Cormorant Garamond, serif"
							},
							children: "Access Restricted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								textAlign: "center",
								marginBottom: "1rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									display: "inline-block",
									background: "#f3f4f6",
									border: "1px solid #d1d5db",
									borderRadius: "4px",
									padding: "0.2rem 0.6rem",
									fontSize: "0.72rem",
									color: "#4b5563",
									fontFamily: "monospace"
								},
								children: deniedEmail
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								textAlign: "center",
								fontSize: "0.82rem",
								color: "#4b5563",
								lineHeight: 1.5,
								margin: "0 0 0.5rem"
							},
							children: [
								"Your Google account is not authorized to access the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "NSS MJCET Admin Portal" }),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								textAlign: "center",
								fontSize: "0.78rem",
								color: "#4b5563",
								lineHeight: 1.5,
								margin: "0 0 1.5rem"
							},
							children: [
								"Access is restricted. Contact ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#FF9933",
										fontWeight: 600
									},
									children: "GB"
								}),
								" if you need admin rights."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							style: {
								...ORANGE_BTN,
								marginBottom: "0.75rem",
								opacity: busy ? .7 : 1
							},
							disabled: busy,
							onClick: doSignIn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleG, {}), busy ? "Redirecting…" : "Sign in with another account"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							style: {
								display: "block",
								textAlign: "center",
								padding: "0.65rem",
								border: "1.5px solid #e5e7eb",
								borderRadius: "6px",
								fontSize: "0.82rem",
								color: "#374151",
								textDecoration: "none",
								fontWeight: 500
							},
							children: "Back to NSS MJCET"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								textAlign: "center",
								fontSize: "0.72rem",
								fontWeight: 700,
								color: "#FF9933",
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								margin: "0 0 0.35rem"
							},
							children: "NSS MJCET"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								textAlign: "center",
								fontSize: "1.45rem",
								fontWeight: 800,
								color: "#111",
								margin: "0 0 0.6rem",
								fontFamily: "DM Sans, sans-serif",
								textTransform: "uppercase",
								letterSpacing: "0.04em"
							},
							children: "Admin Portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								textAlign: "center",
								fontSize: "0.82rem",
								color: "#4b5563",
								lineHeight: 1.5,
								margin: "0 0 1.5rem"
							},
							children: "Sign in with an authorized Google account to manage the YDS 2026 website."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							style: {
								...GOOGLE_BTN,
								opacity: busy ? .7 : 1,
								marginBottom: "1rem"
							},
							disabled: busy,
							onClick: doSignIn,
							onMouseEnter: (e) => {
								e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleG, {}), busy ? "Signing in…" : "Sign in with Google"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								textAlign: "center",
								fontSize: "0.72rem",
								color: "#9ca3af",
								margin: "0 0 1.25rem",
								lineHeight: 1.5
							},
							children: "Access is restricted to authorized NSS MJCET organizers only."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								borderTop: "1px solid #f3f4f6",
								paddingTop: "1rem",
								textAlign: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/",
								style: {
									fontSize: "0.78rem",
									color: "#6b7280",
									textDecoration: "none"
								},
								children: "← Back to YDS 2026"
							})
						})
					] })]
				})]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
