import type { MetadataRoute } from "next";
import { siteBaseUrl } from "./site-metadata";
import {
  buildProductUrl,
  isProductDetailPublishable,
  productEntities
} from "./products/product-entities";

const publicRouteAllowlist = [
  "/",
  "/partner/",
  "/products/",
  "/products/pneumatic-manipulator-arm/",
  "/products/pneumatic-balancer/"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedProductRoutes = productEntities
    .filter(isProductDetailPublishable)
    .map(buildProductUrl);

  return [...publicRouteAllowlist, ...publishedProductRoutes].map((route) => ({
    url: new URL(route, siteBaseUrl).toString()
  }));
}
