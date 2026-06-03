"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles, Check, X, Moon, Sun, ArrowLeft,
  Crown, Zap, Star, Shield, BookOpen, GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

// ── Student Plans ──────────────────────────────────────────────────────────────

const studentPlans = [
  {
    id: "student_free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying QuizNova AI",
    icon: Zap,
    popular: false,
    badge: null,
    billing: "all",
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      { name: "3 Quiz Generations / Day",        included: true  },
      { name: "Max 10 Questions / Quiz",          included: true  },
      { name: "Max 5 Page PDF/DOCX Upload",       included: true  },
      { name: "Topic-Based MCQ Generation",       included: true  },
      { name: "Basic Quiz Mode",                  included: true  },
      { name: "Community Support",                included: true  },
      { name: "PDF Export",                       included: false },
      { name: "Answer Sheet Export",              included: false },
      { name: "AI Explanations",                  included: false },
      { name: "Quiz History",                     included: false },
      { name: "Analytics",                        included: false },
      { name: "Save Quizzes",                     included: false },
      { name: "No Watermark",                     included: false },
    ],
  },
  {
    id: "student_pro_monthly",
    name: "Pro Monthly",
    price: "$4.99",
    period: "/month",
    description: "Most Popular for Students",
    icon: Star,
    popular: true,
    badge: null,
    billing: "monthly",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    features: [
      { name: "Unlimited Quiz Generations",       included: true },
      { name: "Up to 100 Questions / Quiz",       included: true },
      { name: "Up to 200 Page PDF/DOCX/PPTX",    included: true },
      { name: "AI Explanations",                  included: true },
      { name: "Full PDF Export",                  included: true },
      { name: "Answer Sheet Export",              included: true },
      { name: "Quiz History",                     included: true },
      { name: "Save Quizzes",                     included: true },
      { name: "Weak Topic Analysis",              included: true },
      { name: "Analytics Dashboard",              included: true },
      { name: "No Ads",                           included: true },
      { name: "No Watermark",                     included: true },
    ],
  },
  {
    id: "student_pro_quarterly",
    name: "Pro 3 Months",
    price: "$12.99",
    period: "/3 months",
    originalPrice: "$14.97",
    description: "Save 13% with quarterly",
    icon: Crown,
    popular: true,
    badge: "Most Popular",
    billing: "quarterly",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    features: [
      { name: "Everything in Pro Monthly",        included: true },
      { name: "Save Custom Quiz Sets",            included: true },
      { name: "Early Access Features",            included: true },
      { name: "Faster Queue",                     included: true },
    ],
  },
  {
    id: "student_pro_biannual",
    name: "Pro 6 Months",
    price: "$19.99",
    period: "/6 months",
    originalPrice: "$29.94",
    description: "Best Value — Save 33%",
    icon: Shield,
    popular: true,
    badge: "Best Value",
    billing: "biannual",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    features: [
      { name: "Everything in Pro Monthly",        included: true },
      { name: "Highest Priority Queue",           included: true },
      { name: "Unlimited Saved Quiz Sets",        included: true },
    ],
  },
]

// ── Teacher Plans ──────────────────────────────────────────────────────────────

const teacherPlans = [
  {
    id: "teacher_free",
    name: "Teacher Free",
    price: "$0",
    period: "forever",
    description: "For educators getting started",
    icon: BookOpen,
    popular: false,
    badge: null,
    billing: "all",
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      { name: "2 Paper Generations / Day",        included: true  },
      { name: "Max 20 Questions",                 included: true  },
      { name: "Max 5 Page Upload",                included: true  },
      { name: "Basic MCQ Generation",             included: true  },
      { name: "Exam Paper Generator",             included: true  },
      { name: "PDF Export",                       included: false },
      { name: "Answer Key Generator",             included: false },
      { name: "Save Question Banks",              included: false },
      { name: "Save Papers",                      included: false },
      { name: "Analytics Dashboard",              included: false },
      { name: "No Watermark",                     included: false },
    ],
  },
  {
    id: "teacher_pro_monthly",
    name: "Teacher Pro",
    price: "$9.99",
    period: "/month",
    description: "For professional educators",
    icon: Crown,
    popular: true,
    badge: "Most Popular",
    billing: "monthly",
    cta: "Get Teacher Pro",
    ctaHref: "/signup",
    features: [
      { name: "Unlimited Generations",            included: true },
      { name: "100 Questions / Generation",       included: true },
      { name: "200 Page Documents",               included: true },
      { name: "Unlimited Question Banks",         included: true },
      { name: "Exam Paper Generator",             included: true },
      { name: "PDF Export",                       included: true },
      { name: "Answer Key Generator",             included: true },
      { name: "Save Papers",                      included: true },
      { name: "Analytics Dashboard",              included: true },
      { name: "No Watermark",                     included: true },
      { name: "Priority Generation",              included: true },
    ],
  },
  {
    id: "teacher_pro_quarterly",
    name: "Teacher Pro 3 Months",
    price: "$24.99",
    period: "/3 months",
    originalPrice: "$29.97",
    description: "Save 17% with quarterly",
    icon: Shield,
    popular: true,
    badge: "Best Value",
    billing: "quarterly",
    cta: "Get Teacher Pro",
    ctaHref: "/signup",
    features: [
      { name: "Everything in Teacher Pro",        included: true },
      { name: "Early Access Features",            included: true },
      { name: "Dedicated Support",                included: true },
    ],
  },
]

// ── Comparison Tables ──────────────────────────────────────────────────────────

const studentComparison = [
  { feature: "Quiz Generations",    free: "3/day",    pro: "Unlimited" },
  { feature: "Questions Per Quiz",  free: "10",       pro: "100"        },
  { feature: "Document Upload",     free: "5 Pages",  pro: "200 Pages"  },
  { feature: "AI Explanations",     free: "No",       pro: "Yes"        },
  { feature: "PDF Export",          free: "No",       pro: "Yes"        },
  { feature: "Answer Sheet Export", free: "No",       pro: "Yes"        },
  { feature: "Quiz History",        free: "No",       pro: "Unlimited"  },
  { feature: "Save Quizzes",        free: "No",       pro: "Yes"        },
  { feature: "Analytics",           free: "No",       pro: "Yes"        },
  { feature: "Ads",                 free: "Yes",      pro: "No"         },
  { feature: "Watermark",           free: "Yes",      pro: "No"         },
]

const teacherComparison = [
  { feature: "Paper Generations",   free: "2/day",    pro: "Unlimited" },
  { feature: "Questions Per Paper", free: "20",       pro: "100"        },
  { feature: "Document Upload",     free: "5 Pages",  pro: "200 Pages"  },
  { feature: "Question Banks",      free: "No",       pro: "Unlimited"  },
  { feature: "PDF Export",          free: "No",       pro: "Yes"        },
  { feature: "Answer Key",          free: "No",       pro: "Yes"        },
  { feature: "Save Papers",         free: "No",       pro: "Yes"        },
  { feature: "Analytics",           free: "No",       pro: "Yes"        },
  { feature: "Watermark",           free: "Yes",      pro: "No"         },
]

export default function PricingPage() {
  const { theme, setTheme } = useTheme()
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "biannual">("monthly")

  const activePlans = userType === "student" ? studentPlans : teacherPlans
  const activeComparison = userType === "student" ? studentComparison : teacherComparison

  const visiblePlans = activePlans.filter((plan) => {
    if (plan.billing === "all") return true
    if (billingCycle === "monthly"   && plan.billing === "monthly")   return true
    if (billingCycle === "quarterly" && plan.billing === "quarterly") return true
    if (billingCycle === "biannual"  && plan.billing === "biannual"
      && userType === "student") return true
    return false
  })

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
            <Button variant="ghost" size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">

          {/* Title */}
          <div className="text-center mb-10">
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

          {/* ── Student / Teacher Toggle ─────────────────────────────────────── */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border">
              <button
                onClick={() => setUserType("student")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  userType === "student"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Student Plans
              </button>
              <button
                onClick={() => setUserType("teacher")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  userType === "teacher"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Teacher Plans
              </button>
            </div>
          </div>

          {/* ── Billing Cycle Toggle ─────────────────────────────────────────── */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 p-1 rounded-xl bg-muted/50">
              {[
                { id: "monthly",   label: "Monthly"   },
                { id: "quarterly", label: "Quarterly" },
                ...(userType === "student"
                  ? [{ id: "biannual", label: "6 Months" }]
                  : []),
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

          {/* ── Plan Cards ───────────────────────────────────────────────────── */}
          <motion.div
            key={userType + billingCycle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {visiblePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
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
                    {"originalPrice" in plan && plan.originalPrice && (
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
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                  asChild
                >
                  <Link href={plan.ctaHref}>{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Comparison Table ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden mb-12"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold">Feature Comparison</h2>
              <p className="text-sm text-muted-foreground">
                {userType === "student" ? "Student" : "Teacher"} plan features at a glance
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Free</th>
                    <th className="text-center p-4 font-medium text-primary">
                      {userType === "student" ? "Pro" : "Teacher Pro"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeComparison.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-sm font-medium">{row.feature}</td>
                      <td className="p-4 text-sm text-center">
                        {row.free === "No" || row.free === "Yes" ? (
                          row.free === "Yes"
                            ? <Check className="h-4 w-4 text-green-500 mx-auto" />
                            : <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">{row.free}</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-center">
                        {row.pro === "No" || row.pro === "Yes" ? (
                          row.pro === "Yes"
                            ? <Check className="h-4 w-4 text-green-500 mx-auto" />
                            : <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />
                        ) : (
                          <span className="font-medium">{row.pro}</span>
                        )}
                      </td>
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
            className="text-center"
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