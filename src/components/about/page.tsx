"use client";

import { skills, tools } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiExpertsexchange } from "react-icons/si";
import img from '../../../public/images/about.png';
import CustomSvg2 from "../shared/CustomSvg2";
import SkillCard from "./SkillCard";
const About = () => {
  return (
    <div className="relative max-w-7xl xl:mx-auto mt-10  text-white">
   

      <div className="absolute hidden md:block -right-8 xl:-right-40">
        <CustomSvg2 />
      </div>
      <div className="absolute hidden md:block xl:-left-60 -bottom-60 xl:-bottom-28">
        <CustomSvg2 />
      </div>

      <motion.div>
        <div className="mx-auto max-w-7xl  ">
         <div className='flex justify-between  items-center mb-4'>
           <div className="max-w-2xl" ><h1 className="text-5xl font-bold mb-4">
           About Me
 
  </h1>
          <p className="text-lg py-4 ">
            I`m a Full Stack Developer at Softvence Agency, working since June 2025. 
            With over 7+ industry-standard projects , I specialize 
            in creating scalable and responsive web applications using the MERN  & PERN stacks 
           and modern frameworks like Next.js , 
            Redux & Redis. Passionate about coding, I continually strive to learn, adapt, 
            and contribute to projects that exceed user expectations.
          </p></div>
         <div className="h-40  w-80 rounded-xl ">
           <Image src={img} alt="about"  className="w-full h-40 rounded-xl border-4 border-transparent hover:border-[#9333ea] shadow-lg shadow-[#9333ea] "  />
         </div>
         </div>
          {/* <hr className="my-4  border-t-2 border-gray-500"></hr> */}
       <div style={{
  boxShadow: '8px 20px -10px #bbbbbb',
  textShadow: '0px 0px 5px #fff',
        backdropFilter:'blur(5px)',
       }} className="w-full flex flex-col  lg:flex-row justify-between  border border-gray-500 rounded-xl px-4 py-2">
          <div>
             <p className="flex items-center  gap-2 pt-12 pb-6 text-3xl font-bold">
            <SiExpertsexchange /> My Skills
          </p>

          <div className="grid grid-cols-2 gap-4  py-2  md:grid-cols-4 lg:grid-cols-6">
            {skills.map((skill, index) => (
             <SkillCard key={index} skill={skill}  />
            ))}
          </div>
          </div>

         <div>
           <p className="flex items-center gap-2 pt-2 pb-6 mt-12 text-3xl font-bold">
            <SiExpertsexchange /> Tools I Use
          </p>
          <div className="grid grid-cols-2 gap-4   md:grid-cols-4 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <SkillCard key={index} skill={tool}  />
            ))}
          </div>
         </div>

       </div>
        
        </div>
      </motion.div>
    </div>
  );
};

export default About;
