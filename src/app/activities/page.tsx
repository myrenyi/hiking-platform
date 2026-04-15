'use client';

import { useState, useMemo } from 'react';
import { activities } from '@/lib/mockData';
import ActivityCard from '@/components/ActivityCard';
import {
  Funnel,
  SortAscending,
  MapPin,
  Mountains,
  CaretDown,
  X,
  UsersThree,
  Phone,
} from '@phosphor-icons/react';

const CATEGORIES = [
  '全部',
  '新手体验营',
  '进阶徒步',
  '团建定制',
  '户外赛事',
  '露营活动',
] as const;

const DIFFICULTY_OPTIONS = ['不限', '入门', '进阶', '团建'] as const;

const LOCATION_OPTIONS = ['不限', '四川·阿坝', '青海·海北', '浙江·湖州', '浙江·杭州'] as const;

const SORT_OPTIONS = [
  { value: 'popular', label: '热门' },
  { value: 'participants', label: '报名人数' },
  { value: 'latest', label: '最新' },
] as const;

const PRICE_OPTIONS = ['不限', '免费', '付费'] as const;

export default function ActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('不限');
  const [activeLocation, setActiveLocation] = useState<string>('不限');
  const [activePrice, setActivePrice] = useState<string>('不限');
  const [activeSort, setActiveSort] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredActivities = useMemo(() => {
    let result = [...activities];

    // Category filter
    if (activeCategory !== '全部') {
      const categoryMap: Record<string, string[]> = {
        '新手体验营': ['入门'],
        '进阶徒步': ['进阶'],
        '团建定制': ['团建'],
        '户外赛事': [],
        '露营活动': ['露营'],
      };
      const cats = categoryMap[activeCategory] || [];
      if (cats.length > 0) {
        result = result.filter((a) => cats.includes(a.difficulty));
      }
    }

    // Difficulty filter
    if (activeDifficulty !== '不限') {
      result = result.filter((a) => a.difficulty === activeDifficulty);
    }

    // Location filter
    if (activeLocation !== '不限') {
      result = result.filter((a) => a.location === activeLocation);
    }

    // Price filter
    if (activePrice === '免费') {
      result = result.filter((a) => a.price === 0);
    } else if (activePrice === '付费') {
      result = result.filter((a) => a.price > 0);
    }

    // Sort
    if (activeSort === 'popular') {
      // Keep original order (featured)
    } else if (activeSort === 'participants') {
      result.sort((a, b) => b.participants - a.participants);
    } else if (activeSort === 'latest') {
      result.sort((a, b) => {
        if (!a.date || a.date === '随时出发') return 1;
        if (!b.date || b.date === '随时出发') return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    return result;
  }, [activeCategory, activeDifficulty, activeLocation, activePrice, activeSort]);

  const activeFilterCount = [
    activeDifficulty !== '不限',
    activeLocation !== '不限',
    activePrice !== '不限',
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const clearAllFilters = () => {
    setActiveDifficulty('不限');
    setActiveLocation('不限');
    setActivePrice('不限');
  };

  return (
    <div className="min-h-[100dvh] bg-bg font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg/95 backdrop-blur-sm border-b border-surface">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mountains size={22} weight="duotone" className="text-forest-deep" />
              <h1 className="text-lg font-bold text-forest-deep tracking-tight">
                活动列表
              </h1>
            </div>
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
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-forest-deep text-white font-semibold'
                    : 'bg-surface text-muted hover:bg-forest-deep/10 hover:text-forest-deep'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Group Booking CTA */}
        <section className="mb-6 p-5 bg-gradient-to-r from-forest-deep to-forest rounded-2xl text-white relative overflow-hidden">
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
          {/* Decorative circle */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute right-12 -top-4 w-16 h-16 bg-white/5 rounded-full" />
        </section>

        {/* Filter Panel */}
        {showFilters && (
          <section className="mb-6 p-4 bg-white rounded-2xl border border-surface">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wide">
                  难度等级
                </label>
                <div className="relative">
                  <select
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 text-sm bg-surface rounded-lg text-forest-deep focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer"
                  >
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wide">
                  目的地
                </label>
                <div className="relative">
                  <select
                    value={activeLocation}
                    onChange={(e) => setActiveLocation(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 text-sm bg-surface rounded-lg text-forest-deep focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer"
                  >
                    {LOCATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wide">
                  价格
                </label>
                <div className="relative">
                  <select
                    value={activePrice}
                    onChange={(e) => setActivePrice(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 text-sm bg-surface rounded-lg text-forest-deep focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer"
                  >
                    {PRICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface">
                <span className="text-xs text-muted">
                  当前筛选条件已激活
                </span>
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-forest hover:text-forest-deep transition-colors"
                >
                  <X size={12} weight="bold" />
                  清除筛选
                </button>
              </div>
            )}
          </section>
        )}

        {/* Sort + Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted">
            共找到{' '}
            <span className="font-semibold text-forest-deep">
              {filteredActivities.length}
            </span>{' '}
            个活动
          </p>
          <div className="flex items-center gap-2">
            <SortAscending size={14} className="text-muted" />
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveSort(opt.value)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                    activeSort === opt.value
                      ? 'bg-forest-deep/10 text-forest-deep font-semibold'
                      : 'text-muted hover:text-forest-deep hover:bg-surface'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mountains size={48} weight="duotone" className="text-surface mb-3" />
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
          </div>
        )}
      </main>
    </div>
  );
}
