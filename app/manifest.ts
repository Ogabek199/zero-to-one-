import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE } from "@/data/content";
import { SITE_NAME, SEO } from "@/lib/seo";

/**
 * Web App Manifest, served at /manifest.webmanifest. Makes the site
 * installable and gives Android/Chrome the right name, colors and icon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO[DEFAULT_LOCALE].title,
    short_name: SITE_NAME,
    description: SEO[DEFAULT_LOCALE].description,
    start_url: `/${DEFAULT_LOCALE}`,
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#0D0D0D",
    lang: DEFAULT_LOCALE,
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
