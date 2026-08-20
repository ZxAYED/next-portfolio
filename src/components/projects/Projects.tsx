"use client";

import CardSwap, { Card } from "@/components/ui/CardSwap";
import { projectData } from "@/lib/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative mx-auto my-20 max-w-7xl px-4 py-12 lg:my-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-4 top-1/2 -z-10 h-72 -translate-y-1/2 rounded-[2rem] bg-gradient-to-r from-cyan-500/8 via-slate-900/20 to-purple-500/8 blur-2xl" />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex w-full flex-col items-center space-y-6 text-center lg:items-start lg:text-left"
        >
          <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mx-auto max-w-lg text-base font-light leading-relaxed text-gray-300 md:text-lg lg:mx-0">
            Production applications shaped around clean interfaces, resilient
            backend systems, and interaction details that keep the work usable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden md:min-h-[520px]"
        >
          <div className="pointer-events-none absolute inset-6 " />
          <CardSwap
            width={520}
            height={420}
            cardDistance={35}
            verticalDistance={30}
            delay={4500}
            pauseOnHover={true}
            skewAmount={3}
            easing="power1.inOut"
          >
            {projectData.map((project) => (
              <Card
                key={project.slug}
                className="overflow-hidden shadow-2xl shadow-black/40"
              >
                <ProjectCard project={project} />
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
