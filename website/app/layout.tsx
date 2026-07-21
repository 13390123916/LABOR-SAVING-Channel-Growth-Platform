import type { Metadata } from "next";
import "../styles/globals.css";

const siteName = "雷普赛维渠道增长平台";
const siteDescription = "雷普赛维官网技术骨架，后续承接渠道合作、产品中心、行业应用、解决方案和知识中心。";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | 工业装备渠道合作与工况咨询`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  applicationName: siteName,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
