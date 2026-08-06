export const siteIdentity = {
  canonicalOrigin: "https://laborsaving-arm.cn",
  websiteName: "雷普赛维助力机械臂、气动机械手",
  organization: {
    legalName: "雷普赛维（沈阳）流体动力科技有限公司",
    description:
      "雷普赛维（沈阳）流体动力科技有限公司是一家面向重工制造领域，从事工业省力装备研发与销售的企业；本网站使用 LABOR-SAVING 作为品牌展示名称。",
    profile:
      "公司围绕气动助力机械臂、气动机械手和液压扳手配套助力工装开展研发与销售，服务内容包括工况沟通、方案设计、安装调试和售后支持。"
  },
  brand: {
    name: "LABOR-SAVING",
    alternateName: "雷普赛维",
    relationship: "本网站使用 LABOR-SAVING 作为品牌展示名称。"
  },
  logo: {
    src: "/assets/labor-saving-logo.png",
    alt: "雷普赛维 LABOR-SAVING 品牌标志",
    width: 1082,
    height: 220,
    sha256: "4C82FCC552FC57B938B9D7E8746DBE7D6CF30B8E13FDDDBF9F0BBD0CAA6A822B"
  },
  address: {
    display: "辽宁省沈阳市浑南区文溯街19-1号",
    country: "CN",
    region: "辽宁省",
    locality: "沈阳市",
    streetAddress: "浑南区文溯街19-1号"
  },
  contacts: {
    public: {
      label: "全国服务热线",
      contactType: "客户咨询",
      phoneDisplay: "400 971 6668",
      phoneHref: "tel:4009716668"
    },
    partner: {
      label: "渠道合作",
      contactType: "渠道合作",
      email: "13390123916@163.com"
    },
    technical: {
      label: "技术支持",
      contactType: "技术支持",
      email: "15840346048@163.com"
    }
  },
  socialProfiles: {
    douyin: {
      platform: "抖音",
      displayName: "雷普赛维助力机械臂",
      profileUrl:
        "https://www.douyin.com/user/MS4wLjABAAAAtbEU6K_PW5650yMn3P9SefKoOIttY9N5NumAvlGCWrg"
    },
    wechat: {
      platform: "微信公众号",
      displayName: "雷普赛维LABOR-SAVING",
      profileUrl: null
    }
  },
  icp: "辽ICP备2026015594号"
} as const;

export const approvedSameAs = [siteIdentity.socialProfiles.douyin.profileUrl];

export function buildCopyright(year = new Date().getFullYear()) {
  return `© ${year} ${siteIdentity.organization.legalName}`;
}
