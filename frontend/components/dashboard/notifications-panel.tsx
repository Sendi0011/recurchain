"use client"

import { motion } from "framer-motion"

export default function NotificationsPanel() {
  const notifications = [
    {
      id: "1",
      type: "success",
      title: "Payment Executed",
      message: "Spotify Subscription payment of $9.99 completed",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "warning",
      title: "Low Balance Alert",
      message: "Your USDC balance is below $100",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "success",
      title: "Agent Created",
      message: 'New agent "Cloud Storage" has been set up',
      time: "1 day ago",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 space-y-3"
    >
      <h3 className="text-sm font-semibold text-foreground">Recent Notifications</h3>
      {notifications.map((notif) => (
        <motion.div
          key={notif.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-3 rounded-lg border-l-4 ${
            notif.type === "success" ? "bg-primary/10 border-primary" : "bg-destructive/10 border-destructive"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{notif.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
            </div>
            <span className="text-xs text-muted-foreground ml-2">{notif.time}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
