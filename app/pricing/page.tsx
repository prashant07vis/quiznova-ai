"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  Check,
  X,
  Moon,
  Sun,
  ArrowLeft,
  Crown,
  Zap,
  Star,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      { name: "10 MCQs per day", included: true },
      { name: "Questions PDF export", included: true },
      { name: "Basic quiz mode", included: true },
      { name: "Community support", included: true },
      { name: "Answer sheet export", included: false },
      { name: "AI explanations", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Teacher tools", included: false },
      { name: "No watermarks", included: false },
    ],
    cta: "Get Started",
    popular: true,
    icon: Zap,
  },
  {
    name: "Pro Monthly",
    price: "$9",
    period: "/month",
    description: "For serious learners",
    features: [
      { name: "Unlimited MCQs", included: true },
      { name: "Full PDF export", included: true },
      { name: "Advanced quiz modes", included: true },
      { name: "Priority support", included: true },
      { name: "Answer sheet export", included: true },
      { name: "AI explanations", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Teacher tools", included: true },
      { name: "No watermarks", included: true },
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: Star,
  },
  {
    name: "Pro 3 Months",
    price: "$24",
    period: "/3 months",
    originalPrice: "$27",
    description: "Save 11% with quarterly",
    badge: "Most Popular",
    features: [
      { name: "Unlimited MCQs", included: true },
      { name: "Full PDF export", included: true },
      { name: "Advanced quiz modes", included: true },
      { name: "Priority support", included: true },
      { name: "Answer sheet export", included: true },
      { name: "AI explanations", included: true },
      { name: "Advanced analytics", included: true },
      { name: "No watermarks", included: true },
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: Crown,
  },
  {
    name: "Pro 6 Months",
    price: "$39",
    period: "/6 months",
    originalPrice: "$54",
    description: "Best value - Save 28%",
    badge: "Best Value",
    features: [
  { name: "Unlimited MCQs", included: true },
  { name: "Full PDF export", included: true },
  { name: "Advanced quiz modes", included: true },
  { name: "Answer sheet export", included: true },
  { name: "AI explanations", included: true },
  { name: "Advanced analytics", included: true },
  { name: "No watermarks", included: true },
  { name: "Quiz history", included: true },
  { name: "Performance tracking", included: true },
],
    cta: "Start Free Trial",
    popular: true,
    icon: Shield,
  },
]

const comparisonFeatures = [
  { feature: "MCQs Generation", free: "10/day", pro: "Unlimited" },
  { feature: "PDF Upload", free: "1 MB max", pro: "50 MB max" },
  { feature: "Question Types", free: "MCQ only", pro: "All types" },
  { feature: "Export Options", free: "Questions only", pro: "Full export" },
  { feature: "AI Explanations", free: "No", pro: "Yes" },
  { feature: "Quiz History", free: "7 days", pro: "Extended History" },
  { feature: "Analytics", free: "Basic", pro: "Advanced" },
  { feature: "Support", free: "Community", pro: "Email Support" },
  { feature: "Watermarks", free: "Yes", pro: "No" }
]

export default function PricingPage() {
  const { theme, setTheme } = useTheme()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "biannual">("quarterly")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">QuizNova AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
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

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Pricing</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Start free and upgrade when you need more power. No credit card required.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 p-1 rounded-xl bg-muted/50">
              {[
                { id: "monthly", label: "Monthly" },
                { id: "quarterly", label: "Quarterly" },
                { id: "biannual", label: "6 Months" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setBillingCycle(option.id as "monthly" | "quarterly" | "biannual")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === option.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans
              .filter((plan) =>
                // Plans don't have a `billing` field; filter by name instead.
                plan.name === "Free" ||
                (billingCycle === "monthly" && plan.name.toLowerCase().includes("monthly")) ||
                (billingCycle === "quarterly" && plan.name.toLowerCase().includes("3 months")) ||
                (billingCycle === "biannual" && plan.name.toLowerCase().includes("6 months"))
              )
              .map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border ${
                  plan.popular
                    ? "border-primary bg-gradient-to-b from-primary/10 to-background"
                    : "border-border/50 bg-card/50"
                } backdrop-blur-sm p-6 flex flex-col`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.badge === "Most Popular" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <div className={`h-10 w-10 rounded-xl ${plan.popular ? "bg-primary/20" : "bg-muted"} flex items-center justify-center mb-3`}>
                    <plan.icon className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground/50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground glow"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold">Feature Comparison</h2>
              <p className="text-sm text-muted-foreground">See what&apos;s included in each plan</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium">Free</th>
                    <th className="text-center p-4 font-medium text-primary">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0">
                      <td className="p-4 text-sm">{row.feature}</td>
                      <td className="p-4 text-sm text-center text-muted-foreground">{row.free}</td>
                      <td className="p-4 text-sm text-center font-medium">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Have questions about pricing?</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/#faq">View FAQ</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
