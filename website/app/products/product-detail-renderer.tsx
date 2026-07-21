import Link from "next/link";
import { buildProductDetailContent, buildProductDetailFaqs } from "./product-content";
import { buildProductCategoryUrl, type ProductEntity } from "./product-entities";
import { ProductBreadcrumbs } from "./product-breadcrumbs";
import { ProductHeader } from "./product-header";
import type { PageMetadataDefinition } from "../site-metadata";

type ProductDetailRendererProps = {
  entity: ProductEntity;
  metadata: PageMetadataDefinition;
};

export function ProductDetailRenderer({ entity, metadata }: ProductDetailRendererProps) {
  const content = buildProductDetailContent(entity);
  const faqs = buildProductDetailFaqs(entity);

  return (
    <main className="products-page product-detail-page" data-entity-id={entity.entityId}>
      <ProductHeader />

      <section className="products-intro">
        <div className="products-intro-inner">
          <ProductBreadcrumbs items={metadata.breadcrumb} />
          <div className="products-intro-copy">
            <p className="products-kicker">Product Detail</p>
            <h1>{entity.name}</h1>
            <p>{content.overview}</p>
          </div>
          <dl className="products-summary" aria-label={`${entity.name} 产品摘要`}>
            <div>
              <dt>产品实体</dt>
              <dd>{entity.entityId}</dd>
            </div>
            <div>
              <dt>产品分类</dt>
              <dd>{entity.category.name}</dd>
            </div>
            <div>
              <dt>资料状态</dt>
              <dd>已验证</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="products-directory" aria-labelledby="product-detail-content-title">
        <div className="products-section-heading">
          <div>
            <p>Content Sections</p>
            <h2 id="product-detail-content-title">产品信息</h2>
          </div>
          <Link className="products-text-link" href={buildProductCategoryUrl(entity.category)}>
            返回产品分类
          </Link>
        </div>
        <div className="products-faq-list">
          {content.sections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-next-step">
        <div>
          <p className="products-kicker">Application Review</p>
          <h2>结合真实工况确认选型</h2>
          <p>请结合工件、载荷、作业空间、节拍、能源条件和安全要求进行项目确认。</p>
        </div>
        <Link className="products-cta" href="/partner/">
          了解渠道合作
        </Link>
      </section>

      <section className="products-faq" aria-labelledby="product-detail-faq-title">
        <div className="products-section-heading">
          <div>
            <p>FAQ</p>
            <h2 id="product-detail-faq-title">{entity.name} 常见问题</h2>
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
