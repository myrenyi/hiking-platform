"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, PencilSimple, EyeSlash, Eye, X } from "@phosphor-icons/react"
import type { Route, HikingLevel } from "@/lib/database.types"

interface RouteFormData {
  id?: string
  name: string
  difficulty: HikingLevel
  days: number
  location: string
  start_location: string
  destination: string
  highlight: string
  rating: number
  image: string
  price: number
  best_season: string
  distance: string
  elevation: string
  description: string
  suitable_for: string[]
  itinerary: { day: number; title: string; content: string }[]
  gear_list: { must: string[]; optional: string[] }
  safety_tips: string[]
  is_published: boolean
}

const DIFFICULTY_LABELS = ["", "入门", "简单", "进阶", "困难", "探险"]
const DIFFICULTY_COLORS = ["", "#6b7280", "#22c55e", "#3b82f6", "#f97316", "#ef4444"]

const EMPTY_FORM: RouteFormData = {
  name: "",
  difficulty: 1,
  days: 1,
  location: "",
  start_location: "",
  destination: "",
  highlight: "",
  rating: 5,
  image: "",
  price: 0,
  best_season: "",
  distance: "",
  elevation: "",
  description: "",
  suitable_for: [],
  itinerary: [],
  gear_list: { must: [], optional: [] },
  safety_tips: [],
  is_published: false,
}

function parseJson<T>(raw: string | T[] | undefined, fallback: T[]): T[] {
  if (!raw) return fallback
  if (Array.isArray(raw)) return raw
  try {
    return JSON.parse(raw as string)
  } catch {
    return fallback
  }
}

function RouteModal({
  data,
  onClose,
  onSave,
}: {
  data: RouteFormData | null
  onClose: () => void
  onSave: (d: RouteFormData) => Promise<void>
}) {
  const [form, setForm] = useState<RouteFormData>(data ?? EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setForm(data ?? EMPTY_FORM)
  }, [data])

  function set(key: keyof RouteFormData, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function setJson(key: keyof RouteFormData, raw: string) {
    try {
      set(key, JSON.parse(raw))
    } catch {
      // ignore
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      await onSave(form)
      onClose()
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-surface z-10">
          <h2 className="text-lg font-bold text-forest-deep">
            {form.id ? "编辑路线" : "新增路线"}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-forest-deep">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">路线名称 *</span>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">地点 *</span>
              <input
                required
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="如：四川·四姑娘山"
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">出发地</span>
              <input
                value={form.start_location}
                onChange={(e) => set("start_location", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">目的地</span>
              <input
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">难度等级</span>
              <select
                value={form.difficulty}
                onChange={(e) => set("difficulty", Number(e.target.value) as HikingLevel)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              >
                {DIFFICULTY_LABELS.map((l, i) =>
                  i === 0 ? null : (
                    <option key={i} value={i}>
                      {i} - {l}
                    </option>
                  )
                )}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">天数</span>
              <input
                type="number"
                min={1}
                value={form.days}
                onChange={(e) => set("days", Number(e.target.value))}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">价格（元）</span>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">评分</span>
              <input
                type="number"
                min={1}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => set("rating", Number(e.target.value))}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
          </div>

          {/* Image */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">封面图片 URL</span>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://..."
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          {/* Highlight */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">亮点</span>
            <input
              value={form.highlight}
              onChange={(e) => set("highlight", e.target.value)}
              placeholder="一句话介绍路线亮点"
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          {/* Best Season, Distance, Elevation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">最佳季节</span>
              <input
                value={form.best_season}
                onChange={(e) => set("best_season", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">总距离</span>
              <input
                value={form.distance}
                onChange={(e) => set("distance", e.target.value)}
                placeholder="如：约38公里"
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">累计爬升</span>
              <input
                value={form.elevation}
                onChange={(e) => set("elevation", e.target.value)}
                placeholder="如：累计爬升约1200米"
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
          </div>

          {/* Description */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">详细介绍</span>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest resize-none"
            />
          </label>

          {/* Suitable For */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">适合人群（逗号分隔）</span>
            <input
              value={form.suitable_for.join("，")}
              onChange={(e) =>
                set(
                  "suitable_for",
                  e.target.value.split("，").filter(Boolean)
                )
              }
              placeholder="新手入门，摄影爱好者，亲子家庭"
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          {/* Itinerary JSON */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">
              行程安排（JSON）
            </span>
            <textarea
              value={JSON.stringify(form.itinerary, null, 2)}
              onChange={(e) => setJson("itinerary", e.target.value)}
              rows={5}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest resize-none font-mono"
            />
          </label>

          {/* Gear List JSON */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">
              装备清单（JSON）
            </span>
            <textarea
              value={JSON.stringify(form.gear_list, null, 2)}
              onChange={(e) => setJson("gear_list", e.target.value)}
              rows={4}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest resize-none font-mono"
            />
          </label>

          {/* Safety Tips */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">安全提示（逗号分隔）</span>
            <input
              value={form.safety_tips.join("，")}
              onChange={(e) =>
                set("safety_tips", e.target.value.split("，").filter(Boolean))
              }
              placeholder="提示1，提示2"
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          {/* isPublished Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("is_published", !form.is_published)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${form.is_published ? "bg-forest" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${form.is_published ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </button>
            <span className="text-sm text-forest-deep">
              {form.is_published ? "已发布" : "未发布"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-surface">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-forest-deep transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-forest-deep text-white text-sm font-medium rounded-lg hover:bg-forest transition-colors disabled:opacity-50"
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState<RouteFormData | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/routes?type=routes"); const json = await res.json(); const data = json.error ? [] : json;
      setRoutes(data); if(json.error) console.error(json.error)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleSave(data: RouteFormData) {
    const r = await fetch("/api/admin/routes", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}); if(!r.ok) throw new Error((await r.json()).error)
    await load()
  }

  async function handleTogglePublished(route: Route) {
    const r2 = await fetch("/api/admin/routes", {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: route.id, isPublished: !route.is_published})}); if(!r2.ok) throw new Error((await r2.json()).error)
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除该路线吗？")) return
    const r3 = await fetch("/api/admin/routes?id=" + id, {method: "DELETE"}); if(!r3.ok) throw new Error((await r3.json()).error)
    await load()
  }

  function openEdit(route: Route) {
    setModalData({
      id: route.id,
      name: route.name,
      difficulty: route.difficulty,
      days: route.days,
      location: route.location,
      start_location: route.start_location,
      destination: route.destination,
      highlight: route.highlight,
      rating: route.rating,
      image: route.image,
      price: route.price,
      best_season: route.best_season,
      distance: route.distance,
      elevation: route.elevation,
      description: route.description,
      suitable_for: route.suitable_for,
      itinerary: route.itinerary,
      gear_list: route.gear_list,
      safety_tips: route.safety_tips,
      is_published: route.is_published,
    })
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-forest-deep">路线管理</h1>
          <p className="text-sm text-muted mt-1">{routes.length} 条路线</p>
        </div>
        <button
          onClick={() => setModalData(EMPTY_FORM)}
          className="flex items-center gap-2 px-4 py-2 bg-forest-deep text-white text-sm font-medium rounded-lg hover:bg-forest transition-colors"
        >
          <Plus size={16} />
          新增路线
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-3 font-medium text-muted">路线名称</th>
                <th className="px-4 py-3 font-medium text-muted">难度</th>
                <th className="px-4 py-3 font-medium text-muted">天数</th>
                <th className="px-4 py-3 font-medium text-muted">价格</th>
                <th className="px-4 py-3 font-medium text-muted">状态</th>
                <th className="px-4 py-3 font-medium text-muted text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t border-surface animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-8 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-surface rounded ml-auto" /></td>
                  </tr>
                ))
              ) : routes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted">
                    暂无路线，点击上方按钮新增
                  </td>
                </tr>
              ) : (
                routes.map((route) => (
                  <tr
                    key={route.id}
                    className="border-t border-surface hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-forest-deep">{route.name}</div>
                      <div className="text-xs text-muted">{route.location}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                        style={{
                          backgroundColor: DIFFICULTY_COLORS[route.difficulty],
                        }}
                      >
                        {DIFFICULTY_LABELS[route.difficulty]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{route.days}天</td>
                    <td className="px-4 py-3">
                      {route.price === 0 ? (
                        <span className="text-green-600">免费</span>
                      ) : (
                        <span className="text-earth">¥{route.price}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          route.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {route.is_published ? "已发布" : "草稿"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(route)}
                          className="p-1.5 text-muted hover:text-forest-deep transition-colors"
                          title="编辑"
                        >
                          <PencilSimple size={16} />
                        </button>
                        <button
                          onClick={() => handleTogglePublished(route)}
                          className="p-1.5 text-muted hover:text-forest-deep transition-colors"
                          title={route.is_published ? "下架" : "发布"}
                        >
                          {route.is_published ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(route.id)}
                          className="p-1.5 text-muted hover:text-red-500 transition-colors"
                          title="删除"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalData !== null && (
          <RouteModal
            data={modalData}
            onClose={() => setModalData(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
