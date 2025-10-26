"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Skill {
    icon: string
    name: string
}

interface SkillsOrbitProps {
    skills: Skill[]
    title: string
}

export default function SkillsOrbit({ skills, title }: SkillsOrbitProps) {
    const itemCount = skills.length
    const radius = 180 // Orbital radius in pixels

    // Calculate angle for each item in the circle
    const getPosition = (index: number) => {
        const angle = (index / itemCount) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return { x, y }
    }

    return (
        <div className="w-full">
            <p className="flex items-center gap-2 pt-12 pb-12 text-3xl font-bold text-white">
                <span>✕</span> {title}
            </p>

            <div className="relative w-full h-96 flex items-center justify-center">
                {/* Center point indicator (optional) */}
                <div className="absolute w-2 h-2 bg-purple-500/30 rounded-full" />

                {/* Orbital rings (decorative) */}
                <motion.div
                    className="absolute w-80 h-80 border border-purple-500/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-96 h-96 border border-blue-500/5 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Skill items in orbital pattern */}
                {skills.map((skill, index) => {
                    const { x, y } = getPosition(index)
                    const delay = index * 0.1

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    x: [x, x + 15, x - 15, x],
                                    y: [y, y - 20, y + 20, y],
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 6 + index * 0.4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    repeatType: "loop",
                                }}
                                className="flex flex-col items-center gap-2"
                            >
                                {/* Skill card with glow effect */}
                                <motion.div whileHover={{ scale: 1.15 }} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-3 hover:border-purple-500/60 transition-colors duration-300">
                                        <Image
                                            src={skill.icon || "/placeholder.svg"}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                </motion.div>

                                {/* Skill name label */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: delay + 0.3 }}
                                    className="text-xs font-medium text-gray-300 text-center whitespace-nowrap"
                                >
                                    {skill.name}
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
