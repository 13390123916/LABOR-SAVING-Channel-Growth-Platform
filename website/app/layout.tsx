import type { Metadata } from "next";
import "../styles/globals.css";
import { siteBaseUrl, siteName } from "./site-metadata";

const siteDescription = "雷普赛维官网技术骨架，后续承接渠道合作、产品中心、行业应用、解决方案和知识中心。";

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
