"use client"

import { skills, tools } from "@/lib/utils"
import { cubicBezier, motion } from "framer-motion"
import { Database, Laptop, Server, Sparkles, Wrench } from "lucide-react"
import SkillCard from "./SkillCard"

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.33, 1, 0.68, 1) },
    },
  };

  return (
    <div id="about" className="relative w-full min-h-screen py-10 px-4 text-white overflow-hidden">
      {/* soft ambient glow */}
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
            <div className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="relative z-10 mb-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center gap-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent justify-center text-center">
                    <Sparkles className="text-pink-300" /> About Me
                  </h2>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed text-center max-w-md font-light">
                  I&apos;m a Full Stack Engineer (formerly at <span className="text-purple-300 font-semibold">Softvence Agency</span>, June 2025 – July 2026). With <span className="text-blue-300 font-semibold">18+ successful including personal client projects</span>, I specialize in building robust web apps using <span className="text-pink-300 font-medium">MERN</span> and <span className="text-purple-300 font-medium">PERN</span> stacks  powered by <span className="text-blue-300 font-semibold">Next.js</span>, <span className="text-cyan-300 font-semibold">TypeScript</span>, and <span className="text-green-300 font-semibold">Redis</span>.
                </p>
              </motion.div>
              <div className="flex justify-center gap-3 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
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
            <div className="border border-white/10 bg-black/30 rounded-3xl p-6 backdrop-blur-2xl hover:border-blue-500/40 transition-all duration-300 h-full">
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 lg:col-start-2 lg:row-span-2 lg:flex hidden flex-col justify-center"
          >
            <div className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="relative z-10 mb-6">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-center justify-center">
                    <Sparkles className="text-pink-300" /> About Me
                  </h2>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed text-center max-w-md font-light">
                  I&apos;m a Full Stack Engineer (formerly at <span className="text-purple-300 font-semibold">Softvence Agency</span>, June 2025 – July 2026). With <span className="text-blue-300 font-semibold">18+ successful projects</span>, I specialize in building robust web apps using <span className="text-pink-300 font-medium">MERN</span> and <span className="text-purple-300 font-medium">PERN</span> stacks — powered by <span className="text-blue-300 font-semibold">Next.js</span>, <span className="text-cyan-300 font-semibold">TypeScript</span>, and <span className="text-green-300 font-semibold">Redis</span>.
                </p>
              </motion.div>
              <div className="flex justify-center gap-3 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
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
            <div className="border border-white/10 bg-black/30 rounded-3xl p-6 backdrop-blur-2xl hover:border-amber-400/40 transition-all duration-300 h-full">
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
            <div className="border border-white/10 bg-black/30 rounded-3xl p-6 backdrop-blur-2xl hover:border-green-500/40 transition-all duration-300 h-full">
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
            <div className="border border-white/10 bg-black/30 rounded-3xl p-6 backdrop-blur-2xl hover:border-indigo-500/40 transition-all duration-300 h-full">
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