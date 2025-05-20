"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "react-scroll";

import CustomSvg from "../shared/CustomSvg";
import ZButton from "../shared/ZButton";
import { useTheme } from "../theme/ThemeProvider";

const Banner = () => {
  const { theme } = useTheme();


  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden dark:text-white"
    >
     
      <motion.div
        className="absolute hidden md:block right-20 top-28"
     
      >
        <CustomSvg />
      </motion.div>
      <motion.div
        className="absolute hidden md:block -left-64 bottom-40"
      
      >
        <CustomSvg />
      </motion.div>

   
   
      <section className="flex flex-col items-center justify-between px-0 pb-5 mx-4 bg-black-200/20 lg:flex-row lg:py-16 max-w-7xl lg:mx-auto">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold lg:text-6xl ">
            Hi, I`m <span className=" bg-gradient-to-r from-[#9333EA] to-[#3B82F6] bg-clip-text text-transparent backdrop-blur "> Zayed</span>
          </h1>
          <p className="mt-4 text-lg ">
            I build modern, responsive, and high-performance web applications
            using cutting-edge technologies.
          </p>

          <div className="mt-6 space-y-4">
            {[
              "Clean , Modern UI & User-Friendly Designs",
              "Writing High-Quality, Efficient Code ",
              "Building Flexible and Easy-to-Customize Solutions",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <svg
                  className="w-6 h-6 mx-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="py-3 px-5 rounded z-20 text-white bg-[#1E293B] hover:bg-[#18253a] cursor-pointer"
              href="https://drive.google.com/file/d/1IU_bm0-KhDiXea_3CwOL1nepP0dwFXKy/view?usp=sharing"
            >
              See Resume
            </motion.a>

            <motion.p
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="py-3 px-5 rounded z-20 text-white bg-[#1E293B] hover:bg-[#18253a] cursor-pointer"
            >
              <Link spy smooth offset={-70} duration={1000} to="contact">
                Contact Me
              </Link>
            </motion.p>
          </div>
        </div>

 
        <motion.div
          className="relative w-full mt-12 lg:w-1/3 lg:mt-0"
          
        >
          <div className="relative mx-auto w-72 h-76">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="absolute inset-0  bg-gradient-to-r from-[#9333EA] to-[#3B82F6]  backdrop-blur rounded-[50%_30%_50%_70%]" />
              <Image
                src={'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754112/next-portfolio/portfolio.png.png'}
                alt="Zayed"
                width={300}
                priority
                height={300}
                className="relative z-10 rounded-[50%_30%_50%_70%]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </section>
  );
};

export default Banner;
