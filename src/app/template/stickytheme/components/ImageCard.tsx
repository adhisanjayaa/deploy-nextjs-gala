import { motion } from "motion/react";
import Image from "next/image";

interface ImageCardProps {
  hoverRotate: number;
  src: string;
  className?: string;
}

export default function ImageCard({
  hoverRotate,
  src,
  className,
}: ImageCardProps) {
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
        <Image
          src={src}
          fill
          alt="couple"
          className="object-cover object-center rounded-3xl select-none touch-none"
          draggable="false"
        />
      </motion.div>
    </>
  );
}
