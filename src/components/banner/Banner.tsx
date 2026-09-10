"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"
import CustomSvg from "../shared/CustomSvg"
import CustomSvg2 from "../shared/CustomSvg2"
import SocialIcons from "./SocialIcon"

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { width, height } = containerRef.current.getBoundingClientRect()
      const x = (clientX / width - 0.5) * 20
      const y = (clientY / height - 0.5) * 20
      containerRef.current.style.setProperty("--mouse-x", `${x}px`)
      containerRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const techs = [
    {
      src: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762146005/ts_hlqkvx.png',
      alt: "Typescript",
      position: { bottom: "-200px", left: "-30px", mdBottom: "-160px", mdLeft: "-50px" },
    },
    {
      src: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762146027/next_pfupwt.png',
      alt: "Next.js",
      position: { bottom: "-200px", left: "55px", mdBottom: "-160px", mdLeft: "50px" },
    },
    {
      src: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762146054/nest_cdwscp.png',
      alt: "Nest.js",
      position: { bottom: "-200px", left: "140px", mdBottom: "-160px", mdLeft: "150px" },
    },
    {
      src: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762146081/mongo_xfporh.png',
      alt: "Mongodb",
      position: { bottom: "-200px", left: "225px", mdBottom: "-160px", mdLeft: "250px" },
    },
    {
      src: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762146102/postgres_wylahx.png',
      alt: "Postgres",
      position: { bottom: "-200px", left: "310px", mdBottom: "-160px", mdLeft: "350px" },
    },
  ];

  return (
    <div ref={containerRef} id='home' className="relative w-full max-w-7xl mx-auto mt-20">
      <motion.div className="absolute hidden md:block -right-60 top-28 pointer-events-none">
        <CustomSvg />
      </motion.div>
      <motion.div className="absolute hidden md:block -left-64 bottom-0 pointer-events-none">
        <CustomSvg2 />
      </motion.div>

      <div className="relative items-center z-10 min-h-[80dvh] w-full flex justify-center">
        {/* Gradient Top Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50" />

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(168, 85, 247, 0.1) 25%, rgba(168, 85, 247, 0.1) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.1) 75%, rgba(168, 85, 247, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(168, 85, 247, 0.1) 25%, rgba(168, 85, 247, 0.1) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.1) 75%, rgba(168, 85, 247, 0.1) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="w-full px-4 lg:px-0 flex lg:flex-row flex-col items-center lg:items-start justify-between py-12 relative">
          {/* Decorative gradient lines */}
          <div className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-[#3B82F6] to-transparent opacity-30 pointer-events-none" />
          <div className="absolute left-24 bottom-1/4 w-2 h-40 bg-gradient-to-b from-[#3B82F6] to-transparent opacity-25 pointer-events-none" />
          <div className="absolute right-24 bottom-1/2 w-2 h-40 bg-gradient-to-b from-[#3B82F6] to-transparent opacity-25 pointer-events-none" />

          {/* ---------------- LEFT SIDE ---------------- */}
          <div className="lg:max-w-2xl space-y-8 animate-fade-in relative z-20">
            <div className="space-y-4 text-left relative">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
                  Zayed
                </span>
              </h1>

              <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-xl font-light">
                Full Stack Software Engineer specializing in scalable Next.js architectures, modern distributed backends, and performance-first web systems.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">
              {[
                "Full Stack Developer (Next.js, Node.js, Nest.js, PostgreSQL)",
                "Passionate about distributed system optimization & caching",
                "Focused on lightweight, high-conversion user experiences",
                "End-to-end project ownership and reliable client delivery",
                "Clean technical communication & empathetic teamwork"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 group">
                  <div className="w-6 h-6 rounded-full border border-[#9333EA]/50 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                    <svg className="w-3 h-3 text-[#9333EA]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 2l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5L10 2z" />
                    </svg>
                  </div>
                  <p className="text-sm lg:text-base text-gray-300">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 relative">
              <a
                href="https://drive.google.com/file/d/12283il_bd_l65VfUOEWS12c2DSIVm-4v/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/50 transition-all duration-300 font-medium text-center"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium text-center"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* ---------------- RIGHT SIDE ---------------- */}
          <div className="flex items-center justify-center relative mt-12 lg:mt-0">
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 border border-[#3B82F6]/20 rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-56 h-56 border border-[#9333EA]/10 rounded-full pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Profile Image */}
            <div className="relative mx-auto w-[320px] sm:w-[360px] h-84">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-[#3B82F6] z-20 backdrop-blur rounded-[50%_30%_50%_70%]" />
                <Image
                  src="https://res.cloudinary.com/dhl04adhz/image/upload/v1747754112/next-portfolio/portfolio.png.png"
                  alt="Zayed"
                  width={400}
                  height={400}
                  priority
                  quality={90}
                  className="relative z-30 h-full rounded-[50%_30%_50%_70%] object-cover"
                />
              </motion.div>

              <div className="flex flex-wrap">
                {techs.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.85, 1, 0.85],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      repeatDelay: 1.5,
                    }}
                    className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full"
                    style={{
                      bottom: tech.position.bottom,
                      left: tech.position.left,
                    }}
                  >
                    <Image
                      src={tech.src}
                      alt={tech.alt}
                      width={64}
                      height={64}
                      quality={90}
                      className="drop-shadow-lg rounded-[10%] w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Social Icons */}
      <div className="absolute -bottom-10 md:bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <SocialIcons />
      </div>
    </div>
  )
}