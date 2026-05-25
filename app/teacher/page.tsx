"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  FileText,
  Download,
  Shuffle,
  Copy,
  Printer,
  ChevronDown,
  Plus,
  Trash2,
  GraduationCap,
  BookOpen,
  Settings,
  Eye,
  Moon,
  Sun,
  ArrowLeft,
  Check,
  FileDown,
  ClipboardList,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Economics",
  "Psychology",
]

const questionTypes = ["Multiple Choice", "True/False", "Fill in the Blanks", "Short Answer", "Match the Following"]

const difficultyLevels = [
  { value: "easy", label: "Easy", color: "text-green-500" },
  { value: "medium", label: "Medium", color: "text-yellow-500" },
  { value: "hard", label: "Hard", color: "text-red-500" },
  { value: "mixed", label: "Mixed", color: "text-primary" },
]

interface ExamSet {
  id: number
  name: string
  questions: number
  shuffled: boolean
}

export default function TeacherModePage() {
  const { theme, setTheme } = useTheme()
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [questionType, setQuestionType] = useState("Multiple Choice")
  const [difficulty, setDifficulty] = useState("medium")
  const [questionCount, setQuestionCount] = useState(20)
  const [duration, setDuration] = useState(60)
  const [instructions, setInstructions] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [examGenerated, setExamGenerated] = useState(false)
  const [examSets, setExamSets] = useState<ExamSet[]>([
    { id: 1, name: "Set A", questions: 20, shuffled: false },
  ])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setExamGenerated(true)
    }, 2500)
  }

  const addExamSet = () => {
    const newSet: ExamSet = {
      id: examSets.length + 1,
      name: `Set ${String.fromCharCode(65 + examSets.length)}`,
      questions: questionCount,
      shuffled: true,
    }
    setExamSets([...examSets, newSet])
  }

  const removeExamSet = (id: number) => {
    if (examSets.length > 1) {
      setExamSets(examSets.filter((set) => set.id !== id))
    }
  }

  const shuffleSet = (id: number) => {
    setExamSets(examSets.map((set) => (set.id === id ? { ...set, shuffled: true } : set)))
  }

  // Sample generated questions for preview
  const sampleQuestions = [
    {
      id: 1,
      question: "What is the derivative of x² with respect to x?",
      options: ["x", "2x", "2", "x²"],
      correct: 1,
    },
    {
      id: 2,
      question: "Which of the following is the integral of 2x?",
      options: ["x", "x²", "x² + C", "2x²"],
      correct: 2,
    },
    {
      id: 3,
      question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
      options: ["1", "e", "π", "∞"],
      correct: 1,
    },
    {
      id: 4,
      question: "The second derivative test is used to determine:",
      options: ["Slope", "Concavity", "Area", "Volume"],
      correct: 1,
    },
    {
      id: 5,
      question: "What is the chain rule used for?",
      options: ["Adding functions", "Composite functions", "Multiplying functions", "Dividing functions"],
      correct: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">QuizNova AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Teacher Mode</span>
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Exam Paper Generator
              </span>
            </h1>
            <p className="text-muted-foreground">Create professional exam papers with AI assistance</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Settings Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Exam Configuration</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Subject Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === "subject" ? null : "subject")}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors"
                      >
                        <span className={subject ? "text-foreground" : "text-muted-foreground"}>
                          {subject || "Select subject"}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "subject" ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === "subject" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden"
                          >
                            {subjects.map((s) => (
                              <button
                                key={s}
                                onClick={() => {
                                  setSubject(s)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-4 py-2.5 text-left hover:bg-primary/10 transition-colors flex items-center justify-between"
                              >
                                {s}
                                {subject === s && <Check className="h-4 w-4 text-primary" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Topic Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Topic / Chapter</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Calculus, Thermodynamics"
                      className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>

                  {/* Question Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Question Type</label>
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === "type" ? null : "type")}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors"
                      >
                        <span>{questionType}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "type" ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === "type" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden"
                          >
                            {questionTypes.map((t) => (
                              <button
                                key={t}
                                onClick={() => {
                                  setQuestionType(t)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-4 py-2.5 text-left hover:bg-primary/10 transition-colors flex items-center justify-between"
                              >
                                {t}
                                {questionType === t && <Check className="h-4 w-4 text-primary" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Difficulty Level</label>
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === "difficulty" ? null : "difficulty")}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors"
                      >
                        <span className={difficultyLevels.find((d) => d.value === difficulty)?.color}>
                          {difficultyLevels.find((d) => d.value === difficulty)?.label}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "difficulty" ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === "difficulty" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden"
                          >
                            {difficultyLevels.map((d) => (
                              <button
                                key={d.value}
                                onClick={() => {
                                  setDifficulty(d.value)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-4 py-2.5 text-left hover:bg-primary/10 transition-colors flex items-center justify-between"
                              >
                                <span className={d.color}>{d.label}</span>
                                {difficulty === d.value && <Check className="h-4 w-4 text-primary" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Number of Questions */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Number of Questions</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <span className="w-12 text-center font-semibold text-primary">{questionCount}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Duration (minutes)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="15"
                        max="180"
                        step="15"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <span className="w-12 text-center font-semibold text-primary">{duration}</span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Exam Instructions (Optional)</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add any specific instructions for students..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  />
                </div>
              </motion.div>

              {/* Exam Sets Management */}
              {examGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">Exam Sets</h2>
                    </div>
                    <Button onClick={addExamSet} size="sm" variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Set
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {examSets.map((set, index) => (
                      <motion.div
                        key={set.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{set.name}</h3>
                          {examSets.length > 1 && (
                            <button
                              onClick={() => removeExamSet(set.id)}
                              className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{set.questions} questions</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => shuffleSet(set.id)}
                            className="flex-1 gap-1"
                          >
                            <Shuffle className="h-3 w-3" />
                            Shuffle
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 gap-1">
                            <Download className="h-3 w-3" />
                            PDF
                          </Button>
                        </div>
                        {set.shuffled && (
                          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                            Shuffled
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Generated Questions Preview */}
              {examGenerated && showPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">Questions Preview</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">Showing 5 of {questionCount}</span>
                  </div>

                  <div className="space-y-4">
                    {sampleQuestions.map((q, index) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl border border-border/50 bg-background/50"
                      >
                        <p className="font-medium mb-3">
                          <span className="text-primary mr-2">Q{q.id}.</span>
                          {q.question}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`px-3 py-2 rounded-lg text-sm ${
                                optIndex === q.correct
                                  ? "bg-green-500/10 border border-green-500/30 text-green-500"
                                  : "bg-muted/50 text-muted-foreground"
                              }`}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                              {option}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Panel - Actions & Summary */}
            <div className="space-y-6">
              {/* Generate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <Button
                  onClick={handleGenerate}
                  disabled={!subject || !topic || isGenerating}
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow disabled:opacity-50"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Exam Paper
                    </>
                  )}
                </Button>

                {examGenerated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-border/50 space-y-3"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="h-4 w-4" />
                      {showPreview ? "Hide Preview" : "Preview Questions"}
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Shuffle className="h-4 w-4" />
                      Shuffle All Questions
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Copy className="h-4 w-4" />
                      Duplicate Exam
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Exam Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Exam Summary</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subject</span>
                    <span className="font-medium">{subject || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topic</span>
                    <span className="font-medium">{topic || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{questionCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{duration} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className={`font-medium ${difficultyLevels.find((d) => d.value === difficulty)?.color}`}>
                      {difficultyLevels.find((d) => d.value === difficulty)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Marks</span>
                    <span className="font-medium">{questionCount}</span>
                  </div>
                </div>
              </motion.div>

              {/* Download Options */}
              {examGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileDown className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Download Options</h2>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Question Paper (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ClipboardList className="h-4 w-4" />
                      Answer Key (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Printer className="h-4 w-4" />
                      Print-Ready Format
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="h-4 w-4" />
                      All Sets (ZIP)
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Tips Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-accent/30 bg-accent/5 p-6"
              >
                <h3 className="font-semibold text-accent mb-3">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    Create multiple shuffled sets to prevent cheating
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    Use mixed difficulty for comprehensive assessment
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    Preview questions before downloading
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
