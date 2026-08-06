import Image from "next/image";
import Link from "next/link";
import { siteIdentity } from "./site-identity";

export default function HomePage() {
  const { brand, logo, organization, websiteName } = siteIdentity;

  return (
    <main className="home-page">
      <header className="home-header">
        <Link aria-label="雷普赛维首页" href="/">
          <Image alt={logo.alt} height={logo.height} priority src={logo.src} width={logo.width} />
        </Link>
        <nav aria-label="主导航">
          <Link href="/products/">产品中心</Link>
          <Link href="/partner/">渠道合作</Link>
          <Link href="/about/">关于雷普赛维</Link>
        </nav>
      </header>

      <section className="home-hero">
        <p>{brand.name}</p>
        <h1>{websiteName}</h1>
        <strong>面向重工制造领域的工业省力装备</strong>
        <span>{organization.description}</span>
        <div className="home-actions">
          <Link className="button-primary" href="/products/">
            查看产品中心
          </Link>
          <Link className="home-secondary-link" href="/about/">
            了解企业与品牌
          </Link>
        </div>
      </section>

      <section className="home-business-band">
        <div>
          <p>产品方向</p>
          <strong>气动助力机械臂、气动机械手、液压扳手配套助力工装</strong>
        </div>
        <div>
          <p>典型工位</p>
          <strong>重载搬运、重型螺栓拆装、机床上下料</strong>
        </div>
        <div>
          <p>服务支持</p>
          <strong>工况勘测、方案定制、安装调试、售后维保</strong>
        </div>
      </section>
    </main>
  );
}
