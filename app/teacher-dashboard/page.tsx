"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import {
  Sparkles, Moon, Sun, LogOut, Menu, X, Settings,
  BookOpen, FileText, Download, BarChart3, Plus,
  Clock, CheckCircle2, Crown, Lock, ChevronRight,
  Calendar, Layers, Users, GraduationCap, Zap,
  AlertTriangle, Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlanLimits, type Plan } from "@/lib/plan-limits"

// ── Types ──────────────────────────────────────────────────────────────────────

interface UserProfile {
  name: string
  email: string
  role: string
  plan: Plan
}

interface GeneratedPaper {
  id: string
  title: string
  subject: string
  difficulty: string
  questionCount: number
  createdAt: any
  uid: string
}

// ── Sidebar Items ──────────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: BarChart3,       label: "Overview",          id: "overview"     },
  { icon: FileText,        label: "Exam Papers",       id: "papers"       },
  { icon: BookOpen,        label: "Question Banks",    id: "banks"        },
  { icon: Download,        label: "Saved & Exports",   id: "saved"        },
  { icon: BarChart3,       label: "Analytics",         id: "analytics"    },
  { icon: Users,           label: "Student Assignment",id: "assignments"  },
  { icon: GraduationCap,   label: "Class Management",  id: "classes"      },
  { icon: Settings,        label: "Settings",          id: "settings"     },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

const formatDate = (timestamp: any) => {
  if (!timestamp) return "—"
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toISOString().split("T")[0]
  } catch { return "—" }
}

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "Easy")   return "bg-green-500/10 text-green-500 border-green-500/20"
  if (difficulty === "Medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  return "bg-red-500/10 text-red-500 border-red-500/20"
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: {
  icon: React.ElementType
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary/50" />
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
          <Link href={actionHref}>
            <Plus className="h-4 w-4 mr-2" />{actionLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

// ── Coming Soon ────────────────────────────────────────────────────────────────

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center">
        <Zap className="h-8 w-8 text-accent/50" />
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">This feature is coming soon. Stay tuned!</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
        Coming Soon
      </span>
    </div>
  )
}

// ── Upgrade Modal ──────────────────────────────────────────────────────────────

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">🚀 Upgrade to Teacher Pro</h2>
          <p className="text-muted-foreground">You have reached your free plan limit.</p>
        </div>
        <div className="space-y-3 mb-6">
          {[
            "Unlimited paper generations",
            "Up to 100 questions per paper",
            "Unlimited Question Banks",
            "PDF Export & Answer Keys",
            "Analytics Dashboard",
            "No Watermark",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Maybe Later</Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/pricing" onClick={onClose}>Upgrade Now</Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function TeacherDashboardPage() {
  const [activeTab,      setActiveTab]      = useState("overview")
  const [sidebarOpen,    setSidebarOpen]    = useState(false)
  const [mounted,        setMounted]        = useState(false)
  const [user,           setUser]           = useState<UserProfile | null>(null)
  const [papers,         setPapers]         = useState<GeneratedPaper[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showUpgrade,    setShowUpgrade]    = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // ── Auth + Data ────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login")
        return
      }

      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid))
        if (snap.exists()) {
          const data = snap.data()

          // Student ko yahan access nahi — redirect
          if (data.role === "student") {
            router.push("/dashboard")
            return
          }

          setUser({
            name:  data.name  || firebaseUser.displayName || "Teacher",
            email: data.email || firebaseUser.email || "",
            role:  data.role  || "teacher",
            plan:  (data.plan as Plan) || "teacher_free",
          })
        }
      } catch (e) {
        console.error(e)
      }

      // Load papers
      const q = query(
        collection(db, "quizzes"),
        where("uid", "==", firebaseUser.uid),
        orderBy("createdAt", "desc")
      )
      const unsub = onSnapshot(q, (snap) => {
        setPapers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GeneratedPaper)))
        setLoading(false)
      }, () => setLoading(false))

      return () => unsub()
    })

    return () => unsubAuth()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  const limits      = getPlanLimits(user?.plan || "teacher_free")
  const firstName   = user?.name?.split(" ")[0] || "Teacher"
  const initials    = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "T"
  const isProPlan   = user?.plan === "teacher_pro"

  const totalPapers    = papers.length
  const totalQuestions = papers.reduce((s, p) => s + (p.questionCount || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
      </AnimatePresence>

      {/* ── Mobile Header ─────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">QuizNova AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className={`fixed top-0 left-0 z-40 h-full w-[280px] bg-card border-r border-border flex flex-col ${
        sidebarOpen ? "block" : "hidden lg:flex"
      }`}>
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/30" />
            </div>
            <span className="font-bold text-xl tracking-tight">QuizNova AI</span>
          </Link>
          {/* Teacher badge */}
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 w-fit">
            <BookOpen className="h-3 w-3 text-accent" />
            <span className="text-xs text-accent font-medium">Teacher Portal</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isComingSoon = item.id === "assignments" || item.id === "classes"
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {isComingSoon && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                    Soon
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-semibold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          {/* Plan badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-3 ${
            isProPlan
              ? "bg-primary/10 border-primary/20"
              : "bg-muted border-border"
          }`}>
            <Crown className={`h-3 w-3 ${isProPlan ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs font-medium ${isProPlan ? "text-primary" : "text-muted-foreground"}`}>
              {isProPlan ? "Teacher Pro" : "Teacher Free"}
            </span>
            {!isProPlan && (
              <button
                onClick={() => setShowUpgrade(true)}
                className="ml-auto text-xs text-primary hover:underline font-medium"
              >
                Upgrade
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="flex-1"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="flex-1" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main className="lg:ml-[280px] pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">

          {/* Page Header */}
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Welcome, <span className="text-primary">{firstName}</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  {papers.length === 0
                    ? "Create your first exam paper to get started"
                    : "Here's your teacher dashboard overview"}
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/generate">
                  <Plus className="h-4 w-4 mr-2" />New Paper
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* ── OVERVIEW TAB ────────────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Papers Generated", value: totalPapers,    icon: FileText,  color: "text-primary"     },
                  { label: "Total Questions",  value: totalQuestions, icon: Brain,     color: "text-accent"      },
                  { label: "Question Banks",   value: isProPlan ? "∞" : "0", icon: BookOpen, color: "text-green-500" },
                  { label: "Plan",             value: isProPlan ? "Pro" : "Free", icon: Crown, color: "text-yellow-500" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 lg:p-6">
                        <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                        <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Free plan limit warning */}
              {!isProPlan && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-600 dark:text-yellow-400">Free Plan Limitations</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You are on the free plan: 2 papers/day, max 20 questions, watermark enabled.
                    </p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                    onClick={() => setShowUpgrade(true)}>
                    Upgrade
                  </Button>
                </motion.div>
              )}

              {/* Recent Papers */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />Recent Papers
                  </CardTitle>
                  {papers.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("papers")}>
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {papers.length === 0 ? (
                    <EmptyState
                      icon={FileText}
                      title="No papers yet"
                      description="Generate your first exam paper using AI."
                      actionLabel="Generate Paper"
                      actionHref="/generate"
                    />
                  ) : (
                    <div className="space-y-4">
                      {papers.slice(0, 4).map((paper, i) => (
                        <motion.div key={paper.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{paper.title || paper.subject}</p>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />{formatDate(paper.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Brain className="h-3 w-3" />{paper.questionCount} Qs
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(paper.difficulty)}`}>
                              {paper.difficulty}
                            </span>
                            {!isProPlan && (
                              <Button variant="ghost" size="icon" onClick={() => setShowUpgrade(true)}>
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            )}
                            {isProPlan && (
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── EXAM PAPERS TAB ───────────────────────────────────────────────── */}
          {activeTab === "papers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />All Exam Papers
                  </CardTitle>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="sm" asChild>
                    <Link href="/generate"><Plus className="h-4 w-4 mr-2" />New Paper</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {papers.length === 0 ? (
                    <EmptyState
                      icon={FileText}
                      title="No papers generated yet"
                      description="Start generating AI-powered exam papers."
                      actionLabel="Generate Paper"
                      actionHref="/generate"
                    />
                  ) : (
                    <div className="space-y-4">
                      {papers.map((paper, i) => (
                        <motion.div key={paper.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">{paper.title || paper.subject}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(paper.createdAt)}</span>
                                  <span className="flex items-center gap-1"><Brain className="h-3 w-3" />{paper.questionCount} questions</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(paper.difficulty)}`}>
                                {paper.difficulty}
                              </span>
                              {isProPlan ? (
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />Export PDF
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" onClick={() => setShowUpgrade(true)}
                                  className="text-muted-foreground">
                                  <Lock className="h-4 w-4 mr-1" />PDF (Pro)
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── QUESTION BANKS TAB ────────────────────────────────────────────── */}
          {activeTab === "banks" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />Question Banks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isProPlan ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-primary/50" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Question Banks — Teacher Pro</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                          Save and reuse question banks across multiple exams. Available in Teacher Pro.
                        </p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setShowUpgrade(true)}>
                        <Crown className="h-4 w-4 mr-2" />Upgrade to Teacher Pro
                      </Button>
                    </div>
                  ) : (
                    <EmptyState
                      icon={BookOpen}
                      title="No question banks yet"
                      description="Create question banks from your generated papers."
                      actionLabel="Generate Paper"
                      actionHref="/generate"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── SAVED & EXPORTS TAB ───────────────────────────────────────────── */}
          {activeTab === "saved" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />Saved Papers & Exports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isProPlan ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-primary/50" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">PDF Export — Teacher Pro</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                          Export exam papers and answer keys as PDFs. Available in Teacher Pro.
                        </p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setShowUpgrade(true)}>
                        <Crown className="h-4 w-4 mr-2" />Upgrade to Teacher Pro
                      </Button>
                    </div>
                  ) : (
                    <EmptyState
                      icon={Download}
                      title="No exports yet"
                      description="Export your papers as PDFs to access them here."
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── ANALYTICS TAB ─────────────────────────────────────────────────── */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {!isProPlan ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-primary/50" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Analytics — Teacher Pro</p>
                        <p className="text-sm text-muted-foreground mt-1">Detailed analytics available in Teacher Pro.</p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setShowUpgrade(true)}>
                        <Crown className="h-4 w-4 mr-2" />Upgrade to Teacher Pro
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { label: "Total Papers",    value: totalPapers,    icon: FileText  },
                        { label: "Total Questions", value: totalQuestions, icon: Brain     },
                        { label: "This Month",      value: papers.filter(p => {
                          try {
                            const d = p.createdAt?.toDate?.() || new Date(p.createdAt)
                            return d.getMonth() === new Date().getMonth()
                          } catch { return false }
                        }).length, icon: Calendar },
                      ].map((stat, i) => (
                        <Card key={i} className="bg-secondary/50 border-border">
                          <CardContent className="p-4">
                            <stat.icon className="h-5 w-5 text-primary mb-2" />
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* ── ASSIGNMENTS TAB (Coming Soon) ──────────────────────────────────── */}
          {activeTab === "assignments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />Student Assignment Management
                  </CardTitle>
                </CardHeader>
                <CardContent><ComingSoon title="Student Assignment Management" /></CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── CLASSES TAB (Coming Soon) ──────────────────────────────────────── */}
          {activeTab === "classes" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />Class Management
                  </CardTitle>
                </CardHeader>
                <CardContent><ComingSoon title="Class Management" /></CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── SETTINGS TAB ──────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                  <div className="space-y-4">
                    <h3 className="font-semibold">Profile</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold text-xl">{initials}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 mt-1 inline-block">
                          Teacher
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Edit</Button>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Preferences</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                      </div>
                      <Button variant="outline" size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Plan</h3>
                    <div className={`flex items-center justify-between p-4 rounded-xl border ${
                      isProPlan ? "border-primary/20 bg-primary/5" : "border-border bg-secondary/50"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Crown className={`h-5 w-5 ${isProPlan ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="font-medium">{isProPlan ? "Teacher Pro" : "Teacher Free"}</p>
                          <p className="text-sm text-muted-foreground">
                            {isProPlan ? "All features unlocked" : "2 papers/day, max 20 questions"}
                          </p>
                        </div>
                      </div>
                      {!isProPlan && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => setShowUpgrade(true)}>
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-destructive">Danger Zone</h3>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                      </div>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  )
}