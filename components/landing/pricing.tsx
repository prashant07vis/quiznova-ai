"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out QuizNova",
    price: "$0",
    period: "forever",
    features: [
      "10 quizzes per month",
      "Up to 20 questions per quiz",
      "Basic MCQ generation",
      "PDF export",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    description: "Best for students and exam preparation",
    price: "$9",
    period: "per month",
    features: [
  "Unlimited MCQs",
  "Full PDF export",
  "Answer sheet export",
  "AI explanations",
  "No ads",
  "Analytics dashboard",
  "Quiz history",
  "Advanced exam mode"
],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
  name: "Pro 3 Months",
  description: "Most popular plan for students",
  price: "$24",
  period: "3 months",
  features: [
    "Unlimited MCQs",
    "Full PDF export",
    "AI explanations",
    "No ads",
    "Analytics dashboard",
    "Priority AI generation"
  ],
  cta: "Get 3 Months",
  popular: true
},
{
  name: "Pro 6 Months",
  description: "Best value long-term plan",
  price: "$39",
  period: "6 months",
  features: [
  "Unlimited MCQs",
  "Unlimited quizzes",
  "Full PDF exports",
  "Answer sheet export",
  "AI explanations",
  "Advanced analytics",
  "No ads",
  "Quiz history",
  "All premium features"
],
  cta: "Get 6 Months",
  popular: false
},
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Choose the plan that fits your needs. Start free and upgrade anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/10 to-transparent glow"
                  : "border-border bg-card/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="/pricing">
  <Button 
    className={`w-full h-12 ${
      plan.popular
        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
    }`}
  >
    {plan.cta}
  </Button>
</a>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          14-day free trial on Pro plan. No credit card required.
        </motion.p>
      </div>
    </section>
  )
}
