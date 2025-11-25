"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Settings,
  Wallet,
  BookOpen,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { LogoutModal } from "@/components/auth/logout-modal"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Agents", href: "/agents", icon: Settings },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "History", href: "/history", icon: BookOpen },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
]

const SidebarContent = ({
  sidebarOpen,
  isMobile,
  pathname,
  setSidebarOpen,
  setShowLogoutModal,
}: {
  sidebarOpen: boolean
  isMobile: boolean
  pathname: string
  setSidebarOpen: (open: boolean) => void
  setShowLogoutModal: (show: boolean) => void
}) => (
  <div className="flex flex-col h-full">
    <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/recurchain_logo.png" alt="RecurChain Logo" className="h-8 w-auto" />
        {(sidebarOpen || isMobile) && <span className="text-xl font-bold">RecurChain</span>}
      </div>
      {isMobile && (
        <button onClick={() => setSidebarOpen(false)} className="p-2 -mr-2">
          <X className="w-6 h-6" />
        </button>
      )}
    </div>

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
              {(sidebarOpen || isMobile) && <span className="text-sm font-medium">{item.label}</span>}
              {isActive && (sidebarOpen || isMobile) && (
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

    <div className="p-4 border-t border-sidebar-border space-y-2">
      {!isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 text-sm transition-colors flex items-center justify-center"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      )}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-destructive/20 text-sm transition-colors text-destructive flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        {(sidebarOpen || isMobile) && "Logout"}
      </button>
    </div>
  </div>
)

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { logout } = usePrivy()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      setSidebarOpen(!e.matches)
    }

    setIsMobile(mediaQuery.matches)
    setSidebarOpen(!mediaQuery.matches)

    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  const handleLogoutConfirm = async () => {
    await logout()
    setShowLogoutModal(false)
    window.location.href = "/"
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <>
              <motion.div
                key="mobile-sidebar"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 bg-sidebar border-r border-sidebar-border z-50 w-full max-w-xs"
              >
                <SidebarContent
                  sidebarOpen={sidebarOpen}
                  isMobile={isMobile}
                  pathname={pathname}
                  setSidebarOpen={setSidebarOpen}
                  setShowLogoutModal={setShowLogoutModal}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-40"
              />
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div
          className={`bg-sidebar border-r border-sidebar-border flex-col hidden lg:flex transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <SidebarContent
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
            pathname={pathname}
            setSidebarOpen={setSidebarOpen}
            setShowLogoutModal={setShowLogoutModal}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-background border-b border-border p-4 flex items-center justify-between lg:hidden">
            <Link href="/dashboard">
              <img src="/recurchain_logo.png" alt="RecurChain Logo" className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-foreground hover:bg-secondary"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}
