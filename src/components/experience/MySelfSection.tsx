"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function MySelfSection() {
  return (
    <section id="myself" className="relative w-full max-w-7xl mx-auto px-4 md:px-0 my-40">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Left: Photo */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-1 border-[3px] rounded-2xl border-[#3B82F6] flex justify-start items-start  min-h-[60dvh] w-full  backdrop-blur-md overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 " />
            <Image
              src="/images/fb.jpg"
              alt="Zayed"
              fill
              priority
              quality={1000}
              className="object-cover mix-blend-multiply t w-full h-full rounded-2xl  bg-blend-multiply  
              "
            />
            {/* Subtle glow */}

          </motion.div>
        </div>

        {/* Right: Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-3"
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
                Experience & Journey
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-lg text-gray-400">
              A glimpse of my path —with passion, purpose, and persistence
            </p>
          </div>

          <div className="relative pl-10 ">
            {/* Vertical line */}
            <div className="absolute w-[2px] left-3 top-0 bottom-0  bg-gradient-to-b from-[#9333EA] via-[#3B82F6] to-transparent" />

            {/* Item 1 */}
            <div className="relative pb-4">
              <span className="absolute left-1 top-0 -translate-x-1/2 size-3 rounded-full bg-[#3B82F6] shadow-[0_0_0_6px_rgba(59,130,246,0.15)]" />
              <div className="rounded-xl border border-white/10   backdrop-blur p-5  md:p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/10  ">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-2xl text-cyan-300 font-medium">Full Stack Developer</h3>
                  <span className="text-xs md:text-lg text-[#3B82F6] font-medium">June 2025 — Present</span>
                </div>
                <p className="mt-1 text-sm md:text-lg text-[#9333EA] font-medium">Softvence Agency</p>
                <ul className="mt-3 space-y-2 text-sm md:text-[15px] text-gray-300/90 leading-relaxed">
                  <li>Working as a Full Stack Developer, handling both frontend and backend development as per project needs.</li>
                  <li>Developing and maintaining modern web apps — sometimes focused solely on backend for mobile apps, sometimes only frontend for websites, and often both.</li>
                  <li>Contributed to 5+ industry-level projects, continuously improving code quality, performance, and scalability.</li>
                  <li>Learning from every project — applying new insights, refining problem-solving skills, and expanding technical depth.</li>

                </ul>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pb-2">
              <span className="absolute left-1 top-0 -translate-x-1/2 size-3 rounded-full bg-[#9333EA] shadow-[0_0_0_6px_rgba(147,51,234,0.15)]" />
              <div className="rounded-xl border border-white/10   backdrop-blur p-4 md:p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 ">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-2xl text-cyan-300 font-medium">BSc (Hons) in Physics</h3>
                </div>
                <p className="mt-1 text-sm md:text-lg text-gray-400">2021 - Present</p>
                <p className="mt-3 text-sm md:text-[15px] text-gray-300/90">
                  Exploring problem‑solving, math, and scientific thinking that fuel my engineering mindset.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

