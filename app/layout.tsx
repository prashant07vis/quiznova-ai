import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'QuizNova AI - AI-Powered Quiz & Exam Generation',
  description: 'Generate intelligent MCQs, quizzes, and exam papers instantly with AI. Perfect for students and educators seeking smarter assessment tools.',
  keywords: ['AI quiz generator', 'MCQ generator', 'exam paper generator', 'education technology', 'AI for teachers'],
  authors: [{ name: 'QuizNova AI' }],
  openGraph: {
    title: 'QuizNova AI - AI-Powered Quiz & Exam Generation',
    description: 'Generate intelligent MCQs, quizzes, and exam papers instantly with AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
       //{process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
