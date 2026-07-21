import type { ProductCategoryGroup } from "./product-entities";

export const productListingFaqs = [
  {
    question: "LABOR-SAVING 产品中心目前包含哪些产品类别？",
    answer:
      "当前产品实体分为气动助力机械臂和气动平衡器两类。页面只展示已确认的基础实体，不补写尚未确认的参数、认证、价格或交期。"
  },
  {
    question: "产品卡片为什么暂时没有完整参数？",
    answer:
      "当前部分产品仍处于资料确认阶段。具体载荷、行程、配置和适用工况需要依据真实产品资料与项目条件进一步核验。"
  },
  {
    question: "如何获得产品选型或渠道合作建议？",
    answer:
      "终端客户可准备工件、载荷、空间、节拍和能源条件后发起咨询；经销商、MRO 和集成商可通过渠道合作入口沟通产品线与项目需求。"
  }
];

export function buildProductCategoryFaqs(category: ProductCategoryGroup) {
  const productNames = category.entities.map((entity) => entity.name).join("、");

  return [
    {
      question: `当前${category.name}分类包含哪些产品实体？`,
      answer: `当前已确认的基础产品实体包括${productNames}。具体参数、配置和可公开资料仍需按产品资料进一步确认。`
    },
    {
      question: `${category.name}是否可以直接根据型号完成选型？`,
      answer:
        "不能仅根据型号完成选型。需要结合工件、载荷、作业空间、节拍、能源条件和安全要求进行人工评估。"
    },
    {
      question: `${category.name}页面是否提供价格、库存或交期？`,
      answer:
        "不直接提供或承诺价格、库存与交期。相关信息需要结合真实型号、配置和项目条件进一步确认。"
    }
  ];
}
