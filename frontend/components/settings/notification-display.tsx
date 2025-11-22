"use client"

import { Check, X } from "lucide-react"

export function NotificationDisplay({ notifications }: { notifications: any }) {
  const activeClass = "text-primary"
  const inactiveClass = "text-muted-foreground"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Success notifications</span>
        {notifications.emailOnSuccess ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Failure alerts</span>
        {notifications.emailOnFailure ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Payment reminders</span>
        {notifications.emailOnReminder ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
    </div>
  )
}
