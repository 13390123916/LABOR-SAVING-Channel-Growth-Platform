import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, pageMetadata } from "../site-metadata";
import { buildPartnerPageSchemas } from "../site-schema";

const metadataDefinition = pageMetadata.partner;

const marketOpportunities = [
  "工业自动化升级",
  "重载搬运需求",
  "风电装备市场",
  "石油化工维修市场",
  "智能制造趋势"
];

const cooperationModels = [
  {
    title: "区域代理",
    description: "面向具备本地工业客户资源和销售服务能力的合作伙伴，后续合作范围以真实商务评估为准。"
  },
  {
    title: "行业代理",
    description: "面向深耕风电、石油化工、装备制造等垂直场景的行业渠道伙伴。"
  },
  {
    title: "渠道经销商",
    description: "面向工业工具、MRO、设备贸易和自动化相关渠道，承接产品线扩展需求。"
  },
  {
    title: "项目合作伙伴",
    description: "面向具备项目线索、集成交付或本地服务资源的合作伙伴，共同推进有效需求。"
  }
];

const enablements = [
  "产品赋能",
  "技术赋能",
  "销售赋能",
  "市场赋能",
  "内容赋能",
  "培训赋能",
  "售后赋能",
  "品牌赋能"
];

const faqs = [
  {
    question: "LABOR-SAVING 渠道增长中心适合哪些合作伙伴？",
    answer:
      "适合工业工具经销商、MRO 服务商、自动化集成商、工业机器人集成商、设备贸易商，以及有工业客户资源的项目合作伙伴。"
  },
  {
    question: "提交 Partner Lead 后是否代表已经获得授权？",
    answer: "不是。提交后仅代表进入线索评估流程，后续需由工作人员沟通并结合区域、行业和资源情况评估。"
  },
  {
    question: "页面是否承诺收益、回本周期或区域独家？",
    answer: "不承诺。合作政策、价格体系和区域规则必须以后续真实商务资料与正式协议为准。"
  }
];

export const metadata: Metadata = buildPageMetadata(metadataDefinition);

export default function PartnerPage() {
  const schemas = buildPartnerPageSchemas(faqs);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section className="border-b border-[var(--line)] bg-[var(--foreground)] text-white">
        <div className="mx-auto grid min-h-[620px] max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-10">
          <div>
            <nav aria-label="面包屑" className="mb-8 text-sm text-white/70">
              <Link className="hover:text-white" href="/">
                首页
              </Link>
              <span className="mx-2">/</span>
              <span>加盟合作</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--signal-orange)]">
              LABOR-SAVING 渠道增长中心
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              成为 LABOR-SAVING 授权合作伙伴
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">
              面向工业工具经销商、MRO、自动化集成商和设备贸易商，共同承接工业智能搬运、
              重载装配与检修维护场景中的渠道增长机会。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a className="button-primary" href="#partner-lead">
                申请成为区域合作伙伴
              </a>
              <Link className="button-secondary-dark" href="/products/">
                了解产品中心
              </Link>
            </div>
          </div>

          <div className="industrial-visual" aria-label="渠道增长路径示意">
            <div className="visual-grid">
              <span>市场机会</span>
              <span>合作模式</span>
              <span>渠道赋能</span>
              <span>Partner Lead</span>
            </div>
            <div className="visual-core">
              <strong>Channel Growth</strong>
              <small>代理商增长 / 终端市场覆盖 / 品牌资产沉淀</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <p>Market Opportunity</p>
          <h2>明确的工业增长场景</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {marketOpportunities.map((item) => (
            <article className="compact-card" key={item}>
              <span className="card-index">{item.slice(0, 2)}</span>
              <h3>{item}</h3>
              <p>作为渠道判断方向，不表达市场份额、收益或排名承诺。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <p>Cooperation Model</p>
          <h2>四类合作模式</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {cooperationModels.map((model) => (
            <article className="info-panel" key={model.title}>
              <h3>{model.title}</h3>
              <p>{model.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <p>Channel Enablement</p>
          <h2>八大渠道赋能</h2>
        </div>
        <div className="enablement-grid">
          {enablements.map((item) => (
            <div className="enablement-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap" id="partner-lead">
        <div className="lead-layout">
          <div>
            <p className="eyebrow">Partner Lead</p>
            <h2>申请成为区域合作伙伴</h2>
            <p>
              表单字段依据 Lead Schema 设计，用于初步判断合作意向、区域资源、主营产品和客户行业。
              提交申请不代表自动授权或合作通过。
            </p>
            <div className="mt-8 grid gap-3 text-sm text-[var(--steel)]">
              <Link href="/applications/">查看行业应用</Link>
              <Link href="/about/contact/">查看联系方式</Link>
            </div>
          </div>

          <form className="lead-form" method="post">
            <label>
              公司名称
              <input name="companyName" required />
            </label>
            <label>
              联系人
              <input name="contactName" required />
            </label>
            <label>
              联系电话
              <input name="phone" required />
            </label>
            <label>
              所在地区
              <input name="region" required />
            </label>
            <label>
              主营产品
              <input name="mainProducts" required />
            </label>
            <label>
              客户行业
              <input name="industry" required />
            </label>
            <label>
              合作意向
              <select name="cooperationIntent" required defaultValue="">
                <option value="" disabled>
                  请选择
                </option>
                <option>区域代理</option>
                <option>行业代理</option>
                <option>渠道经销商</option>
                <option>项目合作伙伴</option>
              </select>
            </label>
            <label>
              已有客户资源
              <textarea name="customerResources" required rows={4} />
            </label>
            <input name="source" type="hidden" value="/partner/" />
            <button type="submit">提交合作申请</button>
          </form>
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <p>FAQ</p>
          <h2>合作前需要确认的问题</h2>
        </div>
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
