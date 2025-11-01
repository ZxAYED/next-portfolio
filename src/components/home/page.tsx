
import { projectData } from "@/lib/projects";
import About from "../about/page";
import Banner from "../banner/Banner";
import FullScreenScroller from "../implementation/FullScreenScroller";
import ProjectCard from "../projects/ProjectCard";
import Footer from "../shared/Footer";
import WhyMe from "../whyMe/page";
import MySelfSection from "../experience/MySelfSection";

const Home = () => {
  return (
    <FullScreenScroller>

      <Banner />
      <About />

      <div id="projects" className="relative ">

        <h1 className="absolute top-0 left-[15%] right-[15%] mx-auto text-center opacity-30 text-6xl font-bold">
          Projects
        </h1>
        <div>


          <section className="grid grid-cols-1 gap-6 ">


            {projectData?.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}

              ></ProjectCard>
            )).slice(0, 1)}
          </section>
        </div>



      </div>

      <section className="grid grid-cols-1 gap-6 ">


        {projectData?.map((project) => (
          <ProjectCard
            key={project.projectId}
            project={project}

          ></ProjectCard>
        )).slice(1, 2)}
      </section>
      <MySelfSection />
      <WhyMe />
      <Footer />
    </FullScreenScroller >
  );
};

export default Home;
