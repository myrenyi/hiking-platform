"use client";

import Link from "next/link";
import {
  MapTrifold,
  CalendarCheck,
  Backpack,
  ShieldCheck,
} from "@phosphor-icons/react";

const entries = [
  {
    icon: MapTrifold,
    label: "新手路线",
    desc: "适合初学者的安全入门路线",
    href: "/routes?difficulty=beginner",
    color: "bg-forest-deep",
  },
  {
    icon: CalendarCheck,
    label: "热门活动",
    desc: "专业领队带你探索山河",
    href: "/activities",
    color: "bg-earth",
  },
  {
    icon: Backpack,
    label: "装备清单",
    desc: "精选装备推荐，新手必看",
    href: "/gear",
    color: "bg-sky",
  },
  {
    icon: ShieldCheck,
    label: "安全指南",
    desc: "安全知识，平安出行",
    href: "/safety",
    color: "bg-red-700",
  },
];

export default function QuickEntry() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-deep tracking-tight mb-4">
            开始你的山野之旅
          </h2>
          <p className="text-muted max-w-md mx-auto">
            从这里出发，无论你是第一次踏上山野，还是资深驴友，都能找到属于你的路线
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {entries.map((entry, i) => (
            <Link
              key={entry.label}
              href={entry.href}
              className="group relative overflow-hidden rounded-3xl p-6 md:p-8 bg-white border border-forest-deep/5 hover:border-forest-deep/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Background accent */}
              <div
                className={`absolute -top-8 -right-8 w-32 h-32 ${entry.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
              />

              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${entry.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <entry.icon size={28} weight="duotone" />
                </div>
                <h3 className="font-bold text-lg text-forest-deep mb-1.5">
                  {entry.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {entry.desc}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-forest-deep"
                >
                  <path
                    d="M4 10h12M12 6l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
