"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Education Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            Generate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              intelligent quizzes
            </span>{" "}
            in seconds
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Create MCQs, quizzes, and complete exam papers from any topic or document. 
            Perfect for educators and students seeking smarter assessment tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg glow"
              asChild
            >
              <Link href="/generate">
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg border-border hover:bg-secondary"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm">50K+ Questions Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              <span className="text-sm">10K+ Educators Trust Us</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm">98% Accuracy Rate</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-2 glow">
            <div className="rounded-xl bg-gradient-to-br from-background to-secondary overflow-hidden">
              {/* Mock UI */}
              <div className="p-4 border-b border-border flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                <div className="w-3 h-3 rounded-full bg-chart-3/60" />
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">QuizNova AI Dashboard</span>
                </div>
              </div>
              <div className="p-6 lg:p-8 space-y-6">
                {/* Input Area */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Topic or Upload Document</label>
                  <div className="flex gap-3">
                    <div className="flex-1 h-12 rounded-lg bg-input border border-border flex items-center px-4 text-muted-foreground text-sm">
                      Photosynthesis in plants...
                    </div>
                    <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Generate
                    </Button>
                  </div>
                </div>
                
                {/* Generated Questions Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generated Questions</span>
                    <span className="text-xs text-primary">5 MCQs Ready</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                            {i}
                          </span>
                          <div className="space-y-1">
                            <div className="h-3 w-64 lg:w-96 bg-muted rounded" />
                            <div className="h-3 w-48 bg-muted/50 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
