"use client"

import { motion } from "framer-motion"
import { Facebook, Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { icon: Mail, href: "#", label: "Email", color: " text-white border-[#9333EA]  border ",link:"zzayediqbal@gmail.com" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: " text-white border-[#9333EA]   border" },
  { icon: Github, href: "#", label: "GitHub", color: " text-white border-[#9333EA]  border" },
  { icon: Facebook, href: "#", label: "Twitter", color: " text-white border-[#9333EA]   border " },
]

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className={`p-3 rounded-full border hover:border-white ${social.color} `}
          >
            <Icon className="w-5 h-5 t" />
          </motion.a>
        )
      })}
    </div>
  )
}
