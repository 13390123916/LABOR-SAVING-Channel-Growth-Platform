import type { Metadata } from "next";
import "./globals.css";

const siteName = "雷普赛维渠道增长平台";
const siteDescription =
  "雷普赛维面向工业装备渠道合作、终端工况咨询与中国 SEO/GEO 内容沉淀的增长平台。";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | 工业装备渠道合作与工况咨询`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "雷普赛维",
    "助力机械臂",
    "气动平衡器",
    "工业装备渠道合作",
    "工业工具代理"
  ],
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
