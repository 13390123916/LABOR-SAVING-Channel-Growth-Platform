import {
  buildProductDetailMetadata,
  buildProductCategoryMetadata,
  pageMetadata,
  siteBaseUrl
} from "./site-metadata";
import {
  buildProductCategoryUrl,
  buildProductUrl,
  getSchemaEligibleProducts,
  type ProductCategoryGroup,
  type ProductEntity
} from "./products/product-entities";

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

export function buildProductListingSchema(products: ProductEntity[]) {
  const eligibleProducts = getSchemaEligibleProducts(products);
  const categories = Array.from(new Set(products.map((product) => product.category.name)));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/products/#collection"),
    name: "LABOR-SAVING 产品中心",
    url: absoluteUrl("/products/"),
    description: pageMetadata.products.description,
    isPartOf: {
      "@id": absoluteUrl("/#organization")
    },
    about: categories,
    ...(eligibleProducts.length > 0
      ? {
          mainEntity: eligibleProducts.map((product) => ({
            "@type": "Product",
            name: product.name,
            category: product.category.name,
            description: product.summary,
            url: absoluteUrl(buildProductUrl(product)),
            brand: {
              "@type": "Brand",
              name: "LABOR-SAVING"
            }
          }))
        }
      : {})
  };
}

export function buildProductCategorySchema(category: ProductCategoryGroup) {
  const eligibleProducts = getSchemaEligibleProducts(category.entities);
  const metadata = buildProductCategoryMetadata(category);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(`${buildProductCategoryUrl(category)}#collection`),
    name: category.name,
    url: absoluteUrl(buildProductCategoryUrl(category)),
    description: metadata.description,
    isPartOf: {
      "@id": absoluteUrl("/products/#collection")
    },
    about: category.name,
    ...(eligibleProducts.length > 0
      ? {
          mainEntity: eligibleProducts.map((product) => ({
            "@type": "Product",
            name: product.name,
            category: product.category.name,
            description: product.summary,
            url: absoluteUrl(buildProductUrl(product)),
            brand: {
              "@type": "Brand",
              name: "LABOR-SAVING"
            }
          }))
        }
      : {})
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

export function buildProductListingSchemas(
  products: ProductEntity[],
  faqs: QuestionAnswer[]
): SchemaNode[] {
  return [
    buildOrganizationSchema(),
    buildProductListingSchema(products),
    buildBreadcrumbSchema(pageMetadata.products.breadcrumb),
    buildFaqSchema(faqs)
  ];
}

export function buildProductCategorySchemas(
  category: ProductCategoryGroup,
  faqs: QuestionAnswer[]
): SchemaNode[] {
  const metadata = buildProductCategoryMetadata(category);

  return [
    buildOrganizationSchema(),
    buildProductCategorySchema(category),
    buildBreadcrumbSchema(metadata.breadcrumb),
    buildFaqSchema(faqs)
  ];
}

export function buildProductDetailSchema(entity: ProductEntity) {
  const metadata = buildProductDetailMetadata(entity);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`${metadata.canonical}#product`),
    name: entity.name,
    category: entity.category.name,
    description: entity.summary,
    url: absoluteUrl(metadata.canonical),
    brand: {
      "@type": "Brand",
      name: "LABOR-SAVING"
    }
  };
}

export function buildProductDetailSchemas(
  entity: ProductEntity,
  faqs: QuestionAnswer[]
): SchemaNode[] {
  const metadata = buildProductDetailMetadata(entity);

  return [
    buildOrganizationSchema(),
    buildProductDetailSchema(entity),
    buildBreadcrumbSchema(metadata.breadcrumb),
    buildFaqSchema(faqs)
  ];
}
