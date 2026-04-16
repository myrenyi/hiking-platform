"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagnifyingGlass, Check, X, Funnel } from "@phosphor-icons/react"
import type { Registration, RegistrationStatus } from "@/lib/database.types"

const STATUS_OPTIONS: { value: RegistrationStatus | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "pending", label: "待确认" },
  { value: "confirmed", label: "已确认" },
  { value: "cancelled", label: "已取消" },
]

const STATUS_STYLE: Record<RegistrationStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: "#fef3c7", text: "#92400e", label: "待确认" },
  confirmed: { bg: "#d1fae5", text: "#065f46", label: "已确认" },
  cancelled: { bg: "#fee2e2", text: "#991b1b", label: "已取消" },
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<(Registration & { activity_title?: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "all">("all")
  const [search, setSearch] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const filter: { status?: RegistrationStatus } = {}
      if (statusFilter !== "all") filter.status = statusFilter
      const res = await fetch("/api/admin/stats?type=registrations"); const json = await res.json(); const data = json.error ? [] : json.filter((r: any) => !filter || r.status === filter)
      setRegistrations(data)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    load()
  }, [load])

  async function handleUpdateStatus(id: string, status: RegistrationStatus) {
    const r = await fetch("/api/admin/registrations", {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id, status})}); if(!r.ok) throw new Error((await r.json()).error)
    await load()
  }

  const filtered = registrations.filter((r) => {
    if (!search) return true
    return (
      r.activity_title?.includes(search) ||
      r.name.includes(search) ||
      r.phone.includes(search)
    )
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-forest-deep">报名管理</h1>
        <p className="text-sm text-muted mt-1">{filtered.length} 条报名记录</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索活动名称、报名人、电话..."
            className="w-full pl-9 pr-3 py-2 border border-surface rounded-lg text-sm focus:outline-none focus:border-forest bg-white"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center rounded-full bg-surface p-0.5">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                statusFilter === opt.value
                  ? "bg-forest-deep text-white"
                  : "text-muted hover:text-forest-deep"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-3 font-medium text-muted">活动名称</th>
                <th className="px-4 py-3 font-medium text-muted">报名人</th>
                <th className="px-4 py-3 font-medium text-muted">电话</th>
                <th className="px-4 py-3 font-medium text-muted">人数</th>
                <th className="px-4 py-3 font-medium text-muted">状态</th>
                <th className="px-4 py-3 font-medium text-muted">报名时间</th>
                <th className="px-4 py-3 font-medium text-muted text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t border-surface animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 w-36 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-8 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-surface rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted">
                    暂无报名记录
                  </td>
                </tr>
              ) : (
                filtered.map((r) => {
                  const style = STATUS_STYLE[r.status]
                  return (
                    <tr
                      key={r.id}
                      className="border-t border-surface hover:bg-surface/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-forest-deep">
                        {r.activity_title ?? r.activity_id}
                      </td>
                      <td className="px-4 py-3 text-muted">{r.name}</td>
                      <td className="px-4 py-3 text-muted font-mono text-xs">{r.phone}</td>
                      <td className="px-4 py-3 text-muted">{r.count}人</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: style.bg, color: style.text }}
                        >
                          {style.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {new Date(r.created_at).toLocaleDateString("zh-CN")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {r.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(r.id, "confirmed")}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                              title="确认报名"
                            >
                              <Check size={13} weight="bold" />
                              确认
                            </button>
                          )}
                          {r.status !== "cancelled" && (
                            <button
                              onClick={() => handleUpdateStatus(r.id, "cancelled")}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                              title="取消报名"
                            >
                              <X size={13} weight="bold" />
                              取消
                            </button>
                          )}
                          {r.status === "cancelled" && (
                            <button
                              onClick={() => handleUpdateStatus(r.id, "confirmed")}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-forest-deep bg-surface hover:bg-forest/10 rounded-lg transition-colors"
                            >
                              <Check size={13} />
                              恢复
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
