"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapTrifold, CalendarBlank, Users, Coins } from "@phosphor-icons/react"

interface Stats {
  routeCount: number
  activityCount: number
  registrationCount: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/stats?type=stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error)
        setStats(d)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    {
      label: "路线总数",
      value: stats?.routeCount ?? 0,
      icon: MapTrifold,
      color: "#2d5a3d",
      bg: "#e8f0eb",
    },
    {
      label: "活动总数",
      value: stats?.activityCount ?? 0,
      icon: CalendarBlank,
      color: "#4a90b8",
      bg: "#e8f1f7",
    },
    {
      label: "报名总数",
      value: stats?.registrationCount ?? 0,
      icon: Users,
      color: "#c4a35a",
      bg: "#f7f2e8",
    },
    {
      label: "总收入",
      value: stats?.totalRevenue ?? 0,
      prefix: "¥",
      icon: Coins,
      color: "#2d5a3d",
      bg: "#e8f0eb",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-forest-deep">统计概览</h1>
        <p className="text-sm text-muted mt-1">平台整体数据一览</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          数据加载失败：{error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white rounded-2xl p-5 border border-surface"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: card.bg }}
            >
              <card.icon size={20} style={{ color: card.color }} weight="duotone" />
            </div>
            <p className="text-2xl font-bold text-forest-deep">
              {loading ? (
                <span className="inline-block w-12 h-6 bg-surface animate-pulse rounded" />
              ) : (
                `${card.prefix ?? ""}${card.value.toLocaleString()}`
              )}
            </p>
            <p className="text-sm text-muted mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
