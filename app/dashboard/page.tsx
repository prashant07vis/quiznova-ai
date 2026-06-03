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
  Sparkles, Moon, Sun, Home, History, TrendingUp, FileText, Settings,
  LogOut, ChevronRight, Clock, Target, Brain, Download, Trash2, Eye,
  Calendar, BarChart3, PieChart, ArrowUp, ArrowDown, Minus, BookOpen,
  Zap, AlertTriangle, CheckCircle2, Plus, Search, Filter, MoreVertical,
  Menu, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Types ──────────────────────────────────────────────────────────────────────

interface UserProfile {
  name: string
  email: string
  role?: string
}

interface Quiz {
  id: string
  title?: string
  subject: string
  difficulty: "Easy" | "Medium" | "Hard"
  questionCount: number
  createdAt: any
  uid: string
  score?: number
  correctAnswers?: number
  timeSpent?: string
  topics?: string[]
}

// ─── Sidebar Items ───────────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: Home,          label: "Overview",     id: "overview"    },
  { icon: History,       label: "Quiz History", id: "history"     },
  { icon: TrendingUp,    label: "Analytics",    id: "analytics"   },
  { icon: AlertTriangle, label: "Weak Topics",  id: "weak-topics" },
  { icon: FileText,      label: "Saved PDFs",   id: "pdfs"        },
  { icon: Settings,      label: "Settings",     id: "settings"    },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────────

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-500"
  if (score >= 70) return "text-yellow-500"
  return "text-red-500"
}

const getScoreBg = (score: number) => {
  if (score >= 90) return "bg-green-500/10 border-green-500/20"
  if (score >= 70) return "bg-yellow-500/10 border-yellow-500/20"
  return "bg-red-500/10 border-red-500/20"
}

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "Easy")   return "bg-green-500/10 text-green-500 border-green-500/20"
  if (difficulty === "Medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  return "bg-red-500/10 text-red-500 border-red-500/20"
}

const getTrendIcon = (trend: string) => {
  if (trend === "up")   return <ArrowUp   className="h-4 w-4 text-green-500" />
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500"   />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

// Format Firestore timestamp to readable date
const formatDate = (timestamp: any) => {
  if (!timestamp) return "—"
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toISOString().split("T")[0]
  } catch {
    return "—"
  }
}

// Derive weak topics from quizzes
function deriveWeakTopics(quizzes: Quiz[]) {
  const topicMap: Record<string, {
    total: number; correct: number; count: number; subject: string; scores: number[]
  }> = {}

  quizzes.forEach((q) => {
    if (!q.topics || !q.score) return
    q.topics.forEach((topic) => {
      if (!topicMap[topic]) {
        topicMap[topic] = { total: 0, correct: 0, count: 0, subject: q.subject, scores: [] }
      }
      topicMap[topic].total   += q.questionCount || 0
      topicMap[topic].correct += q.correctAnswers || 0
      topicMap[topic].count   += 1
      topicMap[topic].scores.push(q.score!)
    })
  })

  return Object.entries(topicMap)
    .map(([topic, data]) => {
      const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
      const s = data.scores
      const trend = s.length >= 2
        ? s[s.length - 1] > s[s.length - 2] ? "up"
        : s[s.length - 1] < s[s.length - 2] ? "down" : "stable"
        : "stable"
      return { topic, subject: data.subject, accuracy, quizzesTaken: data.count, trend }
    })
    .filter((t) => t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)
}

// Derive subject breakdown
function deriveSubjectBreakdown(quizzes: Quiz[]) {
  const map: Record<string, { total: number; count: number }> = {}
  quizzes.forEach((q) => {
    if (!q.score) return
    if (!map[q.subject]) map[q.subject] = { total: 0, count: 0 }
    map[q.subject].total += q.score
    map[q.subject].count += 1
  })
  const colors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]
  return Object.entries(map).map(([subject, d], i) => ({
    subject,
    score: Math.round(d.total / d.count),
    color: colors[i % colors.length],
  }))
}

// Derive weekly scores (last 7 days)
function deriveWeeklyScores(quizzes: Quiz[]) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split("T")[0]
  })
  return days.map((day) => {
    const dayQuizzes = quizzes.filter((q) => formatDate(q.createdAt) === day && q.score)
    if (!dayQuizzes.length) return 0
    return Math.round(dayQuizzes.reduce((s, q) => s + (q.score || 0), 0) / dayQuizzes.length)
  })
}

// ─── Empty State ─────────────────────────────────────────────────────────────────

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

// ─── Main Dashboard ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab,   setActiveTab]   = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted,     setMounted]     = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // Firebase state
  const [user,        setUser]        = useState<UserProfile | null>(null)
  const [quizzes,     setQuizzes]     = useState<Quiz[]>([])
  const [loading,     setLoading]     = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // ── Auth + Data listeners ──────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login")
        return
      }

      // Load user profile from Firestore
      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid))
        if (snap.exists()) {
          const data = snap.data()
          setUser({
            name:  data.name  || firebaseUser.displayName || "Student",
            email: data.email || firebaseUser.email || "",
            role:  data.role  || "student",
          })
        } else {
          setUser({
            name:  firebaseUser.displayName || "Student",
            email: firebaseUser.email || "",
          })
        }
      } catch (_) {
        setUser({
          name:  firebaseUser.displayName || "Student",
          email: firebaseUser.email || "",
        })
      }

      // Load quizzes from Firestore (real-time)
      const q = query(
        collection(db, "quizzes"),
        where("uid", "==", firebaseUser.uid),
        orderBy("createdAt", "desc")
      )
      const unsubQuizzes = onSnapshot(q, (snap) => {
        setQuizzes(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz)))
        setLoading(false)
      }, () => setLoading(false))

      return () => unsubQuizzes()
    })

    return () => unsubAuth()
  }, [router])

  // ── Derived values ────────────────────────────────────────────────────────────

  const avgScore         = quizzes.length && quizzes.some(q => q.score)
    ? Math.round(quizzes.filter(q => q.score).reduce((s, q) => s + (q.score || 0), 0) / quizzes.filter(q => q.score).length)
    : 0
  const totalQuestions   = quizzes.reduce((s, q) => s + (q.questionCount || 0), 0)
  const weeklyScores     = deriveWeeklyScores(quizzes)
  const subjectBreakdown = deriveSubjectBreakdown(quizzes)
  const weakTopics       = deriveWeakTopics(quizzes)
  const filteredQuizzes  = quizzes.filter((q) =>
    (q.title || q.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Study streak
  const studyStreak = (() => {
    const dates = new Set(quizzes.map((q) => formatDate(q.createdAt)))
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      if (dates.has(d.toISOString().split("T")[0])) streak++
      else if (i > 0) break
    }
    return streak
  })()

  const firstName = user?.name?.split(" ")[0] || "Student"
  const initials  = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"

  // ── Logout ────────────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  // ── Loading ───────────────────────────────────────────────────────────────────

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

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">

      {/* Mobile Header */}
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

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: sidebarOpen ? 0 : (typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -280) }}
            exit={{ x: -280 }}
            className={`fixed top-0 left-0 z-40 h-full w-[280px] bg-card border-r border-border flex flex-col ${
              sidebarOpen ? "block" : "hidden lg:flex"
            }`}
          >
            <div className="p-6 border-b border-border">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <div className="absolute inset-0 blur-lg bg-primary/30" />
                </div>
                <span className="font-bold text-xl tracking-tight">QuizNova AI</span>
              </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User profile — Firebase se real data */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                </div>
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
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="lg:ml-[280px] pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">

          {/* Header */}
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Welcome back, <span className="text-primary">{firstName}</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  {quizzes.length === 0
                    ? "Start your first quiz to see your progress here"
                    : "Here's your learning progress overview"}
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-sm" asChild>
                <Link href="/generate">
                  <Plus className="h-4 w-4 mr-2" />New Quiz
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* ── OVERVIEW TAB ──────────────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Quizzes",   value: quizzes.length,                        icon: BookOpen, color: "text-primary"     },
                  { label: "Avg. Score",       value: quizzes.length ? `${avgScore}%` : "—", icon: Target,   color: "text-green-500"  },
                  { label: "Questions Solved", value: totalQuestions,                        icon: Brain,    color: "text-accent"     },
                  { label: "Study Streak",     value: `${studyStreak} days`,                 icon: Zap,      color: "text-yellow-500" },
                ].map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">

                {/* Weekly Performance */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />Weekly Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {weeklyScores.every((s) => s === 0) ? (
                      <EmptyState icon={BarChart3} title="No data yet" description="Take some quizzes to see your weekly chart." />
                    ) : (
                      <div className="flex items-end justify-between h-48 gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                          <div key={day} className="flex flex-col items-center gap-2 flex-1">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${weeklyScores[index]}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                            >
                              <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" style={{ height: "100%" }} />
                            </motion.div>
                            <span className="text-xs text-muted-foreground">{day}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Subject Breakdown */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />Subject Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {subjectBreakdown.length === 0 ? (
                      <EmptyState icon={PieChart} title="No subjects yet" description="Complete quizzes to see your subject performance." />
                    ) : (
                      <div className="space-y-4">
                        {subjectBreakdown.map((subject, index) => (
                          <motion.div key={subject.subject} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{subject.subject}</span>
                              <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>{subject.score}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${subject.score}%` }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                className={`h-full ${subject.color} rounded-full`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Quizzes */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />Recent Quizzes
                  </CardTitle>
                  {quizzes.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("history")}>
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {quizzes.length === 0 ? (
                    <EmptyState
                      icon={BookOpen}
                      title="No quizzes yet"
                      description="You haven't taken any quizzes. Start one now!"
                      actionLabel="Start a Quiz"
                      actionHref="/generate"
                    />
                  ) : (
                    <div className="space-y-4">
                      {quizzes.slice(0, 3).map((quiz, index) => (
                        <motion.div key={quiz.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${quiz.score ? getScoreBg(quiz.score) : "bg-primary/10"}`}>
                              <span className={`font-bold text-sm ${quiz.score ? getScoreColor(quiz.score) : "text-primary"}`}>
                                {quiz.score ? `${quiz.score}%` : "—"}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{quiz.title || quiz.subject}</p>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />{formatDate(quiz.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />{quiz.questionCount} Qs
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                              {quiz.difficulty}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── QUIZ HISTORY TAB ──────────────────────────────────────────────── */}
          {activeTab === "history" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />Quiz History
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search quizzes..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredQuizzes.length === 0 ? (
                    <EmptyState
                      icon={History}
                      title={searchQuery ? "No results found" : "No quiz history yet"}
                      description={searchQuery ? "Try a different search term." : "Your completed quizzes will appear here."}
                      actionLabel={!searchQuery ? "Take Your First Quiz" : undefined}
                      actionHref={!searchQuery ? "/generate" : undefined}
                    />
                  ) : (
                    <div className="space-y-4">
                      {filteredQuizzes.map((quiz, index) => (
                        <motion.div key={quiz.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${quiz.score ? getScoreBg(quiz.score) : "bg-primary/10"}`}>
                                <span className={`text-lg font-bold ${quiz.score ? getScoreColor(quiz.score) : "text-primary"}`}>
                                  {quiz.score ? `${quiz.score}%` : "—"}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-lg">{quiz.title || quiz.subject}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />{formatDate(quiz.createdAt)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />{quiz.questionCount} questions
                                  </span>
                                  {quiz.correctAnswers !== undefined && (
                                    <span className="flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                      {quiz.correctAnswers}/{quiz.questionCount}
                                    </span>
                                  )}
                                </div>
                                {quiz.topics && quiz.topics.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {quiz.topics.map((topic) => (
                                      <span key={topic} className="px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary border border-primary/20">
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                              <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                                {quiz.difficulty}
                              </span>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />Review
                              </Button>
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

          {/* ── ANALYTICS TAB ─────────────────────────────────────────────────── */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {quizzes.length === 0 ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent>
                    <EmptyState
                      icon={TrendingUp}
                      title="No analytics yet"
                      description="Complete some quizzes to unlock detailed analytics."
                      actionLabel="Start a Quiz"
                      actionHref="/generate"
                    />
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Quizzes",  value: quizzes.length,      icon: Clock        },
                      { label: "Questions Done", value: totalQuestions,      icon: CheckCircle2 },
                      { label: "Accuracy Rate",  value: `${avgScore}%`,      icon: Target       },
                      { label: "Study Streak",   value: `${studyStreak} days`, icon: TrendingUp },
                    ].map((stat, index) => (
                      <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <stat.icon className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardHeader><CardTitle>Subject Performance</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {subjectBreakdown.map((subject, index) => (
                            <div key={subject.subject} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{subject.subject}</span>
                                <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>{subject.score}%</span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${subject.score}%` }}
                                  transition={{ delay: index * 0.1, duration: 0.5 }}
                                  className={`h-full ${subject.color} rounded-full`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardHeader><CardTitle>Weekly Performance</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex items-end justify-between h-48 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                            <div key={day} className="flex flex-col items-center gap-2 flex-1">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${weeklyScores[index]}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="w-full bg-primary rounded-t-sm"
                              />
                              <span className="text-xs text-muted-foreground">{day}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── WEAK TOPICS TAB ───────────────────────────────────────────────── */}
          {activeTab === "weak-topics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Topics That Need Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weakTopics.length === 0 ? (
                    <EmptyState
                      icon={CheckCircle2}
                      title={quizzes.length === 0 ? "No quiz data yet" : "No weak topics!"}
                      description={quizzes.length === 0
                        ? "Take quizzes to identify topics that need practice."
                        : "You're scoring above 70% on all topics. Keep it up!"}
                      actionLabel={quizzes.length === 0 ? "Take a Quiz" : undefined}
                      actionHref={quizzes.length === 0 ? "/generate" : undefined}
                    />
                  ) : (
                    <div className="space-y-4">
                      {weakTopics.map((topic, index) => (
                        <motion.div key={topic.topic} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{topic.topic}</h3>
                                <span className="px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary border border-primary/20">
                                  {topic.subject}
                                </span>
                                {getTrendIcon(topic.trend)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{topic.quizzesTaken} quizzes taken</span>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm">Accuracy</span>
                                  <span className={`text-sm font-bold ${getScoreColor(topic.accuracy)}`}>{topic.accuracy}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${topic.accuracy}%` }}
                                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                    className={`h-full rounded-full ${topic.accuracy >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                                  />
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/generate">
                                <Brain className="h-4 w-4 mr-1" />Practice
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── SAVED PDFs TAB ────────────────────────────────────────────────── */}
          {activeTab === "pdfs" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />Saved Documents
                    </CardTitle>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href="/generate">
                        <Plus className="h-4 w-4 mr-2" />Upload PDF
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <EmptyState
                    icon={FileText}
                    title="No saved PDFs"
                    description="Upload a PDF to generate quizzes from your study materials."
                    actionLabel="Upload a PDF"
                    actionHref="/generate"
                  />
                </CardContent>
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

                  {/* Profile — Firebase se real data */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Profile</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">{initials}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        {user?.role && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1 inline-block capitalize">
                            {user.role}
                          </span>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Edit</Button>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Preferences */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                        </div>
                        <Button variant="outline" size="sm"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                          {mounted && theme === "dark" ? "Light" : "Dark"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive quiz reminders</p>
                        </div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Danger Zone */}
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