import { NextResponse } from "next/server";

export async function GET() {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://craving.pratikgoswami.dev</loc>
    <lastModified>${new Date().toISOString()}</lastModified>
    <changeFrequency>weekly</changeFrequency>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, max-age=3600, s-maxage=18000, stale-while-revalidate=60",
    },
  });
}
