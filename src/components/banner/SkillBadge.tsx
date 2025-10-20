"use client"

import { useEffect, useState } from "react"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: "Frontend Development", level: 95, category: "Development" },
  { name: "Backend Development", level: 90, category: "Development" },
  { name: "UI/UX Design", level: 85, category: "Design" },
  { name: "Database Design", level: 88, category: "Database" },
  { name: "API Development", level: 92, category: "Development" },
  { name: "Performance Optimization", level: 87, category: "Optimization" },
]

export default function SkillBadges() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="group p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-600/5 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300"
          style={{
            animation: `fade-in-scale 0.6s ease-out`,
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "both",
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-white">{skill.name}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {skill.category}
            </span>
          </div>
          <div className="w-full h-2 bg-purple-500/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: mounted ? `${skill.level}%` : "0%",
              }}
            />
          </div>
          <p className="text-xs text-purple-300 mt-2">{skill.level}% Proficiency</p>
        </div>
      ))}

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
