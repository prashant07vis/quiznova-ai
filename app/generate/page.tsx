"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles, Upload, FileText, X, ChevronDown, Check, Download,
  PlayCircle, Brain, Loader2, ArrowLeft, Moon, Sun, Lock, Crown,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { getPlanLimits, type Plan } from "@/lib/plan-limits"
import { useRouter } from "next/navigation"

interface MCQ {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const difficultyLevels = ["Easy", "Medium", "Hard"]

export default function GeneratePage() {
  const [topic, setTopic] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [difficulty, setDifficulty] = useState("Medium")
  const [questionCount, setQuestionCount] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMCQs, setGeneratedMCQs] = useState<MCQ[]>([])
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [difficultyOpen, setDifficultyOpen] = useState(false)
  const [countOpen, setCountOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [currentUid, setCurrentUid] = useState<string | null>(null)
  const [userPlan, setUserPlan] = useState<Plan>("free")
  const [dailyCount, setDailyCount] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const limits = getPlanLimits(userPlan)

  // ── Auth + Load user plan ──────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUid(null)
        return
      }
      setCurrentUid(user.uid)

      try {
        const snap = await getDoc(doc(db, "users", user.uid))
        if (snap.exists()) {
          const data = snap.data()
          setUserPlan((data.plan as Plan) || "free")
        }
      } catch (e) {
        console.error("Failed to load user plan:", e)
      }

      await loadDailyCount(user.uid)
    })
    return () => unsub()
  }, [])

  const loadDailyCount = async (uid: string) => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const q = query(
        collection(db, "quizzes"),
        where("uid", "==", uid),
        where("createdAt", ">=", today)
      )
      const snap = await getDocs(q)
      setDailyCount(snap.size)
    } catch (e) {
      console.error("Failed to load daily count:", e)
    }
  }

  const saveQuizToFirestore = async (mcqs: MCQ[]) => {
    if (!currentUid || !limits.saveQuizzes) return
    try {
      await addDoc(collection(db, "quizzes"), {
        uid: currentUid,
        title: topic || uploadedFile?.name || "Untitled Quiz",
        subject: topic || uploadedFile?.name || "General",
        difficulty,
        questionCount: mcqs.length,
        topics: [],
        createdAt: serverTimestamp(),
      })
      setIsSaved(true)
      setDailyCount(prev => prev + 1)
    } catch (error) {
      console.error("Failed to save quiz:", error)
    }
  }

  const saveGenerationCount = async () => {
    if (!currentUid) return
    try {
      await addDoc(collection(db, "quizzes"), {
        uid: currentUid,
        title: topic || uploadedFile?.name || "Untitled Quiz",
        subject: topic || uploadedFile?.name || "General",
        difficulty,
        questionCount,
        topics: [],
        createdAt: serverTimestamp(),
      })
      setDailyCount(prev => prev + 1)
    } catch (e) {
      console.error(e)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUploadedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && (
      file.type === "application/pdf" ||
      file.type === "text/plain" ||
      file.name.endsWith(".docx")
    )) {
      setUploadedFile(file)
    }
  }

  const triggerUpgrade = (reason: string) => {
    setUpgradeReason(reason)
    setShowUpgradeModal(true)
  }

  // ── Generate MCQs ──────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!topic && !uploadedFile) return

    if (userPlan === "free" && dailyCount >= limits.dailyGenerations) {
      triggerUpgrade("daily_limit")
      return
    }

    if (userPlan === "free" && questionCount > limits.maxQuestions) {
      triggerUpgrade("question_limit")
      return
    }

    try {
      setIsGenerating(true)
      setIsSaved(false)
      setGeneratedMCQs([])

      let response: Response

      if (uploadedFile) {
        // ── PDF/File upload wala case — FormData use karo ────────────────────
        const formData = new FormData()
        formData.append("file", uploadedFile)
        formData.append("topic", topic || "")
        formData.append("difficulty", difficulty)
        formData.append("questionCount", questionCount.toString())

        response = await fetch("/api/generate", {
          method: "POST",
          body: formData, // Content-Type automatically multipart/form-data set hoga
        })
      } else {
        // ── Normal topic wala case — JSON use karo ───────────────────────────
        response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, difficulty, questionCount }),
        })
      }

      const data = await response.json()

      if (data.success) {
        let cleanedText = data.data
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()

        const jsonMatch = cleanedText.match(/\[[\s\S]*\]/)
        if (jsonMatch) cleanedText = jsonMatch[0]

        const parsedMCQs = JSON.parse(cleanedText)
        const mcqsWithIds: MCQ[] = parsedMCQs.map((mcq: any, index: number) => ({
          ...mcq,
          id: index + 1,
        }))

        setGeneratedMCQs(mcqsWithIds)

        // Save karo
        if (limits.saveQuizzes) {
          await saveQuizToFirestore(mcqsWithIds)
        } else {
          await saveGenerationCount()
        }
      } else {
        alert("Failed to generate MCQs. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // ── Start Quiz — generated questions ke saath ──────────────────────────────
  const handleStartQuiz = () => {
    if (generatedMCQs.length === 0) return
    // Questions ko sessionStorage mein save karo
    sessionStorage.setItem("examQuestions", JSON.stringify(generatedMCQs))
    router.push("/exam")
  }

  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleDownloadPDF = (type: "questions" | "answers") => {
    if (!limits.pdfExport) {
      triggerUpgrade("pdf_export")
      return
    }
    alert(`${type === "questions" ? "Questions" : "Answer Sheet"} PDF — Coming soon!`)
  }

  const remainingGenerations = userPlan === "free"
    ? Math.max(0, limits.dailyGenerations - dailyCount)
    : Infinity

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Upgrade Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowUpgradeModal(false)}
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
                <h2 className="text-2xl font-bold mb-2">🚀 Upgrade to Pro</h2>
                <p className="text-muted-foreground">
                  {upgradeReason === "daily_limit"    && "You have reached your free plan limit of 3 generations per day."}
                  {upgradeReason === "question_limit" && "Free plan supports maximum 10 questions per quiz."}
                  {upgradeReason === "pdf_export"     && "PDF export is available in Pro plan only."}
                  {upgradeReason === "explanation"    && "AI explanations are available in Pro plan only."}
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-center text-muted-foreground">Unlock with Pro:</p>
                {[
                  "Unlimited quiz generations",
                  "Up to 100 questions per quiz",
                  "PDF export & Answer sheets",
                  "AI explanations",
                  "Analytics & Weak topic analysis",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowUpgradeModal(false)}>
                  Maybe Later
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link href="/pricing" onClick={() => setShowUpgradeModal(false)}>
                    Upgrade Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-7 w-7 text-primary" />
                <div className="absolute inset-0 blur-lg bg-primary/30" />
              </div>
              <span className="font-bold text-lg tracking-tight">QuizNova AI</span>
            </Link>
            <div className="flex items-center gap-3">
              {userPlan === "free" && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-yellow-500 font-medium">
                    {remainingGenerations}/3 free left today
                  </span>
                </div>
              )}
              {userPlan !== "free" && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Crown className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary font-medium capitalize">
                    {userPlan === "teacher_pro" ? "Teacher Pro" : "Pro"}
                  </span>
                </div>
              )}
              <Button variant="ghost" size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />Dashboard
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI MCQ Generator</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Generate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                intelligent MCQs
              </span>{" "}
              instantly
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enter a topic or upload a document, and let our AI create high-quality multiple choice questions for you.
            </p>
            {userPlan === "free" && remainingGenerations === 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Daily limit reached. <Link href="/pricing" className="underline font-medium">Upgrade to Pro</Link> for unlimited generations.</span>
              </div>
            )}
            {userPlan === "free" && remainingGenerations > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">{remainingGenerations} free generation{remainingGenerations !== 1 ? "s" : ""} remaining today</span>
              </div>
            )}
          </motion.div>

          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 lg:p-8 mb-8"
          >
            <div className="space-y-6">

              {/* Topic Input */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium">
                  Topic or Subject
                  {uploadedFile && <span className="text-muted-foreground font-normal ml-1">(optional when file uploaded)</span>}
                </Label>
                <Input
                  id="topic"
                  placeholder="e.g., Photosynthesis in plants, World War II, Python programming..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 bg-background/50 border-border"
                />
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <Label htmlFor="context" className="text-sm font-medium">
                  Additional Context{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="context"
                  placeholder="Add any specific focus areas, learning objectives, or guidelines..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="min-h-[80px] bg-background/50 border-border resize-none"
                />
              </div>

              {/* PDF Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Upload Document{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                {userPlan === "free" && (
                  <p className="text-xs text-muted-foreground">Free plan: Max 5 page documents</p>
                )}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button variant="ghost" size="icon"
                        onClick={(e) => { e.stopPropagation(); setUploadedFile(null) }}
                        className="ml-2">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium text-foreground mb-1">Drop your file here or click to browse</p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, TXT, DOCX {userPlan === "free" ? "(Max 5 pages)" : "(Max 200 pages)"}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Difficulty Level</Label>
                  <div className="relative">
                    <button
                      onClick={() => setDifficultyOpen(!difficultyOpen)}
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background/50 flex items-center justify-between text-left hover:border-primary/50 transition-colors"
                    >
                      <span className={difficulty === "Easy" ? "text-green-500" : difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}>
                        {difficulty}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${difficultyOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {difficultyOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden"
                        >
                          {difficultyLevels.map((level) => (
                            <button key={level}
                              onClick={() => { setDifficulty(level); setDifficultyOpen(false) }}
                              className="w-full px-4 py-3 text-left hover:bg-secondary flex items-center justify-between transition-colors"
                            >
                              <span className={level === "Easy" ? "text-green-500" : level === "Medium" ? "text-yellow-500" : "text-red-500"}>
                                {level}
                              </span>
                              {difficulty === level && <Check className="h-4 w-4 text-primary" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Question Count */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Number of Questions</Label>
                  <div className="relative">
                    <button
                      onClick={() => setCountOpen(!countOpen)}
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background/50 flex items-center justify-between text-left hover:border-primary/50 transition-colors"
                    >
                      <span>{questionCount} Questions</span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${countOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {countOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden"
                        >
                          {limits.questionCounts.map((count) => (
                            <button key={count}
                              onClick={() => { setQuestionCount(count); setCountOpen(false) }}
                              className="w-full px-4 py-3 text-left hover:bg-secondary flex items-center justify-between transition-colors"
                            >
                              <span>{count} Questions</span>
                              {questionCount === count && <Check className="h-4 w-4 text-primary" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={(!topic && !uploadedFile) || isGenerating || (userPlan === "free" && remainingGenerations === 0)}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Generating MCQs...</>
                ) : userPlan === "free" && remainingGenerations === 0 ? (
                  <><Lock className="h-5 w-5 mr-2" />Daily Limit Reached — Upgrade to Pro</>
                ) : (
                  <><Sparkles className="h-5 w-5 mr-2" />Generate MCQs</>
                )}
              </Button>

              {userPlan === "free" && (
                <p className="text-center text-xs text-muted-foreground">
                  Free plan: {remainingGenerations} generation{remainingGenerations !== 1 ? "s" : ""} left today •{" "}
                  <Link href="/pricing" className="text-primary hover:underline font-medium">
                    Upgrade for unlimited
                  </Link>
                </p>
              )}
            </div>
          </motion.div>

          {/* Generated MCQs */}
          <AnimatePresence>
            {generatedMCQs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Generated Questions</h2>
                    <p className="text-sm text-muted-foreground">
                      {generatedMCQs.length} MCQs generated {uploadedFile ? `from ${uploadedFile.name}` : `about "${topic}"`}
                    </p>
                    {isSaved && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-500 mt-1">
                        <Check className="h-3 w-3" />Saved to your dashboard
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {limits.pdfExport ? (
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPDF("questions")} className="border-border">
                        <Download className="h-4 w-4 mr-2" />Questions PDF
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => triggerUpgrade("pdf_export")} className="border-border text-muted-foreground">
                        <Lock className="h-4 w-4 mr-2" />PDF Export (Pro)
                      </Button>
                    )}
                    {limits.answerSheet ? (
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPDF("answers")} className="border-border">
                        <Download className="h-4 w-4 mr-2" />Answer Sheet
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => triggerUpgrade("pdf_export")} className="border-border text-muted-foreground">
                        <Lock className="h-4 w-4 mr-2" />Answer Sheet (Pro)
                      </Button>
                    )}
                    {/* Start Quiz — generated questions ke saath */}
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={handleStartQuiz}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />Start Quiz
                    </Button>
                  </div>
                </div>

                {/* MCQ Cards */}
                <div className="space-y-4">
                  {generatedMCQs.map((mcq, index) => (
                    <motion.div
                      key={mcq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 lg:p-6 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex gap-4 mb-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">
                          {mcq.id}
                        </span>
                        <p className="font-medium text-foreground pt-1">{mcq.question}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                        {mcq.options.map((option, optIndex) => {
                          const isCorrect = optIndex === mcq.correctAnswer
                          const showAnswer = showAnswers[mcq.id]
                          return (
                            <button
                              key={optIndex}
                              type="button"
                              onClick={() => setSelectedAnswers(prev => ({ ...prev, [mcq.id]: optIndex }))}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 w-full text-left ${
                                selectedAnswers[mcq.id] === optIndex
                                  ? "border-primary bg-primary/10"
                                  : showAnswer && isCorrect
                                  ? "border-green-500/50 bg-green-500/10"
                                  : "border-border bg-background/30 hover:border-primary/30"
                              }`}
                            >
                              <div className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0">
                                {selectedAnswers[mcq.id] === optIndex && (
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <span className="text-sm">{option}</span>
                            </button>
                          )
                        })}
                      </div>

                      {/* AI Explanation */}
                      <div className="mt-4 ml-12">
                        {limits.aiExplanations ? (
                          <>
                            <button
                              onClick={() => toggleAnswer(mcq.id)}
                              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                              {showAnswers[mcq.id] ? "Hide Answer" : "Show Answer"}
                            </button>
                            <AnimatePresence>
                              {showAnswers[mcq.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                  <p className="text-sm text-muted-foreground">
                                    <span className="text-primary font-medium">Explanation: </span>
                                    {mcq.explanation}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <button
                            onClick={() => triggerUpgrade("explanation")}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Lock className="h-4 w-4" />
                            <span>AI Explanation available in Pro —{" "}
                              <span className="text-primary hover:underline">Upgrade to Pro</span>
                            </span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Button variant="outline"
                    onClick={() => { setGeneratedMCQs([]); setShowAnswers({}); setIsSaved(false) }}
                    className="w-full sm:w-auto border-border">
                    Generate New Questions
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow"
                    onClick={handleStartQuiz}
                  >
                    <PlayCircle className="h-5 w-5 mr-2" />Start Interactive Quiz
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  )
}