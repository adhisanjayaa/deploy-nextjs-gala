import { motion } from "motion/react";
import Image from "next/image";
import Acc from "./Acc";

interface OrnamentProps {
  hoverRotate: number;
  className?: string;
}

export default function Ornament({ hoverRotate, className }: OrnamentProps) {
  return (
    <>
      <motion.div
        style={{
          borderRadius: "1.5rem",
        }}
        initial={{
          scale: 1,
          boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.25)",
        }}
        drag
        dragMomentum={false}
        dragElastic={0.2}
        whileHover={{
          scale: 1.05,
          rotate: hoverRotate,
          boxShadow: "10px 10px 20px 0 rgba(0, 0, 0, 0.25)",
        }}
        whileTap={{
          scale: 1.1,
          boxShadow: "20px 20px 40px 0 rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          type: "spring",
          duration: 0.45,
          bounce: 0.25,
        }}
        className={className}
      >
        <Acc fill="#EEE7CA" className="absolute z-20" />
        <div className="relative w-36 h-56 bg-linear-to-b from-[#F5F5F5]/10 to-[#000000]/14 backdrop-blur-[4px] z-0 rounded-[1.5rem]"></div>
      </motion.div>
    </>
  );
}
