"use client"

import { Check, X } from "lucide-react"

export function SecurityDisplay({ security }: { security: any }) {
  const activeClass = "text-primary"
  const inactiveClass = "text-muted-foreground"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Two-factor authentication</span>
        {security.twoFactorAuth ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Biometric authentication</span>
        {security.biometricAuth ? (
          <Check className={`w-5 h-5 ${activeClass}`} />
        ) : (
          <X className={`w-5 h-5 ${inactiveClass}`} />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Session timeout</span>
        <span className="text-sm font-semibold text-foreground">{security.sessionTimeout} minutes</span>
      </div>
    </div>
  )
}
