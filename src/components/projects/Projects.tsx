'use client'
import { projectData } from "@/lib/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <div id="projects" className="relative mt-20">
      <h1 className="absolute -top-10  left-[15%] right-[15%] mx-auto text-center opacity-70 text-6xl font-bold">
        Projects
      </h1>
      <div>
        <section className="grid grid-cols-1 space-y-20 gap-6">
          {projectData?.map((project, index) => (
            <motion.div
              key={project.projectId}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Projects;
