"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChatCircle,
  MapTrifold,
  CalendarBlank,
  Users,
  Plus,
  MagnifyingGlass,
  TrendUp,
  Compass,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

const forumPosts = [
  {
    id: 1,
    user: "山野追风",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    title: "分享：秦岭太白山三月份穿越实录（附详细路书）",
    excerpt:
      "刚从太白山回来，这次走的是铁甲树到汤峪的传统穿越路线...",
    tags: ["秦岭", "穿越", "攻略"],
    likes: 128,
    comments: 45,
    date: "2026-04-14",
  },
  {
    id: 2,
    user: "徒步爱好者小李",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    title: "新手请教：两日轻徒需要准备哪些装备？",
    excerpt: "准备下周末去莫干山走走，两天一夜的路线，新手第一次露营...",
    tags: ["新手", "装备", "问答"],
    likes: 34,
    comments: 67,
    date: "2026-04-13",
  },
  {
    id: 3,
    user: "云端漫步",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    title: "雨崩村实地考察：神瀑、冰湖、神湖三条线怎么选",
    excerpt: "在雨崩待了一周，把三条主线都走了一遍，给大家做个对比...",
    tags: ["云南", "雨崩", "对比"],
    likes: 256,
    comments: 89,
    date: "2026-04-12",
  },
  {
    id: 4,
    user: "行者无疆",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    title: "探讨：户外领队应该具备哪些素质？",
    excerpt: "最近参加了几次商业队，发现领队的水平参差不齐...",
    tags: ["领队", "安全", "讨论"],
    likes: 89,
    comments: 123,
    date: "2026-04-11",
  },
];

const companionPosts = [
  {
    id: 1,
    user: "户外新人小王",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    route: "婺源石城 - 篁岭古道",
    location: "江西·婺源",
    date: "2026-04-20",
    days: 3,
    peopleNeeded: 2,
    difficulty: "入门",
    contact: "wx: outdoor_wang",
    note: "寻找有徒步经验的伙伴，新手友好路线",
  },
  {
    id: 2,
    user: "摄影背包客",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
    route: "大理苍山 - 洗马潭",
    location: "云南·大理",
    date: "2026-04-25",
    days: 2,
    peopleNeeded: 1,
    difficulty: "进阶",
    contact: "tel: 138****8888",
    note: "重装轻徒摄影，招募会拍照的伙伴",
  },
  {
    id: 3,
    user: "老驴阿杰",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    route: "黄山光明顶 - 北海景区",
    location: "安徽·黄山",
    date: "2026-05-01",
    days: 2,
    peopleNeeded: 3,
    difficulty: "入门",
    contact: "wx: laolv_jie",
    note: "避开旺季人流，探索小众路线",
  },
  {
    id: 4,
    user: "高原探险者",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    route: "四姑娘山双桥沟",
    location: "四川·阿坝",
    date: "2026-05-10",
    days: 3,
    peopleNeeded: 2,
    difficulty: "进阶",
    contact: "tel: 139****6677",
    note: "高原徒步，需要有一定高海拔经验",
  },
];

const difficultyColors: Record<string, string> = {
  入门: "bg-forest/10 text-forest",
  进阶: "bg-sky/10 text-sky",
  专业: "bg-earth/10 text-earth",
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"forum" | "companion">("forum");

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-forest-deep text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">社区</h1>
            <p className="text-white/60 text-base">
              分享徒步故事，发现志同道合的山友
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <MagnifyingGlass
            size={20}
            weight="light"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="搜索帖子、路线、用户..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-surface rounded-xl text-sm font-sans placeholder:text-muted focus:outline-none focus:border-earth transition-colors shadow-md"
          />
        </motion.div>
      </div>

      {/* Tab Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex border-b border-surface-200">
          {[
            { key: "forum", label: "徒步论坛", icon: ChatCircle },
            { key: "companion", label: "结伴同行", icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "forum" | "companion")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === key
                  ? "border-earth text-earth"
                  : "border-transparent text-muted hover:text-forest-deep"
              }`}
            >
              <Icon
                size={18}
                weight={activeTab === key ? "fill" : "light"}
                strokeWidth={1.5}
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "forum" ? (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Forum Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendUp, label: "今日新帖", value: "128", color: "text-earth" },
                  { icon: ChatCircle, label: "活跃用户", value: "3,456", color: "text-sky" },
                  { icon: MapTrifold, label: "精选路线", value: "89", color: "text-forest" },
                  { icon: Compass, label: "本周话题", value: "256", color: "text-earth" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-surface rounded-xl p-4 border border-surface-200"
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon
                        size={20}
                        weight="light"
                        strokeWidth={1.5}
                        className={stat.color}
                      />
                      <div>
                        <p className="text-xs text-muted">{stat.label}</p>
                        <p className="text-lg font-bold text-forest-deep">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Post Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-4"
              >
                {forumPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={staggerItem}
                    className="bg-surface rounded-xl p-6 border border-surface-200 hover:border-earth transition-all cursor-pointer"
                  >
                    <div className="flex gap-6">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base font-bold text-forest-deep hover:text-earth transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted mt-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                          <span className="text-xs text-muted whitespace-nowrap flex-shrink-0">
                            {post.date}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 bg-forest/10 text-forest text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-muted">
                              <Heart size={16} weight="light" strokeWidth={1.5} />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted">
                              <ChatCircle size={16} weight="light" strokeWidth={1.5} />
                              <span className="text-sm">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="companion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {companionPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface rounded-xl p-6 border border-surface-200 hover:border-earth transition-all"
                >
                  <div className="flex gap-4 mb-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-base font-bold text-forest-deep">
                        {post.user}
                      </h3>
                      <p className="text-sm text-muted">{post.note}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapTrifold size={14} weight="light" strokeWidth={1.5} />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <CalendarBlank size={14} weight="light" strokeWidth={1.5} />
                        {post.date} / {post.days}天
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          difficultyColors[post.difficulty] || "bg-muted/10 text-muted"
                        }`}
                      >
                        {post.difficulty}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users size={14} weight="light" strokeWidth={1.5} />
                        还需{post.peopleNeeded}人
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-200">
                    <div className="flex items-center gap-2 mb-3">
                      <MapTrifold
                        size={16}
                        weight="light"
                        strokeWidth={1.5}
                        className="text-earth"
                      />
                      <span className="text-sm font-medium text-forest-deep">
                        {post.route}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-xs text-muted bg-bg px-3 py-2 rounded-lg truncate">
                        {post.contact}
                      </div>
                      <button className="px-6 py-2 bg-earth text-white text-sm font-medium rounded-lg hover:bg-earth-light transition-colors flex-shrink-0">
                        联系
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-earth text-white rounded-full shadow-lg hover:bg-earth-light transition-all flex items-center justify-center"
      >
        <Plus size={24} weight="bold" strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
