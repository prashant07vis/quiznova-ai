export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />

        <div className="container relative mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            📜 Legal Information
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Terms of{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-8">
            These Terms of Service govern your access to and use of QuizNova AI.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Acceptance of Terms
            </h2>

            <p className="text-muted-foreground leading-8">
              By accessing or using QuizNova AI, you agree to be bound by
              these Terms of Service and all applicable laws and regulations.
              If you do not agree with any part of these terms, you may not
              use the platform.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Platform Usage
            </h2>

            <p className="text-muted-foreground leading-8">
              QuizNova AI is designed for educational, learning, and
              productivity purposes. Users agree not to misuse the platform,
              attempt unauthorized access, disrupt services, or use the
              platform for unlawful activities.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              User Content
            </h2>

            <p className="text-muted-foreground leading-8">
              Users are responsible for the content they upload, generate,
              or share through QuizNova AI. You retain ownership of your
              uploaded materials while granting QuizNova AI permission to
              process content for platform functionality.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Intellectual Property
            </h2>

            <p className="text-muted-foreground leading-8">
              All trademarks, branding, software, interface designs, and
              platform content associated with QuizNova AI are protected by
              intellectual property laws and may not be copied or reused
              without permission.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Service Availability
            </h2>

            <p className="text-muted-foreground leading-8">
              We aim to provide reliable platform access, but we do not
              guarantee uninterrupted or error-free service. Features,
              functionality, or pricing may change over time.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Limitation of Liability
            </h2>

            <p className="text-muted-foreground leading-8">
              QuizNova AI shall not be held responsible for any indirect,
              incidental, or consequential damages arising from the use of
              the platform or generated content.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Updates to Terms
            </h2>

            <p className="text-muted-foreground leading-8">
              We reserve the right to modify or update these Terms of Service
              at any time. Continued use of the platform after changes are
              posted constitutes acceptance of the updated terms.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}