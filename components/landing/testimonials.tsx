"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    content: "QuizNova AI has transformed how I create assessments. What used to take me hours now takes minutes. The quality of questions is remarkably good.",
    author: "Dr. Sarah Chen",
    role: "Professor of Biology",
    institution: "Stanford University",
    rating: 5
  },
  {
    content: "As a high school teacher with 150+ students, this tool is a lifesaver. I can create differentiated quizzes for various learning levels instantly.",
    author: "Michael Rodriguez",
    role: "AP History Teacher",
    institution: "Lincoln High School",
    rating: 5
  },
  {
    content: "The Bloom's taxonomy feature ensures my questions test different cognitive levels. It's like having a curriculum expert by my side.",
    author: "Emma Thompson",
    role: "Curriculum Director",
    institution: "Cambridge International",
    rating: 5
  },
  {
    content: "I use QuizNova to prepare for my exams. The AI generates questions I wouldn't have thought of, helping me identify gaps in my knowledge.",
    author: "Alex Kim",
    role: "Medical Student",
    institution: "Johns Hopkins University",
    rating: 5
  },
  {
    content: "Our entire department switched to QuizNova. The analytics help us understand where students struggle and adjust our teaching accordingly.",
    author: "Prof. James Wilson",
    role: "Head of Mathematics",
    institution: "MIT",
    rating: 5
  },
  {
    content: "The multi-language support is incredible. I teach ESL students and can now create quizzes in their native languages to help with comprehension.",
    author: "Maria Santos",
    role: "ESL Coordinator",
    institution: "International School of Geneva",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Loved by educators worldwide
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            See what teachers, professors, and students say about QuizNova AI.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 leading-relaxed mb-6 text-pretty">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
