import Image from "next/image";
import Link from "next/link";

export function ProductHeader() {
  return (
    <header className="products-header">
      <Link className="products-brand" href="/">
        <Image
          alt="LABOR-SAVING 渠道增长平台"
          height={31}
          priority
          src="/assets/labor-saving-logo.jpg"
          width={154}
        />
      </Link>
      <nav aria-label="主导航" className="products-nav">
        <Link aria-current="page" href="/products/">
          产品中心
        </Link>
        <Link href="/partner/">渠道合作</Link>
      </nav>
    </header>
  );
}
