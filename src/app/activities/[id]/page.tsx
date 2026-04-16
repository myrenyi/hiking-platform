"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  CurrencyDollar,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  Phone,
  Warning,
  Circle,
  CheckFat,
} from "@phosphor-icons/react";
import { activities } from "@/lib/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

const tabs = ["活动概览", "详细行程", "报名要求", "费用说明", "注意事项"];

export default function ActivityDetailPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    count: 1,
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activityId, setActivityId] = useState<string>("act-001");

  // Resolve params on mount
  useState(() => {
    params.then((p) => setActivityId(p.id));
  });

  const activity =
    activities.find((a) => a.id === activityId) || activities[0];
  const participantPercent =
    (activity.participants / activity.maxParticipants) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.agree) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-bg min-h-full pb-24 md:pb-16">
      {/* Hero Image */}
      <div
        className="relative w-full"
        style={{ height: "50vh", minHeight: "320px" }}
      >
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {activity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              {activity.title}
            </h1>
            <p className="text-white/70 mt-2">组织方：{activity.organizer}</p>
          </div>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Calendar,
                value: activity.date + (activity.endDate ? ` - ${activity.endDate}` : ""),
                label: "出发日期",
                color: "text-forest",
              },
              {
                icon: MapPin,
                value: activity.location,
                label: "活动地点",
                color: "text-sky",
              },
              {
                icon: Users,
                value: activity.difficulty,
                label: "难度等级",
                color: "text-earth",
              },
              {
                icon: CurrencyDollar,
                value: activity.price === 0 ? "免费" : `¥${activity.price}`,
                label: "活动费用",
                color: "text-forest",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-1"
              >
                <div className={`flex items-center gap-1.5 ${item.color}`}>
                  <item.icon size={18} weight="duotone" />
                  <span className="font-semibold text-sm">{item.value}</span>
                </div>
                <span className="text-xs text-muted">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Participants Progress */}
          <div className="mt-5 pt-5 border-t border-surface">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted flex items-center gap-1.5">
                <Users size={14} />
                报名进度
              </span>
              <span className="text-sm font-medium text-gray-700">
                {activity.participants} / {activity.maxParticipants} 人
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(participantPercent, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full bg-forest rounded-full"
              />
            </div>
            <p className="text-xs text-muted mt-1.5">
              {activity.maxParticipants - activity.participants > 0
                ? `剩余 ${activity.maxParticipants - activity.participants} 个名额`
                : "已报满"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-forest text-white rounded-full hover:bg-forest-deep transition-colors duration-300 font-medium"
        >
          <span>立即报名</span>
          <ArrowRight size={16} weight="bold" />
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-b border-surface"
        >
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeTab === i
                    ? "border-forest text-forest"
                    : "border-transparent text-muted hover:text-forest"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* 活动概览 */}
              {activeTab === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-white rounded-2xl border border-surface p-5">
                        <h3 className="font-bold text-forest-deep mb-3">活动介绍</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {activity.title} — 由{activity.organizer}精心策划，适合
                          {activity.difficulty}级别徒步爱好者参与。
                          让我们一起探索自然，挑战自我。
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl border border-surface p-5">
                        <h3 className="font-bold text-forest-deep mb-3">活动标签</h3>
                        <div className="flex flex-wrap gap-2">
                          {activity.tags.map((tag) => (
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
                        <h3 className="font-bold text-forest-deep mb-3">联系组织方</h3>
                        <p className="text-sm text-muted mb-3">{activity.organizer}</p>
                        <a
                          href={`tel:${activity.phone}`}
                          className="flex items-center gap-2 text-forest"
                        >
                          <Phone size={16} />
                          <span className="text-sm font-medium">{activity.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 详细行程 */}
              {activeTab === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-6">活动日程</h2>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-surface" />
                    <div className="space-y-6">
                      {activity.schedule.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="relative flex gap-4"
                        >
                          <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-forest text-white rounded-full text-xs font-medium flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="bg-white rounded-2xl border border-surface p-4 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock size={14} className="text-muted" />
                              <span className="text-sm font-medium text-forest">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-gray-700">{item.activity}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 报名要求 */}
              {activeTab === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-6">报名要求</h2>
                  <div className="bg-white rounded-2xl border border-surface p-5">
                    <ul className="space-y-3">
                      {activity.requirements.map((req, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="text-forest mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{req}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 费用说明 */}
              {activeTab === 3 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-bold text-forest-deep mb-4 flex items-center gap-2">
                      <CheckCircle size={20} weight="fill" className="text-forest" />
                      费用包含
                    </h2>
                    <div className="bg-white rounded-2xl border border-surface p-5 space-y-3">
                      {activity.includes.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="text-forest mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-forest-deep mb-4 flex items-center gap-2">
                      <XCircle size={20} weight="fill" className="text-rose-400" />
                      费用不含
                    </h2>
                    <div className="bg-white rounded-2xl border border-surface p-5 space-y-3">
                      {activity.excludes.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <XCircle
                            size={18}
                            weight="fill"
                            className="text-rose-400 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 注意事项 */}
              {activeTab === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-forest-deep mb-6">注意事项</h2>
                  <div className="bg-white rounded-2xl border border-surface p-5">
                    <ul className="space-y-3">
                      {activity.notes.map((note, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <Warning
                            size={18}
                            weight="fill"
                            className="text-orange-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{note}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => {
              setShowForm(false);
              setSubmitted(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-md max-h-[90dvh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface sticky top-0 bg-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-forest-deep">报名信息</h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setSubmitted(false);
                    }}
                    className="text-muted hover:text-gray-700 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} weight="fill" className="text-forest" />
                    </div>
                    <h4 className="text-lg font-bold text-forest-deep mb-2">
                      报名成功
                    </h4>
                    <p className="text-muted text-sm">
                      我们将在24小时内与您联系确认报名信息
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        姓名
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="请输入您的姓名"
                        className="w-full px-4 py-2.5 border border-surface rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        手机号
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="请输入手机号码"
                        className="w-full px-4 py-2.5 border border-surface rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        报名人数
                      </label>
                      <select
                        value={formData.count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            count: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 border border-surface rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                      >
                        {Array.from(
                          {
                            length: Math.min(
                              activity.maxParticipants - activity.participants,
                              10
                            ),
                          },
                          (_, i) => i + 1
                        ).map((n) => (
                          <option key={n} value={n}>
                            {n}人
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={formData.agree}
                        onChange={(e) =>
                          setFormData({ ...formData, agree: e.target.checked })
                        }
                        className="mt-0.5 w-4 h-4 rounded border-surface text-forest focus:ring-forest/30"
                      />
                      <label
                        htmlFor="agree"
                        className="text-sm text-muted leading-relaxed"
                      >
                        我已阅读并同意《户外活动风险告知书》及《报名协议》，了解活动性质及潜在风险
                      </label>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={
                          !formData.name || !formData.phone || !formData.agree
                        }
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-forest text-white rounded-full hover:bg-forest-deep transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>确认报名</span>
                        <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky CTA on Mobile */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-surface md:hidden z-40"
      >
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-forest text-white rounded-full font-medium"
        >
          <span>立即报名</span>
          <ArrowRight size={16} weight="bold" />
        </button>
      </motion.div>
    </div>
  );
}
