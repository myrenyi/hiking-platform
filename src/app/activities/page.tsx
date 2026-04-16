"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { activities } from "@/lib/mockData";
import ActivityCard from "@/components/ActivityCard";
import SkeletonCard from "@/components/SkeletonCard";
import {
  Funnel,
  SortAscending,
  Mountains,
  CaretDown,
  X,
  UsersThree,
  Phone,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

const CATEGORIES = [
  "全部",
  "新手体验营",
  "进阶徒步",
  "团建定制",
  "户外赛事",
  "露营活动",
] as const;

const DIFFICULTY_OPTIONS = ["不限", "入门", "进阶", "团建"] as const;

const LOCATION_OPTIONS = [
  "不限",
  "四川·阿坝",
  "青海·海北",
  "浙江·湖州",
  "浙江·杭州",
] as const;

const SORT_OPTIONS = [
  { value: "popular", label: "热门" },
  { value: "participants", label: "报名人数" },
  { value: "latest", label: "最新" },
] as const;

const PRICE_OPTIONS = ["不限", "免费", "付费"] as const;

export default function ActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("不限");
  const [activeLocation, setActiveLocation] = useState<string>("不限");
  const [activePrice, setActivePrice] = useState<string>("不限");
  const [activeSort, setActiveSort] = useState<string>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = useMemo(() => {
    let result = [...activities];

    if (activeCategory !== "全部") {
      const categoryMap: Record<string, string[]> = {
        新手体验营: ["入门"],
        进阶徒步: ["进阶"],
        团建定制: ["团建"],
        户外赛事: [],
        露营活动: ["露营"],
      };
      const cats = categoryMap[activeCategory] || [];
      if (cats.length > 0) {
        result = result.filter((a) => cats.includes(a.difficulty));
      }
    }

    if (activeDifficulty !== "不限") {
      result = result.filter((a) => a.difficulty === activeDifficulty);
    }

    if (activeLocation !== "不限") {
      result = result.filter((a) => a.location === activeLocation);
    }

    if (activePrice === "免费") {
      result = result.filter((a) => a.price === 0);
    } else if (activePrice === "付费") {
      result = result.filter((a) => a.price > 0);
    }

    if (activeSort === "participants") {
      result.sort((a, b) => b.participants - a.participants);
    } else if (activeSort === "latest") {
      result.sort((a, b) => {
        if (!a.date || a.date === "随时出发") return 1;
        if (!b.date || b.date === "随时出发") return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    return result;
  }, [
    activeCategory,
    activeDifficulty,
    activeLocation,
    activePrice,
    activeSort,
  ]);

  const activeFilterCount = [
    activeDifficulty !== "不限",
    activeLocation !== "不限",
    activePrice !== "不限",
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const clearAllFilters = () => {
    setActiveDifficulty("不限");
    setActiveLocation("不限");
    setActivePrice("不限");
  };

  return (
    <div className="min-h-[100dvh] bg-bg font-sans">
      {/* Page Header */}
      <div className="bg-forest-deep text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">活动报名</h1>
            <p className="text-white/60 text-base">
              专业领队带队，发现山河之美
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-forest-deep text-white font-semibold"
                  : "bg-surface text-muted hover:bg-forest-deep/10 hover:text-forest-deep"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Group Booking CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 p-5 bg-gradient-to-r from-forest-deep to-forest rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <UsersThree size={20} weight="duotone" />
                  <span className="text-sm font-medium opacity-90">企业团体</span>
                </div>
                <h2 className="text-xl font-bold mb-1">定制专属团队活动</h2>
                <p className="text-sm opacity-80 leading-relaxed max-w-md">
                  莫干山定向穿越、千岛湖拓展训练...专业策划团队，定制化路线与项目，助力团队凝聚力提升
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <Phone size={14} weight="duotone" />
                  <span>400-888-6666</span>
                </div>
                <button className="px-4 py-2 bg-white text-forest-deep text-sm font-semibold rounded-lg hover:bg-earth-light transition-colors">
                  立即咨询
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute right-12 -top-4 w-16 h-16 bg-white/5 rounded-full" />
        </motion.section>

        {/* Filter + Sort Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-forest-deep hover:bg-surface rounded-lg transition-colors"
            >
              <Funnel size={16} weight="duotone" />
              <span>筛选</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick filters */}
            <div className="hidden sm:flex items-center gap-2">
              <select
                value={activeDifficulty}
                onChange={(e) => setActiveDifficulty(e.target.value)}
                className="appearance-none px-2.5 py-1.5 text-xs bg-surface rounded-lg text-forest-deep focus:outline-none cursor-pointer"
              >
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "不限" ? "全部难度" : opt}
                  </option>
                ))}
              </select>
              <select
                value={activeLocation}
                onChange={(e) => setActiveLocation(e.target.value)}
                className="appearance-none px-2.5 py-1.5 text-xs bg-surface rounded-lg text-forest-deep focus:outline-none cursor-pointer"
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "不限" ? "全部地区" : opt}
                  </option>
                ))}
              </select>
              <select
                value={activePrice}
                onChange={(e) => setActivePrice(e.target.value)}
                className="appearance-none px-2.5 py-1.5 text-xs bg-surface rounded-lg text-forest-deep focus:outline-none cursor-pointer"
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "不限" ? "全部价格" : opt}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs text-forest hover:text-forest-deep transition-colors"
              >
                <X size={12} weight="bold" />
                清除
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SortAscending size={14} className="text-muted" />
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveSort(opt.value)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                    activeSort === opt.value
                      ? "bg-forest-deep/10 text-forest-deep font-semibold"
                      : "text-muted hover:text-forest-deep hover:bg-surface"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-4">
          共找到{" "}
          <span className="font-semibold text-forest-deep">
            {filteredActivities.length}
          </span>{" "}
          个活动
        </p>

        {/* Activity Grid */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} variant="activity" />
            ))}
          </div>
        ) : filteredActivities.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3"
          >
            {filteredActivities.map((activity) => (
              <motion.div key={activity.id} variants={staggerItem}>
                <ActivityCard {...activity} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <Mountains
              size={48}
              weight="duotone"
              className="text-surface mb-3"
            />
            <h3 className="text-base font-semibold text-forest-deep mb-1">
              暂无符合条件的活动
            </h3>
            <p className="text-sm text-muted">
              试试调整筛选条件，或看看其他分类
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 text-sm text-forest border border-forest/20 rounded-lg hover:bg-forest/5 transition-colors"
              >
                清除筛选
              </button>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
