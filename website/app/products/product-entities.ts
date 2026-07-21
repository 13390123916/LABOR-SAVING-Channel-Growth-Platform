import productEntitySource from "./product-entities.json";

export type ProductEntity = {
  entityId: `PRD-${string}`;
  name: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  summary: string;
  sourceStatus: "source_pending" | "reviewed";
  detailStatus: "planned" | "published";
  schemaEligible: boolean;
  contentValidated: boolean;
  releaseApproved: boolean;
  relatedEntityIds: `PRD-${string}`[];
};

export type ProductCategoryGroup = {
  name: string;
  slug: string;
  entities: ProductEntity[];
};

export const productEntities = productEntitySource as ProductEntity[];

export function buildProductUrl(entity: ProductEntity) {
  return `/products/${entity.category.slug}/${entity.slug}/`;
}

export function buildProductCategoryUrl(category: Pick<ProductCategoryGroup, "slug">) {
  return `/products/${category.slug}/`;
}

export function groupProductsByCategory(entities: ProductEntity[]): ProductCategoryGroup[] {
  return Array.from(
    entities.reduce((groups, entity) => {
      const current = groups.get(entity.category.slug);

      if (current) {
        current.entities.push(entity);
      } else {
        groups.set(entity.category.slug, {
          name: entity.category.name,
          slug: entity.category.slug,
          entities: [entity]
        });
      }

      return groups;
    }, new Map<string, ProductCategoryGroup>()).values()
  );
}

export function getSchemaEligibleProducts(entities: ProductEntity[]) {
  return entities.filter(isProductDetailPublishable);
}

export function isProductDetailPublishable(entity: ProductEntity) {
  return (
    entity.detailStatus === "published" &&
    entity.schemaEligible &&
    entity.contentValidated &&
    entity.releaseApproved
  );
}

export function getProductCategoryBySlug(categorySlug: string) {
  return groupProductsByCategory(productEntities).find((category) => category.slug === categorySlug);
}

export function getPublishedProductDetailBySlugs(categorySlug: string, productSlug: string) {
  return productEntities.find(
    (entity) =>
      entity.category.slug === categorySlug &&
      entity.slug === productSlug &&
      isProductDetailPublishable(entity)
  );
}

export function getPublishedProductDetailStaticParams() {
  return productEntities.filter(isProductDetailPublishable).map((entity) => ({
    categorySlug: entity.category.slug,
    productSlug: entity.slug
  }));
}
