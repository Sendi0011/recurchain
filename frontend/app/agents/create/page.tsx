"use client"

import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AgentForm from "@/components/agents/agent-form"

export default function CreateAgentPage() {
  const router = useRouter()

  const handleSave = (agentData: any) => {
    console.log("Saving agent:", agentData)
    // Here you would typically make an API call to save the agent
    // For now, we'll just redirect back to the agents list
    router.push("/agents")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <AgentForm onSave={handleSave} onCancel={handleCancel} agent={undefined} />
      </div>
    </DashboardLayout>
  )
}
