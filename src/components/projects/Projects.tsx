'use client'
import { projectData } from "@/lib/projects";
import ProjectCard from "./ProjectCard";


const Projects = () => {
  return (
    <div id="projects" className="relative ">

      <h1 className="absolute top-0 left-[15%] right-[15%] mx-auto text-center opacity-30 text-6xl font-bold">
        Projects
      </h1>
      <div>


        <section className="grid grid-cols-1 gap-6 ">


          {projectData?.map((project, index) => (
            <ProjectCard
              key={project.projectId}
              project={project}

            ></ProjectCard>
          ))}
        </section>
      </div>



    </div>
  );
};

export default Projects;
