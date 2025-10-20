"use client";

import { motion } from "framer-motion";
import { HandIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SocialIcons from "./SocialIcon";

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
const techs = [
  { src: reactLogo, alt: "React" },
  { src: nextLogo, alt: "Next.js" },
  { src: nodeLogo, alt: "Node.js" },
  { src: tsLogo, alt: "TypeScript" },
  { src: tailwindLogo, alt: "Tailwind" },
];
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto overflow-hidden"
    >
      <div className="relative z-10 min-h-screen w-full flex flex-col">
        {/* Gradient Top Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

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

        {/* ================= MAIN HERO SECTION ================= */}
        <div className="flex-1 w-full flex items-center justify-between px-8 md:px-16 lg:px-24 py-12 relative">
          {/* Decorative gradient lines */}
          <div className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-purple-500 to-transparent opacity-30" />
          <div className="absolute left-24 bottom-1/4 w-2 h-40 bg-gradient-to-b from-purple-500 to-transparent opacity-25" />
          <div className="absolute right-24 bottom-1/2 w-2 h-40 bg-gradient-to-b from-purple-500 to-transparent opacity-25" />

          {/* ---------------- LEFT SIDE ---------------- */}
          <div className="max-w-2xl space-y-8 animate-fade-in relative z-20">
            <div className="space-y-4 relative">
              <h1 className="text-7xl font-bold leading-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  Zayed
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                I build modern, responsive, and high-performance web
                applications using cutting-edge technologies.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">
              {[
                "Clean, Modern UI & User-Friendly Designs",
                "Writing High-Quality, Efficient Code",
                "Building Flexible and Easy-to-Customize Solutions",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-gray-300 group cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full border border-purple-400/50 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                    <svg
                      className="w-3 h-3 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="group-hover:text-purple-300 transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-8 relative">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">See Resume</span>
              </button>
              <button className="px-8 py-3 border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Contact Me</span>
              </button>
            </div>
          </div>

          {/* ---------------- RIGHT SIDE ---------------- */}
          <div className="flex items-center justify-center relative">
            {/* Animated rotating rings */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 border border-purple-500/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-56 h-56 border border-purple-400/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Profile Image */}
            <motion.div
              className="relative w-80 h-80 flex items-center justify-center z-20"
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl rounded-full" />
              <Image
                src="https://res.cloudinary.com/dhl04adhz/image/upload/v1747754112/next-portfolio/portfolio.png.png"
                alt="Zayed"
                width={300}
                height={300}
                className="relative z-10 rounded-[50%_30%_50%_70%] object-cover"
                priority
              />
            </motion.div>

            {/* Floating Tech Tags */}
             <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-10">
            {techs.map((tech,i) => (
              <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.85 }}
            animate={{
              y: [0, -20, 0], // gentle float up/down
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 3.5 + i * 0.3, // slightly different duration per icon
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop", // keeps looping smoothly (no rewind snap)
            }}
            className="w-16 h-16 md:w-20 md:h-20"
          >
            <Image
              src={tech.src}
              alt={tech.alt}
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Social Icons */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <SocialIcons />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 right-8 z-20 animate-bounce">
        <HandIcon className="w-20 h-20 text-purple-400" />
      </div>
    </div>
  );
}
