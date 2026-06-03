export type Plan = "free" | "pro" | "teacher_free" | "teacher_pro"
export type Role = "student" | "teacher"

export const PLAN_LIMITS = {
  // ── Student Plans ──────────────────────────────────────────────────────────
  free: {
    dailyGenerations: 3,
    maxQuestions: 10,
    maxPages: 5,
    questionCounts: [5, 10],
    pdfExport: false,
    answerSheet: false,
    aiExplanations: false,
    saveQuizzes: false,
    analytics: false,
    weakTopics: false,
    quizHistory: false,
    questionBanks: false,
    examPapers: false,
    ads: true,
    watermark: true,
  },
  pro: {
    dailyGenerations: Infinity,
    maxQuestions: 100,
    maxPages: 200,
    questionCounts: [5, 10, 20, 50, 100],
    pdfExport: true,
    answerSheet: true,
    aiExplanations: true,
    saveQuizzes: true,
    analytics: true,
    weakTopics: true,
    quizHistory: true,
    questionBanks: false,
    examPapers: false,
    ads: false,
    watermark: false,
  },
  // ── Teacher Plans ──────────────────────────────────────────────────────────
  teacher_free: {
    dailyGenerations: 2,
    maxQuestions: 20,
    maxPages: 5,
    questionCounts: [10, 20],
    pdfExport: false,
    answerSheet: false,
    aiExplanations: false,
    saveQuizzes: false,
    analytics: false,
    weakTopics: false,
    quizHistory: false,
    questionBanks: false,
    examPapers: true,
    ads: true,
    watermark: true,
  },
  teacher_pro: {
    dailyGenerations: Infinity,
    maxQuestions: 100,
    maxPages: 200,
    questionCounts: [10, 20, 50, 100],
    pdfExport: true,
    answerSheet: true,
    aiExplanations: true,
    saveQuizzes: true,
    analytics: true,
    weakTopics: false,
    quizHistory: true,
    questionBanks: true,
    examPapers: true,
    ads: false,
    watermark: false,
  },
} as const

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS["free"]
}

export function isPro(plan: Plan) {
  return plan === "pro" || plan === "teacher_pro"
}

export function isTeacher(role: Role) {
  return role === "teacher"
}

export function getDefaultPlan(role: Role): Plan {
  return role === "teacher" ? "teacher_free" : "free"
}