export const dynamic = "force-static";

export function GET() {
  const body = `# 雷普赛维渠道增长平台

## 项目定位
雷普赛维渠道增长平台是面向工业装备渠道合作、终端工况咨询、中国 SEO 与国内 AI 搜索优化的长期增长平台。

## 当前产品范围
- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

## 内容边界
当前不编造产品参数、客户案例、收益结果、授权政策或市场排名。

## 主要服务对象
工业工具代理商、MRO、自动化集成商、工业机器人集成商、设备贸易商和终端制造企业。
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}
