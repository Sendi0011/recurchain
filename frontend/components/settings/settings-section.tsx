"use client"

import { motion } from "framer-motion"
import { Edit, Save, X } from "lucide-react"

export default function SettingsSection({
  icon: Icon,
  title,
  description,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  isEditing: boolean
  onEdit: () => void
  onSave: (data: any) => void
  onCancel: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div
      layout
      className="bg-background rounded-xl border border-border shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onSave}
                className="flex items-center gap-2 text-sm font-semibold text-green-500 hover:text-green-500/80 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-500/80 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-muted/30 p-6 border-t border-border">{children}</div>
    </motion.div>
  )
}
