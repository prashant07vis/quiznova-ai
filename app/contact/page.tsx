"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  Mail,
  MessageSquare,
  Send,
  Moon,
  Sun,
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  ChevronDown,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const faqs = [
  {
    question: "How do I get started with QuizNova AI?",
    answer:
      "Simply sign up for a free account, choose your topic or upload a PDF, and our AI will generate customized MCQs for you in seconds. No credit card required for the free tier.",
  },
  {
    question: "What file formats are supported for upload?",
    answer:
      "QuizNova AI supports PDF, DOCX, TXT, and PPTX files. You can also paste text directly or provide YouTube video links for content extraction.",
  },
  {
    question: "Can I customize the difficulty of generated questions?",
    answer:
      "Yes! You can select from Easy, Medium, or Hard difficulty levels. Our AI uses Bloom's Taxonomy to ensure questions match your selected difficulty.",
  },
  {
    question: "Is my uploaded content secure?",
    answer:
      "Absolutely. All uploads are encrypted and processed securely. We never share your content with third parties, and you can delete your data at any time.",
  },
  {
    question: "How do I upgrade to Pro?",
    answer:
      "Click on the 'Upgrade' button in your dashboard or visit our pricing page. You can choose from monthly or annual plans with instant activation.",
  },
]

const socials = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export default function ContactPage() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Contact Us</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Our team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {!isSubmitted ? (
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground glow"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send another message
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">We reply within 24 hours</p>
                  <a href="mailto:support.quiznova@gmail.com" className="text-primary hover:underline">
                    support.quiznova@gmail.com
                  </a>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">Support Hours</h3>
                  <p className="text-sm text-muted-foreground mb-2">Available weekdays</p>
                  <p className="text-foreground">Available Online (Mon-Fri)</p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground mb-2">Our headquarters</p>
                  <p className="text-foreground">Remote Support</p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-2">Mon-Fri from 9am to 6pm</p>
                  <p className="text-foreground">Coming Soon</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-border/50 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-sm">{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
