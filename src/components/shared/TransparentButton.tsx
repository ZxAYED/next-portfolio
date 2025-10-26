import { motion } from "framer-motion";
const TransparentButton = ({ title, onClick }: { title: string, onClick?: () => void }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.03 }}

            className="px-6 w-full   md:text-lg  md:w-fit py-3 m-2 border-2 border-[#3B82F6] text-[#9333EA]  rounded-lg hover:bg-[#3B82F6]/10 transition-all duration-300 backdrop-blur-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#9333EA]/20 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white">{title}</span>
        </motion.button>
    );
};

export default TransparentButton;