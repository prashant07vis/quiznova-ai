export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />

        <div className="container relative mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            ✨ AI Powered Learning Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              QuizNova AI
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-8">
            QuizNova AI helps students and teachers generate intelligent
            quizzes, MCQs, exams, and study material in seconds using
            advanced artificial intelligence.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              🚀
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Fast Generation
            </h3>

            <p className="text-muted-foreground leading-7">
              Generate quizzes, MCQs, and exams instantly from topics,
              PDFs, and notes.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
              🧠
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              AI Powered
            </h3>

            <p className="text-muted-foreground leading-7">
              Smart AI-generated questions with explanations, analytics,
              and exam simulation features.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl">
              🌍
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Global Learning
            </h3>

            <p className="text-muted-foreground leading-7">
              Built for students and educators worldwide with modern,
              responsive, and accessible learning tools.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            We aim to make exam preparation smarter, faster, and more
            accessible using AI technology while providing a premium
            learning experience for every student.
          </p>
        </div>
      </section>
    </div>
  )
}