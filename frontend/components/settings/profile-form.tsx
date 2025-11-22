"use client"

import { User, Mail, Phone } from "lucide-react"

export function ProfileForm({
  data,
  onChange,
}: {
  data: any
  onChange: (field: string, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={data.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="First Name"
        />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Last Name"
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Email Address"
        />
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Phone Number"
        />
      </div>
    </div>
  )
}
