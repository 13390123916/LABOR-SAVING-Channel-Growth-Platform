import Image from "next/image";
import Link from "next/link";
import { buildCopyright, siteIdentity } from "../../app/site-identity";

export function SiteFooter() {
  const { address, brand, contacts, icp, logo, organization, socialProfiles } = siteIdentity;

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link aria-label="返回首页" href="/">
            <Image alt={logo.alt} height={logo.height} src={logo.src} width={logo.width} />
          </Link>
          <p>{brand.relationship}</p>
          <Link className="site-footer-about-link" href="/about/">
            了解企业与品牌
          </Link>
        </div>

        <div className="site-footer-section">
          <h2>联系雷普赛维</h2>
          <address>
            <span>{organization.legalName}</span>
            <span>{address.display}</span>
            <a href={contacts.public.phoneHref}>
              {contacts.public.label}：{contacts.public.phoneDisplay}
            </a>
          </address>
        </div>

        <div className="site-footer-section">
          <h2>业务联系</h2>
          <a href={`mailto:${contacts.partner.email}`}>
            {contacts.partner.label}：{contacts.partner.email}
          </a>
          <a href={`mailto:${contacts.technical.email}`}>
            {contacts.technical.label}：{contacts.technical.email}
          </a>
        </div>

        <div className="site-footer-section">
          <h2>官方账号</h2>
          <a href={socialProfiles.douyin.profileUrl} rel="noreferrer" target="_blank">
            {socialProfiles.douyin.platform}：{socialProfiles.douyin.displayName}
          </a>
          <span>
            {socialProfiles.wechat.platform}：{socialProfiles.wechat.displayName}
          </span>
        </div>
      </div>

      <div className="site-footer-legal">
        <span>{buildCopyright()}</span>
        <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">
          {icp}
        </a>
      </div>
    </footer>
  );
}
