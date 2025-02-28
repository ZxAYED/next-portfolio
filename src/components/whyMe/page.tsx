import { Briefcase, CheckCircle, Lightbulb, Target } from "lucide-react";
import { FaHandshake, FaUserTie } from "react-icons/fa";

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
    <section
      id="whyme"
      className="my-32 px-6 max-w-7xl border rounded-md py-16 mx-auto text-center"
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Why You Need Me
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
        I`m a determined professional who believes in hard work, teamwork, and
        delivering results. Here`s why I`m the right fit for your team.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {qualities.map((quality, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all"
          >
            <div className="mb-4">{quality.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {quality.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {quality.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMe;
