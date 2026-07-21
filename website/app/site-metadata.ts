import type { Metadata } from "next";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type PageMetadataDefinition = {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: "website";
  };
  breadcrumb: BreadcrumbItem[];
};

export const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.labor-saving.cn";
export const siteName = "雷普赛维渠道增长平台";

export const pageMetadata = {
  products: {
    title: "工业助力机械臂与气动平衡器产品中心",
    description:
      "查看 LABOR-SAVING 当前已确认的助力机械臂与气动平衡器产品实体，按产品分类了解基础信息、资料状态和选型咨询入口。",
    keywords: [
      "工业助力机械臂",
      "气动助力机械臂",
      "气动平衡器",
      "工业搬运设备",
      "重载装配辅助",
      "LABOR-SAVING 产品中心"
    ],
    canonical: "/products/",
    openGraph: {
      title: "LABOR-SAVING 产品中心",
      description: "按产品分类查看当前已确认的工业助力机械臂与气动平衡器实体。",
      url: "/products/",
      type: "website"
    },
    breadcrumb: [
      { name: "首页", url: "/" },
      { name: "产品中心", url: "/products/" }
    ]
  },
  partner: {
    title: "LABOR-SAVING 渠道增长中心 | 工业装备合作伙伴招募",
    description:
      "面向工业工具经销商、MRO、自动化集成商和设备贸易商，了解 LABOR-SAVING 工业智能搬运与重载装配渠道合作方向、合作模式、渠道赋能和区域合作伙伴申请入口。",
    keywords: [
      "LABOR-SAVING 渠道增长中心",
      "经销商加盟",
      "区域代理",
      "行业代理",
      "工业工具代理",
      "渠道经销商",
      "工业装备渠道合作"
    ],
    canonical: "/partner/",
    openGraph: {
      title: "LABOR-SAVING 渠道增长中心",
      description: "面向工业工具经销商、MRO、自动化集成商和设备贸易商的渠道合作入口。",
      url: "/partner/",
      type: "website"
    },
    breadcrumb: [
      { name: "首页", url: "/" },
      { name: "加盟合作", url: "/partner/" }
    ]
  }
} satisfies Record<string, PageMetadataDefinition>;

export function buildPageMetadata(definition: PageMetadataDefinition): Metadata {
  return {
    title: definition.title,
    description: definition.description,
    keywords: definition.keywords,
    alternates: {
      canonical: definition.canonical
    },
    openGraph: {
      title: definition.openGraph.title,
      description: definition.openGraph.description,
      url: definition.openGraph.url,
      type: definition.openGraph.type,
      siteName
    }
  };
}
