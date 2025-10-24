import { motion } from 'framer-motion';
const PrimaryButton = ({title,onClick}:{title:string,onClick?:()=>void}) => {
    return (
        <motion.button
        whileHover={{scale:1.03}}
        whileTap={{scale:0.8}}
        
        className="px-8 m-2 md:text-lg py-3 bg-gradient-to-r from-[#3B82F6] to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/50 transition-all duration-300 transform hover:scale-105 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">{title}</span>
              </motion.button>
    );
};

export default PrimaryButton;