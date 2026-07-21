import Link from "next/link";
import { buildProductUrl, type ProductEntity } from "./product-entities";

type ProductCardProps = {
  entity: ProductEntity;
};

export function ProductCard({ entity }: ProductCardProps) {
  const productUrl = buildProductUrl(entity);
  const isPublished = entity.detailStatus === "published";

  return (
    <article className="product-card" data-entity-id={entity.entityId}>
      <div
        aria-label={`${entity.category.name}产品实体示意`}
        className="product-card-visual"
        data-category={entity.category.slug}
        role="img"
      >
        <span className="product-visual-rail" />
        <span className="product-visual-joint product-visual-joint-a" />
        <span className="product-visual-joint product-visual-joint-b" />
        <span className="product-visual-arm product-visual-arm-a" />
        <span className="product-visual-arm product-visual-arm-b" />
        <span className="product-visual-mark">{entity.slug.toUpperCase()}</span>
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{entity.entityId}</span>
          <span>{entity.sourceStatus === "reviewed" ? "资料已审核" : "基础实体已确认"}</span>
        </div>
        <p className="product-category-label">{entity.category.name}</p>
        <h3>{entity.name}</h3>
        <p className="product-card-summary">{entity.summary}</p>

        <div className="product-card-footer">
          {isPublished ? (
            <Link href={productUrl}>查看产品详情</Link>
          ) : (
            <span aria-label={`详情规划路径 ${productUrl}`}>详情资料确认中</span>
          )}
        </div>
      </div>
    </article>
  );
}
