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
import { approvedSameAs, siteIdentity } from "./site-identity";

type QuestionAnswer = {
  question: string;
  answer: string;
};

type SchemaNode = Record<string, unknown>;

export function absoluteUrl(path: string) {
  return new URL(path, siteBaseUrl).toString();
}

export const siteSchemaIds = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  brand: absoluteUrl("/#brand"),
  publicContact: absoluteUrl("/#contact-public"),
  partnerContact: absoluteUrl("/#contact-partner"),
  technicalContact: absoluteUrl("/#contact-technical")
} as const;

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
    "@id": siteSchemaIds.organization,
    name: siteIdentity.organization.legalName,
    legalName: siteIdentity.organization.legalName,
    alternateName: [siteIdentity.brand.alternateName, siteIdentity.brand.name],
    url: siteBaseUrl,
    description: siteIdentity.organization.description,
    logo: absoluteUrl(siteIdentity.logo.src),
    brand: {
      "@id": siteSchemaIds.brand
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: siteIdentity.address.country,
      addressRegion: siteIdentity.address.region,
      addressLocality: siteIdentity.address.locality,
      streetAddress: siteIdentity.address.streetAddress
    },
    contactPoint: buildContactPointSchemas(),
    sameAs: approvedSameAs
  };
}

export function buildBrandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": siteSchemaIds.brand,
    name: siteIdentity.brand.name,
    alternateName: siteIdentity.brand.alternateName,
    url: siteBaseUrl,
    logo: absoluteUrl(siteIdentity.logo.src)
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteSchemaIds.website,
    name: siteIdentity.websiteName,
    alternateName: siteIdentity.brand.name,
    url: siteBaseUrl,
    inLanguage: "zh-CN",
    publisher: {
      "@id": siteSchemaIds.organization
    }
  };
}

export function buildContactPointSchemas() {
  return [
    {
      "@type": "ContactPoint",
      "@id": siteSchemaIds.publicContact,
      contactType: siteIdentity.contacts.public.contactType,
      telephone: siteIdentity.contacts.public.phoneDisplay,
      areaServed: "CN",
      availableLanguage: "zh-CN"
    },
    {
      "@type": "ContactPoint",
      "@id": siteSchemaIds.partnerContact,
      contactType: siteIdentity.contacts.partner.contactType,
      email: siteIdentity.contacts.partner.email,
      areaServed: "CN",
      availableLanguage: "zh-CN"
    },
    {
      "@type": "ContactPoint",
      "@id": siteSchemaIds.technicalContact,
      contactType: siteIdentity.contacts.technical.contactType,
      email: siteIdentity.contacts.technical.email,
      areaServed: "CN",
      availableLanguage: "zh-CN"
    }
  ];
}

export function buildSiteIdentitySchemas(): SchemaNode[] {
  return [buildOrganizationSchema(), buildWebSiteSchema(), buildBrandSchema()];
}

export function buildPartnerContactPointSchema() {
  return { "@context": "https://schema.org", ...buildContactPointSchemas()[1] };
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
      "@id": siteSchemaIds.website
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
      "@id": siteSchemaIds.website
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
              "@id": siteSchemaIds.brand
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
              "@id": siteSchemaIds.brand
            }
          }))
        }
      : {})
  };
}

export function buildPartnerPageSchemas(faqs: QuestionAnswer[]): SchemaNode[] {
  return [
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
      "@id": siteSchemaIds.brand
    }
  };
}

export function buildProductDetailSchemas(
  entity: ProductEntity,
  faqs: QuestionAnswer[]
): SchemaNode[] {
  const metadata = buildProductDetailMetadata(entity);

  return [
    buildProductDetailSchema(entity),
    buildBreadcrumbSchema(metadata.breadcrumb),
    buildFaqSchema(faqs)
  ];
}

export function buildAboutPageSchemas(): SchemaNode[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": absoluteUrl("/about/#webpage"),
      name: pageMetadata.about.title,
      url: absoluteUrl(pageMetadata.about.canonical),
      description: pageMetadata.about.description,
      inLanguage: "zh-CN",
      isPartOf: {
        "@id": siteSchemaIds.website
      },
      about: {
        "@id": siteSchemaIds.organization
      }
    },
    buildBreadcrumbSchema(pageMetadata.about.breadcrumb)
  ];
}
