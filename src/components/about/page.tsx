"use client"

import { skills, tools } from "@/lib/utils"
import { motion } from "framer-motion"
import { Database, Laptop, Server, Wrench } from "lucide-react"
import SkillCard from "./SkillCard"

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="relative w-full min-h-screen py-10 px-4 text-white overflow-hidden">
      {/* soft glow */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 auto-rows-fr">
          {/* MOBILE About Me (first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:hidden"
          >
            <div className="w-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-purple-500/20 border border-purple-500/40 rounded-3xl p-6 backdrop-blur-md hover:border-purple-500/70 transition-all duration-300 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 mb-4"
                >
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    About Me
                  </h1>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </motion.div>
                <p className="text-lg leading-relaxed text-gray-200 mb-6">
                  I'm a Full Stack Developer at Softvence Agency, working since June 2025. With over 7+ industry-standard projects, I specialize in creating scalable and responsive web applications using the MERN & PERN stacks and modern frameworks like Next.js, Redux & Redis.
                </p>
              </motion.div>
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* FRONTEND - top left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-blue-500/60 transition-all duration-300 h-full">
              <motion.h3 className="text-2xl ml-4 font-semibold mb-6 flex items-center gap-2">
                <Laptop className="text-blue-400" /> Frontend
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2">
                {skills.frontend.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <SkillCard skill={skill} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ABOUT - center (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 lg:col-start-2 lg:row-span-2 lg:flex hidden flex-col justify-center"
          >
            <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-purple-500/20 border border-purple-500/40 rounded-3xl p-6 backdrop-blur-md hover:border-purple-500/70 transition-all duration-300 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 mb-4"
                >
                  <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    About Me
                  </h1>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </motion.div>
                <p className="text-lg  leading-relaxed text-gray-200 mb-6">
                  I'm a Full Stack Developer at Softvence Agency, working since June 2025. With over 5+ industry-standard projects, I specialize in creating scalable and responsive web applications using the MERN & PERN stacks and modern frameworks like Next.js, Redux & Redis.
                </p>
              </motion.div>
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* BACKEND - top right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="order-3 lg:order-3"
          >
            <div className="bg-gradient-to-br from-amber-200/15 via-yellow-100/5 to-amber-200/12 border border-amber-300/25 rounded-2xl p-6 backdrop-blur-md hover:border-amber-300/40 transition-all duration-300 h-full">
              <motion.h3 className="text-2xl ml-4 font-semibold mb-6 flex items-center gap-2">
                <Server className="text-amber-300" /> Backend
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2">
                {skills.backend.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <SkillCard skill={skill} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* DATABASE - bottom left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="order-4 lg:order-4"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-green-500/60 transition-all duration-300 h-full">
              <motion.h3 className="text-2xl ml-4 font-semibold mb-6 flex items-center gap-2">
                <Database className="text-green-400" /> Database
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2">
                {skills.database.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <SkillCard skill={skill} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* TOOLS - bottom right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="order-5 lg:order-5"
          >
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-indigo-500/60 transition-all duration-300 h-full">
              <motion.h3 className="text-2xl ml-4 font-semibold mb-6 flex items-center gap-2">
                <Wrench className="text-indigo-400" /> Tools
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2">
                {tools.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <SkillCard skill={skill} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About
