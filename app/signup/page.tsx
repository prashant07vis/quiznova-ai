"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Moon, Sun, User, GraduationCap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function SignupPage() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-accent/20 via-background to-primary/20">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">QuizNova AI</span>
            </Link>
            
            <h1 className="text-4xl font-bold mb-4">
              Join the
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> AI-powered </span>
              education revolution
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create your free account and start generating intelligent assessments today.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "1M+", label: "Quizzes Generated" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-semibold">50,000+</span> educators and students
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <header className="p-4 flex justify-between items-center">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">QuizNova AI</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full ml-auto"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </header>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create account</h2>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              className="w-full h-12 gap-3 border-border/50 hover:border-primary/50 hover:bg-primary/5 mb-6"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  role === "student"
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <GraduationCap className={`h-6 w-6 ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium ${role === "student" ? "text-primary" : "text-muted-foreground"}`}>
                  Student
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  role === "teacher"
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <BookOpen className={`h-6 w-6 ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`}>
                  Teacher
                </span>
              </button>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <div
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                    agreeTerms ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {agreeTerms && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                  {" and "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={isLoading || !agreeTerms}
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
