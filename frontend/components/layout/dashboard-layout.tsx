"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Settings, Wallet, BookOpen, Bell, LogOut, ChevronLeft, ChevronRight, Zap, Menu } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Agents", href: "/agents", icon: Settings },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "History", href: "/history", icon: BookOpen },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)") // Tailwind's 'lg' breakpoint
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      setSidebarOpen(!e.matches) // Close sidebar on mobile, open on desktop
    }

    // Initial check
    setIsMobile(mediaQuery.matches)
    setSidebarOpen(!mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("recurchain_session")
    window.location.href = "/"
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(!isMobile || sidebarOpen) && (
          <motion.div
            initial={{ width: isMobile ? 0 : 80 }}
            animate={{ width: sidebarOpen ? 280 : 80 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-sidebar border-r border-sidebar-border flex flex-col ${
              isMobile ? "fixed h-full z-50" : "relative"
            }`}
          >
            {/* Logo */}
            <div className="p-6 border-b border-sidebar-border">
              <motion.div animate={{ scale: sidebarOpen ? 1 : 0.8 }} className="text-2xl font-bold text-sidebar-primary">
                {sidebarOpen ? "RC" : <Zap className="w-6 h-6" />}
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const IconComponent = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => isMobile && setSidebarOpen(false)}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors relative ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                      {isActive && sidebarOpen && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-0 w-1 h-8 bg-sidebar-accent rounded-l"
                        />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border space-y-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 text-sm transition-colors flex items-center justify-center"
              >
                {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-destructive/20 text-sm transition-colors text-destructive flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {sidebarOpen && "Logout"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with hamburger menu */}
        {isMobile && (
          <div className="bg-background border-b border-border p-4 flex items-center justify-between lg:hidden">
            <motion.div className="text-2xl font-bold text-sidebar-primary">RC</motion.div>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-foreground hover:bg-secondary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
