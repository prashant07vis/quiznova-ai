"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Palette,
  CreditCard,
  Shield,
  LogOut,
  Moon,
  Sun,
  ArrowLeft,
  Camera,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    achievements: true,
    marketing: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
  ]

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">QuizNova AI</span>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
                <div className="pt-4 mt-4 border-t border-border/50">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                        JD
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{email}</p>
                      <p className="text-xs text-primary mt-1">Pro Member</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 mt-4">
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Change Password</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="w-full pl-10 pr-12 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 mt-4">
                      Update Password
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email Notifications", description: "Receive updates via email" },
                      { key: "push", label: "Push Notifications", description: "Receive browser push notifications" },
                      { key: "weekly", label: "Weekly Digest", description: "Get a weekly summary of your progress" },
                      { key: "achievements", label: "Achievement Alerts", description: "Be notified when you earn badges" },
                      { key: "marketing", label: "Marketing Emails", description: "Receive tips and promotional content" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50"
                      >
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Subscription Tab */}
              {activeTab === "subscription" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold">Pro Plan</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      You are currently on the Pro plan with full access to all features.
                    </p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold">$9</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">Unlimited MCQs</span>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">Full PDF Export</span>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">AI Explanations</span>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">Advanced Analytics</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                    <h3 className="font-semibold mb-4">Billing Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next billing date</span>
                        <span>June 24, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment method</span>
                        <span>Visa ending in 4242</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline">Update Payment</Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-500">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Preferences</h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "system"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 capitalize ${
                              theme === t
                                ? "border-primary bg-primary/10"
                                : "border-border/50 hover:border-primary/30"
                            }`}
                          >
                            {t === "light" && <Sun className="h-5 w-5" />}
                            {t === "dark" && <Moon className="h-5 w-5" />}
                            {t === "system" && <Palette className="h-5 w-5" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Language</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                        <div>
                          <p className="font-medium">Active Sessions</p>
                          <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                        <div>
                          <p className="font-medium">Download Data</p>
                          <p className="text-sm text-muted-foreground">Export your account data</p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
                    <h3 className="font-semibold text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="outline" className="text-red-500 border-red-500/50 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
