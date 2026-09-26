import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageInputProps {
  label?: string;
  /** Called when an image is selected: (base64data, filename, mimeType) */
  onImageSelect: (base64: string, filename: string, mimeType: string) => void;
  currentImageUrl?: string | null;
  className?: string;
  required?: boolean;
  /** Legacy support: value + onChange for base64 data-url usage */
  value?: string;
  onChange?: (dataUrl: string) => void;
}

export function ImageInput({
  label,
  onImageSelect,
  currentImageUrl,
  className = '',
  required,
  value,
  onChange,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl ?? null);

  const handleFile = async (file: File) => {
    setError('');
    setLoading(true);
    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image must be smaller than 5 MB');
      }

      // Check for SVG vs raster
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise<void>((resolve, reject) => {
          reader.onload = () => resolve();
          reader.onerror = () => reject(new Error('Failed to read file'));
        });
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1] || '';
        setPreviewUrl(dataUrl);
        onImageSelect(base64, file.name, file.type);
        if (onChange) onChange(dataUrl);
        return;
      }

      // Client-side canvas compression for raster images
      const compressed = await new Promise<{ dataUrl: string; base64: string; mimeType: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.onload = () => {
          const img = new Image();
          img.onerror = () => reject(new Error('Failed to parse image data'));
          img.onload = () => {
            const MAX_DIM = 1000;
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (width > MAX_DIM || height > MAX_DIM) {
              if (width > height) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              } else {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              const raw = reader.result as string;
              return resolve({ dataUrl: raw, base64: raw.split(',')[1] || '', mimeType: file.type });
            }

            ctx.drawImage(img, 0, 0, width, height);
            let outUrl = '';
            try {
              outUrl = canvas.toDataURL('image/webp', 0.85);
            } catch {
              outUrl = canvas.toDataURL('image/jpeg', 0.85);
            }
            const b64 = outUrl.split(',')[1] || '';
            const mime = outUrl.substring(outUrl.indexOf(':') + 1, outUrl.indexOf(';')) || 'image/webp';
            resolve({ dataUrl: outUrl, base64: b64, mimeType: mime });
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      });

      setPreviewUrl(compressed.dataUrl);
      onImageSelect(compressed.base64, file.name, compressed.mimeType);

      // Legacy onChange support
      if (onChange) onChange(compressed.dataUrl);
    } catch (err: any) {
      setError(err?.message || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const displayUrl = previewUrl ?? value ?? currentImageUrl ?? null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="font-semibold block text-xs">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {displayUrl ? (
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/60">
          <div className="h-14 w-14 rounded-md border bg-background flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src={displayUrl} alt="Uploaded logo preview" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Image selected</p>
            <p className="text-[11px] text-muted-foreground">Will be uploaded to MongoDB GridFS</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="text-xs px-2.5 py-1 rounded border hover:bg-muted font-medium transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              Change
            </button>
            <button
              type="button"
              className="text-xs p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
              title="Remove image"
              onClick={() => {
                setPreviewUrl(null);
                onImageSelect('', '', '');
                if (onChange) onChange('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-lg p-4 text-center transition-all ${
            isDragging
              ? 'border-gold bg-gold/5'
              : 'border-border/80 hover:border-gold hover:bg-muted/40'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="p-2 rounded-full bg-muted text-muted-foreground">
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-gold border-t-transparent rounded-full" />
              ) : (
                <Upload size={18} />
              )}
            </div>
            <p className="text-xs font-semibold text-foreground">
              {loading ? 'Processing image…' : 'Click to upload logo or drag & drop'}
            </p>
            <p className="text-[11px] text-muted-foreground">PNG, JPG, SVG, WebP — max 5 MB</p>
          </div>
        </div>
      )}

      {error && <p className="text-[11px] text-destructive">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
