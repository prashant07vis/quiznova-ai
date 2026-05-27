"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Upload, 
  FileText, 
  X, 
  ChevronDown, 
  Check, 
  Download, 
  PlayCircle, 
  Brain,
  Loader2,
  ArrowLeft,
  Moon,
  Sun,
  CircleCheck,
  Circle
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MCQ {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const difficultyLevels = ["Easy", "Medium", "Hard"]
const questionCounts = [5, 10, 15, 20, 25]

const sampleMCQs: MCQ[] = [
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
      "6CO2 + 6H2O → C6H12O6 + 6O2",
      "C6H12O6 + 6O2 → 6CO2 + 6H2O",
      "2H2O → 2H2 + O2",
      "CO2 + H2O → CH4 + O2"
    ],
    correctAnswer: 0,
    explanation: "Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy. The equation shows 6 molecules each of CO2 and H2O producing one glucose molecule and 6 oxygen molecules."
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
    explanation: "The Calvin cycle produces G3P (glyceraldehyde-3-phosphate), which is used to synthesize glucose and other organic compounds needed by the plant."
  }
]

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useState(() => {
    setMounted(true)
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && (file.type === "application/pdf" || file.type === "text/plain" || file.name.endsWith(".docx"))) {
      setUploadedFile(file)
    }
  }

   const handleGenerate = async () => {
  if (!topic && !uploadedFile) return

  try {
    setIsGenerating(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        difficulty,
        questionCount,
      }),
    })

    const data = await response.json()

    if (data.success) {
      const cleanedText = data.data
        .replace(/```json/g, "")
        .replace(/```/g, "")
      console.log(cleanedText)
      
      const parsedMCQs = JSON.parse(cleanedText)

      setGeneratedMCQs(
        parsedMCQs.map((mcq: any, index: number) => ({
          ...mcq,
          id: index + 1,
        }))
      )
    } else {
      alert("Failed to generate MCQs")
    }
  } catch (error) {
    console.log(error)
    alert("Something went wrong")
  } finally {
    setIsGenerating(false)
  }
}

  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleDownloadPDF = (type: "questions" | "answers") => {
    // Simulate download
    const content = type === "questions" 
      ? "Questions PDF Download" 
      : "Answer Sheet PDF Download"
    alert(`${content} - This would trigger a real PDF generation in production`)
  }

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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI MCQ Generator</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-balance">
              Generate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                intelligent MCQs
              </span>{" "}
              instantly
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Enter a topic or upload a document, and let our AI create high-quality multiple choice questions for you.
            </p>
          </motion.div>

          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 lg:p-8 mb-8 glow-sm"
          >
            <div className="space-y-6">
              {/* Topic Input */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium">
                  Topic or Subject
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
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadedFile(null)
                        }}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium text-foreground mb-1">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, TXT, DOCX (Max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Difficulty Selector */}
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
                            <button
                              key={level}
                              onClick={() => {
                                setDifficulty(level)
                                setDifficultyOpen(false)
                              }}
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

                {/* Question Count Selector */}
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
                          {questionCounts.map((count) => (
                            <button
                              key={count}
                              onClick={() => {
                                setQuestionCount(count)
                                setCountOpen(false)
                              }}
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
                disabled={(!topic && !uploadedFile) || isGenerating}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating MCQs...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate MCQs
                  </>
                )}
              </Button>
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
                      {generatedMCQs.length} MCQs generated from your topic
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadPDF("questions")}
                      className="border-border"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Questions PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadPDF("answers")}
                      className="border-border"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Answer Sheet
                    </Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                      <Link href="/exam">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Link>
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
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 lg:p-6 hover:border-primary/30 transition-colors"
                    >
                      {/* Question */}
                      <div className="flex gap-4 mb-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">
                          {mcq.id}
                        </span>
                        <p className="font-medium text-foreground pt-1">{mcq.question}</p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                        {mcq.options.map((option, optIndex) => {
                          const isCorrect = optIndex === mcq.correctAnswer
                          const showAnswer = showAnswers[mcq.id]
                          
                          return (
                            <button
  key={optIndex}
  type="button"
  onClick={() =>
    setSelectedAnswers(prev => ({
      ...prev,
      [mcq.id]: optIndex,
    }))
  }
  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 w-full text-left ${
    selectedAnswers[mcq.id] === optIndex
      ? "border-primary bg-primary/10"
      : showAnswer && isCorrect
      ? "border-green-500/50 bg-green-500/10"
      : "border-border bg-background/30 hover:border-primary/30"
  }`}
>
  <div className="w-5 h-5 rounded-full border flex items-center justify-center">
    {selectedAnswers[mcq.id] === optIndex && (
      <div className="w-2 h-2 rounded-full bg-primary" />
    )}
  </div>

  <span>{option}</span>
</button>
//                             <button
//                             key={optIndex}
//                           onClick={() =>
//                           setSelectedAnswers(prev => ({
//                            ...prev,
//                           [mcq.id]: optIndex
//                             }))
//                            }
//                             className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 w-full text-left ${
//   selectedAnswers[mcq.id] === optIndex
//     ? "border-primary bg-primary/10"
//     : showAnswer && isCorrect
//     ? "border-green-500/50 bg-green-500/10"
//     : "border-border bg-background/30 hover:border-primary/30"
// }`}  
//                             >
//                               {showAnswer && isCorrect ? (
//                                 <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
//                               ) : (
//                                 <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                               )}
//                               <span className={`text-sm ${showAnswer && isCorrect ? "text-green-500 font-medium" : "text-foreground"}`}>
//                                 {option}
//                               </span>
//                             </button>
                          )
                        })}
                      </div>

                      {/* Show/Hide Answer */}
                      <div className="mt-4 ml-12">
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
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGeneratedMCQs([])
                      setShowAnswers({})
                    }}
                    className="w-full sm:w-auto border-border"
                  >
                    Generate New Questions
                  </Button>
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow" asChild>
                    <Link href="/exam">
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Start Interactive Quiz
                    </Link>
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
