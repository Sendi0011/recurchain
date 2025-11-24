"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LogOut, X } from "lucide-react"

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 border flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-background  border  rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">You are about to log out</h2>
              <p className="text-muted-foreground mb-8">
                Are you sure you want to sign out of your account?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-muted text-muted-foreground font-semibold hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
