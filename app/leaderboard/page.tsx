"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  Trophy,
  Medal,
  Crown,
  Flame,
  Star,
  TrendingUp,
  Calendar,
  Globe,
  Users,
  Moon,
  Sun,
  ArrowLeft,
  Award,
  Zap,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const globalLeaders = [
  { rank: 1, name: "Sarah Chen", xp: 45280, streak: 156, badges: 24, avatar: "SC", trend: "up" },
  { rank: 2, name: "James Wilson", xp: 42150, streak: 132, badges: 21, avatar: "JW", trend: "up" },
  { rank: 3, name: "Emily Davis", xp: 39800, streak: 98, badges: 19, avatar: "ED", trend: "down" },
  { rank: 4, name: "Michael Brown", xp: 37500, streak: 87, badges: 18, avatar: "MB", trend: "up" },
  { rank: 5, name: "Lisa Anderson", xp: 35200, streak: 76, badges: 16, avatar: "LA", trend: "same" },
  { rank: 6, name: "David Kim", xp: 33100, streak: 65, badges: 15, avatar: "DK", trend: "up" },
  { rank: 7, name: "Anna Martinez", xp: 31000, streak: 54, badges: 14, avatar: "AM", trend: "down" },
  { rank: 8, name: "Chris Taylor", xp: 29500, streak: 48, badges: 13, avatar: "CT", trend: "up" },
  { rank: 9, name: "Sophie White", xp: 27800, streak: 42, badges: 12, avatar: "SW", trend: "same" },
  { rank: 10, name: "Ryan Johnson", xp: 26100, streak: 38, badges: 11, avatar: "RJ", trend: "down" },
]

const weeklyLeaders = [
  { rank: 1, name: "Alex Thompson", xp: 3280, quizzes: 42, accuracy: 94, avatar: "AT" },
  { rank: 2, name: "Maria Garcia", xp: 2950, quizzes: 38, accuracy: 91, avatar: "MG" },
  { rank: 3, name: "John Lee", xp: 2720, quizzes: 35, accuracy: 89, avatar: "JL" },
  { rank: 4, name: "Emma Wilson", xp: 2510, quizzes: 32, accuracy: 92, avatar: "EW" },
  { rank: 5, name: "Tom Davis", xp: 2340, quizzes: 30, accuracy: 88, avatar: "TD" },
]

const dailyChallengeLeaders = [
  { rank: 1, name: "Nina Patel", time: "2:34", score: 10, avatar: "NP" },
  { rank: 2, name: "Mark Robinson", time: "2:45", score: 10, avatar: "MR" },
  { rank: 3, name: "Julia Chen", time: "2:52", score: 10, avatar: "JC" },
  { rank: 4, name: "Daniel Kim", time: "3:01", score: 9, avatar: "DK" },
  { rank: 5, name: "Rachel Green", time: "3:15", score: 9, avatar: "RG" },
]

const badges = [
  { name: "Quiz Master", icon: Trophy, color: "text-yellow-500", description: "Complete 100 quizzes" },
  { name: "Streak Hero", icon: Flame, color: "text-orange-500", description: "30-day streak" },
  { name: "Perfect Score", icon: Star, color: "text-primary", description: "Get 100% on any quiz" },
  { name: "Speed Demon", icon: Zap, color: "text-cyan-500", description: "Complete quiz under 5 min" },
  { name: "Accuracy Pro", icon: Target, color: "text-green-500", description: "90%+ accuracy overall" },
  { name: "Early Bird", icon: Award, color: "text-purple-500", description: "Early adopter badge" },
]

export default function LeaderboardPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<"global" | "weekly" | "daily">("global")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-muted-foreground font-medium">#{rank}</span>
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    return <div className="h-4 w-4 flex items-center justify-center text-muted-foreground">-</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">QuizNova AI</span>
            </Link>
          </div>

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
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Leaderboards</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Top Performers
              </span>
            </h1>
            <p className="text-muted-foreground">Compete with learners worldwide and climb the ranks</p>
          </div>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">52,483</p>
                <p className="text-sm text-muted-foreground">Active Players</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">1.2M</p>
                <p className="text-sm text-muted-foreground">Quizzes This Week</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">87.3%</p>
                <p className="text-sm text-muted-foreground">Avg Accuracy</p>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Selector */}
              <div className="flex gap-2 p-1 rounded-xl bg-muted/50 w-fit">
                {[
                  { id: "global", label: "Global", icon: Globe },
                  { id: "weekly", label: "Weekly", icon: Calendar },
                  { id: "daily", label: "Daily Challenge", icon: Flame },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "global" | "weekly" | "daily")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Leaderboard Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
              >
                {activeTab === "global" && (
                  <div className="divide-y divide-border/50">
                    {/* Top 3 Podium */}
                    <div className="p-6 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
                      <div className="flex items-end justify-center gap-4 h-40">
                        {/* 2nd Place */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-lg font-bold text-white mb-2">
                            {globalLeaders[1].avatar}
                          </div>
                          <p className="font-semibold text-sm">{globalLeaders[1].name.split(" ")[0]}</p>
                          <p className="text-xs text-muted-foreground">{globalLeaders[1].xp.toLocaleString()} XP</p>
                          <div className="mt-2 w-16 h-16 rounded-t-lg bg-gray-400/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-400">2</span>
                          </div>
                        </motion.div>

                        {/* 1st Place */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-center -mt-8"
                        >
                          <Crown className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-xl font-bold text-white mb-2 ring-4 ring-yellow-500/30">
                            {globalLeaders[0].avatar}
                          </div>
                          <p className="font-semibold">{globalLeaders[0].name.split(" ")[0]}</p>
                          <p className="text-xs text-muted-foreground">{globalLeaders[0].xp.toLocaleString()} XP</p>
                          <div className="mt-2 w-20 h-24 rounded-t-lg bg-yellow-500/20 flex items-center justify-center">
                            <span className="text-3xl font-bold text-yellow-500">1</span>
                          </div>
                        </motion.div>

                        {/* 3rd Place */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg font-bold text-white mb-2">
                            {globalLeaders[2].avatar}
                          </div>
                          <p className="font-semibold text-sm">{globalLeaders[2].name.split(" ")[0]}</p>
                          <p className="text-xs text-muted-foreground">{globalLeaders[2].xp.toLocaleString()} XP</p>
                          <div className="mt-2 w-16 h-12 rounded-t-lg bg-amber-600/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-amber-600">3</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Rest of leaderboard */}
                    {globalLeaders.slice(3).map((leader, index) => (
                      <motion.div
                        key={leader.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 text-center">{getRankIcon(leader.rank)}</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center font-semibold">
                          {leader.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{leader.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-orange-500" />
                              {leader.streak} day streak
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="h-3 w-3 text-primary" />
                              {leader.badges} badges
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{leader.xp.toLocaleString()} XP</p>
                          <div className="flex items-center justify-end">{getTrendIcon(leader.trend)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === "weekly" && (
                  <div className="divide-y divide-border/50">
                    <div className="p-4 bg-muted/30">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>This week&apos;s competition ends in 3 days</span>
                        <span className="text-primary font-medium">Prize: 500 XP Bonus</span>
                      </div>
                    </div>
                    {weeklyLeaders.map((leader, index) => (
                      <motion.div
                        key={leader.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 text-center">{getRankIcon(leader.rank)}</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center font-semibold">
                          {leader.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-xs text-muted-foreground">{leader.quizzes} quizzes completed</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{leader.xp.toLocaleString()} XP</p>
                          <p className="text-xs text-green-500">{leader.accuracy}% accuracy</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === "daily" && (
                  <div className="divide-y divide-border/50">
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Today&apos;s Challenge: Calculus Fundamentals</p>
                          <p className="text-sm text-muted-foreground">10 questions, fastest time wins</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                          <Link href="/exam">Take Challenge</Link>
                        </Button>
                      </div>
                    </div>
                    {dailyChallengeLeaders.map((leader, index) => (
                      <motion.div
                        key={leader.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 text-center">{getRankIcon(leader.rank)}</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center font-semibold">
                          {leader.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-xs text-muted-foreground">Score: {leader.score}/10</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{leader.time}</p>
                          <p className="text-xs text-muted-foreground">completion time</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Your Rank Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
              >
                <h3 className="font-semibold mb-4">Your Ranking</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">Rank #247</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total XP</span>
                    <span className="font-medium">12,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Streak</span>
                    <span className="font-medium flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      14 days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Badges Earned</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">1,550 XP to reach Rank #200</p>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Badges Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <h3 className="font-semibold mb-4">Achievement Badges</h3>
                <div className="grid grid-cols-3 gap-3">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="group relative flex flex-col items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={`p-2 rounded-xl bg-muted/50 ${badge.color}`}>
                        <badge.icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-center mt-1 text-muted-foreground">{badge.name}</p>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-foreground text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {badge.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* XP Rewards Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-accent/30 bg-accent/5 p-6"
              >
                <h3 className="font-semibold text-accent mb-3">Earn More XP</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    Complete daily challenges: +50 XP
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Perfect score bonus: +25 XP
                  </li>
                  <li className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-accent" />
                    Maintain streak: +10 XP/day
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    Weekly top 10: +100 XP
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
