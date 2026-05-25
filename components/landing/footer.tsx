"use client"

import Link from "next/link"
import { Sparkles, Twitter, Linkedin, Github, Youtube } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "MCQ Generator", href: "/generate" },
    { label: "Exam Mode", href: "/exam" },
    { label: "Teacher Mode", href: "/teacher" }
  ],
  Resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Blog", href: "/blog" },
    { label: "Settings", href: "/settings" },
    { label: "Help Center", href: "/contact" }
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
 
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" }
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">QuizNova AI</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              AI-powered quiz and exam generation for educators and students worldwide.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} QuizNova AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Status:</span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
