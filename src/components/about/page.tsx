"use client";

import { skills, tools } from "@/lib/utils";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiExpertsexchange } from "react-icons/si";
import CustomSvg2 from "../shared/CustomSvg2";
// import { useTheme } from "../theme/ThemeProvider";

const About = () => {
  // const { theme } = useTheme();
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <div
      // id="about"
      // data-aos="fade-zoom-in"
      // data-aos-easing="ease-in-back"
      // data-aos-delay="200"
      // data-aos-offset="0"
      className="relative mx-5 my-48 max-w-7xl xl:mx-auto"
    >
      <div className="absolute hidden md:block -right-8 xl:-right-40">
        <CustomSvg2></CustomSvg2>
      </div>
      <div className="absolute hidden md:block xl:-left-60 -bottom-60 xl:-bottom-28">
        <CustomSvg2></CustomSvg2>
      </div>

      <h1 className="absolute -top-52 md:-top-32 md:left-[20%] md:right-[20%] mx-auto text-center opacity-30 text-6xl font-bold">
        Full Stack Developer
      </h1>
      <motion.div>
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold">About Me</h1>
          <p
            className={` text-lg py-4 $ text-gray-300
              } `}
          >
            I’m a passionate MERN stack developer dedicated to building modern,
            responsive, and high-performance web applications. My expertise
            spans both frontend and backend technologies, ensuring seamless user
            experiences. I thrive on solving complex problems, leveraging my
            skills in HTML, CSS, JavaScript, and TypeScript, as well as
            frameworks like React.js and Next.js. I am well-versed in state
            management with Redux and backend development using Node.js,
            Express.js, and databases like MongoDB and PostgreSQL. My
            experience with tools like Docker and Prisma ensures that I can
            build scalable, maintainable, and production-ready applications.
            Currently, I blend my analytical skills from physics with my love
            for coding to approach challenges from different perspectives, which
            allows me to deliver robust solutions. I am always eager to learn
            and adapt to new technologies, constantly seeking to improve my
            skills and stay up-to-date with industry trends. With a keen eye for
            detail, I ensure that every project I work on not only meets but
            exceeds user expectations, contributing to the success of the teams
            I collaborate with.
          </p>
          <hr className="my-8 "></hr>
          <div>
            <p className="flex items-center gap-2 pt-2 pb-6 text-3xl font-bold">
              <SiExpertsexchange /> Skills
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {skills.map((skill, index) => (
                <motion.div

                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.5 }}


                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-delay="200"
                  data-aos-offset="0"
                  key={index}
                  className="flex flex-col items-center justify-center p-3 transition duration-300 border rounded-lg shadow-sm backdrop-blur"
                >
                  <Image
                    className="w-12 h-12 mb-2 rounded-xl"
                    src={skill.icon}
                    alt={skill.name}
                    width={52}
                    height={52}
                  />
                  <span className="text-lg font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
            <p className="flex items-center gap-2 pt-2 pb-6 mt-12 text-3xl font-bold">
              <SiExpertsexchange /> Tools
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {tools.map((tool, index) => (
                <motion.div

                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.5 }}


                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-delay="200"
                  data-aos-offset="0"
                  key={index}
                  className="flex flex-col items-center justify-center p-3 transition duration-300 border rounded-lg shadow-sm backdrop-blur"
                >
                  <Image
                    className="w-12 h-12 mb-2 rounded-xl"
                    src={tool.icon}
                    alt={tool.name}
                    width={52}
                    height={52}
                  />
                  <span className="text-lg font-medium">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
