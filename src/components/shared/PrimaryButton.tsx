"use client";

import { motion } from "framer-motion";
import React from "react";

type PrimaryButtonProps = {
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: "button" | "div";
};

const PrimaryButton = ({
  title,
  icon,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  as = "button",
}: PrimaryButtonProps) => {
  const sharedClassName =
    `px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/50 transition-all duration-300 relative group overflow-hidden flex items-center justify-center gap-2 font-medium md:text-lg ${className}`.trim();
  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative flex items-center justify-center gap-2">
        {icon}
        <span>{title}</span>
      </span>
    </>
  );

  if (as === "div") {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.8 }}
        className={sharedClassName}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.8 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${sharedClassName} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`.trim()}
    >
      {content}
    </motion.button>
  );
};

export default PrimaryButton;
