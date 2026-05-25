"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Moon,
  Sun,
  ArrowLeft,
  TrendingUp,
  BookOpen,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const categories = ["All", "AI & Education", "Study Tips", "Product Updates", "Success Stories", "Tutorials"]

const featuredPost = {
  id: 1,
  title: "How AI is Revolutionizing Education: The Future of Learning in 2026",
  excerpt:
    "Discover how artificial intelligence is transforming the way students learn and teachers teach. From personalized learning paths to intelligent assessment systems.",
  category: "AI & Education",
  author: "Sarah Chen",
  date: "May 20, 2026",
  readTime: "8 min read",
  image: "gradient-1",
}

const posts = [
  {
    id: 2,
    title: "10 Effective Study Techniques Backed by Science",
    excerpt: "Learn the most effective study methods that have been proven to improve retention and understanding.",
    category: "Study Tips",
    author: "James Wilson",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "gradient-2",
  },
  {
    id: 3,
    title: "Introducing QuizNova AI 2.0: Smarter, Faster, Better",
    excerpt: "We are excited to announce the latest update to QuizNova AI with new features and improvements.",
    category: "Product Updates",
    author: "QuizNova Team",
    date: "May 15, 2026",
    readTime: "4 min read",
    image: "gradient-3",
  },
  {
    id: 4,
    title: "How One Teacher Transformed Her Classroom with AI Quizzes",
    excerpt: "Read how Ms. Johnson increased student engagement by 150% using AI-generated assessments.",
    category: "Success Stories",
    author: "Emily Davis",
    date: "May 12, 2026",
    readTime: "6 min read",
    image: "gradient-4",
  },
  {
    id: 5,
    title: "Complete Guide to Creating Effective MCQs",
    excerpt: "A step-by-step tutorial on creating multiple choice questions that truly assess understanding.",
    category: "Tutorials",
    author: "Michael Brown",
    date: "May 10, 2026",
    readTime: "10 min read",
    image: "gradient-5",
  },
  {
    id: 6,
    title: "The Psychology Behind Effective Quizzing",
    excerpt: "Understanding how quizzes enhance memory retention through the testing effect.",
    category: "Study Tips",
    author: "Dr. Lisa Anderson",
    date: "May 8, 2026",
    readTime: "7 min read",
    image: "gradient-6",
  },
  {
    id: 7,
    title: "From PDF to Quiz in 60 Seconds: A Quick Tutorial",
    excerpt: "Learn how to quickly convert your study materials into interactive quizzes with QuizNova AI.",
    category: "Tutorials",
    author: "David Kim",
    date: "May 5, 2026",
    readTime: "3 min read",
    image: "gradient-7",
  },
]

const trendingPosts = posts.slice(0, 3)

export default function BlogPage() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [email, setEmail] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getGradient = (image: string) => {
    const gradients: { [key: string]: string } = {
      "gradient-1": "from-primary/30 to-accent/30",
      "gradient-2": "from-blue-500/30 to-cyan-500/30",
      "gradient-3": "from-purple-500/30 to-pink-500/30",
      "gradient-4": "from-green-500/30 to-emerald-500/30",
      "gradient-5": "from-orange-500/30 to-yellow-500/30",
      "gradient-6": "from-red-500/30 to-rose-500/30",
      "gradient-7": "from-indigo-500/30 to-violet-500/30",
    }
    return gradients[image] || "from-primary/30 to-accent/30"
  }

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
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 rounded-full border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
              />
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
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Learn, Grow, Succeed
              </span>
            </h1>
            <p className="text-muted-foreground">Insights, tips, and stories about AI-powered education</p>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Post */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
              >
                <div className={`aspect-[2/1] bg-gradient-to-br ${getGradient(featuredPost.image)} flex items-center justify-center`}>
                  <div className="text-6xl opacity-50">
                    <Sparkles className="h-16 w-16 text-foreground/30" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-white">
                        {featuredPost.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>

              {/* Post Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <div className={`aspect-[3/2] bg-gradient-to-br ${getGradient(post.image)} flex items-center justify-center`}>
                      <BookOpen className="h-8 w-8 text-foreground/30" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
              >
                <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles and tips delivered to your inbox weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Subscribe
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>

              {/* Trending */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Trending Articles</h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <div key={post.id} className="flex items-start gap-3">
                      <span className="text-2xl font-bold text-muted-foreground/50">{index + 1}</span>
                      <div>
                        <h4 className="font-medium text-sm hover:text-primary transition-colors cursor-pointer line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["AI", "Education", "Study Tips", "MCQ", "Exams", "Learning", "Teachers", "Students", "Productivity"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
