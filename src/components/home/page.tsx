'use client'
import { projectData } from "@/lib/projects";
import { motion } from 'framer-motion';
import About from "../about/page";
import Banner from "../banner/Banner";
import MySelfSection from "../experience/MySelfSection";
import FullScreenScroller from "../implementation/FullScreenScroller";
import ProjectCard from "../projects/ProjectCard";
import Footer from "../shared/Footer";
import WhyMe from "../whyMe/page";
const Home = () => {
  return (
    <FullScreenScroller>

      <Banner />
      <div className="mt-60 lg:mt-0">
        <About />

      </div>
      <div id="projects" className="relative">
        <h1 className="absolute top-0 left-[15%] right-[15%] mx-auto text-center opacity-30 text-6xl font-bold">
          Projects
        </h1>

        <div>
          <section className="grid grid-cols-1 gap-6">
            {projectData
              ?.map((project, index) => (
                <motion.div
                  key={project.projectId}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
              .slice(0, 1)}
          </section>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6">
        {projectData
          ?.map((project, index) => (
            <motion.div
              key={project.projectId}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
          .slice(1, 2)}
      </section>

      <MySelfSection />
      <WhyMe />
      <Footer />
    </FullScreenScroller >
  );
};

export default Home;
