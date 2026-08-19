import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 * Keep this list in sync with `LOCALES` / `DEFAULT_LOCALE` in
 * `src/data/content.ts`. Requests without a locale prefix are redirected to
 * the default language (e.g. `/` → `/uz`, `/foo` → `/uz/foo`).
 */
const locales = ["uz", "ru", "en"] as const;
const defaultLocale = "uz";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (assets).
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
