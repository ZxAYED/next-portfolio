"use client";
import { Briefcase, CheckCircle, Lightbulb, Target } from "lucide-react";
import Image from "next/image";
import { FaHandshake, FaUserTie } from "react-icons/fa";
import bg from "../../../public/images/whyme.webp";
import CustomSvg from "../shared/CustomSvg";
import CustomSvg2 from "../shared/CustomSvg2";
import { useTheme } from "../theme/ThemeProvider";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const WhyMe = () => {

  const { theme } = useTheme();
  useEffect(() => {
    AOS.init();
  }, []);

  const qualities = [
    {
      icon: <CheckCircle size={32} className="text-green-500" />,
      title: "Confident Team Player",
      description:
        "I thrive in collaborative environments, ensuring smooth teamwork and effective communication.",
    },
    {
      icon: <Target size={32} className="text-blue-500" />,
      title: "Determined & Focused",
      description:
        "Once I set a goal, I give my best effort to achieve it with full dedication and perseverance.",
    },
    {
      icon: <Lightbulb size={32} className="text-yellow-500" />,
      title: "Hard Work Over Talent",
      description:
        "I strongly believe that consistent effort and dedication surpass natural talent in the long run.",
    },
    {
      icon: <FaUserTie size={32} className="text-purple-500" />,
      title: "Professionalism & Integrity",
      description:
        "I maintain a high level of work ethic, responsibility, and integrity in every task I take on.",
    },
    {
      icon: <FaHandshake size={32} className="text-red-500" />,
      title: "Trustworthy & Reliable",
      description:
        "I take ownership of my work and deliver on my commitments with reliability and accountability.",
    },
    {
      icon: <Briefcase size={32} className="text-indigo-500" />,
      title: "Passionate About Growth",
      description:
        "I continuously seek new challenges, learn quickly, and adapt to evolving industry trends.",
    },
  ];

  return (
    <div
      id="whyme"
      className="relative mx-auto my-32  mt-60 text-center rounded-md md:border max-w-7xl"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="Why Me Background"
          layout="fill"
          objectFit="cover"
          className="rounded-md opacity-5 dark:opacity-80"
        />
      </div>

      <div className="absolute hidden lg:block -right-60 -top-20">
        <CustomSvg2 />
      </div>
      <div className="absolute hidden lg:block -left-140 top-40">
        <CustomSvg />
      </div>

      <div className="relative z-10 px-6 py-16 rounded-md backdrop-blur">
        <h2 className="mb-6 text-4xl font-bold">Why You Need Me</h2>
        <p className="mb-12 text-lg">
          I`m a determined professional who believes in hard work, teamwork, and
          delivering results. Here`s why I`m the right fit for your team.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => (
            <div
              key={index}

              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              className={`flex flex-col items-center p-6 text-center transition-all shadow-lg rounded-xl hover:shadow-3xl ${theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}


            >
              <div className="mb-4">{quality.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{quality.title}</h3>
              <p
                className={` ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } `}
              >
                {quality.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyMe;
