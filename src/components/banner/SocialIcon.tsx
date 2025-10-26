"use client"

import { motion } from "framer-motion"
import { Facebook, Github, Linkedin, Mail } from "lucide-react"

interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    icon: Mail,
    href: "mailto:zzayediqbalofficial@gmail.com",
    label: "Email",
    color: "text-white border-[#9333EA] border",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/zayed-iqbal",
    label: "LinkedIn",
    color: "text-white border-[#9333EA] border",
  },
  {
    icon: Github,
    href: "https://github.com/zxayed",
    label: "GitHub",
    color: "text-white border-[#9333EA] border",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/ZxAYED/",
    label: "Facebook",
    color: "text-white border-[#9333EA] border",
  },
]

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full border hover:border-white transition-all duration-200 ${social.color}`}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        )
      })}
    </div>
  )
}
