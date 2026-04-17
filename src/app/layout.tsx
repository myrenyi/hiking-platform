import type { Metadata } from "next";
import "./globals.css";
import SiteNavigation from "@/components/SiteNavigation";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "踏遍山河 — 户外徒步登山平台",
  description:
    "为户外徒步登山爱好者打造的综合服务平台，提供路线推荐、装备指南、社群互动、活动报名、安全科普。传递「安全登山、快乐徒步、亲近自然」的核心理念。",
  keywords: "户外徒步,登山,路线推荐,装备指南,活动报名,安全科普",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg font-sans antialiased">
        <SiteNavigation>
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
        </SiteNavigation>
      </body>
    </html>
  );
}
