import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, pageMetadata } from "../site-metadata";
import { buildProductListingSchemas } from "../site-schema";
import { ProductCard } from "./product-card";
import { groupProductsByCategory, productEntities } from "./product-entities";

const metadataDefinition = pageMetadata.products;

const productListingFaqs = [
  {
    question: "LABOR-SAVING 产品中心目前包含哪些产品类别？",
    answer:
      "当前产品实体分为气动助力机械臂和气动平衡器两类。页面只展示已确认的基础实体，不补写尚未确认的参数、认证、价格或交期。"
  },
  {
    question: "产品卡片为什么暂时没有完整参数？",
    answer:
      "当前部分产品仍处于资料确认阶段。具体载荷、行程、配置和适用工况需要依据真实产品资料与项目条件进一步核验。"
  },
  {
    question: "如何获得产品选型或渠道合作建议？",
    answer:
      "终端客户可准备工件、载荷、空间、节拍和能源条件后发起咨询；经销商、MRO 和集成商可通过渠道合作入口沟通产品线与项目需求。"
  }
];

export const metadata: Metadata = buildPageMetadata(metadataDefinition);

export default function ProductsPage() {
  const categoryGroups = groupProductsByCategory(productEntities);
  const schemas = buildProductListingSchemas(productEntities, productListingFaqs);

  return (
    <main className="products-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <header className="products-header">
        <Link className="products-brand" href="/">
          <strong>LABOR-SAVING</strong>
          <span>渠道增长平台</span>
        </Link>
        <nav aria-label="主导航" className="products-nav">
          <Link aria-current="page" href="/products/">
            产品中心
          </Link>
          <Link href="/partner/">渠道合作</Link>
        </nav>
      </header>

      <section className="products-intro">
        <div className="products-intro-inner">
          <nav aria-label="面包屑" className="products-breadcrumb">
            {metadataDefinition.breadcrumb.map((item, index) => (
              <span key={item.url}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {index === metadataDefinition.breadcrumb.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.url}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          <div className="products-intro-copy">
            <p className="products-kicker">Product Entity Directory</p>
            <h1>产品中心</h1>
            <p>
              按产品实体与分类查看 LABOR-SAVING 当前产品范围。所有卡片由统一 Product Entity
              数据源生成，资料不足时保持边界，不补写参数或承诺。
            </p>
          </div>

          <dl className="products-summary" aria-label="产品实体摘要">
            <div>
              <dt>产品实体</dt>
              <dd>{productEntities.length}</dd>
            </div>
            <div>
              <dt>产品分类</dt>
              <dd>{categoryGroups.length}</dd>
            </div>
            <div>
              <dt>数据来源</dt>
              <dd>Entity</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="products-directory" aria-labelledby="product-directory-title">
        <div className="products-section-heading">
          <div>
            <p>Product Listing</p>
            <h2 id="product-directory-title">按产品分类浏览</h2>
          </div>
          <p className="products-section-note">型号详情在资料审核通过后开放</p>
        </div>

        {categoryGroups.map((group) => (
          <section className="product-category-section" id={group.slug} key={group.slug}>
            <div className="product-category-heading">
              <div>
                <p>{group.slug}</p>
                <h2>{group.name}</h2>
              </div>
              <span>{group.entities.length} 个产品实体</span>
            </div>
            <div className="product-grid">
              {group.entities.map((entity) => (
                <ProductCard entity={entity} key={entity.entityId} />
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="products-next-step">
        <div>
          <p className="products-kicker">Application Review</p>
          <h2>先确认工况，再进入选型</h2>
          <p>
            产品是否适用，需要结合工件、载荷、作业空间、节拍、能源条件和安全要求综合评估。
          </p>
        </div>
        <Link className="products-cta" href="/partner/">
          了解渠道合作
        </Link>
      </section>

      <section className="products-faq" aria-labelledby="products-faq-title">
        <div className="products-section-heading">
          <div>
            <p>FAQ</p>
            <h2 id="products-faq-title">产品中心常见问题</h2>
          </div>
        </div>
        <div className="products-faq-list">
          {productListingFaqs.map((faq) => (
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
