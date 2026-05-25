"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Sparkles,
  Moon,
  Sun,
  Home,
  History,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Target,
  Award,
  Brain,
  Download,
  Trash2,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus,
  BookOpen,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for dashboard
const quizHistory = [
  {
    id: 1,
    title: "Organic Chemistry - Reactions",
    date: "2024-01-15",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: "18:32",
    difficulty: "Hard",
    topics: ["Alkenes", "Alcohols", "Aldehydes"],
  },
  {
    id: 2,
    title: "World History - World War II",
    date: "2024-01-14",
    score: 92,
    totalQuestions: 25,
    correctAnswers: 23,
    timeSpent: "22:15",
    difficulty: "Medium",
    topics: ["European Theater", "Pacific War", "Holocaust"],
  },
  {
    id: 3,
    title: "Physics - Thermodynamics",
    date: "2024-01-12",
    score: 68,
    totalQuestions: 15,
    correctAnswers: 10,
    timeSpent: "14:45",
    difficulty: "Hard",
    topics: ["Heat Transfer", "Entropy", "Laws of Thermodynamics"],
  },
  {
    id: 4,
    title: "Biology - Cell Division",
    date: "2024-01-10",
    score: 95,
    totalQuestions: 20,
    correctAnswers: 19,
    timeSpent: "16:20",
    difficulty: "Easy",
    topics: ["Mitosis", "Meiosis", "Cell Cycle"],
  },
  {
    id: 5,
    title: "Mathematics - Calculus",
    date: "2024-01-08",
    score: 78,
    totalQuestions: 15,
    correctAnswers: 12,
    timeSpent: "20:10",
    difficulty: "Hard",
    topics: ["Derivatives", "Integrals", "Limits"],
  },
]

const weakTopics = [
  { topic: "Thermodynamics", subject: "Physics", accuracy: 45, quizzesTaken: 5, trend: "down" },
  { topic: "Organic Reactions", subject: "Chemistry", accuracy: 52, quizzesTaken: 8, trend: "up" },
  { topic: "Integration", subject: "Mathematics", accuracy: 58, quizzesTaken: 6, trend: "stable" },
  { topic: "Genetics", subject: "Biology", accuracy: 62, quizzesTaken: 4, trend: "up" },
  { topic: "Electromagnetic Waves", subject: "Physics", accuracy: 48, quizzesTaken: 3, trend: "down" },
]

const savedPDFs = [
  { id: 1, name: "Chemistry Final Prep.pdf", date: "2024-01-15", size: "2.4 MB", questions: 50 },
  { id: 2, name: "Physics Mock Test.pdf", date: "2024-01-12", size: "1.8 MB", questions: 30 },
  { id: 3, name: "Biology Chapter 5 Quiz.pdf", date: "2024-01-10", size: "1.2 MB", questions: 25 },
  { id: 4, name: "Math Practice Set.pdf", date: "2024-01-08", size: "3.1 MB", questions: 60 },
]

const performanceData = {
  totalQuizzes: 47,
  averageScore: 82,
  totalQuestions: 940,
  studyStreak: 12,
  improvement: 8,
  weeklyScores: [75, 78, 82, 80, 85, 88, 82],
  subjectBreakdown: [
    { subject: "Physics", score: 76, color: "bg-chart-1" },
    { subject: "Chemistry", score: 84, color: "bg-chart-2" },
    { subject: "Biology", score: 91, color: "bg-chart-3" },
    { subject: "Mathematics", score: 78, color: "bg-chart-4" },
    { subject: "History", score: 88, color: "bg-chart-5" },
  ],
}

const sidebarItems = [
  { icon: Home, label: "Overview", id: "overview" },
  { icon: History, label: "Quiz History", id: "history" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: AlertTriangle, label: "Weak Topics", id: "weak-topics" },
  { icon: FileText, label: "Saved PDFs", id: "pdfs" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useState(() => {
    setMounted(true)
  })

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

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-500/10 text-green-500 border-green-500/20"
    if (difficulty === "Medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    return "bg-red-500/10 text-red-500 border-red-500/20"
  }

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
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
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <div className="absolute inset-0 blur-lg bg-primary/30" />
                </div>
                <span className="font-bold text-xl tracking-tight">QuizNova AI</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
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

            {/* User Profile */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">JS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">John Student</p>
                  <p className="text-sm text-muted-foreground truncate">john@example.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-1"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="flex-1">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-[280px] pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Welcome back, <span className="text-primary">John</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  {"Here's"} your learning progress overview
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-sm" asChild>
                <Link href="/generate">
                  <Plus className="h-4 w-4 mr-2" />
                  New Quiz
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Quizzes", value: performanceData.totalQuizzes, icon: BookOpen, color: "text-primary" },
                  { label: "Avg. Score", value: `${performanceData.averageScore}%`, icon: Target, color: "text-green-500" },
                  { label: "Questions Solved", value: performanceData.totalQuestions, icon: Brain, color: "text-accent" },
                  { label: "Study Streak", value: `${performanceData.studyStreak} days`, icon: Zap, color: "text-yellow-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          {index === 1 && (
                            <span className="text-xs text-green-500 flex items-center gap-1">
                              <ArrowUp className="h-3 w-3" />
                              {performanceData.improvement}%
                            </span>
                          )}
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
                {/* Weekly Performance Chart */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Weekly Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-48 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="flex flex-col items-center gap-2 flex-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${performanceData.weeklyScores[index]}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                          >
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                              style={{ height: "100%" }}
                            />
                          </motion.div>
                          <span className="text-xs text-muted-foreground">{day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Subject Breakdown */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Subject Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.subjectBreakdown.map((subject, index) => (
                        <motion.div
                          key={subject.subject}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{subject.subject}</span>
                            <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>
                              {subject.score}%
                            </span>
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
                  </CardContent>
                </Card>
              </div>

              {/* Recent Quizzes */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Recent Quizzes
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("history")}>
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizHistory.slice(0, 3).map((quiz, index) => (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${getScoreBg(quiz.score)}`}>
                            <span className={`font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</span>
                          </div>
                          <div>
                            <p className="font-medium">{quiz.title}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {quiz.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {quiz.timeSpent}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quiz History Tab */}
          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Quiz History
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search quizzes..."
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
                  <div className="space-y-4">
                    {quizHistory.map((quiz, index) => (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${getScoreBg(quiz.score)}`}>
                              <span className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</span>
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{quiz.title}</p>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {quiz.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {quiz.timeSpent}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  {quiz.correctAnswers}/{quiz.totalQuestions}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {quiz.topics.map((topic) => (
                                  <span
                                    key={topic}
                                    className="px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary border border-primary/20"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                            <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                              {quiz.difficulty}
                            </span>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Study Hours", value: "48.5h", change: "+12%", icon: Clock },
                  { label: "Questions Mastered", value: "782", change: "+8%", icon: CheckCircle2 },
                  { label: "Accuracy Rate", value: "82%", change: "+5%", icon: Target },
                  { label: "Improvement", value: "+15%", change: "vs last month", icon: TrendingUp },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className="h-5 w-5 text-primary" />
                          <span className="text-xs text-green-500">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-1">
                      {[65, 72, 68, 75, 82, 78, 85, 80, 88, 85, 90, 82].map((score, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${score}%` }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="w-full bg-primary rounded-t-sm"
                          />
                          <span className="text-[10px] text-muted-foreground">
                            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle>Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: "Morning (6AM-12PM)", hours: 12, percent: 25 },
                        { day: "Afternoon (12PM-6PM)", hours: 18, percent: 37 },
                        { day: "Evening (6PM-12AM)", hours: 15, percent: 31 },
                        { day: "Night (12AM-6AM)", hours: 3.5, percent: 7 },
                      ].map((item, index) => (
                        <div key={item.day} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{item.day}</span>
                            <span className="text-sm text-muted-foreground">{item.hours}h</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="h-full bg-accent rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Heatmap */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Study Activity Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }, (_, i) => {
                      const intensity = Math.random()
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.01 }}
                          className={`aspect-square rounded-sm ${
                            intensity > 0.8
                              ? "bg-primary"
                              : intensity > 0.6
                              ? "bg-primary/70"
                              : intensity > 0.4
                              ? "bg-primary/40"
                              : intensity > 0.2
                              ? "bg-primary/20"
                              : "bg-secondary"
                          }`}
                          title={`${Math.floor(intensity * 5)} quizzes`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <span className="text-xs text-muted-foreground">Less</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-sm bg-secondary" />
                      <div className="w-3 h-3 rounded-sm bg-primary/20" />
                      <div className="w-3 h-3 rounded-sm bg-primary/40" />
                      <div className="w-3 h-3 rounded-sm bg-primary/70" />
                      <div className="w-3 h-3 rounded-sm bg-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">More</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Weak Topics Tab */}
          {activeTab === "weak-topics" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Topics That Need Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weakTopics.map((topic, index) => (
                      <motion.div
                        key={topic.topic}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
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
                                <span className={`text-sm font-bold ${getScoreColor(topic.accuracy)}`}>
                                  {topic.accuracy}%
                                </span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${topic.accuracy}%` }}
                                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                  className={`h-full rounded-full ${
                                    topic.accuracy >= 70 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/generate">
                                <Brain className="h-4 w-4 mr-1" />
                                Practice
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Focus on Thermodynamics - Try 10 questions daily for a week",
                      "Review Electromagnetic Waves fundamentals before advanced topics",
                      "Your Organic Reactions accuracy is improving! Keep practicing",
                    ].map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm">{rec}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Saved PDFs Tab */}
          {activeTab === "pdfs" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Saved Documents
                    </CardTitle>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPDFs.map((pdf, index) => (
                      <motion.div
                        key={pdf.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-border hover:border-primary/50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <h3 className="font-semibold truncate mb-1">{pdf.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span>{pdf.size}</span>
                          <span>-</span>
                          <span>{pdf.questions} questions</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{pdf.date}</span>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Profile</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">John Student</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Edit
                      </Button>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                          {mounted && theme === "dark" ? "Light" : "Dark"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive quiz reminders</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
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
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
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
