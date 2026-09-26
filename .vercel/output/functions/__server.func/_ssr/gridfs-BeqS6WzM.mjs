import { r as __exportAll$1 } from "../_runtime.mjs";
import { t as require_lib } from "../_libs/mongodb.mjs";
import { t as getGridFsBucket } from "./mongo-client-D7yHtyi2.mjs";
import { Readable } from "stream";
import { createHash } from "crypto";
import sharp from "sharp";
//#region node_modules/.nitro/vite/services/ssr/assets/gridfs-BeqS6WzM.js
var gridfs_BeqS6WzM_exports = /* @__PURE__ */ __exportAll$1({
	n: () => uploadImageToGridFS,
	t: () => gridfs_exports
});
var import_lib = require_lib();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var gridfs_exports = /* @__PURE__ */ __exportAll({
	streamImageFromGridFS: () => streamImageFromGridFS,
	uploadImageToGridFS: () => uploadImageToGridFS
});
async function uploadImageToGridFS(buffer, filename, contentType, kind) {
	const bucket = await getGridFsBucket();
	let finalBuffer = buffer;
	let finalContentType = contentType;
	let finalFilename = filename;
	if (contentType !== "image/svg+xml" && !filename.toLowerCase().endsWith(".svg")) try {
		if (kind === "portrait") finalBuffer = await sharp(buffer).resize(800, 1e3, {
			fit: "inside",
			withoutEnlargement: true
		}).webp({ quality: 82 }).toBuffer();
		else finalBuffer = await sharp(buffer).resize(400, 400, {
			fit: "inside",
			withoutEnlargement: true
		}).webp({ quality: 80 }).toBuffer();
		finalContentType = "image/webp";
		finalFilename = filename.replace(/\.[^/.]+$/, "") + ".webp";
	} catch (sharpErr) {
		console.warn("[GridFS] Sharp processing fallback to original buffer:", sharpErr);
		finalBuffer = buffer;
		finalContentType = contentType;
		finalFilename = filename;
	}
	const sha256 = createHash("sha256").update(finalBuffer).digest("hex");
	try {
		const existing = await bucket.find({ "metadata.sha256": sha256 }).toArray();
		if (existing.length > 0) {
			const match = existing[0];
			const meta = match.metadata;
			return {
				id: match._id.toString(),
				filename: match.filename,
				contentType: meta?.["contentType"] || finalContentType,
				size: match.length
			};
		}
	} catch (err) {
		console.warn("[GridFS] Deduplication check skipped due to error:", err);
	}
	return new Promise((resolve, reject) => {
		const uploadStream = bucket.openUploadStream(finalFilename, { metadata: {
			contentType: finalContentType,
			sha256,
			uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
		} });
		const readable = Readable.from(finalBuffer);
		readable.pipe(uploadStream);
		uploadStream.on("finish", () => {
			resolve({
				id: uploadStream.id.toString(),
				filename: finalFilename,
				contentType: finalContentType,
				size: finalBuffer.length
			});
		});
		uploadStream.on("error", reject);
		readable.on("error", reject);
	});
}
async function streamImageFromGridFS(id) {
	try {
		const bucket = await getGridFsBucket();
		const objectId = new import_lib.ObjectId(id);
		const files = await bucket.find({ _id: objectId }).toArray();
		if (files.length === 0) return null;
		const file = files[0];
		const contentType = file.metadata?.["contentType"] || file["contentType"] || "application/octet-stream";
		const length = file.length;
		const downloadStream = bucket.openDownloadStream(objectId);
		return {
			stream: new ReadableStream({
				start(controller) {
					downloadStream.on("data", (chunk) => {
						controller.enqueue(new Uint8Array(chunk));
					});
					downloadStream.on("end", () => {
						controller.close();
					});
					downloadStream.on("error", (err) => {
						controller.error(err);
					});
				},
				cancel() {
					downloadStream.destroy();
				}
			}),
			contentType,
			length
		};
	} catch (err) {
		if (err?.message?.includes("BSONError") || err?.message?.includes("must be a 24 character hex string")) return null;
		console.error("[GridFS] Stream error:", err);
		return null;
	}
}
//#endregion
export { uploadImageToGridFS as n, gridfs_BeqS6WzM_exports as t };
