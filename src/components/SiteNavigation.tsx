"use client"

import { usePathname } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function SiteNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
