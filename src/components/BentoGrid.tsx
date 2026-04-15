"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import RouteCard from "./RouteCard";

const mockRoutes = [
  {
    id: "wuyuan-hike",
    name: "婺源古道穿越",
    difficulty: 2 as const,
    days: 3,
    location: "江西·婺源",
    highlight: "千年古驿道，油菜花海与徽派古村，避开人潮的小众路线",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    price: 680,
  },
  {
    id: "yunnanshan",
    name: "云南虎跳峡徒步",
    difficulty: 3 as const,
    days: 4,
    location: "云南·丽江",
    highlight: "世界最深峡谷之一，金沙江咆哮而过，雪山巍峨",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
    price: 1280,
  },
  {
    id: "shilin-hike",
    name: "大理苍山洗马潭",
    difficulty: 4 as const,
    days: 2,
    location: "云南·大理",
    highlight: "高原湖泊洗马潭，360度雪山观景，云海日出",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    price: 420,
  },
  {
    id: "huangshan",
    name: "黄山光明顶穿越",
    difficulty: 3 as const,
    days: 2,
    location: "安徽·黄山",
    highlight: "奇松怪石云海温泉，经典路线新玩法，日出日落",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    price: 380,
  },
  {
    id: "qinling",
    name: "秦岭太白山穿越",
    difficulty: 5 as const,
    days: 5,
    location: "陕西·西安",
    highlight: "中国大陆南北分界，大白山拔仙台，中国东部最高峰",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    price: 1580,
  },
];

export default function BentoGrid() {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-earth tracking-wider uppercase mb-3 block">
              热门推荐
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-deep tracking-tight">
              人气路线
            </h2>
          </div>
          <Link
            href="/routes"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-deep transition-colors group"
          >
            查看全部路线
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bento Grid - asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Large card - spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <RouteCard key={mockRoutes[0].id} {...mockRoutes[0]} />
          </div>

          {/* Right column stack */}
          <div className="space-y-4 md:gap-6">
            {[mockRoutes[1], mockRoutes[2]].map((route) => (
              <RouteCard key={route.id} {...route} />
            ))}
          </div>

          {/* Bottom row */}
          {mockRoutes.slice(3).map((route) => (
            <RouteCard key={route.id} {...route} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-deep text-white font-medium rounded-full"
          >
            查看全部路线
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
