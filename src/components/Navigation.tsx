"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, MagnifyingGlass, User, Compass } from "@phosphor-icons/react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/routes", label: "路线推荐" },
  { href: "/activities", label: "活动报名" },
  { href: "/gear", label: "装备指南" },
  { href: "/safety", label: "安全科普" },
  { href: "/community", label: "社群互动" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Compass
              size={28}
              weight="duotone"
              className="text-forest-deep transition-transform group-hover:rotate-45"
            />
            <span className="font-bold text-lg text-forest-deep tracking-tight">
              踏遍山河
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === link.href
                    ? "text-forest-deep"
                    : "text-gray-600 hover:text-forest-deep"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-earth rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              aria-label="搜索"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted bg-surface rounded-full hover:bg-surface/80 transition-colors"
            >
              <MagnifyingGlass size={16} weight="bold" />
              <span className="hidden lg:inline">搜索路线、活动...</span>
            </button>

            {/* Auth */}
            <Link
              href="/center"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-forest-deep rounded-full hover:bg-forest transition-colors"
            >
              <User size={16} weight="bold" />
              <span className="hidden sm:inline">登录</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="菜单"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            >
              {menuOpen ? (
                <X size={24} weight="bold" />
              ) : (
                <List size={24} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-surface py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-forest-deep/5 text-forest-deep"
                    : "text-gray-600 hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-surface">
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-muted bg-surface rounded-lg">
                <MagnifyingGlass size={16} weight="bold" />
                搜索路线、活动、装备...
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
