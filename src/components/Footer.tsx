"use client";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Phone,
  EnvelopeSimple,
  Leaf,
} from "@phosphor-icons/react";

const footerLinks = {
  平台服务: [
    { label: "路线推荐", href: "/routes" },
    { label: "活动报名", href: "/activities" },
    { label: "装备指南", href: "/gear" },
    { label: "安全科普", href: "/safety" },
  ],
  社群: [
    { label: "徒步论坛", href: "/community" },
    { label: "结伴同行", href: "/community?tab=companion" },
    { label: "用户主页", href: "/center" },
  ],
  关于我们: [
    { label: "关于我们", href: "/about" },
    { label: "联系客服", href: "/contact" },
    { label: "商务合作", href: "/cooperation" },
  ],
  政策条款: [
    { label: "隐私政策", href: "/privacy" },
    { label: "服务条款", href: "/terms" },
    { label: "免责声明", href: "/disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Compass size={28} weight="duotone" className="text-earth" />
              <span className="font-bold text-lg tracking-tight">踏遍山河</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              专业户外徒步登山服务平台，汇聚真实山野之美，传递安全、环保的户外理念。
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin size={16} weight="duotone" className="text-earth" />
                <span>江苏省 · 南京市</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} weight="duotone" className="text-earth" />
                <span>400-888-6666</span>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeSimple
                  size={16}
                  weight="duotone"
                  className="text-earth"
                />
                <span>hello@tanbian.cn</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-sm tracking-wide text-white/90">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-earth transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Notice */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <Leaf size={20} weight="duotone" className="text-green-400" />
              <span>文明户外 · 环保徒步 · 守护自然</span>
            </div>
            <p className="text-xs text-white/30">
              © 2024 踏遍山河. 户外有风险，入山需谨慎. 免责声明请查阅{" "}
              <Link href="/disclaimer" className="underline hover:text-white/50">
                相关条款
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
