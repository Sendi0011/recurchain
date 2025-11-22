"use client"

import { Eye, BarChart2, Database } from "lucide-react"

export function PrivacyForm({
  data,
  onChange,
}: {
  data: any
  onChange: (field: string, value: boolean) => void
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Data Management
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.dataCollection}
            onChange={(e) => onChange("dataCollection", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Allow anonymous data collection for improvement</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.analyticsTracking}
            onChange={(e) => onChange("analyticsTracking", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Enable analytics tracking</span>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Visibility
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.showBalance}
            onChange={(e) => onChange("showBalance", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Show balance publicly</span>
        </label>
      </div>
    </div>
  )
}
