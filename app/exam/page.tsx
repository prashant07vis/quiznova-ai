"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Flag,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Moon,
  Sun,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Target,
  BarChart3,
  XCircle,
  Check,
  X,
  Home,
  FileText
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface MCQ {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuestionStatus {
  answered: boolean
  selectedOption: number | null
  markedForReview: boolean
}

const examQuestions: MCQ[] = [
  {
    id: 1,
    question: "What is the primary function of chlorophyll in photosynthesis?",
    options: [
      "To store glucose for later use",
      "To absorb light energy from the sun",
      "To release oxygen into the atmosphere",
      "To transport water through the plant"
    ],
    correctAnswer: 1,
    explanation: "Chlorophyll is the green pigment in plants that absorbs light energy, primarily from the blue and red portions of the electromagnetic spectrum, which is essential for photosynthesis."
  },
  {
    id: 2,
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Endoplasmic reticulum"
    ],
    correctAnswer: 2,
    explanation: "Mitochondria are called the powerhouse of the cell because they generate most of the cell's supply of ATP, which is used as a source of chemical energy."
  },
  {
    id: 3,
    question: "What is the chemical equation for photosynthesis?",
    options: [
      "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
      "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
      "2H₂O → 2H₂ + O₂",
      "CO₂ + H₂O → CH₄ + O₂"
    ],
    correctAnswer: 0,
    explanation: "Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy."
  },
  {
    id: 4,
    question: "In which part of the chloroplast does the light-dependent reaction occur?",
    options: [
      "Stroma",
      "Outer membrane",
      "Thylakoid membrane",
      "Inner membrane"
    ],
    correctAnswer: 2,
    explanation: "Light-dependent reactions occur in the thylakoid membranes where chlorophyll and other pigments are embedded to capture light energy."
  },
  {
    id: 5,
    question: "What is the main product of the Calvin cycle?",
    options: [
      "Oxygen",
      "ATP",
      "NADPH",
      "Glucose (G3P)"
    ],
    correctAnswer: 3,
    explanation: "The Calvin cycle produces G3P (glyceraldehyde-3-phosphate), which is used to synthesize glucose and other organic compounds."
  },
  {
    id: 6,
    question: "Which gas is released as a byproduct of photosynthesis?",
    options: [
      "Carbon dioxide",
      "Nitrogen",
      "Oxygen",
      "Hydrogen"
    ],
    correctAnswer: 2,
    explanation: "Oxygen is released as a byproduct when water molecules are split during the light-dependent reactions of photosynthesis."
  },
  {
    id: 7,
    question: "What type of energy transformation occurs during photosynthesis?",
    options: [
      "Chemical to thermal",
      "Light to chemical",
      "Mechanical to electrical",
      "Nuclear to thermal"
    ],
    correctAnswer: 1,
    explanation: "Photosynthesis transforms light energy from the sun into chemical energy stored in glucose molecules."
  },
  {
    id: 8,
    question: "Which pigment gives plants their green color?",
    options: [
      "Carotenoid",
      "Xanthophyll",
      "Chlorophyll",
      "Anthocyanin"
    ],
    correctAnswer: 2,
    explanation: "Chlorophyll absorbs red and blue light while reflecting green light, giving plants their characteristic green color."
  },
  {
    id: 9,
    question: "Where does the Calvin cycle take place?",
    options: [
      "Thylakoid membrane",
      "Stroma",
      "Cytoplasm",
      "Mitochondria"
    ],
    correctAnswer: 1,
    explanation: "The Calvin cycle (light-independent reactions) occurs in the stroma, the fluid-filled space surrounding the thylakoids."
  },
  {
    id: 10,
    question: "What is the role of water in photosynthesis?",
    options: [
      "It provides electrons and hydrogen ions",
      "It dissolves carbon dioxide",
      "It cools the plant",
      "It transports glucose"
    ],
    correctAnswer: 0,
    explanation: "Water molecules are split during the light reactions, providing electrons to replace those lost by chlorophyll and hydrogen ions for ATP synthesis."
  }
]

const EXAM_DURATION = 10 * 60 // 10 minutes in seconds

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus[]>(
    examQuestions.map(() => ({
      answered: false,
      selectedOption: null,
      markedForReview: false
    }))
  )
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer countdown
  useEffect(() => {
    if (examSubmitted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectOption = (optionIndex: number) => {
    if (examSubmitted) return
    
    setQuestionStatus((prev) => {
      const updated = [...prev]
      updated[currentQuestion] = {
        ...updated[currentQuestion],
        answered: true,
        selectedOption: optionIndex
      }
      return updated
    })
  }

  const handleMarkForReview = () => {
    setQuestionStatus((prev) => {
      const updated = [...prev]
      updated[currentQuestion] = {
        ...updated[currentQuestion],
        markedForReview: !updated[currentQuestion].markedForReview
      }
      return updated
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmitExam = useCallback(() => {
    setExamSubmitted(true)
    setShowConfirmSubmit(false)
  }, [])

  const handleRestartExam = () => {
    setCurrentQuestion(0)
    setQuestionStatus(
      examQuestions.map(() => ({
        answered: false,
        selectedOption: null,
        markedForReview: false
      }))
    )
    setTimeRemaining(EXAM_DURATION)
    setExamSubmitted(false)
  }

  const calculateScore = () => {
    let correct = 0
    let incorrect = 0
    let unattempted = 0

    questionStatus.forEach((status, index) => {
      if (status.selectedOption === null) {
        unattempted++
      } else if (status.selectedOption === examQuestions[index].correctAnswer) {
        correct++
      } else {
        incorrect++
      }
    })

    return { correct, incorrect, unattempted, total: examQuestions.length }
  }

  const answeredCount = questionStatus.filter(s => s.answered).length
  const reviewCount = questionStatus.filter(s => s.markedForReview).length
  const progressPercentage = (answeredCount / examQuestions.length) * 100

  const getQuestionButtonStyle = (index: number) => {
    const status = questionStatus[index]
    if (index === currentQuestion) {
      return "ring-2 ring-primary ring-offset-2 ring-offset-background"
    }
    if (status.markedForReview && status.answered) {
      return "bg-purple-500 text-white"
    }
    if (status.markedForReview) {
      return "bg-yellow-500 text-white"
    }
    if (status.answered) {
      return "bg-green-500 text-white"
    }
    return "bg-secondary text-secondary-foreground"
  }

  // Results View
  if (examSubmitted) {
    const score = calculateScore()
    const percentage = Math.round((score.correct / score.total) * 100)
    
    return (
      <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-medium">Exam Completed</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-balance">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Results
                </span>
              </h1>
            </motion.div>

            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 mb-8 glow-sm"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="oklch(0.65 0.28 280)" />
                        <stop offset="100%" stopColor="oklch(0.55 0.22 200)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">{percentage}%</span>
                    <span className="text-sm text-muted-foreground">Score</span>
                  </div>
                </div>
                <p className="text-xl font-semibold">
                  {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : percentage >= 40 ? "Keep Practicing!" : "Need Improvement"}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-500">{score.correct}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
                  <XCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-500">{score.incorrect}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 text-center">
                  <Circle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-500">{score.unattempted}</p>
                  <p className="text-sm text-muted-foreground">Skipped</p>
                </div>
                <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
                  <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{score.total}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </motion.div>

            {/* Detailed Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Question Analysis</h2>
              </div>
              
              {examQuestions.map((question, index) => {
                const status = questionStatus[index]
                const isCorrect = status.selectedOption === question.correctAnswer
                const wasAttempted = status.selectedOption !== null
                
                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`rounded-xl border p-5 ${
                      wasAttempted 
                        ? isCorrect 
                          ? "border-green-500/30 bg-green-500/5" 
                          : "border-red-500/30 bg-red-500/5"
                        : "border-yellow-500/30 bg-yellow-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        wasAttempted
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}>
                        {wasAttempted ? (
                          isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">-</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-3">
                          <span className="text-muted-foreground mr-2">Q{index + 1}.</span>
                          {question.question}
                        </p>
                        <div className="grid gap-2">
                          {question.options.map((option, optIndex) => {
                            const isSelected = status.selectedOption === optIndex
                            const isCorrectOption = question.correctAnswer === optIndex
                            
                            return (
                              <div
                                key={optIndex}
                                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-3 ${
                                  isCorrectOption
                                    ? "bg-green-500/20 border border-green-500/30"
                                    : isSelected
                                      ? "bg-red-500/20 border border-red-500/30"
                                      : "bg-secondary/50 border border-border"
                                }`}
                              >
                                <span className="w-6 h-6 rounded-full bg-background/50 flex items-center justify-center text-xs font-medium">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span className="flex-1">{option}</span>
                                {isCorrectOption && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                                {isSelected && !isCorrectOption && (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            )
                          })}
                        </div>
                        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Explanation: </span>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleRestartExam}
                className="border-border"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Exam
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-border"
              >
                <Link href="/generate">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate New Quiz
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  // Exam View
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Sticky Header with Timer */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-7 w-7 text-primary" />
                <div className="absolute inset-0 blur-lg bg-primary/30" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:inline">QuizNova AI</span>
            </Link>

            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
              timeRemaining <= 60 
                ? "bg-red-500/10 border-red-500/30 text-red-500" 
                : timeRemaining <= 120
                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
                  : "bg-primary/10 border-primary/20 text-primary"
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold text-lg">{formatTime(timeRemaining)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-border"
                onClick={() => setShowPalette(!showPalette)}
              >
                Questions
              </Button>
            </div>
          </nav>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-secondary">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 lg:py-8 relative z-10">
        <div className="flex gap-6 max-w-6xl mx-auto">
          {/* Question Panel */}
          <div className="flex-1">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 lg:p-8 glow-sm"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {currentQuestion + 1}
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {examQuestions.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {questionStatus[currentQuestion].markedForReview && (
                        <span className="text-yellow-500">Marked for Review</span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReview}
                  className={`border-border ${questionStatus[currentQuestion].markedForReview ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" : ""}`}
                >
                  <Flag className={`h-4 w-4 mr-2 ${questionStatus[currentQuestion].markedForReview ? "fill-yellow-500" : ""}`} />
                  {questionStatus[currentQuestion].markedForReview ? "Marked" : "Mark for Review"}
                </Button>
              </div>

              {/* Question Text */}
              <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-balance">
                {examQuestions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {examQuestions[currentQuestion].options.map((option, index) => {
                  const isSelected = questionStatus[currentQuestion].selectedOption === index
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                        isSelected
                          ? "bg-primary/10 border-primary/50 ring-2 ring-primary/20"
                          : "bg-background/50 border-border hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-border"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {/* Mobile Palette Toggle */}
                  <Button
                    variant="outline"
                    className="sm:hidden border-border"
                    onClick={() => setShowPalette(!showPalette)}
                  >
                    Questions
                  </Button>

                  {currentQuestion === examQuestions.length - 1 ? (
                    <Button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Submit Exam
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Question Palette - Desktop */}
          <div className="hidden lg:block w-72">
            <div className="sticky top-24 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5">
              <h3 className="font-semibold mb-4">Question Palette</h3>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-secondary" />
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-yellow-500" />
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-purple-500" />
                  <span>Review + Ans</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {examQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${getQuestionButtonStyle(index)}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="space-y-2 text-sm pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Answered</span>
                  <span className="font-medium text-green-500">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">For Review</span>
                  <span className="font-medium text-yellow-500">{reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">{examQuestions.length - answeredCount}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Question Palette */}
      <AnimatePresence>
        {showPalette && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPalette(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-5 z-50 lg:hidden max-h-[70vh] overflow-auto"
            >
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
              <h3 className="font-semibold mb-4">Question Palette</h3>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-secondary" />
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-yellow-500" />
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-purple-500" />
                  <span>Review + Ans</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {examQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index)
                      setShowPalette(false)
                    }}
                    className={`w-12 h-12 rounded-lg font-medium text-sm transition-all ${getQuestionButtonStyle(index)}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-around text-sm pt-4 border-t border-border">
                <div className="text-center">
                  <p className="font-bold text-green-500">{answeredCount}</p>
                  <p className="text-muted-foreground text-xs">Answered</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-yellow-500">{reviewCount}</p>
                  <p className="text-muted-foreground text-xs">Review</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{examQuestions.length - answeredCount}</p>
                  <p className="text-muted-foreground text-xs">Remaining</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showConfirmSubmit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmSubmit(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl p-6 z-50 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Submit Exam?</h3>
                <p className="text-muted-foreground mb-6">
                  You have answered {answeredCount} out of {examQuestions.length} questions.
                  {reviewCount > 0 && ` ${reviewCount} question(s) are marked for review.`}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-border"
                    onClick={() => setShowConfirmSubmit(false)}
                  >
                    Continue Exam
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleSubmitExam}
                  >
                    Submit Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
