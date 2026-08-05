import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "页面未找到",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-bold text-[var(--industrial-green)]">404</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight">页面未找到</h1>
        <p className="mt-5 leading-8 text-[var(--steel)]">
          当前地址不存在，或对应内容尚未通过公开发布门禁。
        </p>
        <nav aria-label="返回有效页面" className="mt-8 flex flex-wrap gap-5 font-bold">
          <Link href="/">返回首页</Link>
          <Link href="/products/">查看产品中心</Link>
          <Link href="/partner/">了解渠道合作</Link>
        </nav>
      </section>
    </main>
  );
}
