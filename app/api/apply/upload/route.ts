import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ACCEPTED_VIDEO_TYPES, MAX_VIDEO_BYTES } from "@/lib/apply-types";

/**
 * POST /api/apply/upload — issues a short-lived, single-purpose upload token.
 *
 * The browser uploads the video straight to Blob storage, so the file never
 * passes through a serverless function (Vercel caps a request body at ~4.5 MB,
 * which a 100 MB clip would blow past instantly).
 *
 * `BLOB_READ_WRITE_TOKEN` stays on the server. What reaches the browser is a
 * derived token that expires in an hour and can only write one video-typed
 * object of at most 100 MB.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("[apply/upload] Blob storage is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ACCEPTED_VIDEO_TYPES,
        maximumSizeInBytes: MAX_VIDEO_BYTES,
        // Random suffix = unguessable URL, and two applicants can both upload
        // a file called `video.mp4` without overwriting each other.
        addRandomSuffix: true,
        validUntil: Date.now() + 60 * 60 * 1000,
      }),
      // Nothing to do on completion: the URL travels with the form submit.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(json);
  } catch (error) {
    console.error(
      `[apply/upload] token issue failed: ${
        error instanceof Error ? error.message : "unknown"
      }`,
    );
    return NextResponse.json({ error: "upload_failed" }, { status: 400 });
  }
}
