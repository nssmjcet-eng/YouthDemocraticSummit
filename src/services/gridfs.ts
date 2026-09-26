import { Readable } from 'stream';
import { ObjectId } from 'mongodb';
import { createHash } from 'crypto';
import sharp from 'sharp';
import { getGridFsBucket } from './mongo-client';

export interface GridFSUploadResult {
  id: string;
  filename: string;
  contentType: string;
  size: number;
}

export async function uploadImageToGridFS(
  buffer: Buffer,
  filename: string,
  contentType: string,
  kind?: 'logo' | 'portrait',
): Promise<GridFSUploadResult> {
  const bucket = await getGridFsBucket();

  let finalBuffer = buffer;
  let finalContentType = contentType;
  let finalFilename = filename;

  // Process raster images with sharp (skip svg)
  if (contentType !== 'image/svg+xml' && !filename.toLowerCase().endsWith('.svg')) {
    try {
      if (kind === 'portrait') {
        finalBuffer = await sharp(buffer)
          .resize(800, 1000, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
      } else {
        // default or logo
        finalBuffer = await sharp(buffer)
          .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
      }
      finalContentType = 'image/webp';
      finalFilename = filename.replace(/\.[^/.]+$/, '') + '.webp';
    } catch (sharpErr) {
      console.warn('[GridFS] Sharp processing fallback to original buffer:', sharpErr);
      finalBuffer = buffer;
      finalContentType = contentType;
      finalFilename = filename;
    }
  }

  // SHA-256 hash for deduplication
  const sha256 = createHash('sha256').update(finalBuffer).digest('hex');

  // Check if identical image content already exists in GridFS
  try {
    const existing = await bucket.find({ 'metadata.sha256': sha256 }).toArray();
    if (existing.length > 0) {
      const match = existing[0]!;
      const meta = match.metadata as Record<string, unknown> | undefined;
      return {
        id: match._id.toString(),
        filename: match.filename,
        contentType: (meta?.['contentType'] as string) || finalContentType,
        size: match.length,
      };
    }
  } catch (err) {
    console.warn('[GridFS] Deduplication check skipped due to error:', err);
  }

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(finalFilename, {
      metadata: {
        contentType: finalContentType,
        sha256,
        uploadedAt: new Date().toISOString(),
      },
    } as any);

    const readable = Readable.from(finalBuffer);
    readable.pipe(uploadStream);

    uploadStream.on('finish', () => {
      resolve({
        id: uploadStream.id.toString(),
        filename: finalFilename,
        contentType: finalContentType,
        size: finalBuffer.length,
      });
    });

    uploadStream.on('error', reject);
    readable.on('error', reject);
  });
}

export async function streamImageFromGridFS(
  id: string,
): Promise<{ stream: ReadableStream<Uint8Array>; contentType: string; length: number } | null> {
  try {
    const bucket = await getGridFsBucket();
    const objectId = new ObjectId(id);

    const files = await bucket.find({ _id: objectId }).toArray();
    if (files.length === 0) return null;

    const file = files[0]!;
    const fileMetadata = file.metadata as Record<string, unknown> | undefined;
    const contentType =
      (fileMetadata?.['contentType'] as string | undefined) ||
      (file as any)['contentType'] as string ||
      'application/octet-stream';
    const length = file.length;

    const downloadStream = bucket.openDownloadStream(objectId);

    const webStream = new ReadableStream<Uint8Array>({
      start(controller) {
        downloadStream.on('data', (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        downloadStream.on('end', () => {
          controller.close();
        });
        downloadStream.on('error', (err) => {
          controller.error(err);
        });
      },
      cancel() {
        downloadStream.destroy();
      },
    });

    return { stream: webStream, contentType, length };
  } catch (err: any) {
    if (err?.message?.includes('BSONError') || err?.message?.includes('must be a 24 character hex string')) {
      return null;
    }
    console.error('[GridFS] Stream error:', err);
    return null;
  }
}

export async function deleteImageFromGridFS(id: string): Promise<boolean> {
  try {
    const bucket = await getGridFsBucket();
    const objectId = new ObjectId(id);
    await bucket.delete(objectId);
    return true;
  } catch {
    return false;
  }
}
