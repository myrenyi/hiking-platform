"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Warning, Leaf, TrendUp } from "@phosphor-icons/react";

const news = [
  {
    id: "news-001",
    category: "安全提示",
    icon: Warning,
    title: "秦岭地区进入封山期，这些路线暂时关闭",
    excerpt:
      "每年3-5月为秦岭林区森林防火期，多条经典徒步路线暂停开放，请关注最新公告。",
    date: "2026-04-12",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: "news-002",
    category: "环保公益",
    icon: Leaf,
    title: "「无痕山野」行动：带走1200袋垃圾，守护山野之美",
    excerpt:
      "上周末全国15城联动，2867名志愿者参与，清理徒步路线周边垃圾超过1200袋。",
    date: "2026-04-10",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    id: "news-003",
    category: "赛事报名",
    icon: TrendUp,
    title: "2026「踏山」国际徒步挑战赛报名通道开启",
    excerpt:
      "设置全程50公里、半程25公里、体验组10公里三个组别，完赛选手将获得限量徽章与证书。",
    date: "2026-04-08",
    color: "text-earth",
    bg: "bg-earth/5",
  },
  {
    id: "news-004",
    category: "路线更新",
    icon: ArrowRight,
    title: "西藏墨脱线时隔3年重新开放，非向导禁止进入",
    excerpt:
      "官方公告，墨脱公路已恢复通行，前往徒步需在当地聘请持证向导，不接受个人预约。",
    date: "2026-04-05",
    color: "text-sky",
    bg: "bg-sky/5",
  },
];

export default function NewsSection() {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: News List */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-sm font-semibold text-earth tracking-wider uppercase mb-3 block">
                  资讯
                </span>
                <h2 className="text-3xl font-bold text-forest-deep tracking-tight">
                  最新动态
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group block p-4 md:p-5 rounded-2xl bg-white border border-surface hover:border-forest-deep/10 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <item.icon size={20} weight="duotone" className={item.color} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.bg} ${item.color}`}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs text-muted">{item.date}</span>
                      </div>
                      <h3 className="font-semibold text-base text-forest-deep group-hover:text-forest transition-colors line-clamp-2 leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Featured Image + CTA */}
          <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"
              alt="户外徒步"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="text-xs font-semibold text-earth tracking-wider uppercase mb-3 block">
                社群故事
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                每一个脚印<br />都是与山野的对话
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-sm leading-relaxed">
                加入踏遍山河社区，分享你的徒步故事，结识志同道合的山友，发现更多小众路线。
              </p>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-deep font-semibold rounded-full hover:bg-earth hover:text-white transition-all duration-300"
              >
                进入社群
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
