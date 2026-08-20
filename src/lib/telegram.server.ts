import "server-only";

/**
 * Telegram Bot API client.
 *
 * SERVER ONLY. The `server-only` import above makes the build fail loudly if
 * this module is ever pulled into a client component, so the bot token can
 * never end up in the browser bundle. Nothing here is exported to the client
 * and no error message ever echoes the token back.
 */

const API_ROOT = "https://api.telegram.org";

/** Telegram hard-caps a message at 4096 chars; leave room for safety. */
const MAX_MESSAGE_CHARS = 3800;

export interface TelegramConfig {
  token: string;
  chatId: string;
  threadId?: string;
}

/**
 * Reads the bot credentials from the environment.
 * Returns `null` (never throws with the value inside) when unconfigured.
 */
export function getTelegramConfig(): TelegramConfig | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const threadId = process.env.TELEGRAM_THREAD_ID?.trim();

  if (!token || !chatId) return null;
  return { token, chatId, threadId: threadId || undefined };
}

/** Escapes the five characters that matter for Telegram's HTML parse mode. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Splits a long message on paragraph/line boundaries so nothing is lost and no
 * HTML tag is cut in half (tags in our messages never span lines).
 */
export function chunkMessage(text: string): string[] {
  if (text.length <= MAX_MESSAGE_CHARS) return [text];

  const chunks: string[] = [];
  let buffer = "";

  for (const line of text.split("\n")) {
    // A single line longer than the cap gets hard-split as a last resort.
    if (line.length > MAX_MESSAGE_CHARS) {
      if (buffer) {
        chunks.push(buffer);
        buffer = "";
      }
      for (let i = 0; i < line.length; i += MAX_MESSAGE_CHARS) {
        chunks.push(line.slice(i, i + MAX_MESSAGE_CHARS));
      }
      continue;
    }

    if (buffer.length + line.length + 1 > MAX_MESSAGE_CHARS) {
      chunks.push(buffer);
      buffer = line;
    } else {
      buffer = buffer ? `${buffer}\n${line}` : line;
    }
  }

  if (buffer) chunks.push(buffer);
  return chunks;
}

interface TelegramResponse {
  ok: boolean;
  description?: string;
}

async function callTelegram(
  cfg: TelegramConfig,
  method: string,
  payload: Record<string, unknown>,
): Promise<TelegramResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_ROOT}/bot${cfg.token}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: cfg.chatId,
        ...(cfg.threadId ? { message_thread_id: Number(cfg.threadId) } : {}),
        ...payload,
      }),
      cache: "no-store",
    });
  } catch {
    // Deliberately swallow the original error: its message can carry the
    // request URL, and the URL carries the token.
    return { ok: false, description: "network_error" };
  }

  let json: TelegramResponse;
  try {
    json = (await res.json()) as TelegramResponse;
  } catch {
    return { ok: false, description: `bad_response_${res.status}` };
  }

  return json;
}

/** Sends the text, split across as many messages as it takes. */
export async function sendTelegramMessage(
  cfg: TelegramConfig,
  text: string,
): Promise<{ ok: boolean; description?: string }> {
  const chunks = chunkMessage(text);

  for (const chunk of chunks) {
    const result = await callTelegram(cfg, "sendMessage", {
      text: chunk,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    });
    if (!result.ok) return result;
  }

  return { ok: true };
}

/**
 * Best-effort: also drop the video into the chat as a playable file.
 *
 * Telegram fetches by URL and refuses anything over ~20 MB, so this is a
 * convenience only — the download link in the text message is the source of
 * truth and a failure here never fails the submission.
 */
export async function sendTelegramVideoByUrl(
  cfg: TelegramConfig,
  url: string,
  caption: string,
): Promise<void> {
  await callTelegram(cfg, "sendVideo", {
    video: url,
    caption: caption.slice(0, 1000),
    parse_mode: "HTML",
    supports_streaming: true,
  });
}
