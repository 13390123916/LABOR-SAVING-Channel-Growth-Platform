import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildProductDetailFaqs } from "../../product-content";
import {
  getPublishedProductDetailBySlugs,
  getPublishedProductDetailStaticParams
} from "../../product-entities";
import { ProductDetailRenderer } from "../../product-detail-renderer";
import { buildPageMetadata, buildProductDetailMetadata } from "../../../site-metadata";
import { buildProductDetailSchemas } from "../../../site-schema";

type ProductDetailPageProps = {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProductDetailStaticParams();
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const entity = getPublishedProductDetailBySlugs(categorySlug, productSlug);

  if (!entity) {
    return {};
  }

  return buildPageMetadata(buildProductDetailMetadata(entity));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { categorySlug, productSlug } = await params;
  const entity = getPublishedProductDetailBySlugs(categorySlug, productSlug);

  if (!entity) {
    notFound();
  }

  const metadata = buildProductDetailMetadata(entity);
  const faqs = buildProductDetailFaqs(entity);
  const schemas = buildProductDetailSchemas(entity, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProductDetailRenderer entity={entity} metadata={metadata} />
    </>
  );
}
