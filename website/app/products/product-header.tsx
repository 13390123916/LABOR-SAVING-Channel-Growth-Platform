import Image from "next/image";
import Link from "next/link";
import { siteIdentity } from "../site-identity";

export function ProductHeader() {
  return (
    <header className="products-header">
      <Link className="products-brand" href="/">
        <Image
          alt={siteIdentity.logo.alt}
          height={siteIdentity.logo.height}
          priority
          src={siteIdentity.logo.src}
          width={siteIdentity.logo.width}
        />
      </Link>
      <nav aria-label="主导航" className="products-nav">
        <Link aria-current="page" href="/products/">
          产品中心
        </Link>
        <Link href="/partner/">渠道合作</Link>
        <Link href="/about/">关于</Link>
      </nav>
    </header>
  );
}
