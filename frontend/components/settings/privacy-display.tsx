"use client"

import { Check, X } from "lucide-react"

export function PrivacyDisplay({ privacy }: { privacy: any }) {
  const activeClass = "text-primary"
  const inactiveClass = "text-muted-foreground"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Allow data collection</span>
        {privacy.dataCollection ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Analytics tracking</span>
        {privacy.analyticsTracking ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Public balance</span>
        {privacy.showBalance ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
    </div>
  )
}
