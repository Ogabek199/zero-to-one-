/**
 * Shared shape of an application submission.
 *
 * Imported by both the modal (client) and the `/api/apply` route (server), so
 * it deliberately contains types only — no secrets, no runtime logic.
 */

import type { Locale } from "@/data/content";

export interface ApplyVideoUpload {
  /** Public Blob URL of the uploaded video. */
  url: string;
  /** Original file name as picked by the applicant. */
  name: string;
  /** Size in bytes. */
  size: number;
}

export interface ApplyPayload {
  locale: Locale;
  /** Free-text answers, keyed exactly as the modal keys them. */
  values: Record<string, string>;
  /** Checklist state, keyed `check_<step>_<option>`. */
  checks: Record<string, boolean>;
  /** Present only when a file finished uploading to Blob storage. */
  video?: ApplyVideoUpload | null;
  /** Honeypot — must stay empty; bots fill it in. */
  hp?: string;
}

/** 100 MB, matching the drop-zone hint in every locale. */
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-matroska",
  "video/x-msvideo",
  "video/3gpp",
  "video/mpeg",
];
