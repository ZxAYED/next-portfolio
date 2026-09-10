"use client";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Lightbulb, Target } from "lucide-react";
import { FaHandshake, FaUserTie } from "react-icons/fa";
import CustomSvg from "../shared/CustomSvg";
import CustomSvg2 from "../shared/CustomSvg2";

const WhyMe = () => {
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
      className="relative mx-auto  my-60   text-center rounded-md max-w-7xl"
    >
      <div className="absolute hidden lg:block -right-60 -top-10">
        <CustomSvg2 />
      </div>
      <div className="absolute hidden lg:block left-[200px] -bottom-40">
        <CustomSvg />
      </div>

      <div className="relative z-10 px-6 py-20 rounded-md">
        <h2 className="mb-6 text-4xl md:text-5xl text-cyan-300 font-bold">Why You Need Me</h2>
        <p className="mb-12 text-lg text-gray-300">
          I&apos;m a determined professional who believes in hard work, teamwork, and
          delivering results. Here&apos;s why I&apos;m the right fit for your team.
        </p>
        <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col bg-gradient-to-br from-cyan-500/20 to-purple-500/10 items-center backdrop-blur p-6 text-center shadow-lg rounded-xl hover:shadow-2xl text-gray-300 border border-white/10"
            >
              <div className="mb-4">{quality.icon}</div>
              <h3 className="mb-4 text-2xl font-medium text-white">{quality.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {quality.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyMe;