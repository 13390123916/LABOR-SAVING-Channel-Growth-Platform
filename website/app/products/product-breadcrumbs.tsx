import Link from "next/link";
import type { BreadcrumbItem } from "../site-metadata";

type ProductBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="面包屑" className="products-breadcrumb">
      {items.map((item, index) => (
        <span key={item.url}>
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {index === items.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link href={item.url}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
