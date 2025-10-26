"use client"

import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"

interface SkillCardProps {
  skill: {
    name: string
    icon: StaticImageData
  }
  index?: number
}

const SkillCard = ({ skill, index = 0 }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.03, }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      className="flex flex-col items-center justify-center "
    >
      <div className="relative w-full h-20  ">
        <Image src={skill.icon} fill priority alt={skill.name} className="object-contain saturate-[90%]" />
      </div>

    </motion.div>
  )
}

export default SkillCard
