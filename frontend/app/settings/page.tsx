"use client"

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Landmark,
  Bell,
  Shield,
  Eye,
  CheckCircle,
  Save,
  X,
  PlusCircle,
} from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import SettingsSection from "@/components/settings/settings-section"
import { ProfileForm } from "@/components/settings/profile-form"
import { BankForm } from "@/components/settings/bank-form"
import { NotificationForm } from "@/components/settings/notification-form"
import { SecurityForm } from "@/components/settings/security-form"
import { PrivacyForm } from "@/components/settings/privacy-form"
import { NotificationDisplay } from "@/components/settings/notification-display"
import { SecurityDisplay } from "@/components/settings/security-display"
import { PrivacyDisplay } from "@/components/settings/privacy-display"

const settingsConfig = {
  profile: {
    icon: User,
    title: "Profile Information",
    description: "Update your personal details",
    fields: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    component: ProfileForm,
  },
  bank: {
    icon: Landmark,
    title: "Bank Account",
    description: "Manage your bank details for Naira payouts",
    fields: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      accountType: "savings",
    },
    component: BankForm,
  },
  notifications: {
    icon: Bell,
    title: "Notification Preferences",
    description: "Control how and when you receive alerts",
    fields: {
      emailOnSuccess: true,
      emailOnFailure: true,
      emailOnReminder: true,
      smsAlerts: false,
      pushNotifications: true,
      lowBalanceThreshold: 100,
    },
    component: NotificationForm,
    display: NotificationDisplay,
  },
  security: {
    icon: Shield,
    title: "Security",
    description: "Protect your account with additional security options",
    fields: {
      twoFactorAuth: false,
      biometricAuth: true,
      sessionTimeout: 30,
    },
    component: SecurityForm,
    display: SecurityDisplay,
  },
  privacy: {
    icon: Eye,
    title: "Privacy & Data",
    description: "Manage your privacy preferences",
    fields: {
      dataCollection: true,
      analyticsTracking: true,
      showBalance: true,
    },
    component: PrivacyForm,
    display: PrivacyDisplay,
  },
}

type Settings = typeof settingsConfig
type SettingsSectionKey = keyof Settings

export default function SettingsPage() {
  const { user } = usePrivy()
  const [settings, setSettings] = useState(() =>
    Object.entries(settingsConfig).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.fields }),
      {} as { [K in SettingsSectionKey]: Settings[K]["fields"] }
    )
  )

  useEffect(() => {
    if (user) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        profile: {
          ...prevSettings.profile,
          firstName: user.google?.name.split(" ")[0] || "",
          lastName: user.google?.name.split(" ")[1] || "",
          email: user.google?.email || "",
        },
      }))
    }
  }, [user])

  const [editingSection, setEditingSection] = useState<SettingsSectionKey | null>(null)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [tempSettings, setTempSettings] = useState<typeof settings | null>(null)

  const handleEdit = (section: SettingsSectionKey) => {
    setTempSettings(JSON.parse(JSON.stringify(settings)))
    setEditingSection(section)
  }

  const handleSave = (section: SettingsSectionKey) => {
    if (tempSettings) {
      setSettings({
        ...settings,
        [section]: tempSettings[section],
      })
    }
    setEditingSection(null)
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  const handleCancel = () => {
    setEditingSection(null)
    setTempSettings(null)
  }

  const handleFieldChange = (section: SettingsSectionKey, field: string, value: any) => {
    if (tempSettings) {
      setTempSettings({
        ...tempSettings,
        [section]: {
          ...tempSettings[section],
          [field]: value,
        },
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-auto bg-muted/20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10 p-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account preferences and security</p>
        </motion.div>

        <div className="p-6 max-w-4xl mx-auto space-y-8">
          <AnimatePresence>
            {showSaveMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3"
                role="alert"
              >
                <CheckCircle className="w-6 h-6" />
                <p className="font-bold">Settings saved successfully!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {Object.entries(settingsConfig).map(([key, config]) => {
            const sectionKey = key as SettingsSectionKey
            const isEditing = editingSection === sectionKey
            const CurrentComponent = config.component
            const DisplayComponent = config.display

            const hasBankDetails =
              sectionKey === "bank" &&
              Object.values(settings.bank).some((value) => value !== "")

            return (
              <SettingsSection
                key={sectionKey}
                icon={config.icon}
                title={config.title}
                description={config.description}
                isEditing={isEditing}
                onEdit={() => handleEdit(sectionKey)}
                onSave={() => handleSave(sectionKey)}
                onCancel={handleCancel}
              >
                {isEditing && tempSettings ? (
                  <CurrentComponent
                    data={tempSettings[sectionKey]}
                    onChange={(field: string, value: any) => handleFieldChange(sectionKey, field, value)}
                  />
                ) : DisplayComponent ? (
                  <DisplayComponent {...{ [sectionKey]: settings[sectionKey] }} />
                ) : sectionKey === "bank" && !hasBankDetails ? (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed border-border rounded-lg">
                    <Landmark className="w-12 h-12 mb-4" />
                    <h4 className="font-semibold text-lg mb-2">No bank account added</h4>
                    <p className="text-sm mb-4">Add your bank account to receive Naira payouts.</p>
                    <button
                      onClick={() => handleEdit("bank")}
                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-lg"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add Bank Account</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(settings[sectionKey]).map(([field, value]) => (
                      <div key={field}>
                        <p className="text-xs text-muted-foreground capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="font-semibold text-foreground">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SettingsSection>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
