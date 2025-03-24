"use client";
import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: string;
}

export default function ProfileButton({
  bgColor,
  children,
  ...props
}: ButtonProps & React.ComponentProps<typeof motion.button>) {
  return (
    <>
      <motion.button
        style={{ backgroundColor: bgColor }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
        className="relative rounded-full p-2 z-10 shadow-2xl "
        {...props}
      >
        {children}
      </motion.button>
    </>
  );
}
