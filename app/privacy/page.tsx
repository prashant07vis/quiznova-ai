export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pink-500/10" />

        <div className="container relative mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            🔒 Privacy & Security
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Privacy{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-8">
            Learn how QuizNova AI collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>

            <p className="text-muted-foreground leading-8">
              We may collect account details, uploaded content, quiz data,
              usage analytics, and technical information necessary to improve
              platform functionality and user experience.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Information
            </h2>

            <p className="text-muted-foreground leading-8">
              Collected information may be used to generate quizzes, improve
              AI performance, personalize user experience, provide support,
              and maintain platform security.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Data Security
            </h2>

            <p className="text-muted-foreground leading-8">
              QuizNova AI uses reasonable administrative and technical
              safeguards to help protect user data and uploaded content
              against unauthorized access or misuse.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Services
            </h2>

            <p className="text-muted-foreground leading-8">
              Certain platform features may rely on third-party tools,
              hosting providers, analytics services, or AI providers that
              assist in delivering functionality.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Cookies & Analytics
            </h2>

            <p className="text-muted-foreground leading-8">
              We may use cookies and analytics technologies to understand
              user behavior, improve platform performance, and enhance
              overall experience.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              User Rights
            </h2>

            <p className="text-muted-foreground leading-8">
              Users may request access, correction, or deletion of their
              information where applicable under relevant laws and policies.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Policy Updates
            </h2>

            <p className="text-muted-foreground leading-8">
              We may update this Privacy Policy periodically to reflect
              platform improvements, legal requirements, or operational
              changes.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}