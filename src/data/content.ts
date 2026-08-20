/**
 * Central content types for the whole site.
 *
 * The actual copy no longer lives here — it sits in per-locale JSON files
 * under `src/locales/{uz,ru,en}.json`. This module keeps the shared TypeScript
 * types and re-exports the translations as a typed `CONTENT` map so existing
 * components keep working unchanged (`t.hero.titleTop`, etc.).
 *
 * To edit copy: change the JSON file for that language.
 * To add a language: add `src/locales/<code>.json`, then extend
 * `Locale`, `LOCALES` and the imports below.
 */

import uz from "@/locales/uz.json";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

export type Locale = "ru" | "uz" | "en";

export const LOCALES: Locale[] = ["ru", "uz", "en"];
export const DEFAULT_LOCALE: Locale = "uz";

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  index: string;
  title: string;
  body: string;
}

export interface TimelineItem {
  index: string;
  title: string;
  meta: string;
}

export interface ChecklistItem {
  index: string;
  body: string;
}

/* ------------------------------------------------------------------ */
/*  Application form (multi-step modal)                                */
/* ------------------------------------------------------------------ */

export type ApplyStepKind =
  | "fields"
  | "textarea"
  | "checklist"
  | "video"
  | "links";

export interface ApplyFieldDef {
  key: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "tel";
}

export interface ApplyVideoCopy {
  label: string;
  dropTitle: string;
  dropHint: string;
  uploadBtn: string;
  or: string;
  linkLabel: string;
  linkPlaceholder: string;
  /** Upload-state copy for the file card. */
  uploading: string;
  uploaded: string;
  failed: string;
  retry: string;
  remove: string;
  cancel: string;
  /** Connector between loaded / total size, e.g. "of" in "0 KB of 120 KB". */
  sizeOf: string;
}

export interface ApplyStep {
  kind: ApplyStepKind;
  /** Section badge, e.g. "1-BLOK · SIZ KIMSIZ". */
  block: string;
  title: string;
  sublabel?: string;
  /** Small "optional" tag rendered under the title. */
  optional?: string;
  /** For kind "fields" / "links". */
  fields?: ApplyFieldDef[];
  /** For kind "textarea". */
  placeholder?: string;
  /** For kind "checklist". */
  options?: string[];
  note?: string;
  /** For kind "video". */
  video?: ApplyVideoCopy;
}

export interface ApplyErrors {
  required: string;
  phone: string;
  telegram: string;
  url: string;
  checklist: string;
  video: string;
}

export interface ApplyContent {
  modalTitle: string;
  intro: { badge: string; body: string[]; start: string };
  steps: ApplyStep[];
  nav: { back: string; next: string; submit: string };
  success: { title: string; body: string; close: string };
  errors: ApplyErrors;
}

export interface Content {
  nav: { program: string; terms: string };
  menu: { program: string; terms: string };
  hero: {
    titleTop: string;
    titleBottom: string;
    body: string;
    cta: string;
    note: string;
  };
  stats: StatItem[];
  features: FeatureItem[];
  timeline: TimelineItem[];
  notACourse: {
    heading: string;
    forYouTitle: string;
    forYou: ChecklistItem[];
    notForYouTitle: string;
    notForYou: ChecklistItem[];
    verdictLead: string;
    verdictAccent: string;
    verdictTail: string;
  };
  cta: {
    titleTop: string;
    titleBottom: string;
    body: string;
    button: string;
  };
  footer: {
    tagline: string;
    telegram: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    rights: string;
  };
  apply: ApplyContent;
}

/**
 * Locale → content map, sourced from the JSON translation files.
 * The `as Content` cast ties the loosely-typed JSON to our shared shape.
 */
export const CONTENT: Record<Locale, Content> = {
  uz: uz as Content,
  ru: ru as Content,
  en: en as Content,
};
