const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME);

/**
 * Builds an optimized Cloudinary delivery URL. Falls back to the given
 * local/public path unmodified when Cloudinary isn't configured yet.
 */
export function cloudinaryUrl(
  publicId: string,
  opts: { width?: number; quality?: string | number; crop?: string } = {}
) {
  if (!CLOUD_NAME) return publicId;

  const { width, quality = "auto", crop = "fill" } = opts;
  const transforms = [
    "f_auto",
    `q_${quality}`,
    width ? `w_${width}` : null,
    width ? `c_${crop}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

/**
 * Client-side unsigned upload helper. Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (an unsigned upload preset created
 * in the Cloudinary dashboard) — used e.g. for repair before/after photo uploads.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!CLOUD_NAME || !preset) {
    throw new Error("Cloudinary is not configured (missing cloud name or upload preset).");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed.");
  const data = await res.json();
  return data.secure_url as string;
}
