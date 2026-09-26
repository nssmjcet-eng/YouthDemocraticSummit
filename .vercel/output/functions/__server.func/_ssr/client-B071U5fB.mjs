import { d as initializeApp, u as getApps } from "../_libs/@firebase/analytics+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getAuth, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-B071U5fB.js
var env = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_FIREBASE_API_KEY": "AIzaSyBjRLG3mgnmGuGaCqokxfZMR49ApHL-m4o",
	"VITE_FIREBASE_APP_ID": "1:18053673041:web:37f31925691bfd45804870",
	"VITE_FIREBASE_AUTH_DOMAIN": "youthparliament-c30f5.firebaseapp.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-EVZ42J25QH",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "18053673041",
	"VITE_FIREBASE_PROJECT_ID": "youthparliament-c30f5",
	"VITE_FIREBASE_STORAGE_BUCKET": "youthparliament-c30f5.firebasestorage.app"
};
var firebaseConfig = {
	apiKey: env["VITE_FIREBASE_API_KEY"],
	authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"],
	projectId: env["VITE_FIREBASE_PROJECT_ID"],
	storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"],
	messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"],
	appId: env["VITE_FIREBASE_APP_ID"],
	measurementId: env["VITE_FIREBASE_MEASUREMENT_ID"]
};
var app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
var firebaseAuth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
if (typeof window !== "undefined") import("../_libs/firebase.mjs").then((n) => n.t).then(({ getAnalytics }) => {
	try {
		getAnalytics(app);
	} catch {}
});
//#endregion
export { googleProvider as n, firebaseAuth as t };
