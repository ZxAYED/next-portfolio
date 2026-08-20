"use client";

import MorphingNavigation from "@/components/implementation/MorphingNavbar";
import ResumeIde from "@/components/resume/ResumeIde";
import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip">
      <MorphingNavigation />

      {/* Ambient background glow (constrained to prevent horizontal overflow) */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full pt-28 pb-16 sm:pt-32 sm:pb-24 px-3 sm:px-6 lg:px-8 flex items-start justify-center"
      >
        <ResumeIde />
      </motion.main>
    </div>
  );
}