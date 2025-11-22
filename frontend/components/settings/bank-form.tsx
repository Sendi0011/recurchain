"use client"

import { Landmark, User, Hash, Building } from "lucide-react"

export function BankForm({
  data,
  onChange,
}: {
  data: any
  onChange: (field: string, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={data.bankName}
          onChange={(e) => onChange("bankName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Bank Name"
        />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={data.accountName}
          onChange={(e) => onChange("accountName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Account Name"
        />
      </div>
      <div className="relative">
        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={data.accountNumber}
          onChange={(e) => onChange("accountNumber", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Account Number"
        />
      </div>
      <div className="relative">
        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <select
          value={data.accountType}
          onChange={(e) => onChange("accountType", e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
      </div>
    </div>
  )
}
