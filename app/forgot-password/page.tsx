"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Mail, ArrowRight, ArrowLeft, Moon, Sun, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function ForgotPasswordPage() {
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">QuizNova AI</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          {!emailSent ? (
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>

              <div className="text-center mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Forgot password?</h2>
                <p className="text-muted-foreground">
                  {"No worries, we'll send you reset instructions."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      Reset password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-6">
                {"We sent a password reset link to "}
                <span className="text-foreground font-medium">{email}</span>
              </p>

              <Button
                variant="outline"
                className="w-full h-12 mb-4"
                onClick={() => window.open("https://mail.google.com", "_blank")}
              >
                Open email app
              </Button>

              <p className="text-sm text-muted-foreground">
                {"Didn't receive the email? "}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-primary hover:underline"
                >
                  Click to resend
                </button>
              </p>

              <div className="mt-6 pt-6 border-t border-border/50">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
