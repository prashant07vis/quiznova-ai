"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  FileText, 
  Zap, 
  Target, 
  Users, 
  BarChart3,
  Upload,
  Languages
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Advanced language models create contextually accurate questions from any topic or document.",
    gradient: "from-primary to-primary/50"
  },
  {
    icon: FileText,
    title: "Document Upload",
    description: "Upload PDFs, docs, or images and let AI extract key concepts to generate relevant questions.",
    gradient: "from-accent to-accent/50"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Generate complete quizzes in seconds, not hours. Save time for what matters most—teaching.",
    gradient: "from-chart-4 to-chart-4/50"
  },
  {
    icon: Target,
    title: "Bloom's Taxonomy",
    description: "Questions calibrated to different cognitive levels—from recall to analysis and evaluation.",
    gradient: "from-chart-3 to-chart-3/50"
  },
  {
    icon: Users,
    title: "Classroom Integration",
    description: "Share quizzes with students, track progress, and export to popular LMS platforms.",
    gradient: "from-primary to-accent"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Understand student performance with detailed analytics and insights.",
    gradient: "from-chart-5 to-chart-5/50"
  },
  {
    icon: Upload,
    title: "Multiple Export Formats",
    description: "Export to PDF, Word, Google Forms, or integrate directly with your existing tools.",
    gradient: "from-accent to-primary"
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Generate questions in 50+ languages to support diverse learning environments.",
    gradient: "from-chart-3 to-chart-4"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Everything you need to create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              perfect assessments
            </span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Powerful AI tools designed specifically for educators and students to streamline the assessment creation process.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className={`group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 ${
                index === 0 || index === 5 ? "md:col-span-2" : ""
              }`}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
