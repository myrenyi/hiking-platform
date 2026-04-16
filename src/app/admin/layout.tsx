"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChartBar,
  MapTrifold,
  CalendarBlank,
  ClipboardText,
  SignOut,
  House,
  List,
  X,
} from "@phosphor-icons/react"

const NAV_ITEMS = [
  { href: "/admin", label: "统计概览", icon: ChartBar, exact: true },
  { href: "/admin/routes", label: "路线管理", icon: MapTrifold },
  { href: "/admin/activities", label: "活动管理", icon: CalendarBlank },
  { href: "/admin/registrations", label: "报名管理", icon: ClipboardText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="flex min-h-[100dvh] bg-bg">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-60 flex flex-col
            bg-[#1a3a2a] text-white
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 9L6 20H18L21 9L12 2Z"
                  fill="#c4a35a"
                  stroke="#c4a35a"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14L12 10L16 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-base">踏遍山河</span>
              <span className="text-white/50 text-sm">· 后台</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-150
                    ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/8"
                    }
                  `}
                >
                  <item.icon size={18} weight={active ? "fill" : "regular"} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 py-4 border-t border-white/10 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <House size={18} />
              返回前台
            </Link>
            <button
              onClick={() => {
                // 简单退出：清除 session 后跳转
                if (typeof window !== "undefined") {
                  sessionStorage.clear()
                  window.location.href = "/"
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <SignOut size={18} />
              退出登录
            </button>
          </div>
        </aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-surface">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-forest-deep"
          >
            <List size={22} />
          </button>
          <span className="text-sm font-semibold text-forest-deep">踏遍山河 · 后台</span>
          <div className="w-8" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
