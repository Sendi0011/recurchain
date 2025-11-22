"use client"

import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"

export function NotificationForm({
  data,
  onChange,
}: {
  data: any
  onChange: (field: string, value: boolean | number) => void
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Email Notifications
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.emailOnSuccess}
            onChange={(e) => onChange("emailOnSuccess", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Successful payments</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.emailOnFailure}
            onChange={(e) => onChange("emailOnFailure", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Failed payments</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.emailOnReminder}
            onChange={(e) => onChange("emailOnReminder", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Payment reminders</span>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          SMS Alerts
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.smsAlerts}
            onChange={(e) => onChange("smsAlerts", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Enable SMS alerts</span>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary" />
          Push Notifications
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.pushNotifications}
            onChange={(e) => onChange("pushNotifications", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Enable push notifications</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Low Balance Alert Threshold (USDC)</label>
        <div className="relative">
          <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            value={data.lowBalanceThreshold}
            onChange={(e) => onChange("lowBalanceThreshold", Number.parseInt(e.target.value))}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
    </div>
  )
}
