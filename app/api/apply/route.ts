import { NextResponse, type NextRequest } from "next/server";
import {
  buildTelegramMessage,
  isLocale,
  validatePayload,
} from "@/lib/apply-format";
import type { ApplyPayload } from "@/lib/apply-types";
import {
  getTelegramConfig,
  sendTelegramMessage,
  sendTelegramVideoByUrl,
} from "@/lib/telegram.server";

/**
 * POST /api/apply — receives an application and forwards it to Telegram.
 *
 * The bot token lives only in `process.env` on the server (no NEXT_PUBLIC_
 * prefix), is read inside this handler, and never appears in a response body,
 * a log line, or the client bundle.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reject oversized bodies outright — the video never travels through here. */
const MAX_BODY_BYTES = 128 * 1024;

/** Telegram refuses to fetch a remote file larger than ~20 MB. */
const TELEGRAM_URL_FETCH_LIMIT = 20 * 1024 * 1024;

/* ---- naive per-instance rate limit ---------------------------------- */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_MAX;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* --------------------------------------------------------------------- */

export async function POST(req: NextRequest) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const body = raw as Partial<ApplyPayload>;

  // Honeypot: a hidden field no human ever fills in. Answer 200 so the bot
  // believes it succeeded and does not retry.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!isLocale(body.locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const payload: ApplyPayload = {
    locale: body.locale,
    values:
      body.values && typeof body.values === "object" ? body.values : {},
    checks:
      body.checks && typeof body.checks === "object" ? body.checks : {},
    video:
      body.video && typeof body.video.url === "string"
        ? {
            url: body.video.url,
            name: String(body.video.name ?? "video").slice(0, 200),
            size: Number(body.video.size) || 0,
          }
        : null,
  };

  // Only accept a video URL we ourselves issued.
  if (payload.video && !/^https:\/\/[a-z0-9.-]*\.vercel-storage\.com\//i.test(payload.video.url)) {
    return NextResponse.json({ error: "invalid_video_url" }, { status: 400 });
  }

  const problems = validatePayload(payload);
  if (problems.length > 0) {
    return NextResponse.json(
      { error: "validation_failed", fields: problems },
      { status: 422 },
    );
  }

  const cfg = getTelegramConfig();
  if (!cfg) {
    // Never say which variable is missing to the client.
    console.error("[apply] Telegram is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const message = buildTelegramMessage(payload);
  const sent = await sendTelegramMessage(cfg, message);

  if (!sent.ok) {
    console.error(`[apply] Telegram rejected the message: ${sent.description}`);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  // Bonus: drop the clip into the chat when it is small enough for Telegram to
  // fetch it itself. Failure here is silent — the link is already delivered.
  if (payload.video && payload.video.size <= TELEGRAM_URL_FETCH_LIMIT) {
    const who = payload.values.name ?? "";
    await sendTelegramVideoByUrl(cfg, payload.video.url, `🎬 ${who}`);
  }

  return NextResponse.json({ ok: true });
}
