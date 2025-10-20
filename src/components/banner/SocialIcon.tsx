"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Mail, href: "#", label: "Email", color: "text-lime-400 border border-lime-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "text-cyan-400 border border-cyan-400" },
  { icon: Github, href: "#", label: "GitHub", color: "text-lime-400 border border-lime-400" },
  { icon: Twitter, href: "#", label: "Twitter", color: "text-cyan-400 border border-cyan-400" },
]

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className={`p-3 rounded-full border border-gray-600/50 text-gray-400 transition-all duration-300 hover:border-current ${social.color} hover:shadow-lg hover:shadow-current/50 group`}
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        )
      })}
    </div>
  )
}
