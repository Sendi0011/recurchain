"use client"

import { Shield, Fingerprint, Clock } from "lucide-react"

export function SecurityForm({
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
          <Shield className="w-5 h-5 text-primary" />
          Authentication
        </h4>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.twoFactorAuth}
            onChange={(e) => onChange("twoFactorAuth", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Enable two-factor authentication</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={data.biometricAuth}
            onChange={(e) => onChange("biometricAuth", e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm text-foreground">Enable biometric authentication</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (minutes)</label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            value={data.sessionTimeout}
            onChange={(e) => onChange("sessionTimeout", Number.parseInt(e.target.value))}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
    </div>
  )
}
