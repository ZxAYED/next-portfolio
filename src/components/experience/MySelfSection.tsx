"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const experiences = [
  {
    type: "work",
    title: "Full Stack Engineer",
    period: "June 2025 – July 2026",
    organization: "Softvence Agency",
    highlights: [
      "Engineered and shipped 18+ high-performance web applications and backend systems.",
      "Architected scalable REST & WebSocket APIs with Nest.js, Express, and Prisma.",
      "Optimized query execution plans and implemented distributed Redis caching layers.",
      "Led full-cycle delivery from database schema design to Vercel/AWS deployment.",
    ],
  },
  {
    type: "education",
    title: "BSc in Physics",
    
    organization: "Govt Titumir College",
    description: "Applying analytical rigor and mathematical logic to software architecture.",
  },
]

export default function MySelfSection() {
  return (
    <section id="myself" className="relative max-w-7xl mx-auto px-4 md:px-0 flex w-full justify-center items-center  lg:min-h-screen my-32">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
        {/* Left: Photo */}
        <div className="lg:col-span-2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-1 border border-white/10 rounded-3xl min-h-[440px] w-full backdrop-blur-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
          >
            <Image
              src="https://res.cloudinary.com/dhl04adhz/image/upload/v1762144594/fb_xkf7o8.jpg"
              alt="Zayed"
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover w-full h-full rounded-3xl"
            />
            {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" /> */}
          </motion.div>
        </div>

        {/* Right: Balanced Timeline */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 mt-6 md:mt-0"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
                Experience & Journey
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-300 font-light">
              Engineering with precision, high performance, and relentless execution
            </p>
          </motion.div>

          <div className="relative pl-8 space-y-6 flex-1 flex flex-col justify-center">
            {/* Animated vertical timeline line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute left-2 top-2 origin-top w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent"
            />

            {experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                className="relative rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/10 backdrop-blur-md border border-white/10 p-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-purple-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1"
              >
                {/* Glowing pulsing node */}
                <motion.span
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(6,182,212,0)",
                      "0px 0px 15px rgba(6,182,212,0.6)",
                      "0px 0px 0px rgba(6,182,212,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -left-[30px] top-6 size-3.5 rounded-full bg-cyan-400 border-2 border-[#0f172a] z-10"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg md:text-xl text-white font-bold tracking-tight">
                    {item.title}
                  </h3>
                  {item.period && (
                    <span className="text-xs md:text-sm text-cyan-300 font-semibold">
                      {item.period}
                    </span>
                  )}
                </div>

                <p className="text-sm text-purple-300 font-medium mt-0.5">
                  {item.organization}
                </p>

                {item.highlights && (
                  <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                    {item.highlights.map((point, idx) => (
                      <li key={idx}>• {point}</li>
                    ))}
                  </ul>
                )}

                {item.description && (
                  <p className="mt-2 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}