/**
 * Turns a raw submission into (a) a validation verdict and (b) the Telegram
 * message.
 *
 * The step definitions are read from the locale files on the SERVER, not taken
 * from the request — a client can only send values, never labels, so nothing
 * in the Telegram message can be forged by editing the page.
 */

import { CONTENT, LOCALES, type Locale } from "@/data/content";
import type { ApplyPayload } from "@/lib/apply-types";

/** Escapes the characters that matter for Telegram's HTML parse mode. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Any single answer longer than this is truncated before it leaves the API. */
const MAX_ANSWER_CHARS = 4000;

/** Rendered in the header at the top, so skipped in the step-by-step body. */
const CONTACT_KEYS = new Set(["name", "phone", "telegram", "city"]);

const isBlank = (v?: string) => !v || v.trim() === "";

const isValidPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  return d.length === 9;
};

const isValidTelegram = (v: string) => /^@[A-Za-z0-9_]{4,}$/.test(v.trim());

const isValidUrl = (v: string) => {
  const s = v.trim();
  if (!s) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

function clean(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, MAX_ANSWER_CHARS);
}

/**
 * Re-runs the modal's own rules on the server. The browser check is UX; this
 * one is the rule.
 */
export function validatePayload(payload: ApplyPayload): string[] {
  const problems: string[] = [];
  const steps = CONTENT[payload.locale].apply.steps;

  steps.forEach((step, i) => {
    if (step.kind === "fields") {
      for (const f of step.fields ?? []) {
        const val = clean(payload.values[f.key]);
        if (isBlank(val)) problems.push(f.key);
        else if (f.type === "tel" && !isValidPhone(val)) problems.push(f.key);
        else if (f.key === "telegram" && !isValidTelegram(val))
          problems.push(f.key);
      }
    } else if (step.kind === "textarea") {
      if (!step.optional && isBlank(clean(payload.values[`text_${i}`]))) {
        problems.push(`text_${i}`);
      }
    } else if (step.kind === "links") {
      for (const f of step.fields ?? []) {
        const val = clean(payload.values[f.key]);
        if (!isBlank(val) && !isValidUrl(val)) problems.push(f.key);
      }
    } else if (step.kind === "checklist") {
      const all = (step.options ?? []).every(
        (_, oi) => payload.checks[`check_${i}_${oi}`] === true,
      );
      if (!all) problems.push(`checklist_${i}`);
    } else if (step.kind === "video") {
      const link = clean(payload.values[`video_link_${i}`]);
      if (isBlank(link)) problems.push(`video_${i}`);
      else if (!isValidUrl(link)) problems.push(`video_${i}`);
    }
  });

  return problems;
}

/** `20.08.2026, 16:40` in Tashkent time, regardless of where the server runs. */
function nowInTashkent(): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

/** Builds the HTML-parse-mode message that lands in the Telegram chat. */
export function buildTelegramMessage(payload: ApplyPayload): string {
  const a = CONTENT[payload.locale].apply;
  const lines: string[] = [];

  const name = clean(payload.values.name);
  const phone = clean(payload.values.phone);
  const telegram = clean(payload.values.telegram);
  const city = clean(payload.values.city);

  lines.push("🚀 <b>YANGI ARIZA — ZERO TO ONE</b>");
  lines.push(
    `🌐 <b>Til:</b> ${payload.locale.toUpperCase()}  |  🕒 <b>Vaqt:</b> ${escapeHtml(nowInTashkent())}`,
  );
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("");

  // Contact header
  lines.push("👤 <b>ARIZA TOPSHIRUVCHI:</b>");
  if (name) lines.push(`• <b>Ism:</b> ${escapeHtml(name)}`);
  if (phone) lines.push(`• <b>Telefon:</b> <code>${escapeHtml(phone)}</code>`);
  if (telegram) {
    const handle = telegram.replace(/^@/, "");
    lines.push(`• <b>Telegram:</b> <a href="https://t.me/${encodeURIComponent(handle)}">${escapeHtml(telegram)}</a>`);
  }
  if (city) lines.push(`• <b>Shahar:</b> ${escapeHtml(city)}`);

  let lastBlock = "";

  a.steps.forEach((step, i) => {
    // Skip pure contact steps in the body (already in the top header)
    const isPureContact =
      step.kind === "fields" &&
      (step.fields ?? []).every((f) => CONTACT_KEYS.has(f.key));
    if (isPureContact) return;

    if (step.block && step.block !== lastBlock) {
      lastBlock = step.block;
      lines.push("");
      lines.push("━━━━━━━━━━━━━━━━━━━━");
      lines.push(`📌 <b>${escapeHtml(step.block.toUpperCase())}</b>`);
    }

    if (step.kind === "fields" || step.kind === "links") {
      const activeFields = (step.fields ?? []).filter(
        (f) => !CONTACT_KEYS.has(f.key),
      );
      for (const f of activeFields) {
        const val = clean(payload.values[f.key]);
        if (!val) continue;
        const label = escapeHtml(f.label ?? f.key);
        if (isValidUrl(val)) {
          const norm = normalizeUrl(val);
          lines.push(`• <b>${label}:</b> <a href="${escapeHtml(norm)}">${escapeHtml(val)}</a>`);
        } else {
          lines.push(`• <b>${label}:</b> ${escapeHtml(val)}`);
        }
      }
    } else if (step.kind === "textarea") {
      const val = clean(payload.values[`text_${i}`]);
      lines.push("");
      lines.push(`📝 <b>${escapeHtml(step.title)}:</b>`);
      lines.push(val ? escapeHtml(val) : "<i>(kiritilmagan)</i>");
    } else if (step.kind === "checklist") {
      const options = step.options ?? [];
      const ticked = options.filter(
        (_, oi) => payload.checks[`check_${i}_${oi}`] === true,
      ).length;
      lines.push("");
      lines.push(
        `✅ <b>${escapeHtml(step.title)} (${ticked}/${options.length} tasdiqlandi):</b>`,
      );
      options.forEach((opt, oi) => {
        const isChecked = payload.checks[`check_${i}_${oi}`] === true;
        lines.push(`  ${isChecked ? "✅" : "❌"} ${escapeHtml(opt)}`);
      });
    } else if (step.kind === "video") {
      const link = clean(payload.values[`video_link_${i}`]);
      lines.push("");
      lines.push(`🎬 <b>${escapeHtml(step.title)}:</b>`);
      if (link) {
        const norm = normalizeUrl(link);
        lines.push(`🔗 <a href="${escapeHtml(norm)}">${escapeHtml(link)}</a>`);
      } else if (payload.video?.url) {
        lines.push(`🔗 <a href="${escapeHtml(payload.video.url)}">${escapeHtml(payload.video.url)}</a>`);
      } else {
        lines.push("<i>(kiritilmagan)</i>");
      }
    }
  });

  return lines.join("\n");
}
