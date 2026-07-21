import { pageMetadata, siteBaseUrl } from "./site-metadata";

type QuestionAnswer = {
  question: string;
  answer: string;
};

type SchemaNode = Record<string, unknown>;

function absoluteUrl(path: string) {
  return new URL(path, siteBaseUrl).toString();
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: "LABOR-SAVING",
    url: siteBaseUrl,
    description: "面向工业智能搬运、重载装配和工业渠道合作的渠道增长平台。"
  };
}

export function buildPartnerContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "Partner Lead",
    areaServed: "CN",
    availableLanguage: "zh-CN"
  };
}

export function buildPartnerWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/partner/#webpage"),
    name: "LABOR-SAVING 渠道增长中心",
    url: absoluteUrl("/partner/"),
    description: pageMetadata.partner.description,
    isPartOf: {
      "@id": absoluteUrl("/#organization")
    },
    about: ["渠道合作", "工业智能搬运", "重载装配"],
    potentialAction: {
      "@type": "CommunicateAction",
      name: "申请成为区域合作伙伴",
      target: absoluteUrl("/partner/#partner-lead")
    }
  };
}

export function buildFaqSchema(items: QuestionAnswer[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildPartnerPageSchemas(faqs: QuestionAnswer[]): SchemaNode[] {
  return [
    buildOrganizationSchema(),
    buildPartnerWebPageSchema(),
    buildPartnerContactPointSchema(),
    buildBreadcrumbSchema(pageMetadata.partner.breadcrumb),
    buildFaqSchema(faqs)
  ];
}
