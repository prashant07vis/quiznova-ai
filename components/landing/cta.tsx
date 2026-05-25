"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Start Creating Today</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to revolutionize your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              assessment workflow?
            </span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 text-pretty">
            Join 10,000+ educators who save hours every week creating better quizzes and exams with QuizNova AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button
  asChild
  size="lg"
  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8"
>
  <a href="/generate">
    Generate MCQs Free
    <ArrowRight className="ml-2 h-5 w-5" />
  </a>
</Button> 
         <Button
  asChild
  size="lg"
  variant="outline"
  className="h-14 px-8 text-lg border-border hover:bg-secondary"
>
  <a href="/pricing">
    Explore Pricing
  </a>
</Button>  
          </div>

          {/* Trust Elements */}
          <p className="text-muted-foreground text-sm mt-8">
            Generate AI-powered quizzes instantly · Free to get started
          </p>
        </motion.div>
      </div>
    </section>
  )
}
