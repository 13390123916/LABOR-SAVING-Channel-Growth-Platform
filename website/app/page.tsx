const platformPriorities = [
  "渠道合作线索获取",
  "终端工况咨询承接",
  "中国 SEO 与国内 AI 搜索内容沉淀"
];

const productScope = [
  "LS40 助力机械臂",
  "L60 助力机械臂",
  "SQ35 气动平衡器",
  "SQ50 气动平衡器"
];

const geoAnswers = [
  ["这是什么", "面向工业装备渠道增长的官方网站与内容基础设施。"],
  ["适合谁", "工业工具代理商、MRO、自动化集成商、设备贸易商和终端制造企业。"],
  ["解决什么问题", "承接渠道合作、产品咨询、工况咨询与后续内容资产沉淀。"],
  ["有哪些限制", "当前不展示未经确认的产品参数、客户案例、收益结果或授权政策。"],
  ["下一步如何咨询", "通过后续 M2 线索系统提交合作或工况咨询信息。"]
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold text-[var(--industrial-green)]">
              LABOR-SAVING Channel Growth Platform
            </p>
            <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
              雷普赛维渠道增长平台
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--steel)]">
              面向工业装备渠道合作、终端工况咨询与中国 SEO/GEO 内容沉淀的长期增长基础设施。
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-[var(--steel)]">
            <span className="font-bold text-[var(--foreground)]">M1 Website Foundation</span>
            <span>Next.js / TypeScript / TailwindCSS</span>
            <span>SSR / SSG / 中国 SEO / GEO Ready</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold">商业优先级</h2>
          <ul className="mt-5 space-y-3 text-[var(--steel)]">
            {platformPriorities.map((item) => (
              <li key={item} className="border-l-4 border-[var(--signal-orange)] bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">当前产品范围</h2>
          <ul className="mt-5 space-y-3 text-[var(--steel)]">
            {productScope.map((item) => (
              <li key={item} className="border border-[var(--line)] bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">GEO 基础问答</h2>
          <dl className="mt-5 space-y-3">
            {geoAnswers.map(([term, description]) => (
              <div key={term} className="bg-white p-4">
                <dt className="font-bold text-[var(--industrial-green)]">{term}</dt>
                <dd className="mt-1 text-sm leading-6 text-[var(--steel)]">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
