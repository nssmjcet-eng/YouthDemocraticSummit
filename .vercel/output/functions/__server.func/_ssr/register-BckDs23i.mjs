import { o as __toESM } from "../_runtime.mjs";
import { t as YDS_CONFIG } from "./yds-CUsS678k.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { r as submitTeamApplication } from "./public-BiWzt-VM.mjs";
import { A as Award, D as CircleAlert, M as ArrowLeft, O as Check, T as Clock, f as MapPin, j as ArrowRight, k as Calendar, n as Users, v as Instagram, y as Info } from "../_libs/lucide-react.mjs";
import { t as nss_logo_default } from "./nss-logo-BtoBkQ3l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BckDs23i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var YEAR_OPTIONS = [
	"1st Year",
	"2nd Year",
	"3rd Year",
	"4th Year",
	"Postgraduate",
	"Others"
];
var STRONGEST_AREAS_OPTIONS = [
	"Public Speaking",
	"Parliamentary Debate",
	"Research",
	"Policy Formulation",
	"Crisis Management & Negotiation",
	"Leadership & Strategy"
];
function RegistrationForm() {
	const [temporaryTeamName, setTemporaryTeamName] = (0, import_react.useState)("");
	const [applicantEmail, setApplicantEmail] = (0, import_react.useState)("");
	const [leader, setLeader] = (0, import_react.useState)({
		fullName: "",
		email: "",
		contactNumber: "",
		collegeName: "",
		yearOfStudy: "1st Year",
		yearOfStudyOther: "",
		courseBranch: ""
	});
	const [members, setMembers] = (0, import_react.useState)([
		{
			fullName: "",
			contactNumber: "",
			email: "",
			college: "",
			yearOfStudy: "1st Year"
		},
		{
			fullName: "",
			contactNumber: "",
			email: "",
			college: "",
			yearOfStudy: "1st Year"
		},
		{
			fullName: "",
			contactNumber: "",
			email: "",
			college: "",
			yearOfStudy: "1st Year"
		},
		{
			fullName: "",
			contactNumber: "",
			email: "",
			college: "",
			yearOfStudy: "1st Year"
		}
	]);
	const [hasNssMjcetMun, setHasNssMjcetMun] = (0, import_react.useState)(null);
	const [munEventDetails, setMunEventDetails] = (0, import_react.useState)("");
	const [strongestAreas, setStrongestAreas] = (0, import_react.useState)([]);
	const [politicalAgenda, setPoliticalAgenda] = (0, import_react.useState)("");
	const [hasRecommendation, setHasRecommendation] = (0, import_react.useState)(null);
	const [recommenderName, setRecommenderName] = (0, import_react.useState)("");
	const [teamDeclaration, setTeamDeclaration] = (0, import_react.useState)(false);
	const [teamLeaderConfirmation, setTeamLeaderConfirmation] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submittedAppId, setSubmittedAppId] = (0, import_react.useState)(null);
	const [submittedTeamName, setSubmittedTeamName] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [serverError, setServerError] = (0, import_react.useState)("");
	const updateMember = (index, field, val) => {
		setMembers((prev) => {
			const copy = [...prev];
			copy[index] = {
				...copy[index],
				[field]: val
			};
			return copy;
		});
	};
	const toggleStrongestArea = (area) => {
		setStrongestAreas((prev) => prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]);
	};
	const validate = () => {
		const err = {};
		if (!temporaryTeamName.trim()) err.temporaryTeamName = "Temporary team name is required.";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!applicantEmail.trim() || !emailRegex.test(applicantEmail.trim())) err.applicantEmail = "A valid application email is required.";
		if (!leader.fullName.trim()) err.leaderName = "Team Leader full name is required.";
		if (!leader.email.trim() || !emailRegex.test(leader.email.trim())) err.leaderEmail = "A valid Team Leader email is required.";
		if (!leader.contactNumber.trim() || leader.contactNumber.trim().length < 8) err.leaderPhone = "A valid contact number is required.";
		if (!leader.collegeName.trim()) err.leaderCollege = "College name is required.";
		if (leader.yearOfStudy === "Others" && !leader.yearOfStudyOther?.trim()) err.leaderYearOther = "Please specify your year/category.";
		members.forEach((m, idx) => {
			const num = idx + 2;
			if (!m.fullName.trim()) err[`member_${num}_name`] = `Team Member ${num} full name is required.`;
			if (!m.contactNumber.trim() || m.contactNumber.trim().length < 8) err[`member_${num}_phone`] = `Team Member ${num} contact number is required.`;
		});
		if (hasNssMjcetMun === null) err.hasNssMjcetMun = "Please select Yes or No regarding MUN experience.";
		if (strongestAreas.length === 0) err.strongestAreas = "Please select at least one of your team's strongest areas.";
		if (!politicalAgenda.trim()) err.politicalAgenda = "Please provide your team's political agenda.";
		else if (politicalAgenda.trim().split(/\s+/).length < 30) err.politicalAgenda = "Please provide a comprehensive response (at least 30 words, 200–300 recommended).";
		if (hasRecommendation === null) err.hasRecommendation = "Please select Yes or No for the recommendation question.";
		if (hasRecommendation === true && !recommenderName.trim()) err.recommenderName = "Please provide the recommender’s name.";
		if (!teamDeclaration) err.teamDeclaration = "Please confirm the Team Declaration before submitting.";
		if (!teamLeaderConfirmation) err.teamLeaderConfirmation = "Please confirm Team Leader verification before submitting.";
		setErrors(err);
		if (Object.keys(err).length > 0) {
			const firstKey = Object.keys(err)[0];
			const el = document.getElementById(`field-${firstKey}`);
			if (el) el.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			return false;
		}
		return true;
	};
	const isPastDeadline = /* @__PURE__ */ new Date() > new Date(YDS_CONFIG.registrationDeadlineDate);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError("");
		if (isPastDeadline) {
			setServerError("Registration for YDS 2026 has officially closed. Applications are no longer accepted.");
			return;
		}
		if (!validate()) return;
		setSubmitting(true);
		try {
			const cleanEmail = (applicantEmail || leader.email).trim().toLowerCase();
			const result = await submitTeamApplication({ data: {
				temporaryTeamName: temporaryTeamName.trim(),
				applicationEmail: cleanEmail,
				teamLeader: {
					...leader,
					email: cleanEmail,
					fullName: leader.fullName.trim(),
					contactNumber: leader.contactNumber.trim(),
					collegeName: leader.collegeName.trim()
				},
				members: members.map((m) => ({
					...m,
					fullName: m.fullName.trim(),
					contactNumber: m.contactNumber.trim()
				})),
				experience: {
					hasNssMjcetMun: Boolean(hasNssMjcetMun),
					munEventDetails: munEventDetails.trim(),
					strongestAreas
				},
				politicalAgenda: politicalAgenda.trim(),
				recommendation: {
					hasRecommendation: Boolean(hasRecommendation),
					recommenderName: hasRecommendation ? recommenderName.trim() : void 0
				},
				declarations: {
					teamDeclaration,
					teamLeaderConfirmation
				}
			} });
			setSubmittedAppId(result.applicationId);
			setSubmittedTeamName(temporaryTeamName.trim());
		} catch (err) {
			console.error(err);
			const msg = err?.message || "";
			if (msg.includes("DUPLICATE")) setServerError("An application has already been submitted with this email address. Each team can register only once.");
			else if (msg) setServerError(msg);
			else setServerError("Your application could not be submitted right now. Please check your details and try again.");
		} finally {
			setSubmitting(false);
		}
	};
	if (submittedAppId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "registration-confirmation yds-submission-success",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "confirmation-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 28,
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow light-gold",
				children: "APPLICATION SUBMITTED SUCCESSFULLY"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Your application has been received." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-id-badge",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "app-id-label",
					children: "Application ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "app-id-number",
					children: submittedAppId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "submission-details-box",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Team Name:" }),
						" ",
						submittedTeamName
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Team Composition:" }), " Exactly 5 Members (1 Leader + 4 Members)"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "submission-notice",
						children: [
							"Submission of an application does not guarantee selection. All applications will be reviewed by the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "YDS Organising Committee" }),
							". Selection results will be declared officially on this website."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				className: "mt-6",
				onClick: () => {
					setSubmittedAppId(null);
					setTemporaryTeamName("");
					setApplicantEmail("");
					setPoliticalAgenda("");
					setTeamDeclaration(false);
					setTeamLeaderConfirmation(false);
				},
				children: ["Submit Another Application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
			})
		]
	});
	const wordCount = politicalAgenda.trim() ? politicalAgenda.trim().split(/\s+/).length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "registration-form yds-team-form",
		onSubmit: handleSubmit,
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TEAM REGISTRATION · EXACTLY 5 MEMBERS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: YDS_CONFIG.edition })]
			}),
			isPastDeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded border border-amber-500/40 bg-amber-500/10 text-amber-200 flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					size: 20,
					className: "text-amber-400 flex-shrink-0 mt-0.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-sm text-amber-300",
						children: "Registration Has Closed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"The deadline for submitting team applications was ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.registrationDeadline }),
						". New submissions are no longer being accepted. Selection results will be announced on ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: YDS_CONFIG.resultsDate }),
						"."
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-banner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
					size: 18,
					className: "text-gold flex-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Important Rule:" }),
					" Each application must consist of ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "exactly 5 members" }),
					" (1 Team Leader + 4 Members). Only the Team Leader should fill out this form on behalf of the entire team."
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-num",
							children: "01"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Temporary Team Name / Identifier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For application identification purposes only" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-instruction-box row-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							size: 16,
							className: "text-gold flex-none mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs leading-relaxed space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• This is only a temporary team name/identifier for the registration process." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["• ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "This will NOT be your final parliamentary party name." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Please do not use the name of any existing political party or organisation." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• The final fictional parliamentary party will be allocated by the YDS Organising Committee after the selection process." })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-grid pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field form-wide",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-temporaryTeamName",
									children: ["Temporary Team Name / Identifier ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-temporaryTeamName",
									type: "text",
									value: temporaryTeamName,
									onChange: (e) => setTemporaryTeamName(e.target.value),
									placeholder: "e.g. Alliance Phoenix, Deccan Scholars, The Centrists",
									maxLength: 120,
									required: true
								}),
								errors.temporaryTeamName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.temporaryTeamName })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field form-wide",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-applicantEmail",
									children: ["Application Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-applicantEmail",
									type: "email",
									value: applicantEmail,
									onChange: (e) => setApplicantEmail(e.target.value),
									placeholder: "teamlead@example.com (Official email for this team application)",
									maxLength: 200,
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground mt-1",
									children: "Only one application per email address will be accepted. All official correspondence will be sent here."
								}),
								errors.applicantEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.applicantEmail })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "step-num",
						children: "02"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Member 1 — Team Leader Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Primary contact and representative for the team" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-leaderName",
									children: ["Full Name of Team Leader ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-leaderName",
									type: "text",
									value: leader.fullName,
									onChange: (e) => setLeader({
										...leader,
										fullName: e.target.value
									}),
									placeholder: "Full name as per college ID",
									maxLength: 100,
									required: true
								}),
								errors.leaderName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.leaderName })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-leaderEmail",
									children: ["Email Address of Team Leader ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-leaderEmail",
									type: "email",
									value: leader.email,
									onChange: (e) => setLeader({
										...leader,
										email: e.target.value
									}),
									placeholder: "leader@gmail.com",
									maxLength: 150,
									required: true
								}),
								errors.leaderEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.leaderEmail })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-leaderPhone",
									children: ["Contact Number (WhatsApp) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-leaderPhone",
									type: "tel",
									value: leader.contactNumber,
									onChange: (e) => setLeader({
										...leader,
										contactNumber: e.target.value
									}),
									placeholder: "10-digit mobile number",
									maxLength: 15,
									required: true
								}),
								errors.leaderPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.leaderPhone })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-leaderCollege",
									children: ["College / Institution Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-leaderCollege",
									type: "text",
									value: leader.collegeName,
									onChange: (e) => setLeader({
										...leader,
										collegeName: e.target.value
									}),
									placeholder: "e.g. MJCET, Osmania University, CBIT",
									maxLength: 150,
									required: true
								}),
								errors.leaderCollege && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.leaderCollege })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "field-leaderBranch",
								children: ["Branch / Course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "optional",
									children: "(optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "field-leaderBranch",
								type: "text",
								value: leader.courseBranch || "",
								onChange: (e) => setLeader({
									...leader,
									courseBranch: e.target.value
								}),
								placeholder: "e.g. B.E. Computer Science, BA Political Science",
								maxLength: 100
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "field-leaderYear",
								children: ["Year of Study ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "field-leaderYear",
								className: "yds-select",
								value: leader.yearOfStudy,
								onChange: (e) => setLeader({
									...leader,
									yearOfStudy: e.target.value
								}),
								children: YEAR_OPTIONS.map((yr) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: yr,
									children: yr
								}, yr))
							})]
						}),
						leader.yearOfStudy === "Others" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-field form-wide",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-leaderYearOther",
									children: ["Please specify your year / educational category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field-leaderYearOther",
									type: "text",
									value: leader.yearOfStudyOther || "",
									onChange: (e) => setLeader({
										...leader,
										yearOfStudyOther: e.target.value
									}),
									placeholder: "e.g. Gap year, Recent Graduate, PhD scholar",
									maxLength: 100,
									required: true
								}),
								errors.leaderYearOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.leaderYearOther })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "step-num",
						children: "03"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Additional Team Members (Members 2 to 5)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each team must have exactly 5 members total" })] })]
				}), [
					0,
					1,
					2,
					3
				].map((idx) => {
					const memberNum = idx + 2;
					const member = members[idx];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-member-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "yds-member-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "yds-member-tag",
								children: ["TEAM MEMBER ", memberNum]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-grid pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: `field-member_${memberNum}_name`,
											children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: `field-member_${memberNum}_name`,
											type: "text",
											value: member.fullName,
											onChange: (e) => updateMember(idx, "fullName", e.target.value),
											placeholder: `Full Name of Member ${memberNum}`,
											maxLength: 100,
											required: true
										}),
										errors[`member_${memberNum}_name`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors[`member_${memberNum}_name`] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: `field-member_${memberNum}_phone`,
											children: ["Contact Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: `field-member_${memberNum}_phone`,
											type: "tel",
											value: member.contactNumber,
											onChange: (e) => updateMember(idx, "contactNumber", e.target.value),
											placeholder: "Mobile / WhatsApp number",
											maxLength: 15,
											required: true
										}),
										errors[`member_${memberNum}_phone`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors[`member_${memberNum}_phone`] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `field-member_${memberNum}_email`,
										children: ["Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "optional",
											children: "(optional)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `field-member_${memberNum}_email`,
										type: "email",
										value: member.email || "",
										onChange: (e) => updateMember(idx, "email", e.target.value),
										placeholder: "member@example.com",
										maxLength: 150
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `field-member_${memberNum}_college`,
										children: ["College / Course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "optional",
											children: "(optional if same)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `field-member_${memberNum}_college`,
										type: "text",
										value: member.college || "",
										onChange: (e) => updateMember(idx, "college", e.target.value),
										placeholder: leader.collegeName || "College name",
										maxLength: 150
									})]
								})
							]
						})]
					}, memberNum);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-num",
							children: "04"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Team Experience & Skills" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Preserved faithfully from the official YDS 2026 application form" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Has anyone in your team previously participated in an MUN conducted by NSS MJCET? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-radio-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "yds-radio-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "hasNssMjcetMun",
										checked: hasNssMjcetMun === true,
										onChange: () => setHasNssMjcetMun(true)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yes" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "yds-radio-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "hasNssMjcetMun",
										checked: hasNssMjcetMun === false,
										onChange: () => setHasNssMjcetMun(false)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No" })]
								})]
							}),
							errors.hasNssMjcetMun && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.hasNssMjcetMun })
						]
					}),
					hasNssMjcetMun === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "field-munEventDetails",
								children: "Mention the MUN/event name, committee and role, if applicable."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground mb-1",
								children: "Example: MJCET MUN — UNHRC — Delegate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "field-munEventDetails",
								rows: 2,
								value: munEventDetails,
								onChange: (e) => setMunEventDetails(e.target.value),
								placeholder: "List committee, year, role, or awards...",
								maxLength: 500
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["What are your team's strongest areas? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "yds-checkbox-grid",
								children: STRONGEST_AREAS_OPTIONS.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "yds-checkbox-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: strongestAreas.includes(area),
										onChange: () => toggleStrongestArea(area)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: area })]
								}, area))
							}),
							errors.strongestAreas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.strongestAreas })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-num",
							children: "05"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Political Agenda / Ideology Question" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-gold",
							children: "Crucial Selection Criteria"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-instruction-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm text-foreground",
								children: "What would be your team's political agenda if you were representing a political party in Parliament? *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: [
									"Imagine that your five-member team has been elected to Parliament and is representing a political party. Describe the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "core agenda, ideology and priorities"
									}),
									" that your team would represent in Parliament."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/90 p-3.5 border border-border/70 rounded my-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-gold uppercase tracking-wider block mb-2",
									children: "Suggested Focus Areas (Choose 2–3 or present your own):"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Education & NEP" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Employment & Skills" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Healthcare & Welfare" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Infrastructure & Urban" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Tech & AI Regulation" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Environment & Climate" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Agriculture & Agritech" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Economic & Fiscal Policy" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• National Security & Defence" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Youth & Civic Engagement" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Federalism & State Rights" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "• Judicial & Legal Reforms" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-gold",
									children: "Recommended length: 200–300 words."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground italic",
									children: "There is no single correct answer. We assess ideological clarity and parliamentary thinking."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "field-politicalAgenda",
									className: "m-0",
									children: ["Your Team's Political Agenda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs ${wordCount >= 200 && wordCount <= 350 ? "text-green-600 font-semibold" : "text-muted-foreground"}`,
									children: [
										"Word count: ",
										wordCount,
										" words (Recommended: 200–300)"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "field-politicalAgenda",
								value: politicalAgenda,
								onChange: (e) => setPoliticalAgenda(e.target.value),
								placeholder: "Present your team's political agenda, ideology, economic vision, key legislative bills you would introduce, and vision for India's governance...",
								rows: 8,
								maxLength: 4e3,
								required: true
							}),
							errors.politicalAgenda && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.politicalAgenda })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "yds-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-num",
							children: "06"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recommendation Question" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NSS MJCET MUN community network" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Has your team been recommended by a participant, Chairperson, Secretariat member or organiser from an NSS MJCET MUN? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "yds-instruction-box my-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Verified recommendations may receive additional consideration during the selection process. Recommendation does not guarantee selection."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "yds-radio-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "yds-radio-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "hasRecommendation",
										checked: hasRecommendation === true,
										onChange: () => setHasRecommendation(true)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yes" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "yds-radio-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "hasRecommendation",
										checked: hasRecommendation === false,
										onChange: () => setHasRecommendation(false)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No" })]
								})]
							}),
							errors.hasRecommendation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.hasRecommendation })
						]
					}),
					hasRecommendation === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-field form-wide mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "field-recommenderName",
								children: ["If yes, please provide their name. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "*" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "field-recommenderName",
								type: "text",
								value: recommenderName,
								onChange: (e) => setRecommenderName(e.target.value),
								placeholder: "Name of participant, Chairperson, Secretariat member or organiser",
								maxLength: 150,
								required: true
							}),
							errors.recommenderName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: errors.recommenderName })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-form-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "yds-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "step-num",
						children: "07"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Declarations & Confirmations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mandatory agreement before submission" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "yds-checkbox-banner",
							htmlFor: "field-teamDeclaration",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "field-teamDeclaration",
								type: "checkbox",
								checked: teamDeclaration,
								onChange: (e) => setTeamDeclaration(e.target.checked),
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Team Declaration: *" }), " We confirm that all information provided in this application is accurate and complete. We understand that submission of this application does not guarantee selection, and that final team selection and fictional party allocation rests entirely with the YDS Organising Committee."]
							})]
						}),
						errors.teamDeclaration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "block text-destructive text-xs",
							children: errors.teamDeclaration
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "yds-checkbox-banner",
							htmlFor: "field-teamLeaderConfirmation",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "field-teamLeaderConfirmation",
								type: "checkbox",
								checked: teamLeaderConfirmation,
								onChange: (e) => setTeamLeaderConfirmation(e.target.checked),
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Team Leader Confirmation: *" }), " I confirm that I have obtained the consent of all five members before submitting this application on their behalf."]
							})]
						}),
						errors.teamLeaderConfirmation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "block text-destructive text-xs",
							children: errors.teamLeaderConfirmation
						})
					]
				})]
			}),
			serverError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "yds-error-banner",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					size: 18,
					className: "flex-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: serverError })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-footer mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold text-foreground",
						children: ["Event: ", YDS_CONFIG.dates]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Venue: ",
						YDS_CONFIG.venue,
						" · Fee: ",
						YDS_CONFIG.registrationFee
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: submitting || isPastDeadline,
					className: "min-w-[220px]",
					children: [
						isPastDeadline ? "REGISTRATION CLOSED" : submitting ? "VALIDATING & SUBMITTING…" : "SUBMIT TEAM APPLICATION",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
					]
				})]
			})
		]
	});
}
function RegisterPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "register-page-wrapper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "register-page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "back-to-yds-btn",
						"aria-label": "Return to Youth Democratic Summit Homepage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BACK TO YDS" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "wordmark",
						"aria-label": "YDS Homepage",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "register-hero-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OFFICIAL APPLICATION · YDS 2026" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NATIONAL YOUTH PARLIAMENT SIMULATION" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "YOUTH DEMOCRATIC SUMMIT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "register-hero-title",
								children: [
									"Team Registration",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "& Parliamentary Selection." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "register-hero-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
											size: 15,
											className: "text-gold"
										}), YDS_CONFIG.dates]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											size: 15,
											className: "text-gold"
										}), YDS_CONFIG.venue]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											size: 15,
											className: "text-gold"
										}), YDS_CONFIG.timing]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 font-bold text-gold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { size: 15 }),
											"Fee: ",
											YDS_CONFIG.registrationFee
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "register-key-badge",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										size: 18,
										className: "text-gold flex-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Teams must consist of exactly 5 members (1 Team Leader + 4 Members)." })]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "register-form-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-inner flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "register-form-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationForm, {})
					})
				})
			}),
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
export { RegisterPage as component };
