'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Star,
  Clock,
  MapPin,
  Mountains,
  Sun,
  Heart,
  ArrowRight,
  Calendar,
  Path,
  CheckCircle,
  CaretRight,
} from '@phosphor-icons/react';
import { routes } from '@/lib/mockData';

interface PageProps {
  params: Promise<{ id: string }>;
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          weight={s <= level ? 'fill' : 'regular'}
         
          className={s <= level ? 'text-earth' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

const difficultyLabels: Record<number, string> = {
  1: '入门',
  2: '简单',
  3: '进阶',
  4: '困难',
  5: '探险',
};

const tabs = ['概览', '详细行程', '装备建议', '安全提示', '用户评价'];

export default function RouteDetailPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [resolvedParams] = params ? [params] : [{ id: 'wuyian-hike' }];
  const [id, setId] = useState<string | null>(null);

  // Resolve params
  if (!id && resolvedParams) {
    (async () => {
      const p = await resolvedParams;
      setId(p.id);
    })();
  }

  const routeId = id || 'wuyuan-hike';
  const route = routes.find((r) => r.id === routeId) || routes[0];
  const relatedRoutes = routes.filter((r) => r.id !== route.id).slice(0, 3);

  return (
    <div className="bg-bg min-h-full">
      {/* Hero Image */}
      <div className="relative w-full" style={{ height: '50vh', minHeight: '320px' }}>
        <Image
          src={route.image}
          alt={route.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {route.name}
            </h1>
            <div className="flex items-center gap-3">
              <DifficultyStars level={route.difficulty} />
              <span className="text-white/80 text-sm">
                {difficultyLabels[route.difficulty]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Pills */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-earth">
              <Star size={18} weight="fill" />
              <span className="font-semibold">{route.difficulty}</span>
            </div>
            <span className="text-xs text-muted">难度等级</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-forest">
              <Clock size={18} weight="duotone" />
              <span className="font-semibold">{route.days}天</span>
            </div>
            <span className="text-xs text-muted">行程天数</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-sky">
              <MapPin size={18} weight="duotone" />
              <span className="font-semibold text-sm truncate">{route.location}</span>
            </div>
            <span className="text-xs text-muted">目的地</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-orange-500">
              <Sun size={18} weight="duotone" />
              <span className="font-semibold text-xs">{route.bestSeason}</span>
            </div>
            <span className="text-xs text-muted">最佳季节</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-purple-600">
              <Path size={18} weight="duotone" />
              <span className="font-semibold text-xs">{route.distance}</span>
            </div>
            <span className="text-xs text-muted">总距离</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-1 text-rose-500">
              <Mountains size={18} weight="duotone" />
              <span className="font-semibold text-xs">{route.elevation}</span>
            </div>
            <span className="text-xs text-muted">累计爬升</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFavorited(!favorited)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-white border-surface text-muted hover:border-rose-200 hover:text-rose-400'
            }`}
          >
            <Heart
              size={18}
              weight={favorited ? 'fill' : 'regular'}
             
            />
            <span className="text-sm font-medium">
              {favorited ? '已收藏' : '收藏路线'}
            </span>
          </button>
          <Link
            href="/activities"
            className="flex items-center gap-2 px-6 py-2.5 bg-forest text-white rounded-full hover:bg-forest-deep transition-colors duration-300"
          >
            <span className="text-sm font-medium">立即报名</span>
            <ArrowRight size={16} weight="bold"  />
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        <div className="border-b border-surface">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeTab === i
                    ? 'border-forest text-forest'
                    : 'border-transparent text-muted hover:text-forest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {/* 概览 */}
          {activeTab === 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-3">路线简介</h2>
                  <p className="text-gray-600 leading-relaxed">{route.description}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-3">路线亮点</h2>
                  <p className="text-gray-600 leading-relaxed">{route.highlight}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-3">适宜人群</h2>
                  <div className="flex flex-wrap gap-2">
                    {route.suitableFor.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-forest/10 text-forest rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-surface p-5">
                  <h3 className="font-bold text-forest-deep mb-3">行程信息</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">集合地点</span>
                      <span className="text-gray-700">{route.startLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">目的地</span>
                      <span className="text-gray-700">{route.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">难度等级</span>
                      <span className="text-gray-700">{difficultyLabels[route.difficulty]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">行程天数</span>
                      <span className="text-gray-700">{route.days}天</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">总距离</span>
                      <span className="text-gray-700">{route.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">累计爬升</span>
                      <span className="text-gray-700">{route.elevation}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface">
                    <div className="flex justify-between items-center">
                      <span className="text-muted">路线价格</span>
                      <span className="text-2xl font-bold text-forest">
                        ¥{route.price}
                        <span className="text-sm font-normal text-muted">/人</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 详细行程 */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-forest-deep">每日行程安排</h2>
              {route.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="bg-white rounded-2xl border border-surface overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-5 bg-forest/5 border-b border-surface">
                    <div className="flex items-center justify-center w-12 h-12 bg-forest text-white rounded-full font-bold text-lg">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-bold text-forest-deep">{day.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          第{day.day}天
                        </span>
                        <span>{day.meals}</span>
                        {day.accommodation && (
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {day.accommodation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 leading-relaxed">{day.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 装备建议 */}
          {activeTab === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-forest-deep mb-4 flex items-center gap-2">
                  <CheckCircle size={20} weight="fill" className="text-forest" />
                  必带装备
                </h2>
                <div className="bg-white rounded-2xl border border-surface p-5 space-y-3">
                  {route.gearList.must.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        weight="fill"
                        className="text-forest mt-0.5 flex-shrink-0"
                       
                      />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-forest-deep mb-4 flex items-center gap-2">
                  <CaretRight size={20} className="text-muted" />
                  可选装备
                </h2>
                <div className="bg-white rounded-2xl border border-surface p-5 space-y-3">
                  {route.gearList.optional.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CaretRight
                        size={18}
                        className="text-muted mt-0.5 flex-shrink-0"
                       
                      />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 安全提示 */}
          {activeTab === 3 && (
            <div>
              <h2 className="text-xl font-bold text-forest-deep mb-4">安全注意事项</h2>
              <div className="space-y-4">
                {route.safetyTips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-2xl border border-surface p-5"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-rose-50 text-rose-500 rounded-full font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 用户评价 */}
          {activeTab === 4 && (
            <div>
              <h2 className="text-xl font-bold text-forest-deep mb-4">
                用户评价 ({route.reviews.length})
              </h2>
              {route.reviews.length === 0 ? (
                <div className="text-center py-12 text-muted">
                  暂无评价，期待您的参与
                </div>
              ) : (
                <div className="space-y-4">
                  {route.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-surface p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                            <span className="text-forest font-medium">
                              {review.user.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">{review.user}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={12}
                                  weight={s <= review.rating ? 'fill' : 'regular'}
                                 
                                  className={
                                    s <= review.rating ? 'text-earth' : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted">{review.date}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Routes */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-16">
        <h2 className="text-xl font-bold text-forest-deep mb-6">相关路线推荐</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedRoutes.map((r) => (
            <Link
              key={r.id}
              href={`/routes/${r.id}`}
              className="group block bg-white rounded-2xl border border-surface overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-forest-deep group-hover:text-forest transition-colors line-clamp-1">
                  {r.name}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {r.days}天
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-sky" />
                    {r.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
