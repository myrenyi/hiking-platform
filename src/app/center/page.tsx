"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Gear,
  SignOut,
  Star,
  Medal,
  Mountains,
  MapTrifold,
  Heart,
  BookmarkSimple,
  Article,
  CaretRight,
  Confetti,
  Trophy,
  Compass,
  Users,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

const BADGES = [
  { id: "b1", name: "初识山野", desc: "完成首次徒步", icon: Mountains, color: "text-sky", bg: "bg-sky/10", date: "2025-03-15" },
  { id: "b2", name: "十峰进阶", desc: "完成10次徒步", icon: Trophy, color: "text-earth", bg: "bg-earth/10", date: "2025-07-22" },
  { id: "b3", name: "露营达人", desc: "完成5次露营", icon: Medal, color: "text-forest", bg: "bg-forest/10", date: "2025-09-01" },
  { id: "b4", name: "环保先锋", desc: "参与无痕山野活动", icon: Compass, color: "text-forest", bg: "bg-forest/10", date: "2025-10-18" },
  { id: "b5", name: "百公里挑战", desc: "累计徒步100km", icon: Star, color: "text-earth", bg: "bg-earth/10", date: "2025-12-05" },
  { id: "b6", name: "社区达人", desc: "发布10篇精华帖", icon: Confetti, color: "text-sky", bg: "bg-sky/10", date: "2026-01-20" },
];

const MY_REGISTRATIONS = [
  { id: "r1", title: "周末轻徒 | 四姑娘山双桥沟入门行", date: "2026-04-20", status: "报名成功", statusColor: "text-forest", bg: "bg-forest/10" },
  { id: "r2", title: "端午特辑 | 青海湖环湖徒步+露营", date: "2026-05-01", status: "已满员", statusColor: "text-red-500", bg: "bg-red-50" },
  { id: "r3", title: "新手体验营 | 杭州十里琅珰亲子徒步", date: "2026-03-15", status: "已完成", statusColor: "text-muted", bg: "bg-surface" },
  { id: "r4", title: "大理苍山洗马潭", date: "2026-02-10", status: "已完成", statusColor: "text-muted", bg: "bg-surface" },
];

const MY_FAVORITES = [
  { id: "f1", title: "秦岭太白山穿越", location: "陕西·西安", difficulty: "探险", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80" },
  { id: "f2", title: "云南虎跳峡徒步", location: "云南·丽江", difficulty: "进阶", image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=200&q=80" },
  { id: "f3", title: "黄山光明顶穿越", location: "安徽·黄山", difficulty: "进阶", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=200&q=80" },
];

const MY_POSTS = [
  { id: "p1", title: "分享：秦岭太白山三月份穿越实录（附详细路书）", date: "2026-04-14", likes: 128, comments: 45, tags: ["秦岭", "穿越", "攻略"] },
  { id: "p2", title: "雨崩村实地考察：神瀑、冰湖、神湖三条线怎么选", date: "2026-04-08", likes: 256, comments: 89, tags: ["云南", "雨崩"] },
  { id: "p3", title: "新手请教：两日轻徒需要准备哪些装备？", date: "2026-04-01", likes: 34, comments: 67, tags: ["新手", "装备"] },
];

const STATS = [
  { label: "累计徒步", value: "1,286", unit: "公里", icon: MapTrifold, color: "text-sky" },
  { label: "完成活动", value: "28", unit: "次", icon: Trophy, color: "text-earth" },
  { label: "获得徽章", value: "6", unit: "枚", icon: Medal, color: "text-forest" },
  { label: "社区积分", value: "3,450", unit: "分", icon: Star, color: "text-earth" },
];

type TabKey = "registrations" | "favorites" | "posts";

const LEVEL_CONFIG: Record<string, { label: string; level: number; color: string; bg: string }> = {
  初级: { label: "初级行者", level: 1, color: "text-sky", bg: "bg-sky/10" },
  中级: { label: "中级山友", level: 2, color: "text-forest", bg: "bg-forest/10" },
  高级: { label: "高级领队", level: 3, color: "text-earth", bg: "bg-earth/10" },
};

const currentUser = {
  name: "山野追风",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  level: "中级",
  joinedDate: "2025-01-15",
  bio: "热爱山野，用脚步丈量世界 🚶‍♂️",
};

export default function CenterPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("registrations");
  const [unreadCount] = useState(5);

  const tabs: { key: TabKey; label: string; icon: typeof Heart }[] = [
    { key: "registrations", label: "我的报名", icon: MapTrifold },
    { key: "favorites", label: "我的收藏", icon: BookmarkSimple },
    { key: "posts", label: "我的帖子", icon: Article },
  ];

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header Banner */}
      <div className="bg-forest-deep text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute right-20 -top-4 w-20 h-20 bg-white/5 rounded-full" />
        <div className="absolute -left-4 bottom-0 w-24 h-24 bg-white/5 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 pt-12 pb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    width={72}
                    height={72}
                    className="rounded-full object-cover ring-2 ring-white/30"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-earth rounded-full flex items-center justify-center">
                    <Star size={10} weight="fill" className="text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight">{currentUser.name}</h1>
                  <p className="text-white/60 text-sm mt-0.5">{currentUser.bio}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${LEVEL_CONFIG[currentUser.level]?.bg} ${LEVEL_CONFIG[currentUser.level]?.color}`}>
                      <Star size={10} weight="fill" />
                      {LEVEL_CONFIG[currentUser.level]?.label}
                    </span>
                    <span className="text-white/40 text-xs">加入于 {currentUser.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Bell size={20} weight="duotone" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3 mt-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${stat.color.replace("text-", "bg-")}/10 mb-1.5`}>
                    <stat.icon size={18} weight="duotone" className={stat.color} />
                  </div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-2xl border border-surface shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base text-forest-deep flex items-center gap-2">
              <Medal size={18} weight="duotone" className="text-earth" />
              我的徽章
            </h2>
            <span className="text-xs text-muted">已获得 {BADGES.length} / 12 枚</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-surface/50 hover:bg-surface transition-colors cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${badge.bg} flex items-center justify-center mb-2`}>
                  <badge.icon size={20} weight="duotone" className={badge.color} />
                </div>
                <p className="text-xs font-semibold text-forest-deep leading-tight">{badge.name}</p>
                <p className="text-[10px] text-muted mt-0.5">{badge.desc}</p>
                <p className="text-[9px] text-muted/60 mt-1">{badge.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex border-b border-surface">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === key
                  ? "border-forest text-forest"
                  : "border-transparent text-muted hover:text-forest-deep"
              }`}
            >
              <Icon size={17} weight={activeTab === key ? "fill" : "light"} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          <AnimatePresence mode="wait">
            {activeTab === "registrations" && (
              <motion.div
                key="registrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="space-y-3">
                  {MY_REGISTRATIONS.map((reg) => (
                    <div
                      key={reg.id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface hover:border-forest-deep/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-10 rounded-full ${reg.bg.replace("/50", "")}`} />
                        <div>
                          <p className="font-medium text-sm text-forest-deep">{reg.title}</p>
                          <p className="text-xs text-muted mt-0.5">出发日期：{reg.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${reg.bg}`}>
                          {reg.status}
                        </span>
                        <CaretRight size={14} className="text-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {MY_FAVORITES.map((fav) => (
                    <Link
                      key={fav.id}
                      href={`/routes/${fav.id}`}
                      className="group bg-white rounded-xl border border-surface overflow-hidden hover:border-forest-deep/10 hover:shadow-md transition-all"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image src={fav.image} alt={fav.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-forest-deep rounded-full">
                          {fav.difficulty}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-forest-deep group-hover:text-forest transition-colors">{fav.title}</p>
                        <p className="text-xs text-muted mt-1 flex items-center gap-1">
                          <MapTrifold size={12} weight="light" />
                          {fav.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "posts" && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="space-y-3">
                  {MY_POSTS.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 bg-white rounded-xl border border-surface hover:border-forest-deep/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-forest-deep line-clamp-2 leading-snug">{post.title}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-muted text-xs">
                              <Heart size={12} weight="light" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted text-xs">
                              <Article size={12} weight="light" />
                              <span>{post.comments}</span>
                            </div>
                            <span className="text-xs text-muted">{post.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                          {post.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-surface text-muted text-xs rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-2xl border border-surface p-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: Gear, label: "设置", href: "/settings", color: "text-muted" },
              { icon: Users, label: "邀请好友", href: "/invite", color: "text-sky" },
              { icon: BookmarkSimple, label: "关于我们", href: "/about", color: "text-forest" },
              { icon: SignOut, label: "退出登录", href: "/", color: "text-red-400" },
            ].map(({ icon: Icon, label, href, color }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 py-3 rounded-xl hover:bg-surface transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl bg-surface flex items-center justify-center`}>
                  <Icon size={20} weight="duotone" className={color} />
                </div>
                <span className="text-xs text-muted">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
