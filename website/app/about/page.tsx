import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata, pageMetadata } from "../site-metadata";
import { buildAboutPageSchemas } from "../site-schema";
import { siteIdentity } from "../site-identity";

const metadataDefinition = pageMetadata.about;

const productDirections = ["气动助力机械臂", "气动机械手", "液压扳手配套助力工装"];
const industryDirections = ["风电", "石化", "汽车零部件", "矿山", "压力容器"];
const serviceScope = ["工况勘测", "方案定制", "安装调试", "售后维保"];

export const metadata: Metadata = buildPageMetadata(metadataDefinition);

export default function AboutPage() {
  const schemas = buildAboutPageSchemas();
  const { address, brand, contacts, logo, organization } = siteIdentity;

  return (
    <main className="about-page">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        type="application/ld+json"
      />

      <section className="about-hero">
        <div className="about-hero-inner">
          <nav aria-label="面包屑" className="about-breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>关于雷普赛维</span>
          </nav>
          <Image alt={logo.alt} height={logo.height} priority src={logo.src} width={logo.width} />
          <p className="about-kicker">Company &amp; Brand</p>
          <h1>关于雷普赛维</h1>
          <p>{organization.description}</p>
        </div>
      </section>

      <section className="about-section about-profile">
        <div className="about-section-heading">
          <p>Company Profile</p>
          <h2>工业省力装备研发与销售</h2>
        </div>
        <div className="about-profile-copy">
          <p>{organization.profile}</p>
          <strong>{brand.relationship}</strong>
        </div>
      </section>

      <section className="about-section about-directions">
        <div>
          <p>产品方向</p>
          <ul>
            {productDirections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>服务行业</p>
          <ul>
            {industryDirections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>服务范围</p>
          <ul>
            {serviceScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-contact-band">
        <div className="about-contact-inner">
          <div>
            <p>Contact</p>
            <h2>工况咨询与渠道合作</h2>
            <span>{address.display}</span>
          </div>
          <div className="about-contact-list">
            <a href={contacts.public.phoneHref}>{contacts.public.phoneDisplay}</a>
            <a href={`mailto:${contacts.partner.email}`}>{contacts.partner.email}</a>
            <a href={`mailto:${contacts.technical.email}`}>{contacts.technical.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
