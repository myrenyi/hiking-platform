"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonCard from "@/components/SkeletonCard";
import { routes } from "@/lib/mockData";
import RouteCard from "@/components/RouteCard";
import {
  Funnel,
  Star,
  MapPin,
  Calendar,
  Clock,
  Coins,
  SortAscending,
  CaretDown,
  X,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

type SortOption = "popular" | "rating" | "latest";

const DIFFICULTY_LABELS = ["入门", "简单", "进阶", "困难", "探险"];
const DAYS_OPTIONS = [
  { label: "1天", min: 1, max: 1 },
  { label: "2-3天", min: 2, max: 3 },
  { label: "4-7天", min: 4, max: 7 },
  { label: "7天以上", min: 8, max: Infinity },
];

const UNIQUE_LOCATIONS = Array.from(
  new Set(routes.map((r) => r.location.split("·")[0]))
).sort();

const SORT_LABELS: Record<SortOption, string> = {
  popular: "热门",
  rating: "评分",
  latest: "最新",
};

export default function RoutesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredRoutes = useMemo(() => {
    let result = [...routes];

    if (selectedDifficulty !== null) {
      result = result.filter((r) => r.difficulty === selectedDifficulty);
    }

    if (selectedDays !== null) {
      const daysOption = DAYS_OPTIONS.find((d) => d.label === selectedDays);
      if (daysOption) {
        result = result.filter(
          (r) => r.days >= daysOption.min && r.days <= daysOption.max
        );
      }
    }

    if (selectedLocation !== null) {
      result = result.filter((r) =>
        r.location.startsWith(selectedLocation + "·")
      );
    }

    if (priceFilter === "free") {
      result = result.filter((r) => r.price === 0);
    } else if (priceFilter === "paid") {
      result = result.filter((r) => r.price > 0);
    }

    if (sortBy === "popular") {
      result.sort((a, b) => {
        const aScore = a.reviews.length * 2 + a.rating;
        const bScore = b.reviews.length * 2 + b.rating;
        return bScore - aScore;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "latest") {
      result.reverse();
    }

    return result;
  }, [selectedDifficulty, selectedDays, selectedLocation, priceFilter, sortBy]);

  const hasActiveFilters =
    selectedDifficulty !== null ||
    selectedDays !== null ||
    selectedLocation !== null ||
    priceFilter !== "all";

  function clearFilters() {
    setSelectedDifficulty(null);
    setSelectedDays(null);
    setSelectedLocation(null);
    setPriceFilter("all");
  }

  return (
    <div className="bg-bg min-h-[100dvh]">
      {/* Page Header */}
      <div className="bg-forest-deep text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">徒步路线</h1>
              <p className="text-white/60 text-base">
                发现适合自己的户外徒步路线
              </p>
            </div>
            <p className="text-white/50 text-sm font-mono tabular-nums">
              {filteredRoutes.length} 条路线
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter + Sort Bar */}
      <div className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 h-14">
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forest-deep/20 text-forest-deep text-sm font-medium transition-all"
            >
              <Funnel size={16} />
              筛选
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-earth" />
              )}
            </button>

            {/* Desktop Filter Pills */}
            <div className="hidden lg:flex items-center gap-2 flex-1">
              {/* Difficulty */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted">难度</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === level ? null : level
                        )
                      }
                      className="p-1 rounded transition-all"
                      title={DIFFICULTY_LABELS[level - 1]}
                    >
                      <Star
                        size={14}
                        className={
                          selectedDifficulty === level
                            ? "text-earth"
                            : "text-gray-300"
                        }
                        style={
                          selectedDifficulty === level
                            ? { fill: "#c4a35a" }
                            : undefined
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px h-4 bg-surface" />

              {/* Days */}
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-muted" />
                <div className="flex items-center gap-0.5">
                  {DAYS_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() =>
                        setSelectedDays(
                          selectedDays === opt.label ? null : opt.label
                        )
                      }
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedDays === opt.label
                          ? "bg-forest-deep text-white"
                          : "bg-surface text-muted hover:bg-forest-deep/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px h-4 bg-surface" />

              {/* Location */}
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-muted" />
                  <select
                    value={selectedLocation || ""}
                    onChange={(e) =>
                      setSelectedLocation(e.target.value || null)
                    }
                    className="appearance-none bg-transparent text-sm text-muted cursor-pointer pr-5 focus:outline-none"
                  >
                    <option value="">全部地区</option>
                    {UNIQUE_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={12}
                    className="text-muted -ml-4 pointer-events-none"
                  />
                </div>
              </div>

              <div className="w-px h-4 bg-surface" />

              {/* Price Toggle */}
              <div className="flex items-center gap-1.5">
                <Coins size={14} className="text-muted" />
                <div className="flex items-center rounded-full bg-surface p-0.5">
                  {(["all", "free", "paid"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriceFilter(p)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        priceFilter === p
                          ? "bg-forest-deep text-white"
                          : "text-muted"
                      }`}
                    >
                      {p === "all" ? "全部" : p === "free" ? "免费" : "付费"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-muted hover:text-forest-deep transition-colors ml-auto"
                >
                  <X size={12} />
                  清除筛选
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <SortAscending size={16} className="text-muted" />
              <div className="flex items-center rounded-full bg-surface p-0.5">
                {(["popular", "rating", "latest"] as SortOption[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      sortBy === s
                        ? "bg-forest-deep text-white"
                        : "text-muted hover:text-forest-deep"
                    }`}
                  >
                    {SORT_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden overflow-hidden border-t border-surface px-6 py-4 space-y-4 bg-bg"
              >
                {/* Difficulty */}
                <div>
                  <p className="text-xs text-muted mb-2 font-medium">难度</p>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setSelectedDifficulty(
                            selectedDifficulty === level ? null : level
                          )
                        }
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedDifficulty === level
                            ? "border-earth bg-earth/10 text-earth"
                            : "border-surface text-muted"
                        }`}
                      >
                        <Star
                          size={11}
                          style={
                            selectedDifficulty === level
                              ? { fill: "#c4a35a", color: "#c4a35a" }
                              : undefined
                          }
                        />
                        {DIFFICULTY_LABELS[level - 1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days */}
                <div>
                  <p className="text-xs text-muted mb-2 font-medium">天数</p>
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setSelectedDays(
                            selectedDays === opt.label ? null : opt.label
                          )
                        }
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedDays === opt.label
                            ? "border-forest-deep bg-forest-deep/10 text-forest-deep"
                            : "border-surface text-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs text-muted mb-2 font-medium">地区</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        selectedLocation === null
                          ? "border-forest-deep bg-forest-deep/10 text-forest-deep"
                          : "border-surface text-muted"
                      }`}
                    >
                      全部
                    </button>
                    {UNIQUE_LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() =>
                          setSelectedLocation(
                            selectedLocation === loc ? null : loc
                          )
                        }
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedLocation === loc
                            ? "border-forest-deep bg-forest-deep/10 text-forest-deep"
                            : "border-surface text-muted"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xs text-muted mb-2 font-medium">费用</p>
                  <div className="flex gap-1.5">
                    {(["all", "free", "paid"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriceFilter(p)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          priceFilter === p
                            ? "border-forest-deep bg-forest-deep/10 text-forest-deep"
                            : "border-surface text-muted"
                        }`}
                      >
                        {p === "all" ? "全部" : p === "free" ? "免费" : "付费"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-muted hover:text-forest-deep transition-colors flex items-center gap-1"
                    >
                      <X size={12} />
                      清除筛选
                    </button>
                  )}
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="ml-auto px-4 py-1.5 bg-forest-deep text-white text-xs font-medium rounded-full"
                  >
                    确定
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} variant="route" />
            ))}
          </motion.div>
        ) : filteredRoutes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
              <Calendar size={24} className="text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-forest-deep mb-1">
              没有找到符合条件的路线
            </h3>
            <p className="text-sm text-muted mb-4">
              试试调整筛选条件，或清除所有筛选
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-5 py-2 bg-earth text-white text-sm font-medium rounded-full hover:bg-earth/90 transition-colors"
              >
                清除所有筛选
              </button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Active filter summary */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6 flex-wrap"
              >
                <span className="text-xs text-muted">当前筛选：</span>
                {selectedDifficulty !== null && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface rounded-full text-xs text-forest-deep">
                    <Star size={10} style={{ fill: "#2d5a3d" }} />
                    {DIFFICULTY_LABELS[selectedDifficulty - 1]}
                    <button onClick={() => setSelectedDifficulty(null)}>
                      <X size={10} />
                    </button>
                  </span>
                )}
                {selectedDays !== null && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface rounded-full text-xs text-forest-deep">
                    <Clock size={10} />
                    {selectedDays}
                    <button onClick={() => setSelectedDays(null)}>
                      <X size={10} />
                    </button>
                  </span>
                )}
                {selectedLocation !== null && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface rounded-full text-xs text-forest-deep">
                    <MapPin size={10} />
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation(null)}>
                      <X size={10} />
                    </button>
                  </span>
                )}
                {priceFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface rounded-full text-xs text-forest-deep">
                    <Coins size={10} />
                    {priceFilter === "free" ? "免费" : "付费"}
                    <button onClick={() => setPriceFilter("all")}>
                      <X size={10} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted hover:text-forest-deep transition-colors underline"
                >
                  清除全部
                </button>
              </motion.div>
            )}

            {/* Routes Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRoutes.map((route, i) => (
                <motion.div
                  key={route.id}
                  variants={staggerItem}
                  className={
                    i % 3 === 2 && filteredRoutes.length > 2
                      ? "sm:col-span-2 lg:col-span-2"
                      : ""
                  }
                >
                  <RouteCard
                    id={route.id}
                    name={route.name}
                    difficulty={route.difficulty}
                    days={route.days}
                    location={route.location}
                    highlight={route.highlight}
                    rating={route.rating}
                    image={route.image}
                    price={route.price}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
