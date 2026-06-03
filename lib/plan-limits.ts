export type Plan = "free" | "pro" | "teacher_pro"
export type Role = "student" | "teacher"

export const PLAN_LIMITS = {
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
    weakTopics: true,
    quizHistory: true,
    questionBanks: true,
    examPapers: true,
  },
} as const

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS["free"]
}

export function isPro(plan: Plan) {
  return plan === "pro" || plan === "teacher_pro"
}