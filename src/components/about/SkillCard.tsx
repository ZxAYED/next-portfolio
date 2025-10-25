import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

const SkillCard = ({ skill }: { skill: { icon: StaticImageData; name: string }}) => {
  return (
  <motion.div
  initial={{ opacity: 0, y: -20}}
  animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center p-2 shadow-xl"
              >
                <Image
                  className="w-20 h-20  saturate-[80%] mb-2 object-fill rounded-xl"
                  src={skill.icon}
                  alt={skill.name}

                  width={5200}
                  quality={100}
                  height={5200}
                />
               
              </motion.div>

  );
};

export default SkillCard;