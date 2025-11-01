"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function MySelfSection() {
  return (
    <section id="myself" className="relative w-full max-w-7xl mx-auto px-4 md:px-0 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Left: Photo */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex-1 border-2 border-[#3B82F6] rounded-3xl  min-h-[60dvh] w-full  backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-0 " />
            <Image
              src="/images/fb.jpg"
              alt="Zayed"
              fill
              priority
            
               className="object-contain w-full h-full  bg-blend-multiply  "
            />
            {/* Subtle glow */}
          
          </motion.div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
                Experience & Journey
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-400">
              A glimpse of my path — crafted with care and curiosity.
            </p>
          </div>

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#9333EA] via-[#3B82F6] to-transparent" />

            {/* Item 1 */}
            <div className="relative pb-10">
              <span className="absolute left-0 top-2 -translate-x-1/2 size-3 rounded-full bg-[#3B82F6] shadow-[0_0_0_6px_rgba(59,130,246,0.15)]" />
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-semibold">Full Stack Developer</h3>
                  <span className="text-xs md:text-sm text-[#3B82F6] font-medium">June 2025 — Present</span>
                </div>
                <p className="mt-1 text-sm md:text-base text-[#9333EA] font-medium">Softvence Agency</p>
                <ul className="mt-3 space-y-2 text-sm md:text-[15px] text-gray-300/90 leading-relaxed">
                  <li>Building modern, performant web apps across the stack.</li>
                  <li>Designing APIs, optimizing queries, and scaling services.</li>
                </ul>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pb-2">
              <span className="absolute left-0 top-2 -translate-x-1/2 size-3 rounded-full bg-[#9333EA] shadow-[0_0_0_6px_rgba(147,51,234,0.15)]" />
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-semibold">BSc (Hons) in Physics</h3>
                </div>
                <p className="mt-1 text-sm md:text-base text-gray-400">Year</p>
                <p className="mt-3 text-sm md:text-[15px] text-gray-300/90">
                  Exploring problem‑solving, math, and scientific thinking that fuel my engineering mindset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

