"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapTrifold, CalendarBlank, Users, Coins } from "@phosphor-icons/react"
import { getAdminStats } from "@/lib/adminService"
import type { AdminStats } from "@/lib/adminService"

const STAT_CARDS = [
  {
    key: "routeCount" as const,
    label: "路线总数",
    icon: MapTrifold,
    color: "#2d5a3d",
    bg: "#e8f0eb",
  },
  {
    key: "activityCount" as const,
    label: "活动总数",
    icon: CalendarBlank,
    color: "#4a90b8",
    bg: "#e8f1f7",
  },
  {
    key: "registrationCount" as const,
    label: "报名总数",
    icon: Users,
    color: "#c4a35a",
    bg: "#f7f2e8",
  },
  {
    key: "totalRevenue" as const,
    label: "总收入",
    icon: Coins,
    color: "#2d5a3d",
    bg: "#e8f0eb",
    prefix: "¥",
    format: true,
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-forest-deep">统计概览</h1>
        <p className="text-sm text-muted mt-1">平台整体数据一览</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-xl p-6 border border-surface animate-pulse"
            >
              <div className="h-4 w-20 bg-surface rounded mb-4" />
              <div className="h-8 w-16 bg-surface rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-sm text-red-600">
          加载失败：{error}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STAT_CARDS.map((card, i) => {
            const value = stats[card.key]
            const displayValue =
              card.format && typeof value === "number"
                ? value.toLocaleString("zh-CN")
                : value
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-surface"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: card.bg }}
                >
                  <card.icon size={22} style={{ color: card.color }} weight="duotone" />
                </div>
                <p className="text-sm text-muted mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-forest-deep">
                  {card.prefix ?? ""}
                  {displayValue}
                </p>
              </motion.div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
