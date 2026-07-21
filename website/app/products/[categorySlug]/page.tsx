import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata, buildProductCategoryMetadata } from "../../site-metadata";
import { buildProductCategorySchemas } from "../../site-schema";
import { ProductBreadcrumbs } from "../product-breadcrumbs";
import { ProductCard } from "../product-card";
import { buildProductCategoryFaqs } from "../product-content";
import {
  getProductCategoryBySlug,
  groupProductsByCategory,
  productEntities
} from "../product-entities";
import { ProductHeader } from "../product-header";

type ProductCategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export function generateStaticParams() {
  return groupProductsByCategory(productEntities).map((category) => ({
    categorySlug: category.slug
  }));
}

export async function generateMetadata({ params }: ProductCategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getProductCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return buildPageMetadata(buildProductCategoryMetadata(category));
}

export default async function ProductCategoryPage({ params }: ProductCategoryPageProps) {
  const { categorySlug } = await params;
  const category = getProductCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const metadataDefinition = buildProductCategoryMetadata(category);
  const faqs = buildProductCategoryFaqs(category);
  const schemas = buildProductCategorySchemas(category, faqs);

  return (
    <main className="products-page product-category-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <ProductHeader />

      <section className="products-intro">
        <div className="products-intro-inner">
          <ProductBreadcrumbs items={metadataDefinition.breadcrumb} />

          <div className="products-intro-copy">
            <p className="products-kicker">Product Category</p>
            <h1>{category.name}</h1>
            <p>
              本分类由 Product Entity 自动聚合生成，仅展示 category slug 为
              <strong> {category.slug}</strong> 的已确认基础实体。
            </p>
          </div>

          <dl className="products-summary" aria-label="产品分类摘要">
            <div>
              <dt>分类实体数</dt>
              <dd>{category.entities.length}</dd>
            </div>
            <div>
              <dt>过滤字段</dt>
              <dd>Category</dd>
            </div>
            <div>
              <dt>数据来源</dt>
              <dd>Entity</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="category-products-title"
        className="products-directory category-directory"
        data-category-count={category.entities.length}
        data-category-slug={category.slug}
      >
        <div className="products-section-heading">
          <div>
            <p>Entity Filter Result</p>
            <h2 id="category-products-title">当前产品实体</h2>
          </div>
          <Link className="products-text-link" href="/products/">
            返回产品中心
          </Link>
        </div>

        <div className="product-grid">
          {category.entities.map((entity) => (
            <ProductCard entity={entity} key={entity.entityId} />
          ))}
        </div>
      </section>

      <section className="products-next-step">
        <div>
          <p className="products-kicker">Selection Boundary</p>
          <h2>型号范围不等于选型结论</h2>
          <p>进入具体型号前，仍需确认真实产品资料与工况条件，不根据分类名称推断产品参数。</p>
        </div>
        <Link className="products-cta" href="/partner/">
          了解渠道合作
        </Link>
      </section>

      <section className="products-faq" aria-labelledby="category-faq-title">
        <div className="products-section-heading">
          <div>
            <p>Category FAQ</p>
            <h2 id="category-faq-title">{category.name}常见问题</h2>
          </div>
        </div>
        <div className="products-faq-list">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
