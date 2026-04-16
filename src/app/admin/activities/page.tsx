"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, PencilSimple, X } from "@phosphor-icons/react"
import type { Activity } from "@/lib/database.types"
import type { ActivityFormData } from "@/lib/adminService"

const EMPTY_FORM: ActivityFormData = {
  title: "",
  date: "",
  end_date: "",
  location: "",
  difficulty: "",
  max_participants: 20,
  price: 0,
  image: "",
  organizer: "",
  phone: "",
  tags: [],
  schedule: [],
  requirements: [],
  includes: [],
  excludes: [],
  notes: [],
  is_published: false,
}

function setJson(form: ActivityFormData, key: keyof ActivityFormData, raw: string): ActivityFormData {
  try {
    return { ...form, [key]: JSON.parse(raw) }
  } catch {
    return form
  }
}

function ActivityModal({
  data,
  onClose,
  onSave,
}: {
  data: ActivityFormData | null
  onClose: () => void
  onSave: (d: ActivityFormData) => Promise<void>
}) {
  const [form, setForm] = useState<ActivityFormData>(data ?? EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setForm(data ?? EMPTY_FORM)
  }, [data])

  function set(key: keyof ActivityFormData, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }))
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
            {form.id ? "编辑活动" : "新增活动"}
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

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">活动标题 *</span>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">开始日期 *</span>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">结束日期</span>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">活动地点 *</span>
              <input
                required
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">难度</span>
              <input
                value={form.difficulty}
                onChange={(e) => set("difficulty", e.target.value)}
                placeholder="如：入门级"
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">最大人数</span>
              <input
                type="number"
                min={1}
                value={form.max_participants}
                onChange={(e) => set("max_participants", Number(e.target.value))}
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
              <span className="text-sm font-medium text-forest-deep">组织者</span>
              <input
                value={form.organizer}
                onChange={(e) => set("organizer", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-forest-deep">联系电话</span>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">封面图 URL</span>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://..."
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">标签（逗号分隔）</span>
            <input
              value={form.tags.join("，")}
              onChange={(e) => set("tags", e.target.value.split("，").filter(Boolean))}
              placeholder="徒步,摄影,亲子"
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">日程安排（JSON）</span>
            <textarea
              value={JSON.stringify(form.schedule, null, 2)}
              onChange={(e) => setForm((f) => setJson(f, "schedule", e.target.value))}
              rows={4}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest resize-none font-mono"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">参与要求（逗号分隔）</span>
            <input
              value={form.requirements.join("，")}
              onChange={(e) => set("requirements", e.target.value.split("，").filter(Boolean))}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">费用包含（逗号分隔）</span>
            <input
              value={form.includes.join("，")}
              onChange={(e) => set("includes", e.target.value.split("，").filter(Boolean))}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">费用不含（逗号分隔）</span>
            <input
              value={form.excludes.join("，")}
              onChange={(e) => set("excludes", e.target.value.split("，").filter(Boolean))}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-forest-deep">注意事项（逗号分隔）</span>
            <input
              value={form.notes.join("，")}
              onChange={(e) => set("notes", e.target.value.split("，").filter(Boolean))}
              className="border border-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("is_published", !form.is_published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_published ? "bg-forest" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.is_published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-forest-deep">
              {form.is_published ? "已发布" : "未发布"}
            </span>
          </div>

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

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState<ActivityFormData | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/activities?type=activities"); const json = await res.json(); const data = json.error ? [] : json
      setActivities(data)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleSave(data: ActivityFormData) {
    const r = await fetch("/api/admin/activities", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}); if(!r.ok) throw new Error((await r.json()).error)
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除该活动吗？")) return
    const r3 = await fetch("/api/admin/activities?id=" + id, {method: "DELETE"}); if(!r3.ok) throw new Error((await r3.json()).error)
    await load()
  }

  function openEdit(activity: Activity) {
    setModalData({
      id: activity.id,
      title: activity.title,
      date: activity.date,
      end_date: activity.end_date,
      location: activity.location,
      difficulty: activity.difficulty,
      max_participants: activity.max_participants,
      price: activity.price,
      image: activity.image,
      organizer: activity.organizer,
      phone: activity.phone,
      tags: activity.tags,
      schedule: activity.schedule,
      requirements: activity.requirements,
      includes: activity.includes,
      excludes: activity.excludes,
      notes: activity.notes,
      is_published: activity.is_published,
    })
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-forest-deep">活动管理</h1>
          <p className="text-sm text-muted mt-1">{activities.length} 个活动</p>
        </div>
        <button
          onClick={() => setModalData(EMPTY_FORM)}
          className="flex items-center gap-2 px-4 py-2 bg-forest-deep text-white text-sm font-medium rounded-lg hover:bg-forest transition-colors"
        >
          <Plus size={16} />
          新增活动
        </button>
      </div>

      <div className="bg-white rounded-xl border border-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-3 font-medium text-muted">活动标题</th>
                <th className="px-4 py-3 font-medium text-muted">日期</th>
                <th className="px-4 py-3 font-medium text-muted">地点</th>
                <th className="px-4 py-3 font-medium text-muted">难度</th>
                <th className="px-4 py-3 font-medium text-muted">价格</th>
                <th className="px-4 py-3 font-medium text-muted">人数</th>
                <th className="px-4 py-3 font-medium text-muted">状态</th>
                <th className="px-4 py-3 font-medium text-muted text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t border-surface animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 w-40 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-surface rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-surface rounded ml-auto" /></td>
                  </tr>
                ))
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted">
                    暂无活动，点击上方按钮新增
                  </td>
                </tr>
              ) : (
                activities.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-surface hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-forest-deep">{a.title}</td>
                    <td className="px-4 py-3 text-muted">{a.date}</td>
                    <td className="px-4 py-3 text-muted">{a.location}</td>
                    <td className="px-4 py-3 text-muted">{a.difficulty}</td>
                    <td className="px-4 py-3">
                      {a.price === 0 ? (
                        <span className="text-green-600">免费</span>
                      ) : (
                        <span className="text-earth">¥{a.price}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {a.participants}/{a.max_participants}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          a.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {a.is_published ? "已发布" : "草稿"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-1.5 text-muted hover:text-forest-deep transition-colors"
                          title="编辑"
                        >
                          <PencilSimple size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
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

      <AnimatePresence>
        {modalData !== null && (
          <ActivityModal
            data={modalData}
            onClose={() => setModalData(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
