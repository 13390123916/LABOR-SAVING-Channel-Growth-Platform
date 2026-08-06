import type { Metadata } from "next";
import "../styles/globals.css";
import { SiteShell } from "../components/layout/site-shell";
import { siteBaseUrl, siteName } from "./site-metadata";
import { buildSiteIdentitySchemas } from "./site-schema";
import { siteIdentity } from "./site-identity";

const siteDescription = siteIdentity.organization.description;

export const metadata: Metadata = {
  title: {
    default: `${siteName} | 工业装备渠道合作与工况咨询`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  applicationName: siteName,
  metadataBase: new URL(siteBaseUrl),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    type: "website",
    siteName
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = buildSiteIdentitySchemas();

  return (
    <html lang="zh-CN">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          type="application/ld+json"
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
