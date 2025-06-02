'use client'
import Loading from "@/app/loading";
import ProjectCard from "./ProjectCard";
import { getProjects } from "@/Services/Projects";
import { useEffect, useState } from "react";
import ProjectCardSkeleton from "../shared/Skeleton";

export interface IProject {
  projectId: string;
  _id: string;
  projectName: string;            
  description: string;
  features: string[];
  githubClientCode: string;
  githubServerCode: string;
  liveLink: string;
  imageUrl: string;
}

const Projects = () => {

  const [loading, setLoading] = useState(true);
const [data, setData] = useState<IProject[]>([]);

useEffect(() => {
  setLoading(true);
  const fetchProjects = async () => {
    const result = await getProjects();
    setData(result || []);
  };
  fetchProjects();
  setLoading(false);
}, []);



  return (
    <div id="projects" className="relative pb-10 mx-auto mt-20 max-w-7xl">
      <h1 className="absolute -top-16 md:-top-32 left-[15%] right-[15%] mx-auto text-center opacity-30 text-6xl font-bold">
        Projects
      </h1>
      <div>
         <div className="z-10 rounded-2xl ">
          <div className="p-4 pt-8 rounded-xl">
            <h1 className="z-10 text-5xl font-bold text-center">
              Showcasing My Digital Ventures
            </h1>
          </div>
         <section className="grid grid-cols-1 gap-6 mt-10">
      {loading && data?.map((project, index) => (<ProjectCardSkeleton key={project.projectId} index={index} /> ))}

            {!loading &&data?.map((project, index) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                index={index}
              ></ProjectCard>
            ))}
          </section>   
        </div>
     
       
      </div>
    </div>
  );
};

export default Projects;
