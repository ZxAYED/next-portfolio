"use client"

import React from "react"
import { motion } from "framer-motion"
import MouseTilt from "@/components/ui/MouseTilt"

export default function BentoGrid() {
  return (
    <section id="what-i-do" className="relative max-w-7xl mx-auto px-4 lg:px-0 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
            What I Do
          </span>
        </h2>
        <p className="mt-3 text-gray-300 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Engineering digital products with speed, scalability, and craftsmanship.
        </p>
      </div>

      {/* 12-Column Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ================= ROW 1, CARD 1: Full Stack Engineering (8-Col) ================= */}
        <div className="md:col-span-12 lg:col-span-8 min-h-[380px] h-full">
          <MouseTilt className="h-full w-full">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 p-7 md:p-8 flex flex-col justify-between shadow-2xl shadow-purple-950/30"
            >
              {/* Top: Panoramic Terminal & Live Build Pipeline */}
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10 w-full mb-6">
                <div className="rounded-2xl border border-white/15 bg-black/40 p-4 md:p-5 shadow-xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]" />
                    </div>
                    <span className="font-mono text-[11px] text-gray-300 font-medium">~/fullstack-engine</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                      READY
                    </span>
                  </div>

                  {/* Code Skeleton & Build Pulse */}
                  <div className="font-mono text-xs space-y-2.5 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">➜</span>
                      <span className="text-cyan-300 font-semibold">turbopack</span>
                      <span className="text-purple-300">build</span>
                      <span className="text-emerald-400">--production</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4], width: ["45%", "88%", "45%"] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-transparent shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                      />
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5], width: ["65%", "98%", "65%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 0.9, 0.4], width: ["30%", "72%", "30%"] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-300 pt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-ping" />
                      <span className="font-medium text-emerald-300">Compiled static & dynamic routes in 40ms · 0 errors</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Typography */}
              <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mt-auto relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Full Stack Engineering</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 font-light max-w-2xl">
                  Architecting end-to-end web applications with Next.js App Router, Node.js, and PostgreSQL. Bridging high-conversion frontends with resilient, distributed backends.
                </p>
              </div>
            </div>
          </MouseTilt>
        </div>

        {/* ================= ROW 1, CARD 2: Client Solutions (4-Col) ================= */}
        <div className="md:col-span-12 lg:col-span-4 min-h-[380px] h-full">
          <MouseTilt className="h-full w-full">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 p-7 md:p-8 flex flex-col justify-between shadow-2xl shadow-emerald-950/30"
            >
              {/* Top: Expanding Vibrant Emerald Radar */}
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative w-full h-40 flex items-center justify-center mb-6 z-10">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [0.9, 2.3],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: (i - 1) * 0.8,
                      ease: "easeOut",
                    }}
                    className="absolute w-16 h-16 rounded-full border border-emerald-400/60 bg-emerald-500/10 pointer-events-none shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                  />
                ))}
                <div className="relative z-10 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_18px_#34d399] border-2 border-white" />
               
              </div>

              {/* Bottom Typography */}
              <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mt-auto relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Client Solutions</h3>
                <p className="text-gray-300 text-sm leading-relaxed mt-2 font-light">
                  Driving complete project ownership through direct stakeholder collaboration, precise requirement scoping, and high-velocity milestone delivery.
                </p>
              </div>
            </div>
          </MouseTilt>
        </div>

        {/* ================= ROW 2, CARD 3: Backend Architecture (4-Col) ================= */}
        <div className="md:col-span-12 lg:col-span-4 min-h-[360px] h-full">
          <MouseTilt className="h-full w-full">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 p-7 md:p-8 flex flex-col justify-between shadow-2xl shadow-sky-950/30"
            >
              {/* Top: Glowing Server Nodes & Animated Data Flow */}
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative w-full h-36 flex items-center justify-center mb-6 z-10">
                <svg className="w-full h-full max-w-[220px]" viewBox="0 0 200 100" fill="none">
                  <path d="M 30 50 L 100 25 L 170 50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 100 25 L 100 80" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Glowing Data Packet 1 */}
                  <motion.circle
                    r="4"
                    fill="#38bdf8"
                    className="drop-shadow-[0_0_8px_#38bdf8]"
                    animate={{
                      cx: [30, 100, 170],
                      cy: [50, 25, 50],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Glowing Data Packet 2 */}
                  <motion.circle
                    r="4"
                    fill="#e879f9"
                    className="drop-shadow-[0_0_8px_#e879f9]"
                    animate={{
                      cx: [100, 100],
                      cy: [25, 80],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
                  />

                  {/* Glowing Nodes */}
                  <circle cx="30" cy="50" r="9" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" className="drop-shadow-[0_0_10px_#38bdf8]" />
                  <circle cx="100" cy="25" r="10" fill="#701a75" stroke="#e879f9" strokeWidth="2.5" className="drop-shadow-[0_0_12px_#e879f9]" />
                  <circle cx="170" cy="50" r="9" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" className="drop-shadow-[0_0_10px_#38bdf8]" />
                  <circle cx="100" cy="80" r="8" fill="#14532d" stroke="#4ade80" strokeWidth="2" className="drop-shadow-[0_0_10px_#4ade80]" />
                </svg>
              </div>

              {/* Bottom Typography */}
              <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mt-auto relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Backend Architecture</h3>
                <p className="text-gray-300 text-sm leading-relaxed mt-2 font-light">
                  Designing robust, distributed APIs with Node.js, Nest.js, and Prisma. Implementing Redis caching, real-time WebSocket pipelines, and automated cron workflows.
                </p>
              </div>
            </div>
          </MouseTilt>
        </div>

        {/* ================= ROW 2, CARD 4: UI/UX & Motion Design (4-Col) ================= */}
        <div className="md:col-span-12 lg:col-span-4 min-h-[360px] h-full">
          <MouseTilt className="h-full w-full">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 p-7 md:p-8 flex flex-col justify-between shadow-2xl shadow-pink-950/30"
            >
              {/* Top: Luminous Orbiting Glassmorphism Shapes */}
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative w-full h-36 flex items-center justify-center mb-6 z-10">
                <motion.div
                  animate={{
                    x: [-18, 18, -18],
                    y: [-8, 8, -8],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/40 via-rose-500/30 to-purple-600/30 blur-lg border border-pink-400/40 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                />
                <motion.div
                  animate={{
                    x: [18, -18, 18],
                    y: [8, -8, 8],
                    scale: [1.2, 1, 1.2],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-indigo-600/30 blur-lg border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                />
                <div className="relative z-10 w-28 h-14 rounded-2xl border border-white/30 bg-white/[0.08] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                  <div className="w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_10px_#f43f5e]" />
                  <div className="w-12 h-2 rounded-full bg-white/70 shadow-[0_0_8px_white]" />
                </div>
              </div>

              {/* Bottom Typography */}
              <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mt-auto relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">UI/UX & Motion Design</h3>
                <p className="text-gray-300 text-sm leading-relaxed mt-2 font-light">
                  Crafting pixel-perfect, micro-interactive interfaces leveraging Tailwind CSS, ShadCN, and hardware-accelerated Framer Motion physics.
                </p>
              </div>
            </div>
          </MouseTilt>
        </div>

        {/* ================= ROW 2, CARD 5: Cloud Infrastructure & DevOps (4-Col) ================= */}
        <div className="md:col-span-12 lg:col-span-4 min-h-[360px] h-full">
          <MouseTilt className="h-full w-full">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 p-7 md:p-8 flex flex-col justify-between shadow-2xl shadow-indigo-950/30"
            >
              {/* Top: Vibrant AWS Ecosystem & CI/CD Pipeline Stream */}
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative w-full h-36 flex flex-col items-center justify-center font-mono text-[11px] mb-6 z-10">
                <div className="w-full max-w-[220px] space-y-2">
                  {[
                    { step: "AWS EC2 / S3", status: "ONLINE", color: "text-amber-300 border-amber-400/60 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.3)]" },
                    { step: "SES / SNS / SQS", status: "ACTIVE", color: "text-purple-300 border-purple-400/60 bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]" },
                    { step: "EDGE CDN", status: "LIVE", color: "text-cyan-300 border-cyan-400/60 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.3)]" },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      animate={{ opacity: [0.55, 1, 0.55], x: [0, 3, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" }}
                      className="flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/[0.04]"
                    >
                      <span className="text-gray-200 font-semibold">{item.step}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${item.color}`}>
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Typography */}
              <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mt-auto relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Cloud Infrastructure & DevOps</h3>
                <p className="text-gray-300 text-sm leading-relaxed mt-2 font-light">
                  Architecting scalable, highly-available deployment pipelines leveraging the AWS ecosystem (EC2, S3, SES, SNS, SQS) and edge CDNs.
                </p>
              </div>
            </div>
          </MouseTilt>
        </div>
      </div>
    </section>
  )
}
